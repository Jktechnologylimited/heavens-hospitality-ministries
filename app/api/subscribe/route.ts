import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';
import { sendWelcomeEmail } from '@/lib/resend';

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json();
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

    const existing = await sql`SELECT id FROM subscribers WHERE email = ${email}`;
    if (existing.length > 0) {
      return NextResponse.json({ message: 'Already subscribed' });
    }

    await sql`INSERT INTO subscribers (email, name) VALUES (${email}, ${name || null})`;
    
    try {
      await sendWelcomeEmail(email, name);
    } catch (emailError) {
      console.error('Email send error:', emailError);
    }

    return NextResponse.json({ success: true, message: 'Subscribed successfully' });
  } catch (error) {
    console.error('Subscribe error:', error);
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const subscribers = await sql`SELECT id, email, name, subscribed_at FROM subscribers WHERE active = true ORDER BY subscribed_at DESC`;
    return NextResponse.json(subscribers);
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
