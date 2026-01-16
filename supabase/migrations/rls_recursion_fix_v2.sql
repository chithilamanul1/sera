-- Seranex DEFINITIVE RLS Fix (Version 2)
-- Run this if Version 1 didn't clear the recursion error.

-- 1. CLEAN SLATE: Profiles
-- We drop EVERY known and potential policy name to ensure no hidden recursion.
DO $$ 
BEGIN
    EXECUTE (
        SELECT 'DROP POLICY IF EXISTS ' || quote_ident(policyname) || ' ON profiles;'
        FROM pg_policies 
        WHERE tablename = 'profiles'
    );
END $$;

-- 2. CLEAN SLATE: Testimonials
DO $$ 
BEGIN
    EXECUTE (
        SELECT 'DROP POLICY IF EXISTS ' || quote_ident(policyname) || ' ON testimonials;'
        FROM pg_policies 
        WHERE tablename = 'testimonials'
    );
END $$;

-- 3. RECREATE BASIC POLICIES
-- Profiles: Public Read, Auth Own Insert/Update
CREATE POLICY "p1" ON profiles FOR SELECT USING (true);
CREATE POLICY "p2" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "p3" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Testimonials: Public Read Approved, Auth Own Insert
CREATE POLICY "t1" ON testimonials FOR SELECT USING (approved = true);
CREATE POLICY "t2" ON testimonials FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- 4. ENABLE RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- 5. RE-VERIFY SEED DATA
-- Ensure testimonials exist after the reset
INSERT INTO public.testimonials (user_name, text, rating, company, role, approved)
VALUES 
('Samantah K.', 'Seranex built our e-commerce site in just 3 days. The conversion rates increased by 40% immediately. Highly recommended!', 5, 'K-Fashion', 'Owner', true),
('Duminda R.', 'The LKR 5000 offer is real! I refereed 3 friends and got my portfolio site for almost nothing. Excellent quality.', 5, 'Travel Lanka', 'Founder', true),
('Ashani W.', 'Professional team and very responsive. Their Discord notification system ensures I never miss a lead.', 5, 'Asha Education', 'Director', true)
ON CONFLICT DO NOTHING;
