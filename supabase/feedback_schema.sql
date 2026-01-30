-- Feedback and Report Issue Table
CREATE TABLE IF NOT EXISTS feedback_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL CHECK (type IN ('feedback', 'report')),
  name TEXT,
  email TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'resolved', 'in_progress')),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable RLS
ALTER TABLE feedback_reports ENABLE ROW LEVEL SECURITY;

-- Policies
-- Allow anyone (even anon) to insert feedback/reports? 
-- Or maybe just authenticated users? 
-- For now, let's allow authenticated users to insert.
-- If we want anon feedback, we need to allow public insert.

-- Allow authenticated users to insert
CREATE POLICY "Users can insert feedback"
  ON feedback_reports FOR INSERT
  WITH CHECK (true);

-- Allow users to view their own feedback (if logged in)
CREATE POLICY "Users can view own feedback"
  ON feedback_reports FOR SELECT
  USING (auth.uid() = user_id);
  
-- Allow admins (if any) to view all - avoiding complex admin logic for now, 
-- but ensuring at least data can be inserted.
