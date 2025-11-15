/*
  # Create Sites Table for LingoSite SaaS

  ## Overview
  This migration creates the core database schema for managing multilingual website projects
  in the LingoSite platform. Users can create multiple sites, each with their own language
  configurations and deployment status.

  ## New Tables
  
  ### `sites`
  Stores information about user-created multilingual websites
  
  - `id` (uuid, primary key): Unique identifier for each site
  - `name` (text): Display name of the site/project
  - `domain` (text): Custom domain or subdomain for the site
  - `languages` (jsonb): Array of active language codes (e.g., ["en", "es", "fr"])
  - `default_language` (text): Primary language for the site
  - `deployment_status` (text): Current deployment state (draft, deploying, live, failed)
  - `last_deployed_at` (timestamptz): Timestamp of most recent deployment
  - `created_at` (timestamptz): When the site was created
  - `updated_at` (timestamptz): Last modification timestamp
  - `user_id` (uuid): Reference to the site owner (for future auth integration)

  ## Security
  
  ### Row Level Security (RLS)
  - RLS is enabled on the sites table to ensure data isolation
  - Policies allow users to manage only their own sites
  - Public read access is disabled by default
  
  ### Policies
  - "Users can view own sites": SELECT policy restricting site visibility to owners
  - "Users can create own sites": INSERT policy allowing authenticated users to create sites
  - "Users can update own sites": UPDATE policy for modifying owned sites
  - "Users can delete own sites": DELETE policy for removing owned sites

  ## Indexes
  - Index on user_id for fast user-specific queries
  - Index on deployment_status for filtering by status
  
  ## Notes
  - The `languages` field uses JSONB for flexible language configuration
  - Default values ensure sites have valid initial states
  - Timestamps are automatically managed with default values and triggers
*/

CREATE TABLE IF NOT EXISTS sites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  domain text,
  languages jsonb DEFAULT '["en"]'::jsonb,
  default_language text DEFAULT 'en',
  deployment_status text DEFAULT 'draft',
  last_deployed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  user_id uuid
);

ALTER TABLE sites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own sites"
  ON sites
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create own sites"
  ON sites
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own sites"
  ON sites
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own sites"
  ON sites
  FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

CREATE INDEX IF NOT EXISTS idx_sites_user_id ON sites(user_id);
CREATE INDEX IF NOT EXISTS idx_sites_deployment_status ON sites(deployment_status);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_sites_updated_at'
  ) THEN
    CREATE TRIGGER update_sites_updated_at
      BEFORE UPDATE ON sites
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;
