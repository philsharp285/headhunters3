/*
  # Fix Security Issues on hiring_pack_leads

  1. Unused Indexes Removed
    - Drop `idx_hiring_pack_leads_email` (unused)
    - Drop `idx_hiring_pack_leads_created_at` (unused)
    - Drop `idx_hiring_pack_leads_role` (unused)

  2. RLS Policy Fix
    - Drop the `Allow anonymous lead submission` INSERT policy that uses `WITH CHECK (true)` (unrestricted)
    - Replace with a policy that validates required fields are non-empty, preventing blank/junk submissions

  3. Notes
    - The SELECT policy for authenticated users is left in place
    - Auth DB connection strategy (percentage-based) must be changed via the Supabase Dashboard under Project Settings > Database > Connection pooling — this cannot be done via SQL migration
*/

-- Remove unused indexes
DROP INDEX IF EXISTS idx_hiring_pack_leads_email;
DROP INDEX IF EXISTS idx_hiring_pack_leads_created_at;
DROP INDEX IF EXISTS idx_hiring_pack_leads_role;

-- Drop the overly permissive INSERT policy
DROP POLICY IF EXISTS "Allow anonymous lead submission" ON hiring_pack_leads;

-- Replace with a policy that enforces non-empty required fields
CREATE POLICY "Anon can insert valid leads"
  ON hiring_pack_leads
  FOR INSERT
  TO anon
  WITH CHECK (
    name IS NOT NULL AND length(trim(name)) > 0 AND
    email IS NOT NULL AND length(trim(email)) > 0 AND email LIKE '%@%' AND
    role IS NOT NULL AND length(trim(role)) > 0 AND
    role_title IS NOT NULL AND length(trim(role_title)) > 0
  );
