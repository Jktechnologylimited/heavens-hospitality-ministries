import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const result = await sql`
      SELECT id, title, slug, author, description, cover_url, cover_image,
             download_url, is_featured, is_published, sort_order, created_at
      FROM books WHERE slug = ${slug} AND is_published = true
    `;
    if (!result[0]) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ book: result[0] });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
