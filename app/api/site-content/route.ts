import { NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function GET() {
  try {
    const rows = await sql`SELECT * FROM site_content`;
    const content: Record<string, string> = {};
    rows.forEach((r: any) => { content[r.key] = r.value; });
    return NextResponse.json({ content });
  } catch {
    return NextResponse.json({ content: {} });
  }
}
