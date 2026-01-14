-- Fix existing campaigns table by adding missing columns
-- Run this INSTEAD of campaign_schema.sql if you're getting "slug column doesn't exist" error

-- Add slug column if it doesn't exist
ALTER TABLE campaigns ADD COLUMN IF NOT EXISTS slug TEXT;

-- Make slug unique
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'campaigns_slug_key'
    ) THEN
        ALTER TABLE campaigns ADD CONSTRAINT campaigns_slug_key UNIQUE (slug);
    END IF;
END $$;

-- Add other missing columns
ALTER TABLE campaigns ADD COLUMN IF NOT EXISTS price NUMERIC;
ALTER TABLE campaigns ADD COLUMN IF NOT EXISTS referral_required INTEGER DEFAULT 3;
ALTER TABLE campaigns ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active';

-- Add constraint for status if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'campaigns_status_check'
    ) THEN
        ALTER TABLE campaigns ADD CONSTRAINT campaigns_status_check CHECK (status IN ('active', 'inactive'));
    END IF;
END $$;

-- Insert default campaign if it doesn't exist
INSERT INTO campaigns (slug, price, referral_required, status) 
VALUES ('website-5000', 5000, 3, 'active')
ON CONFLICT (slug) DO NOTHING;

-- Now create the other tables (campaign_signups and referrals)
CREATE TABLE IF NOT EXISTS campaign_signups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    referral_code TEXT UNIQUE NOT NULL,
    referrals_completed INTEGER DEFAULT 0,
    is_qualified BOOLEAN DEFAULT false,
    selected_domain TEXT,
    domain_tier TEXT CHECK (domain_tier IN ('free', 'premium')),
    payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'completed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(campaign_id, user_id)
);

CREATE TABLE IF NOT EXISTS referrals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campaign_signup_id UUID REFERENCES campaign_signups(id) ON DELETE CASCADE,
    referred_user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    referrer_code TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'verified')),
    verified_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(campaign_signup_id, referred_user_id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_campaign_signups_user ON campaign_signups(user_id);
CREATE INDEX IF NOT EXISTS idx_campaign_signups_code ON campaign_signups(referral_code);
CREATE INDEX IF NOT EXISTS idx_referrals_signup ON referrals(campaign_signup_id);
CREATE INDEX IF NOT EXISTS idx_referrals_code ON referrals(referrer_code);

-- RLS Policies
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_signups ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Campaigns are viewable by everyone" ON campaigns;
DROP POLICY IF EXISTS "Users can view their own signups" ON campaign_signups;
DROP POLICY IF EXISTS "Users can create their own signups" ON campaign_signups;
DROP POLICY IF EXISTS "Users can update their own signups" ON campaign_signups;
DROP POLICY IF EXISTS "Users can view their referrals" ON referrals;
DROP POLICY IF EXISTS "Anyone can create referrals" ON referrals;

-- Campaigns: Public read
CREATE POLICY "Campaigns are viewable by everyone" ON campaigns
    FOR SELECT USING (true);

-- Campaign signups: Users can view their own
CREATE POLICY "Users can view their own signups" ON campaign_signups
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own signups" ON campaign_signups
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own signups" ON campaign_signups
    FOR UPDATE USING (auth.uid() = user_id);

-- Referrals: Users can view referrals they're involved in
CREATE POLICY "Users can view their referrals" ON referrals
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM campaign_signups 
            WHERE campaign_signups.id = referrals.campaign_signup_id 
            AND campaign_signups.user_id = auth.uid()
        )
        OR referred_user_id = auth.uid()
    );

CREATE POLICY "Anyone can create referrals" ON referrals
    FOR INSERT WITH CHECK (true);
