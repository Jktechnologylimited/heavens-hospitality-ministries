'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Sermon { id: number; title: string; speaker: string; description: string; series: string; scripture: string; duration: string; video_url: string; published_at: string; }

const placeholders: Sermon[] = [
  { id: 0, title: 'The Table That Never Runs Empty', speaker: "Heaven's Hospitality Ministries", description: "Discover how God's provision never ceases — the table of grace is always full, always ready, always welcoming every soul that comes.", series: 'The Feast of Grace', scripture: 'John 6:35', duration: '45 min', video_url: '', published_at: new Date().toISOString() },
  { id: 0, title: 'Welcome Home: The Prodigal Father', speaker: "Heaven's Hospitality Ministries", description: 'The parable of the Prodigal Son reveals the extravagant hospitality of our Heavenly Father — and how we are called to reflect that same welcome to others.', series: 'Kingdom Parables', scripture: 'Luke 15:11-32', duration: '52 min', video_url: '', published_at: new Date().toISOString() },
  { id: 0, title: 'Set Apart for Greatness', speaker: "Heaven's Hospitality Ministries", description: 'God has not forgotten you. In your wilderness, in your waiting — He is preparing you for a purpose greater than you can imagine.', series: 'Prepared for Purpose', scripture: 'Jeremiah 29:11', duration: '38 min', video_url: '', published_at: new Date().toISOString() },
];

export default function HomeSermons() {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  useEffect(() => { fetch('/api/sermons?limit=3').then(r => r.json()).then(d => setSermons(d.sermons || [])).catch(() => {}); }, []);
  const items = sermons.length > 0 ? sermons : placeholders;

  return (
    <section style={{ background: 'var(--off-white)', padding: 'clamp(64px, 10vw, 100px) clamp(16px, 5vw, 24px)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 7vw, 64px)' }}>
          <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 16 }}>The Word</div>
          <div style={{ width: 60, height: 1, background: 'linear-gradient(90deg,transparent,var(--orange),transparent)', margin: '0 auto 24px' }} />
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(32px, 6vw, 56px)', color: 'var(--navy)', marginBottom: 16 }}>
            Sermons & <span style={{ background: 'linear-gradient(135deg,var(--orange),var(--orange),var(--orange-light),var(--orange))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Teachings</span>
          </h2>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 'clamp(16px, 2.5vw, 20px)', color: 'var(--text-light)', maxWidth: 560, margin: '0 auto' }}>
            Anointed messages that ignite faith, restore hope, and transform lives.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 'clamp(16px, 3vw, 28px)' }}>
          {items.map((s, i) => (
            <div key={i} className="card-ministry" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ background: 'linear-gradient(135deg,var(--navy),var(--navy-light))', height: 'clamp(140px, 25vw, 180px)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center,rgba(232,76,14,0.15),transparent)' }} />
                <div style={{ width: 56, height: 56, background: 'rgba(232,76,14,0.85)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: 'var(--navy)', paddingLeft: 4 }}></div>
                {s.series && <div style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(232,76,14,0.9)', color: 'var(--navy)', fontFamily: 'Montserrat,sans-serif', fontSize: 9, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', padding: '4px 10px', borderRadius: 2, maxWidth: 'calc(100% - 24px)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.series}</div>}
                {s.duration && <div style={{ position: 'absolute', bottom: 12, right: 12, background: 'rgba(0,0,0,0.6)', color: 'white', fontFamily: 'Montserrat,sans-serif', fontSize: 10, padding: '3px 8px', borderRadius: 2 }}>{s.duration}</div>}
              </div>
              <div style={{ padding: 'clamp(16px, 3vw, 24px)', flex: 1 }}>
                {s.scripture && <div style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 10, color: 'var(--orange)', letterSpacing: 1.5, marginBottom: 10, textTransform: 'uppercase' }}> {s.scripture}</div>}
                <h3 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(16px, 2.5vw, 20px)', marginBottom: 10, lineHeight: 1.3, color: 'var(--navy)' }}>{s.title}</h3>
                <p style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(14px, 2vw, 16px)', color: 'var(--text-light)', lineHeight: 1.7 }}>{s.description?.slice(0, 120)}…</p>
              </div>
              <div style={{ padding: 'clamp(12px, 2vw, 14px) clamp(16px, 3vw, 24px)', borderTop: '1px solid rgba(232,76,14,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 11, color: 'var(--text-light)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '60%' }}>{s.speaker}</span>
                {s.id ? (
                  <Link href={`/sermons/${s.id}`} style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 10, letterSpacing: 2, color: 'var(--orange)', textTransform: 'uppercase', flexShrink: 0 }}>Listen →</Link>
                ) : (
                  <Link href="/sermons" style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 10, letterSpacing: 2, color: 'var(--orange)', textTransform: 'uppercase', flexShrink: 0 }}>Listen →</Link>
                )}
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 'clamp(32px, 6vw, 48px)' }}>
          <Link href="/sermons" className="btn-primary">View All Sermons</Link>
        </div>
      </div>
    </section>
  );
}
