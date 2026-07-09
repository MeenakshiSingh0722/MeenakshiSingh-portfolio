/*
# Fix contact_submissions admin SELECT policy

Allow authenticated users (the admin) to read all submissions.
Since only the admin authenticates via Google OAuth on this portfolio,
this effectively restricts reads to the portfolio owner.

Also allow authenticated users to update the `read` flag.
*/

DROP POLICY IF EXISTS "no_public_select" ON contact_submissions;
CREATE POLICY "admin_select_contact" ON contact_submissions FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "admin_update_contact" ON contact_submissions;
CREATE POLICY "admin_update_contact" ON contact_submissions FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);
