// Vercel serverless function backing the portfolio chatbot's "get in touch"
// flow. Sends the visitor's details straight to an email inbox via Resend —
// no database, so there's nothing else to manage or secure.
//
// Requires two environment variables set in the Vercel project:
//   RESEND_API_KEY   - from resend.com (free tier covers this easily)
//   CONTACT_EMAIL_TO - the inbox that should receive submissions
//
// Deliberately not hardcoding an email address here: which inbox receives
// these is a deploy-time configuration choice, not something to bake into
// source that anyone can read on GitHub.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'method not allowed' })
  }

  const { name, email, message, reason, company } = req.body ?? {}

  // Honeypot: a real visitor never fills this hidden field. A bot that
  // fills every field it finds does. Pretend success either way so the
  // bot doesn't learn anything, but skip the actual send.
  if (company) {
    return res.status(200).json({ ok: true })
  }

  if (typeof name !== 'string' || !name.trim() || name.length > 200) {
    return res.status(400).json({ error: 'name is required' })
  }
  if (typeof email !== 'string' || !EMAIL_RE.test(email) || email.length > 320) {
    return res.status(400).json({ error: 'a valid email is required' })
  }
  if (typeof message !== 'string' || !message.trim() || message.length > 4000) {
    return res.status(400).json({ error: 'message is required (max 4000 characters)' })
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_EMAIL_TO
  if (!apiKey || !to) {
    console.error('contact endpoint misconfigured: RESEND_API_KEY or CONTACT_EMAIL_TO missing')
    return res.status(500).json({ error: 'contact form is not configured yet' })
  }

  const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

  try {
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio Chatbot <onboarding@resend.dev>',
        to: [to],
        reply_to: email,
        subject: `Portfolio contact: ${name}${reason ? ` (${reason})` : ''}`,
        html: `
          <p><strong>Name:</strong> ${escape(name)}</p>
          <p><strong>Email:</strong> ${escape(email)}</p>
          ${reason ? `<p><strong>Reason:</strong> ${escape(String(reason))}</p>` : ''}
          <p><strong>Message:</strong></p>
          <p>${escape(message).replace(/\n/g, '<br>')}</p>
        `,
      }),
    })

    if (!resendRes.ok) {
      const body = await resendRes.text()
      console.error('resend send failed', resendRes.status, body)
      return res.status(502).json({ error: 'failed to send message' })
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('contact endpoint error', err)
    return res.status(500).json({ error: 'unexpected error sending message' })
  }
}
