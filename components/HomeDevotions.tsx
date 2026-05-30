'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Devotion {
  id: number; title: string; scripture: string; content: string;
  author: string; published_at: string;
}

const PLACEHOLDERS: Devotion[] = [
  { id: 0, title: 'The Welcome of the Father', scripture: 'Luke 15:20',
    content: "When God sees us returning to Him, He runs to meet us. His hospitality is not polite — it is passionate, relentless, and full of joy. You are always welcome at His table.",
    author: "Heaven's Hospitality Ministries", published_at: new Date().toISOString() },
  { id: 0, title: 'Set a Place at the Table', scripture: 'Psalm 23:5',
    content: "God prepares a table for us in the presence of our enemies. Even in our darkest moments, His hospitality doesn't fail. The table is set. The feast is ready.",
    author: "Heaven's Hospitality Ministries", published_at: new Date().toISOString() },
  { id: 0, title: 'Entertaining Angels', scripture: 'Hebrews 13:2',
    content: "We are called to welcome strangers as though welcoming angels. In every act of hospitality, we may be reflecting the face of Christ to someone who has never seen it before.",
    author: "Heaven's Hospitality Ministries", published_at: new Date().toISOString() },
];

export default function HomeDevotions() {
  const [devotions, setDevotions] = useState<Devotion[]>([]);

  useEffect(() => {
    fetch('/api/devotions?limit=3').then(r => r.json())
      .then(d => { if (d.devotions?.length) setDevotions(d.devotions); })
      .catch(() => {});
  }, []);

  const items = devotions.length > 0 ? devotions : PLACEHOLDERS;

  return (
    <section style={{ background: 'var(--navy)', padding: 'clamp(56px, 10vw, 100px) clamp(20px, 5vw, 40px)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 7vw, 64px)' }}>
          <div className="section-label" style={{ marginBottom: 14 }}>Daily Devotions</div>
          <div style={{ width: 50, height: 1, background: 'linear-gradient(90deg, transparent, var(--orange), transparent)', margin: '0 auto 20px' }} />
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(30px, 7vw, 56px)', color: 'white', marginBottom: 14 }}>
            Daily <span style={{ background: 'linear-gradient(135deg,var(--orange),var(--orange),var(--orange-light),var(--orange))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Devotions</span>
          </h2>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 'clamp(16px, 2.5vw, 20px)', color: 'rgba(255,255,255,0.6)', maxWidth: 520, margin: '0 auto' }}>
            Nourish your soul each day with Spirit-filled reflections grounded in Scripture.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
          gap: 'clamp(16px, 3vw, 24px)',
        }}>
          {items.map((d, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(232,76,14,0.15)', borderRadius: 4, overflow: 'hidden', transition: 'all 0.3s ease' }}>
              <div style={{ padding: 'clamp(20px, 4vw, 28px)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                  <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 9, letterSpacing: 2, color: 'var(--orange)', textTransform: 'uppercase', background: 'rgba(232,76,14,0.1)', padding: '3px 9px', borderRadius: 2 }}>
                    {new Date(d.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                  <span style={{ color: 'rgba(232,76,14,0.5)', fontSize: 18 }}></span>
                </div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(18px, 3vw, 22px)', marginBottom: 8, color: 'white', lineHeight: 1.3 }}>{d.title}</h3>
                <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, color: 'var(--orange)', letterSpacing: 1, marginBottom: 14 }}> {d.scripture}</div>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(15px, 2.5vw, 17px)', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8 }}>
                  {d.content.replace(/<[^>]+>/g, '').slice(0, 155)}…
                </p>
              </div>
              <div style={{ borderTop: '1px solid rgba(232,76,14,0.1)', padding: '14px clamp(20px, 4vw, 28px)' }}>
                <Link href={d.id ? `/devotions/${d.id}` : '/devotions'} style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, letterSpacing: 2, color: 'var(--orange)', textTransform: 'uppercase' }}>
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 'clamp(32px, 5vw, 48px)' }}>
          <Link href="/devotions" className="btn-outline">View All Devotions</Link>
        </div>
      </div>
    </section>
  );
}
