-- ============================================
-- QUICK FIX: Run this if you're getting registration errors
-- ============================================
-- 
-- This creates the automatic profile creation trigger
-- Run this in Supabase SQL Editor if you haven't already
--
-- ============================================

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Drop existing function if it exists
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create function to automatically create user profile and document status
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
AS $$
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
$$ LANGUAGE plpgsql;

-- Create the trigger that fires when a new user is created
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- VERIFICATION
-- ============================================
-- Run this to verify the trigger was created:

-- SELECT 
--   trigger_name,
--   event_manipulation,
--   event_object_table,
--   action_statement
-- FROM information_schema.triggers
-- WHERE trigger_name = 'on_auth_user_created';

-- ============================================
-- DONE!
-- ============================================
-- 
-- Now try registering a new user - the profile and document_status
-- will be created automatically by the trigger.
--
-- ============================================

