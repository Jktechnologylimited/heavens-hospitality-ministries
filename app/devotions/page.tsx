'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Devotion {
  id: number;
  title: string;
  scripture: string;
  content: string;
  author: string;
  published_at: string;
}

export default function DevotionsPage() {
  const [devotions, setDevotions] = useState<Devotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const PER_PAGE = 9;

  useEffect(() => {
    setLoading(true);
    fetch(`/api/devotions?limit=${PER_PAGE}&offset=${page * PER_PAGE}`)
      .then(r => r.json())
      .then(d => { setDevotions(d.devotions || []); setTotal(d.total || 0); })
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <>
      <Navbar />
      <main>
        {/* Header */}
        <div style={{ background: 'linear-gradient(160deg, var(--deep-brown), var(--mid-brown))', padding: '140px 24px 80px', textAlign: 'center' }}>
          <div className="section-label" style={{ marginBottom: 16 }}>✦ Daily Bread ✦</div>
          <div style={{ width: 60, height: 1, background: 'linear-gradient(90deg, transparent, #d4af37, transparent)', margin: '0 auto 24px' }} />
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(42px, 6vw, 72px)', color: 'white', marginBottom: 20 }}>
            Daily <span className="gold-text">Devotions</span>
          </h1>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 22, color: 'rgba(255,255,255,0.7)', maxWidth: 600, margin: '0 auto' }}>
            Nourish your spirit each day with Spirit-filled reflections from Heaven's Hospitality Ministries.
          </p>
        </div>

        {/* Grid */}
        <div style={{ background: 'var(--cream)', padding: '80px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-light)', fontFamily: 'Cormorant Garamond, serif', fontSize: 20, fontStyle: 'italic' }}>
                Loading devotions…
              </div>
            ) : devotions.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 0' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>📖</div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, color: 'var(--deep-brown)', marginBottom: 12 }}>Coming Soon</h3>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 18, color: 'var(--text-light)', fontStyle: 'italic' }}>Daily devotions will be posted here. Subscribe to be notified!</p>
                <Link href="/#newsletter" className="btn-primary" style={{ marginTop: 24, display: 'inline-block' }}>Subscribe</Link>
              </div>
            ) : (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 28 }}>
                  {devotions.map(d => (
                    <Link key={d.id} href={`/devotions/${d.id}`} style={{ textDecoration: 'none' }}>
                      <div className="card-ministry" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ background: 'linear-gradient(135deg, var(--deep-brown), var(--warm-brown))', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, letterSpacing: 2, color: '#d4af37', textTransform: 'uppercase' }}>
                            {new Date(d.published_at).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                          </span>
                          <span style={{ color: 'rgba(212,175,55,0.6)', fontSize: 22 }}>✝</span>
                        </div>
                        <div style={{ padding: '24px', flex: 1 }}>
                          <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, marginBottom: 10, color: 'var(--deep-brown)', lineHeight: 1.3 }}>{d.title}</h3>
                          <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 11, color: 'var(--gold)', letterSpacing: 1, marginBottom: 14 }}>📖 {d.scripture}</div>
                          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 17, color: 'var(--text-mid)', lineHeight: 1.8 }}>
                            {d.content.replace(/<[^>]+>/g, '').slice(0, 150)}…
                          </p>
                        </div>
                        <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(212,175,55,0.1)', fontFamily: 'Montserrat, sans-serif', fontSize: 11, letterSpacing: 2, color: 'var(--gold)', textTransform: 'uppercase' }}>
                          Read Full Devotion →
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                {total > PER_PAGE && (
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 48 }}>
                    <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0} className="btn-outline" style={{ padding: '10px 24px', opacity: page === 0 ? 0.4 : 1 }}>← Previous</button>
                    <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 12, color: 'var(--text-light)', display: 'flex', alignItems: 'center', padding: '0 16px' }}>
                      Page {page + 1} of {Math.ceil(total / PER_PAGE)}
                    </span>
                    <button onClick={() => setPage(p => p + 1)} disabled={(page + 1) * PER_PAGE >= total} className="btn-outline" style={{ padding: '10px 24px', opacity: (page + 1) * PER_PAGE >= total ? 0.4 : 1 }}>Next →</button>
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
