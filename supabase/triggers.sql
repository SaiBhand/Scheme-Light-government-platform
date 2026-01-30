-- ============================================
-- Automatic Profile Creation Trigger
-- ============================================
-- 
-- This trigger automatically creates user_profiles and document_status
-- when a new user signs up in auth.users
-- 
-- This solves the RLS issue where inserts fail because the user
-- isn't fully authenticated yet during registration
--
-- ============================================

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
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- Notes:
-- ============================================
-- 
-- SECURITY DEFINER allows the function to run with the privileges
-- of the function creator, bypassing RLS for this specific operation
-- 
-- This ensures profiles are created automatically even if:
-- - Email confirmation is required
-- - User isn't fully authenticated yet
-- - RLS policies would normally block the insert
--
-- ============================================

