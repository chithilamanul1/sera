-- Seranex Emergency RLS Fix
-- This script resets policies that might be causing "infinite recursion detected"

-- 1. Profiles (The usual culprit)
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON profiles;
DROP POLICY IF EXISTS "Users can insert their own profile." ON profiles;
DROP POLICY IF EXISTS "Users can update own profile." ON profiles;
DROP POLICY IF EXISTS "profiles_select_policy" ON profiles;
DROP POLICY IF EXISTS "profiles_insert_policy" ON profiles;
DROP POLICY IF EXISTS "profiles_update_policy" ON profiles;

-- Simplest possible policies to avoid recursion
-- SELECT: Everyone can read profiles
CREATE POLICY "profiles_select_public" ON profiles FOR SELECT USING (true);

-- INSERT: Only auth user can insert their own ID
CREATE POLICY "profiles_insert_own" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- UPDATE: Only auth user can update their own profile
CREATE POLICY "profiles_update_own" ON profiles FOR UPDATE USING (auth.uid() = id);

-- 2. Testimonials (Was failing due to profiles recursion)
DROP POLICY IF EXISTS "Public read testimonials" ON testimonials;
DROP POLICY IF EXISTS "Auth insert testimonials" ON testimonials;

CREATE POLICY "testimonials_select_public" ON testimonials FOR SELECT USING (approved = true);
CREATE POLICY "testimonials_insert_auth" ON testimonials FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- 3. Ensure RLS is active
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- 4. Re-Verify Seed Data
INSERT INTO public.campaigns (name, slug, price, referral_required)
VALUES ('Website for LKR 5000', 'website-5000', 5000, 3)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.testimonials (user_name, text, rating, company, role, approved)
VALUES 
('Samantah K.', 'Seranex built our e-commerce site in just 3 days. The conversion rates increased by 40% immediately. Highly recommended!', 5, 'K-Fashion', 'Owner', true),
('Duminda R.', 'The LKR 5000 offer is real! I refereed 3 friends and got my portfolio site for almost nothing. Excellent quality.', 5, 'Travel Lanka', 'Founder', true),
('Ashani W.', 'Professional team and very responsive. Their Discord notification system ensures I never miss a lead.', 5, 'Asha Education', 'Director', true)
ON CONFLICT DO NOTHING;
