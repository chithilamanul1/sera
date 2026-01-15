-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ==========================================
-- 0. PROFILES TABLE (Required for Auth)
-- ==========================================
create table if not exists public.profiles (
    id uuid references auth.users(id) on delete cascade primary key,
    updated_at timestamp with time zone,
    username text unique,
    full_name text,
    avatar_url text,
    website text,
    role text default 'user' check (role in ('user', 'admin'))
);

-- RLS for Profiles
alter table public.profiles enable row level security;

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url')
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user signup
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ==========================================
-- 1. CAMPAIGNS TABLE
-- ==========================================
create table if not exists public.campaigns (
    id uuid default uuid_generate_v4() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- DYNAMICALLY RELAX ALL UNKNOWN CONSTRAINTS
-- This block finds any column that is NOT in our expected list and removes the NOT NULL constraint.
do $$
declare
    rec record;
begin
    for rec in 
        select column_name 
        from information_schema.columns 
        where table_schema = 'public' 
          and table_name = 'campaigns' 
          and is_nullable = 'NO'
          and column_name not in ('id', 'created_at', 'name', 'slug', 'price', 'referral_required', 'status')
    loop
        execute 'alter table public.campaigns alter column ' || quote_ident(rec.column_name) || ' drop not null';
    end loop;
end $$;

-- Fix Columns for Campaigns
alter table public.campaigns add column if not exists name text;
alter table public.campaigns add column if not exists slug text;
alter table public.campaigns add column if not exists price numeric;
alter table public.campaigns add column if not exists referral_required integer default 3;
alter table public.campaigns add column if not exists status text default 'active' check (status in ('active', 'inactive'));

-- Add constraint if missing
do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'campaigns_slug_key') then
    alter table public.campaigns add constraint campaigns_slug_key unique (slug);
  end if;
end $$;

-- Insert default campaign
insert into public.campaigns (name, slug, price, referral_required)
values ('Website for LKR 5000', 'website-5000', 5000, 3)
on conflict (slug) do nothing;

-- ==========================================
-- 2. CAMPAIGN SIGNUPS TABLE
-- ==========================================
create table if not exists public.campaign_signups (
    id uuid default uuid_generate_v4() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- DYNAMICALLY RELAX CONSTRAINTS FOR SIGNUPS
do $$
declare
    rec record;
begin
    for rec in 
        select column_name 
        from information_schema.columns 
        where table_schema = 'public' 
          and table_name = 'campaign_signups' 
          and is_nullable = 'NO'
          and column_name not in ('id', 'created_at', 'campaign_id', 'user_id', 'referral_code', 'referrals_completed', 'is_qualified', 'selected_domain', 'domain_tier', 'payment_status')
    loop
        execute 'alter table public.campaign_signups alter column ' || quote_ident(rec.column_name) || ' drop not null';
    end loop;
end $$;

-- Fix Columns for Signups
alter table public.campaign_signups add column if not exists campaign_id uuid references public.campaigns(id);
alter table public.campaign_signups add column if not exists user_id uuid references auth.users(id);
alter table public.campaign_signups add column if not exists referral_code text;
alter table public.campaign_signups add column if not exists referrals_completed integer default 0;
alter table public.campaign_signups add column if not exists is_qualified boolean default false;
alter table public.campaign_signups add column if not exists selected_domain text;
alter table public.campaign_signups add column if not exists domain_tier text check (domain_tier in ('free', 'premium'));
alter table public.campaign_signups add column if not exists payment_status text default 'pending' check (payment_status in ('pending', 'paid', 'completed'));

-- Constraints
do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'campaign_signups_referral_code_key') then
    alter table public.campaign_signups add constraint campaign_signups_referral_code_key unique (referral_code);
  end if;
  if not exists (select 1 from pg_constraint where conname = 'campaign_signups_campaign_id_user_id_key') then
    alter table public.campaign_signups add constraint campaign_signups_campaign_id_user_id_key unique (campaign_id, user_id);
  end if;
end $$;

