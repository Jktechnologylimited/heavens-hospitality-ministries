'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Devotion {
  id: number;
  title: string;
  scripture: string;
  content: string;
  author: string;
  published_at: string;
}

export default function HomeDevotions() {
  const [devotions, setDevotions] = useState<Devotion[]>([]);

  useEffect(() => {
    fetch('/api/devotions?limit=3')
      .then(r => r.json())
      .then(d => setDevotions(d.devotions || []))
      .catch(() => {});
  }, []);

  const placeholders: Devotion[] = [
    { id: 0, title: 'The Welcome of the Father', scripture: 'Luke 15:20', content: 'When God sees us returning to Him, He runs to meet us. His hospitality is not polite — it is passionate, relentless, and full of joy. You are always welcome at His table.', author: "Heaven's Hospitality Ministries", published_at: new Date().toISOString() },
    { id: 0, title: 'Set a Place at the Table', scripture: 'Psalm 23:5', content: "God prepares a table for us in the presence of our enemies. Even in our darkest moments, His hospitality doesn't fail. The table is set. The feast is ready.", author: "Heaven's Hospitality Ministries", published_at: new Date().toISOString() },
    { id: 0, title: 'Entertaining Angels', scripture: 'Hebrews 13:2', content: 'We are called to welcome strangers as though welcoming angels. In every act of hospitality, we may be reflecting the face of Christ to someone who has never seen it before.', author: "Heaven's Hospitality Ministries", published_at: new Date().toISOString() },
  ];

  const items = devotions.length > 0 ? devotions : placeholders;

  return (
    <section style={{ background: 'var(--deep-brown)', padding: '100px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className="section-label" style={{ marginBottom: 16 }}>✦ Daily Bread ✦</div>
          <div style={{ width: 60, height: 1, background: 'linear-gradient(90deg, transparent, #d4af37, transparent)', margin: '0 auto 24px' }} />
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(36px, 5vw, 56px)', color: 'white', marginBottom: 16 }}>
            Daily <span className="gold-text">Devotions</span>
          </h2>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 20, color: 'rgba(255,255,255,0.65)', maxWidth: 560, margin: '0 auto' }}>
            Nourish your soul each day with Spirit-filled reflections grounded in Scripture.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {items.map((d, i) => (
            <div key={i} className="card-ministry" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(212,175,55,0.15)', color: 'white' }}>
              <div style={{ padding: '32px 28px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, letterSpacing: 2, color: '#d4af37', textTransform: 'uppercase', background: 'rgba(212,175,55,0.1)', padding: '4px 10px', borderRadius: 2 }}>
                    {new Date(d.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                  <span style={{ color: 'rgba(212,175,55,0.6)', fontSize: 20 }}>✝</span>
                </div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, marginBottom: 10, color: 'white', lineHeight: 1.3 }}>{d.title}</h3>
                <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 11, color: '#d4af37', letterSpacing: 1, marginBottom: 16 }}>📖 {d.scripture}</div>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 17, color: 'rgba(255,255,255,0.72)', lineHeight: 1.8 }}>
                  {d.content.replace(/<[^>]+>/g, '').slice(0, 160)}…
                </p>
              </div>
              <div style={{ borderTop: '1px solid rgba(212,175,55,0.1)', padding: '16px 28px' }}>
                {d.id ? (
                  <Link href={`/devotions/${d.id}`} style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 11, letterSpacing: 2, color: '#d4af37', textTransform: 'uppercase' }}>
                    Read More →
                  </Link>
                ) : (
                  <Link href="/devotions" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 11, letterSpacing: 2, color: '#d4af37', textTransform: 'uppercase' }}>
                    Read More →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <Link href="/devotions" className="btn-outline">
            View All Devotions
          </Link>
        </div>
      </div>

      <style>{`@media(max-width:768px){section>div>div:nth-child(2){grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}
