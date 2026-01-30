-- ============================================
-- SchemeLight Platform - Complete Supabase Setup
-- ============================================
-- 
-- This SQL script sets up all required tables for the SchemeLight platform.
-- 
-- IMPORTANT NOTES:
-- 1. Supabase automatically creates auth.users table - you don't need to create it
-- 2. Run this SQL in your Supabase SQL Editor
-- 3. Make sure you're in the correct project
-- 4. All tables use Row Level Security (RLS) for data protection
--
-- ============================================

-- Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. USER PROFILES TABLE
-- ============================================
-- Stores extended user information beyond auth.users
-- Links to auth.users via id (foreign key)

CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  age INTEGER,
  gender TEXT,
  occupation TEXT,
  annual_income INTEGER,
  state TEXT,
  category TEXT,
  is_disabled BOOLEAN DEFAULT FALSE,
  is_widow BOOLEAN DEFAULT FALSE,
  is_orphan BOOLEAN DEFAULT FALSE,
  land_ownership BOOLEAN,
  current_class TEXT,
  institution_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- ============================================
-- 2. ELIGIBILITY LOGS TABLE
-- ============================================
-- Stores history of all eligibility checks
-- Tracks which schemes users checked and results

CREATE TABLE IF NOT EXISTS eligibility_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  scheme_id TEXT NOT NULL,
  scheme_name TEXT NOT NULL,
  is_eligible BOOLEAN NOT NULL,
  confidence_score INTEGER NOT NULL,
  user_data JSONB NOT NULL,
  eligibility_result JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- ============================================
-- 3. DOCUMENT STATUS TABLE
-- ============================================
-- Tracks which documents users have available
-- Used for document checklist generation

CREATE TABLE IF NOT EXISTS document_status (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  aadhaar BOOLEAN DEFAULT FALSE,
  bank_account BOOLEAN DEFAULT FALSE,
  income_certificate BOOLEAN DEFAULT FALSE,
  category_certificate BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================
-- Enable RLS on all tables for security
-- Users can only access their own data

-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE eligibility_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_status ENABLE ROW LEVEL SECURITY;

-- ============================================
-- USER PROFILES POLICIES
-- ============================================

-- Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = id);

-- Users can insert their own profile
CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ============================================
-- ELIGIBILITY LOGS POLICIES
-- ============================================

-- Users can view their own eligibility logs
CREATE POLICY "Users can view own eligibility logs"
  ON eligibility_logs FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own eligibility logs
CREATE POLICY "Users can insert own eligibility logs"
  ON eligibility_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- DOCUMENT STATUS POLICIES
-- ============================================

-- Users can view their own document status
CREATE POLICY "Users can view own document status"
  ON document_status FOR SELECT
  USING (auth.uid() = user_id);

-- Users can update their own document status
CREATE POLICY "Users can update own document status"
  ON document_status FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can insert their own document status
CREATE POLICY "Users can insert own document status"
  ON document_status FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

-- Indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_eligibility_logs_user_id ON eligibility_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_eligibility_logs_created_at ON eligibility_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_eligibility_logs_scheme_id ON eligibility_logs(scheme_id);
CREATE INDEX IF NOT EXISTS idx_eligibility_logs_is_eligible ON eligibility_logs(is_eligible);

-- ============================================
-- AUTOMATIC TIMESTAMP UPDATES
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers to auto-update updated_at
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_document_status_updated_at
  BEFORE UPDATE ON document_status
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- VERIFICATION QUERIES
-- ============================================
-- Run these after setup to verify everything works

-- Check if tables were created
-- SELECT table_name FROM information_schema.tables 
-- WHERE table_schema = 'public' 
-- AND table_name IN ('user_profiles', 'eligibility_logs', 'document_status');

-- Check if RLS is enabled
-- SELECT tablename, rowsecurity FROM pg_tables 
-- WHERE schemaname = 'public' 
-- AND tablename IN ('user_profiles', 'eligibility_logs', 'document_status');

-- Check policies
-- SELECT * FROM pg_policies 
-- WHERE tablename IN ('user_profiles', 'eligibility_logs', 'document_status');

-- ============================================
-- AUTOMATIC PROFILE CREATION TRIGGER
-- ============================================
-- This trigger automatically creates profiles when users sign up
-- Solves RLS issues during registration

-- Function to automatically create user profile and document status
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Create user profile
  INSERT INTO public.user_profiles (id, full_name)
  VALUES (NEW.id, NULL)
  ON CONFLICT (id) DO NOTHING;

  -- Create document status
  INSERT INTO public.document_status (user_id, aadhaar, bank_account, income_certificate, category_certificate)
  VALUES (NEW.id, false, false, false, false)
  ON CONFLICT (user_id) DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger that fires when a new user is created in auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- SETUP COMPLETE!
-- ============================================
-- 
-- Your database is now ready for the SchemeLight platform.
-- 
-- Next steps:
-- 1. Make sure your .env.local file has Supabase credentials
-- 2. Test registration/login in your app
-- 3. Check that data is being saved correctly
-- 4. Profiles will be created automatically via trigger
--
-- ============================================