-- ==========================================
-- 3. REFERRALS TABLE
-- ==========================================
create table if not exists public.referrals (
    id uuid default uuid_generate_v4() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Fix Columns for Referrals
alter table public.referrals add column if not exists campaign_signup_id uuid references public.campaign_signups(id);
alter table public.referrals add column if not exists referred_user_id uuid references auth.users(id);
alter table public.referrals add column if not exists referrer_code text;
alter table public.referrals add column if not exists status text default 'pending' check (status in ('pending', 'verified'));
alter table public.referrals add column if not exists verified_at timestamp with time zone;

-- ==========================================
-- 4. TESTIMONIALS TABLE
-- ==========================================
create table if not exists public.testimonials (
    id uuid default uuid_generate_v4() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- DYNAMICALLY RELAX CONSTRAINTS FOR TESTIMONIALS
do $$
declare
    rec record;
begin
    for rec in 
        select column_name 
        from information_schema.columns 
        where table_schema = 'public' 
          and table_name = 'testimonials' 
          and is_nullable = 'NO'
          and column_name not in ('id', 'created_at', 'user_id', 'user_name', 'user_photo', 'text', 'rating', 'company', 'role', 'approved')
    loop
        execute 'alter table public.testimonials alter column ' || quote_ident(rec.column_name) || ' drop not null';
    end loop;
end $$;


-- Fix Columns for Testimonials
alter table public.testimonials add column if not exists user_id uuid references auth.users(id);
alter table public.testimonials add column if not exists user_name text;
alter table public.testimonials add column if not exists user_photo text;
alter table public.testimonials add column if not exists text text;
alter table public.testimonials add column if not exists rating integer default 5;
alter table public.testimonials add column if not exists company text;
alter table public.testimonials add column if not exists role text;
alter table public.testimonials add column if not exists approved boolean default false;

-- ==========================================
-- 5. MESSAGES TABLE
-- ==========================================
create table if not exists public.messages (
    id uuid default uuid_generate_v4() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Fix Columns for Messages
alter table public.messages add column if not exists name text;
alter table public.messages add column if not exists email text;
alter table public.messages add column if not exists phone text;
alter table public.messages add column if not exists service text;
alter table public.messages add column if not exists message text;
alter table public.messages add column if not exists status text default 'unread';


-- ==========================================
-- RLS POLICIES (Idempotent)
-- ==========================================

-- Enable RLS
alter table public.campaigns enable row level security;
alter table public.campaign_signups enable row level security;
alter table public.referrals enable row level security;
alter table public.testimonials enable row level security;
alter table public.messages enable row level security;
alter table public.profiles enable row level security;

-- Drop prior policies
drop policy if exists "Public read access" on public.campaigns;
drop policy if exists "Users manage own signups" on public.campaign_signups;
drop policy if exists "Public read testimonials" on public.testimonials;
drop policy if exists "Auth insert testimonials" on public.testimonials;
drop policy if exists "Anon insert messages" on public.messages;
drop policy if exists "Auth read messages" on public.messages;
drop policy if exists "Public profiles are viewable by everyone." on public.profiles;
drop policy if exists "Users can insert their own profile." on public.profiles;
drop policy if exists "Users can update own profile." on public.profiles;

-- Create Policies

-- Campaigns
create policy "Public read access" on public.campaigns for select using (true);

-- Signups
create policy "Users manage own signups" on public.campaign_signups for all using (auth.uid() = user_id);

-- Testimonials
create policy "Public read testimonials" on public.testimonials for select using (approved = true);
create policy "Auth insert testimonials" on public.testimonials for insert to authenticated with check (auth.uid() = user_id);

-- Messages
create policy "Anon insert messages" on public.messages for insert to anon, authenticated with check (true);
create policy "Auth read messages" on public.messages for select to authenticated using (true);

-- Profiles
create policy "Public profiles are viewable by everyone." on profiles for select using ( true );
create policy "Users can insert their own profile." on profiles for insert with check ( auth.uid() = id );
create policy "Users can update own profile." on profiles for update using ( auth.uid() = id );
