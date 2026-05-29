'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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

export default function SermonsPage() {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const PER_PAGE = 9;

  useEffect(() => {
    setLoading(true);
    fetch(`/api/sermons?limit=${PER_PAGE}&offset=${page * PER_PAGE}`)
      .then(r => r.json())
      .then(d => { setSermons(d.sermons || []); setTotal(d.total || 0); })
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <>
      <Navbar />
      <main>
        <div style={{ background: 'linear-gradient(160deg, var(--deep-brown), var(--mid-brown))', padding: '140px 24px 80px', textAlign: 'center' }}>
          <div className="section-label" style={{ marginBottom: 16 }}>✦ The Word ✦</div>
          <div style={{ width: 60, height: 1, background: 'linear-gradient(90deg, transparent, #d4af37, transparent)', margin: '0 auto 24px' }} />
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(42px, 6vw, 72px)', color: 'white', marginBottom: 20 }}>
            Sermons & <span className="gold-text">Teachings</span>
          </h1>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 22, color: 'rgba(255,255,255,0.7)', maxWidth: 600, margin: '0 auto' }}>
            Anointed messages to ignite your faith, restore your hope, and transform your life.
          </p>
        </div>

        <div style={{ background: 'var(--cream)', padding: '80px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-light)', fontFamily: 'Cormorant Garamond, serif', fontSize: 20, fontStyle: 'italic' }}>Loading sermons…</div>
            ) : sermons.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 0' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🎙️</div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, color: 'var(--deep-brown)', marginBottom: 12 }}>Coming Soon</h3>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 18, color: 'var(--text-light)', fontStyle: 'italic' }}>Sermons will be posted here soon. Subscribe to be notified!</p>
                <Link href="/#newsletter" className="btn-primary" style={{ marginTop: 24, display: 'inline-block' }}>Subscribe</Link>
              </div>
            ) : (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 28 }}>
                  {sermons.map(s => (
                    <Link key={s.id} href={`/sermons/${s.id}`} style={{ textDecoration: 'none' }}>
                      <div className="card-ministry" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ background: 'linear-gradient(135deg, var(--deep-brown), var(--warm-brown))', height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(212,175,55,0.15), transparent)' }} />
                          <div style={{ width: 56, height: 56, background: 'rgba(212,175,55,0.85)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: 'var(--deep-brown)', paddingLeft: 4 }}>▶</div>
                          {s.series && <div style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(212,175,55,0.9)', color: 'var(--deep-brown)', fontFamily: 'Montserrat, sans-serif', fontSize: 9, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', padding: '4px 10px', borderRadius: 2 }}>{s.series}</div>}
                          {s.duration && <div style={{ position: 'absolute', bottom: 12, right: 12, background: 'rgba(0,0,0,0.6)', color: 'white', fontFamily: 'Montserrat, sans-serif', fontSize: 10, padding: '3px 8px', borderRadius: 2 }}>{s.duration}</div>}
                        </div>
                        <div style={{ padding: '24px', flex: 1 }}>
                          {s.scripture && <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, color: 'var(--gold)', letterSpacing: 1.5, marginBottom: 10, textTransform: 'uppercase' }}>📖 {s.scripture}</div>}
                          <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, marginBottom: 10, lineHeight: 1.3, color: 'var(--deep-brown)' }}>{s.title}</h3>
                          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 16, color: 'var(--text-light)', lineHeight: 1.7 }}>{s.description?.slice(0, 120)}…</p>
                        </div>
                        <div style={{ padding: '14px 24px', borderTop: '1px solid rgba(212,175,55,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 11, color: 'var(--text-light)' }}>{s.speaker}</span>
                          <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, letterSpacing: 2, color: 'var(--gold)', textTransform: 'uppercase' }}>Listen →</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                {total > PER_PAGE && (
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 48 }}>
                    <button onClick={() => setPage(p => Math.max(0, p-1))} disabled={page===0} className="btn-outline" style={{ padding:'10px 24px', opacity: page===0?0.4:1 }}>← Previous</button>
                    <span style={{ fontFamily:'Montserrat,sans-serif', fontSize:12, color:'var(--text-light)', display:'flex', alignItems:'center', padding:'0 16px' }}>Page {page+1} of {Math.ceil(total/PER_PAGE)}</span>
                    <button onClick={() => setPage(p=>p+1)} disabled={(page+1)*PER_PAGE>=total} className="btn-outline" style={{ padding:'10px 24px', opacity:(page+1)*PER_PAGE>=total?0.4:1 }}>Next →</button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
