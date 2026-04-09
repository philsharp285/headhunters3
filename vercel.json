/*
  # Hiring Pack Leads Tracking

  1. New Tables
    - `hiring_pack_leads`
      - `id` (uuid, primary key)
      - `name` (text, required) - Lead's full name
      - `email` (text, required) - Lead's email address
      - `role` (text, required) - Which role pack they downloaded (e.g., 'ceo', 'cfo', 'md')
      - `role_title` (text, required) - Human-readable role title
      - `created_at` (timestamptz) - When the lead was captured
      - `ip_address` (text) - Optional IP for fraud detection
      - `user_agent` (text) - Optional user agent for analytics

  2. Security
    - Enable RLS on `hiring_pack_leads` table
    - Allow anonymous inserts (for the form submission)
    - Only authenticated admin users can read leads (future enhancement)

  3. Indexes
    - Index on email for quick lookup
    - Index on created_at for reporting
    - Index on role for analytics
*/

CREATE TABLE IF NOT EXISTS hiring_pack_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  role text NOT NULL,
  role_title text NOT NULL,
  created_at timestamptz DEFAULT now(),
  ip_address text,
  user_agent text
);

ALTER TABLE hiring_pack_leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert leads (form submission)
CREATE POLICY "Allow anonymous lead submission"
  ON hiring_pack_leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- For future: allow authenticated admins to view leads
CREATE POLICY "Allow authenticated users to view leads"
  ON hiring_pack_leads
  FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_hiring_pack_leads_email ON hiring_pack_leads(email);
CREATE INDEX IF NOT EXISTS idx_hiring_pack_leads_created_at ON hiring_pack_leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_hiring_pack_leads_role ON hiring_pack_leads(role);