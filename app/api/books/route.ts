import { NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function GET() {
  try {
    const books = await sql`
      SELECT id, title, slug, author, description, cover_url, cover_image,
             download_url, is_featured, is_published, sort_order, created_at
      FROM books WHERE is_published = true
      ORDER BY is_featured DESC, sort_order ASC, created_at DESC
    `;
    return NextResponse.json({ books });
  } catch {
    return NextResponse.json({ books: [] });
  }
}
