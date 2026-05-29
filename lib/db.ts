import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export default sql;

export async function initDB() {
  await sql`
    CREATE TABLE IF NOT EXISTS devotions (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      scripture VARCHAR(500),
      content TEXT NOT NULL,
      author VARCHAR(255) DEFAULT 'Heaven''s Hospitality Ministries',
      published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      is_published BOOLEAN DEFAULT true,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS sermons (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      speaker VARCHAR(255) NOT NULL,
      description TEXT,
      content TEXT,
      video_url VARCHAR(500),
      audio_url VARCHAR(500),
      thumbnail_url VARCHAR(500),
      series VARCHAR(255),
      scripture VARCHAR(500),
      duration VARCHAR(50),
      is_published BOOLEAN DEFAULT true,
      published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS newsletter_subscribers (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      name VARCHAR(255),
      subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      is_active BOOLEAN DEFAULT true
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS prayer_requests (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255),
      request TEXT NOT NULL,
      is_anonymous BOOLEAN DEFAULT false,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `;
}
