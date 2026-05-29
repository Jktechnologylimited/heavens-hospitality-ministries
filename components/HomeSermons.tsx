'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Sermon {
  id: number;
  title: string;
  speaker: string;
  description: string;
  series: string;
  scripture: string;
  duration: string;
  video_url: string;
  published_at: string;
}

export default function HomeSermons() {
  const [sermons, setSermons] = useState<Sermon[]>([]);

  useEffect(() => {
    fetch('/api/sermons?limit=3')
      .then(r => r.json())
      .then(d => setSermons(d.sermons || []))
      .catch(() => {});
  }, []);

  const placeholders: Sermon[] = [
    { id: 0, title: 'The Table That Never Runs Empty', speaker: "Heaven's Hospitality Ministries", description: 'Discover how God\'s provision never ceases — the table of grace is always full, always ready, always welcoming every soul that comes.', series: 'The Feast of Grace', scripture: 'John 6:35', duration: '45 min', video_url: '', published_at: new Date().toISOString() },
    { id: 0, title: 'Welcome Home: The Prodigal Father', speaker: "Heaven's Hospitality Ministries", description: 'The parable of the Prodigal Son reveals the extravagant hospitality of our Heavenly Father — and how we are called to reflect that same welcome to others.', series: 'Kingdom Parables', scripture: 'Luke 15:11-32', duration: '52 min', video_url: '', published_at: new Date().toISOString() },
    { id: 0, title: 'Set Apart for Greatness', speaker: "Heaven's Hospitality Ministries", description: 'God has not forgotten you. In your wilderness, in your waiting — He is preparing you for a purpose greater than you can imagine.', series: 'Prepared for Purpose', scripture: 'Jeremiah 29:11', duration: '38 min', video_url: '', published_at: new Date().toISOString() },
  ];

  const items = sermons.length > 0 ? sermons : placeholders;

  return (
    <section style={{ background: 'var(--cream)', padding: '100px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className="section-label" style={{ marginBottom: 16 }}>✦ The Word ✦</div>
          <div style={{ width: 60, height: 1, background: 'linear-gradient(90deg, transparent, var(--gold), transparent)', margin: '0 auto 24px' }} />
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(36px, 5vw, 56px)', color: 'var(--deep-brown)', marginBottom: 16 }}>
            Sermons & <span className="gold-text">Teachings</span>
          </h2>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 20, color: 'var(--text-light)', maxWidth: 560, margin: '0 auto' }}>
            Anointed messages that ignite faith, restore hope, and transform lives.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 28 }}>
          {items.map((s, i) => (
            <div key={i} className="card-ministry">
              {/* Sermon thumbnail placeholder */}
              <div style={{ background: `linear-gradient(135deg, var(--deep-brown) 0%, var(--mid-brown) 50%, var(--warm-brown) 100%)`, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(212,175,55,0.15), transparent)' }} />
                {s.video_url ? (
                  <div style={{ width: 56, height: 56, background: 'rgba(212,175,55,0.9)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: 'var(--deep-brown)', paddingLeft: 4 }}>▶</div>
                ) : (
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 40, marginBottom: 8 }}>🎙️</div>
                    <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, letterSpacing: 2, color: 'rgba(212,175,55,0.6)', textTransform: 'uppercase' }}>Sermon</div>
                  </div>
                )}
                {s.series && (
                  <div style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(212,175,55,0.9)', color: 'var(--deep-brown)', fontFamily: 'Montserrat, sans-serif', fontSize: 9, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', padding: '4px 10px', borderRadius: 2 }}>
                    {s.series}
                  </div>
                )}
                {s.duration && (
                  <div style={{ position: 'absolute', bottom: 12, right: 12, background: 'rgba(0,0,0,0.6)', color: 'white', fontFamily: 'Montserrat, sans-serif', fontSize: 10, padding: '3px 8px', borderRadius: 2 }}>
                    {s.duration}
                  </div>
                )}
              </div>
              <div style={{ padding: '24px' }}>
                {s.scripture && <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, color: 'var(--gold)', letterSpacing: 1.5, marginBottom: 10, textTransform: 'uppercase' }}>📖 {s.scripture}</div>}
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, marginBottom: 10, lineHeight: 1.3, color: 'var(--deep-brown)' }}>{s.title}</h3>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 16, color: 'var(--text-light)', lineHeight: 1.7, marginBottom: 16 }}>
                  {s.description?.slice(0, 120)}…
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(212,175,55,0.1)', paddingTop: 14 }}>
                  <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 11, color: 'var(--text-light)' }}>{s.speaker}</span>
                  {s.id ? (
                    <Link href={`/sermons/${s.id}`} style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, letterSpacing: 2, color: 'var(--gold)', textTransform: 'uppercase' }}>Listen →</Link>
                  ) : (
                    <Link href="/sermons" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, letterSpacing: 2, color: 'var(--gold)', textTransform: 'uppercase' }}>Listen →</Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <Link href="/sermons" className="btn-primary">View All Sermons</Link>
        </div>
      </div>
    </section>
  );
}
