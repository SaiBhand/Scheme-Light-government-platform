-- ============================================
-- SchemeLight Platform - Test Queries
-- ============================================
-- 
-- Use these queries to test and verify your database setup
-- Run these in Supabase SQL Editor after setup
--
-- ============================================

-- ============================================
-- 1. VERIFY TABLES EXIST
-- ============================================

SELECT 
  table_name,
  table_type
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('user_profiles', 'eligibility_logs', 'document_status')
ORDER BY table_name;

-- ============================================
-- 2. VERIFY ROW LEVEL SECURITY IS ENABLED
-- ============================================

SELECT 
  tablename,
  rowsecurity as "RLS Enabled"
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN ('user_profiles', 'eligibility_logs', 'document_status')
ORDER BY tablename;

-- ============================================
-- 3. VIEW ALL POLICIES
-- ============================================

SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd as "Command",
  qual as "Using Expression",
  with_check as "With Check"
FROM pg_policies 
WHERE tablename IN ('user_profiles', 'eligibility_logs', 'document_status')
ORDER BY tablename, policyname;

-- ============================================
-- 4. CHECK TABLE STRUCTURES
-- ============================================

-- User Profiles Structure
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'user_profiles'
ORDER BY ordinal_position;

-- Eligibility Logs Structure
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'eligibility_logs'
ORDER BY ordinal_position;

-- Document Status Structure
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'document_status'
ORDER BY ordinal_position;

-- ============================================
-- 5. CHECK INDEXES
-- ============================================

SELECT 
  tablename,
  indexname,
  indexdef
FROM pg_indexes
WHERE schemaname = 'public'
  AND tablename IN ('user_profiles', 'eligibility_logs', 'document_status')
ORDER BY tablename, indexname;

-- ============================================
-- 6. CHECK TRIGGERS
-- ============================================

SELECT 
  trigger_name,
  event_manipulation,
  event_object_table,
  action_statement
FROM information_schema.triggers
WHERE event_object_schema = 'public'
  AND event_object_table IN ('user_profiles', 'document_status')
ORDER BY event_object_table, trigger_name;

-- ============================================
-- 7. SAMPLE DATA QUERIES (After users register)
-- ============================================

-- View all user profiles (only works if you're authenticated as that user)
-- SELECT * FROM user_profiles;

-- View all eligibility logs (only works if you're authenticated as that user)
-- SELECT 
--   scheme_name,
--   is_eligible,
--   confidence_score,
--   created_at
-- FROM eligibility_logs
-- ORDER BY created_at DESC
-- LIMIT 10;

-- View document status (only works if you're authenticated as that user)
-- SELECT * FROM document_status;

-- ============================================
-- 8. STATISTICS QUERIES
-- ============================================

-- Count total users with profiles
-- SELECT COUNT(*) as total_profiles FROM user_profiles;

-- Count total eligibility checks
-- SELECT COUNT(*) as total_checks FROM eligibility_logs;

-- Count eligible vs not eligible
-- SELECT 
--   is_eligible,
--   COUNT(*) as count
-- FROM eligibility_logs
-- GROUP BY is_eligible;

-- Average confidence score
-- SELECT 
--   AVG(confidence_score) as avg_confidence,
--   MIN(confidence_score) as min_confidence,
--   MAX(confidence_score) as max_confidence
-- FROM eligibility_logs;

-- ============================================
-- 9. CLEANUP QUERIES (Use with caution!)
-- ============================================

-- WARNING: These will delete all data! Only use for testing/resetting.

-- Delete all eligibility logs
-- DELETE FROM eligibility_logs;

-- Delete all document status
-- DELETE FROM document_status;

-- Delete all user profiles (users will still exist in auth.users)
-- DELETE FROM user_profiles;

-- ============================================
-- END OF TEST QUERIES
-- ============================================

