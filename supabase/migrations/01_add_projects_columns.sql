-- First, check if projects table exists and add missing columns if needed
-- Run this BEFORE the portfolio_projects.sql

-- Add category column if it doesn't exist
ALTER TABLE projects ADD COLUMN IF NOT EXISTS category TEXT;

-- Ensure all required columns exist
ALTER TABLE projects ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS tech_stack TEXT[];
ALTER TABLE projects ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'Live';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Add index on category for better performance
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
