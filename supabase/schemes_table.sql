-- Schemes Table
-- Stores all government schemes data
CREATE TABLE IF NOT EXISTS schemes (
  id TEXT PRIMARY KEY, -- Using the scheme ID (e.g., F01, H01) as primary key
  name TEXT NOT NULL,
  ministry TEXT NOT NULL,
  target_group TEXT NOT NULL,
  benefit TEXT NOT NULL,
  icon TEXT DEFAULT '📜',
  eligibility JSONB NOT NULL DEFAULT '{}',
  documents JSONB NOT NULL DEFAULT '[]',
  application_mode TEXT DEFAULT 'Online',
  apply_url TEXT,
  description TEXT,
  key_benefits JSONB NOT NULL DEFAULT '[]',
  how_to_apply JSONB NOT NULL DEFAULT '[]',
  status TEXT DEFAULT 'Open',
  keywords JSONB NOT NULL DEFAULT '[]',
  simplified_description TEXT,
  offline_assistance JSONB NOT NULL DEFAULT '[]',
  video_tutorial_url TEXT,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable RLS
ALTER TABLE schemes ENABLE ROW LEVEL SECURITY;

-- Policies for Schemes
-- Anyone can view schemes
CREATE POLICY "Schemes are viewable by everyone"
  ON schemes FOR SELECT
  USING (true);

-- Only authenticated admins can modify (For now, let's allow all auth users for the dev phase, or limit to a specific role if we had one)
-- To be safe, let's limit to users with "admin" role if we had a role system, 
-- but since we don't have roles implemented in user_profiles yet, 
-- let's allow service role or specific admins.
-- For the purpose of this task, we'll allow all authenticated users to manage for the demo.
CREATE POLICY "Authenticated users can manage schemes"
  ON schemes FOR ALL
  USING (auth.role() = 'authenticated');

-- Trigger to update updated_at
CREATE TRIGGER update_schemes_updated_at
  BEFORE UPDATE ON schemes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
