import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function POST(req: NextRequest) {
  const { reference } = await req.json();
  if (!reference) return NextResponse.json({ error: 'Reference required' }, { status: 400 });

  try {
    const res = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
    });
    const data = await res.json();

    if (data.data?.status === 'success') {
      const d = data.data;
      await sql`
        UPDATE offerings SET
          status = 'success',
          paystack_ref = ${d.reference},
          channel = ${d.channel},
          paid_at = ${d.paid_at},
          amount = ${d.amount / 100},
          donor_name = COALESCE(${d.customer?.first_name ? d.customer.first_name + ' ' + (d.customer.last_name||'') : null}, donor_name),
          donor_email = COALESCE(${d.customer?.email||null}, donor_email)
        WHERE reference = ${reference}
      `;
      return NextResponse.json({ success: true, amount: d.amount / 100, currency: d.currency });
    } else {
      await sql`UPDATE offerings SET status='failed' WHERE reference=${reference}`;
      return NextResponse.json({ success: false });
    }
  } catch (e) {
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
  }
}
