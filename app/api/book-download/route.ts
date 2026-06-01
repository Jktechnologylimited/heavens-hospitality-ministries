import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';
import { sendWelcomeEmail } from '@/lib/resend';

export async function POST(req: NextRequest) {
  const { name, email, phone } = await req.json();

  // Save subscriber if email provided (all optional)
  if (email) {
    try {
      const existing = await sql`SELECT id FROM newsletter_subscribers WHERE email = ${email}`;
      if (existing.length === 0) {
        await sql`INSERT INTO newsletter_subscribers (email, name) VALUES (${email}, ${name || ''})`;
        try { await sendWelcomeEmail(email, name || 'Friend'); } catch {}
      }
    } catch (e) {
      console.error('Subscriber error:', e);
    }
  }

  // Always return the hardcoded PDF path — it lives in /public/book/
  return NextResponse.json({
    success: true,
    downloadUrl: '/book/in-the-fullness-of-his-blessings.pdf',
  });
}
