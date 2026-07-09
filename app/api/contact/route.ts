import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      // Silently succeed — email not configured, Supabase already stored the message
      return NextResponse.json({ ok: true, skipped: true });
    }

    const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;background:#0d1117;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d1117;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#161b22;border-radius:16px;border:1px solid #30363d;overflow:hidden;">
        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#0d9488,#06b6d4);padding:28px 32px;">
            <p style="margin:0;color:#fff;font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;opacity:0.8;">Portfolio</p>
            <h1 style="margin:6px 0 0;color:#fff;font-size:22px;font-weight:700;">New Contact Message</h1>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:32px;">
            <!-- Sender info -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d1117;border-radius:12px;border:1px solid #30363d;margin-bottom:20px;">
              <tr>
                <td style="padding:20px 24px;">
                  <p style="margin:0 0 12px;color:#8b949e;font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;">From</p>
                  <p style="margin:0 0 4px;color:#e6edf3;font-size:17px;font-weight:600;">${name}</p>
                  <a href="mailto:${email}" style="color:#2dd4bf;font-size:13px;text-decoration:none;">${email}</a>
                </td>
              </tr>
            </table>
            <!-- Message -->
            <p style="margin:0 0 10px;color:#8b949e;font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;">Message</p>
            <div style="background:#0d1117;border-radius:12px;border:1px solid #30363d;padding:20px 24px;margin-bottom:24px;">
              <p style="margin:0;color:#c9d1d9;font-size:15px;line-height:1.7;white-space:pre-wrap;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
            </div>
            <!-- CTA -->
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td style="background:#0d9488;border-radius:10px;padding:12px 24px;">
                  <a href="mailto:${email}?subject=Re: Your message on my portfolio" style="color:#fff;font-size:13px;font-weight:600;text-decoration:none;">Reply to ${name}</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding:16px 32px 24px;border-top:1px solid #30363d;">
            <p style="margin:0;color:#484f58;font-size:11px;">Sent from your portfolio contact form · meenakshi-portfolio.vercel.app</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio <onboarding@resend.dev>',
        to: ['meenakshisingh0722@gmail.com'],
        reply_to: email,
        subject: `[Portfolio] New message from ${name}`,
        html,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error('Resend error:', res.status, body);
      return NextResponse.json({ ok: false, error: 'Email delivery failed' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Contact route error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
