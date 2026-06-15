import { NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function GET() {
  try {
    const books = await sql`
      SELECT * FROM books WHERE is_published = true
      ORDER BY is_featured DESC, sort_order ASC, created_at DESC
    `;
    return NextResponse.json({ books });
  } catch {
    return NextResponse.json({ books: [] });
  }
}
