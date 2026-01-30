-- ============================================
-- SchemeLight Platform - Saved Schemes Table
-- ============================================

CREATE TABLE IF NOT EXISTS saved_schemes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  scheme_id TEXT NOT NULL,
  scheme_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  
  -- Prevent duplicate saves of the same scheme by the same user
  UNIQUE(user_id, scheme_id)
);

-- Enable RLS
ALTER TABLE saved_schemes ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own saved schemes"
  ON saved_schemes FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own saved schemes"
  ON saved_schemes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own saved schemes"
  ON saved_schemes FOR DELETE
  USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_saved_schemes_user_id ON saved_schemes(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_schemes_scheme_id ON saved_schemes(scheme_id);
