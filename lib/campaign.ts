import { createClient } from '@/utils/supabase/client';

export interface Campaign {
    id: string;
    name: string;
    slug: string;
    price: number;
    referral_required: number;
    status: 'active' | 'inactive';
}

export interface CampaignSignup {
    id: string;
    campaign_id: string;
    user_id: string;
    referral_code: string;
    referrals_completed: number;
    is_qualified: boolean;
    selected_domain?: string;
    domain_tier?: 'free' | 'premium';
    payment_status: 'pending' | 'paid' | 'completed';
}

export interface Referral {
    id: string;
    campaign_signup_id: string;
    referred_user_id: string;
    referrer_code: string;
    status: 'pending' | 'verified';
    verified_at?: string;
}

// Generate unique referral code
function generateReferralCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = 'REF-';
    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

// Get campaign by slug
export async function getCampaign(slug: string): Promise<Campaign | null> {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'active')
        .single();

    if (error) return null;
    return data;
}

// Create or get campaign signup
export async function getOrCreateSignup(userId: string, campaignId: string): Promise<CampaignSignup | null> {
    const supabase = createClient();

    // Check if signup exists
    const { data: existing } = await supabase
        .from('campaign_signups')
        .select('*')
        .eq('user_id', userId)
        .eq('campaign_id', campaignId)
        .single();

    if (existing) return existing;

    // Create new signup with unique referral code
    let referralCode = generateReferralCode();
    let attempts = 0;

    while (attempts < 5) {
        const { data, error } = await supabase
            .from('campaign_signups')
            .insert({
                user_id: userId,
                campaign_id: campaignId,
                referral_code: referralCode,
            })
            .select()
            .single();

        if (!error) return data;

        // If code collision, try again
        if (error.code === '23505') {
            referralCode = generateReferralCode();
            attempts++;
        } else {
            console.error('Error creating signup:', error);
            return null;
        }
    }

    return null;
}

// Record a referral (when friend signs up via referral link)
export async function recordReferral(referrerCode: string, newUserId: string): Promise<boolean> {
    const supabase = createClient();

    // Get the signup associated with this referral code
    const { data: signup } = await supabase
        .from('campaign_signups')
        .select('id, user_id')
        .eq('referral_code', referrerCode)
        .single();

    if (!signup) return false;

    // Prevent self-referral
    if (signup.user_id === newUserId) return false;

    // Check if referral already exists
    const { data: existingRef } = await supabase
        .from('referrals')
        .select('id')
        .eq('campaign_signup_id', signup.id)
        .eq('referred_user_id', newUserId)
        .single();

    if (existingRef) return false;

    // Create referral
    const { error } = await supabase
        .from('referrals')
        .insert({
            campaign_signup_id: signup.id,
            referred_user_id: newUserId,
            referrer_code: referrerCode,
            status: 'pending',
        });

    return !error;
}

// Verify referral (when friend logs in)
export async function verifyReferral(userId: string): Promise<void> {
    const supabase = createClient();

    // Find pending referrals for this user
    const { data: referrals } = await supabase
        .from('referrals')
        .select('id, campaign_signup_id')
        .eq('referred_user_id', userId)
        .eq('status', 'pending');

    if (!referrals || referrals.length === 0) return;

    // Verify all pending referrals for this user
    for (const referral of referrals) {
        await supabase
            .from('referrals')
            .update({
                status: 'verified',
                verified_at: new Date().toISOString(),
            })
            .eq('id', referral.id);

        // Update referral count
        await updateReferralCount(referral.campaign_signup_id);
    }
}

// Update referral count and qualification status
async function updateReferralCount(signupId: string): Promise<void> {
    const supabase = createClient();

    // Count verified referrals
    const { count } = await supabase
        .from('referrals')
        .select('*', { count: 'exact', head: true })
        .eq('campaign_signup_id', signupId)
        .eq('status', 'verified');

    if (count === null) return;

    // Get campaign to check required referrals
    const { data: signup } = await supabase
        .from('campaign_signups')
        .select('campaign_id')
        .eq('id', signupId)
        .single();

    if (!signup) return;

    const { data: campaign } = await supabase
        .from('campaigns')
        .select('referral_required')
        .eq('id', signup.campaign_id)
        .single();

    if (!campaign) return;

    // Update signup
    await supabase
        .from('campaign_signups')
        .update({
            referrals_completed: count,
            is_qualified: count >= campaign.referral_required,
        })
        .eq('id', signupId);
}

// Get signup with referrals
export async function getSignupWithReferrals(userId: string, campaignId: string) {
    const supabase = createClient();

    const { data: signup } = await supabase
        .from('campaign_signups')
        .select(`
            *,
            referrals:referrals(
                id,
                referred_user_id,
                status,
                verified_at,
                profiles:profiles(email, full_name)
            )
        `)
        .eq('user_id', userId)
        .eq('campaign_id', campaignId)
        .single();

    return signup;
}

// Update domain selection
export async function updateDomainSelection(
    signupId: string,
    domain: string,
    tier: 'free' | 'premium'
): Promise<boolean> {
    const supabase = createClient();

    const { error } = await supabase
        .from('campaign_signups')
        .update({
            selected_domain: domain,
            domain_tier: tier,
        })
        .eq('id', signupId);

    return !error;
}
