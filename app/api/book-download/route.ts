import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';
import { sendWelcomeEmail } from '@/lib/resend';

export async function POST(req: NextRequest) {
  const { name, email, phone } = await req.json();

  // All fields optional — book is free
  if (email) {
    try {
      const existing = await sql`SELECT id FROM newsletter_subscribers WHERE email = ${email}`;
      if (existing.length === 0) {
        await sql`INSERT INTO newsletter_subscribers (email, name) VALUES (${email}, ${name || ''})`;
        await sendWelcomeEmail(email, name || 'Friend');
      }
    } catch (e) {
      console.error('Subscriber error:', e);
    }
  }

  return NextResponse.json({
    success: true,
    // Replace with real download URL once book file is uploaded
    downloadUrl: process.env.BOOK_DOWNLOAD_URL || '/book/download-placeholder',
  });
}
