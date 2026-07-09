/*
# Restrict contact_submissions admin access to the portfolio owner only

The previous migration allowed ANY authenticated user to read and update
contact submissions. Since the anon key is public in the client bundle,
this meant anyone who signed in with their own Google account could read
every visitor's message via a direct Supabase query.

This migration restricts SELECT and UPDATE to the owner's email only,
checked against the JWT issued by Supabase Auth.
*/

DROP POLICY IF EXISTS "admin_select_contact" ON contact_submissions;
CREATE POLICY "admin_select_contact" ON contact_submissions FOR SELECT
  TO authenticated
  USING ((auth.jwt() ->> 'email') = 'meenakshisingh0722@gmail.com');

DROP POLICY IF EXISTS "admin_update_contact" ON contact_submissions;
CREATE POLICY "admin_update_contact" ON contact_submissions FOR UPDATE
  TO authenticated
  USING ((auth.jwt() ->> 'email') = 'meenakshisingh0722@gmail.com')
  WITH CHECK ((auth.jwt() ->> 'email') = 'meenakshisingh0722@gmail.com');
