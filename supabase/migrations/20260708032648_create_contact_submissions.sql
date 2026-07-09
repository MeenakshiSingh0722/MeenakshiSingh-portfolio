/*
# Create contact_submissions table

1. New Tables
- `contact_submissions`
  - `id` (uuid, primary key, auto-generated)
  - `name` (text, not null) — sender's full name
  - `email` (text, not null) — sender's email address
  - `message` (text, not null) — the message body
  - `created_at` (timestamptz, default now()) — submission timestamp
  - `read` (boolean, default false) — admin read status

2. Security
- Enable RLS on `contact_submissions`.
- Public INSERT allowed (anyone can submit the contact form).
- Only authenticated admin reads are allowed via service role in API routes.
  For the admin dashboard, reads are handled server-side bypassing RLS via service role key.
  Public anon SELECT is disabled — submissions are private.

3. Notes
- The site is a public portfolio; no user accounts needed to submit.
- Admin reads contact submissions via a protected API route using the service role key.
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now(),
  read boolean NOT NULL DEFAULT false
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_contact" ON contact_submissions;
CREATE POLICY "public_insert_contact" ON contact_submissions FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "no_public_select" ON contact_submissions;
CREATE POLICY "no_public_select" ON contact_submissions FOR SELECT
  TO authenticated USING (false);
