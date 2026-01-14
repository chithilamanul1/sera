-- Campaigns table
CREATE TABLE IF NOT EXISTS campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    price NUMERIC NOT NULL,
    referral_required INTEGER NOT NULL DEFAULT 3,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Campaign signups table
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

-- Referrals table
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

-- Insert default campaign
INSERT INTO campaigns (slug, price, referral_required, status) 
VALUES ('website-5000', 5000, 3, 'active')
ON CONFLICT (slug) DO NOTHING;

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_campaign_signups_user ON campaign_signups(user_id);
CREATE INDEX IF NOT EXISTS idx_campaign_signups_code ON campaign_signups(referral_code);
CREATE INDEX IF NOT EXISTS idx_referrals_signup ON referrals(campaign_signup_id);
CREATE INDEX IF NOT EXISTS idx_referrals_code ON referrals(referrer_code);

-- RLS Policies
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_signups ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;

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
