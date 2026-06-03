import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';
import { sendContactNotification } from '@/lib/resend';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message required' }, { status: 400 });
    }

    await sql`
      INSERT INTO contact_messages (name, email, subject, message)
      VALUES (${name}, ${email}, ${subject || 'General Inquiry'}, ${message})
    `;

    try {
      await sendContactNotification({ name, email, subject: subject || 'General Inquiry', message });
    } catch (emailError) {
      console.error('Email notification error:', emailError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const messages = await sql`SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 50`;
    return NextResponse.json(messages);
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
