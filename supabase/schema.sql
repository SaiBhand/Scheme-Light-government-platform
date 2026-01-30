-- Supabase Database Schema for SchemeLight Platform
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User Profiles Table
-- Stores additional user information beyond auth.users
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

-- Eligibility Logs Table
-- Stores user eligibility check history
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

-- Document Status Table
-- Tracks user's document availability
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

-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE eligibility_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_status ENABLE ROW LEVEL SECURITY;

-- User Profiles Policies
-- Users can only see and update their own profile
CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Eligibility Logs Policies
-- Users can only see their own eligibility logs
CREATE POLICY "Users can view own eligibility logs"
  ON eligibility_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own eligibility logs"
  ON eligibility_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Document Status Policies
-- Users can only see and update their own document status
CREATE POLICY "Users can view own document status"
  ON document_status FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own document status"
  ON document_status FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own document status"
  ON document_status FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_eligibility_logs_user_id ON eligibility_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_eligibility_logs_created_at ON eligibility_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_eligibility_logs_scheme_id ON eligibility_logs(scheme_id);

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

-- Automatic Profile Creation Trigger
-- This trigger automatically creates profiles when users sign up
-- Solves RLS issues during registration

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

