'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Download, BookOpen } from 'lucide-react';

interface Book {
  id: number; title: string; author: string; description: string;
  cover_url: string; download_url: string; is_featured: boolean;
}

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/books')
      .then(r => r.json())
      .then(d => setBooks(d.books || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <section style={{ background: 'linear-gradient(160deg,#06101C,#0B1A2E)', padding: 'clamp(96px,14vw,120px) clamp(16px,5vw,24px) clamp(48px,8vw,64px)', borderBottom: '1px solid rgba(232,76,14,0.1)' }}>
          <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
            <div className="section-label" style={{ marginBottom: 16 }}>Ministry Resources</div>
            <h1 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(32px,6vw,60px)', color: 'white', marginBottom: 16, lineHeight: 1.1 }}>
              Free <span style={{ background: 'linear-gradient(90deg,#C03A08,#E84C0E,#FF8C55)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Books</span>
            </h1>
            <p style={{ fontFamily: 'Cormorant Garamond,serif', fontStyle: 'italic', fontSize: 'clamp(17px,2.5vw,22px)', color: 'rgba(255,255,255,0.65)', maxWidth: 560, margin: '0 auto' }}>
              All books from Evangelist Bob Edward are completely free. Download, read, and share.
            </p>
          </div>
        </section>

        <section style={{ background: 'var(--navy)', padding: 'clamp(48px,8vw,72px) clamp(16px,5vw,24px)', minHeight: 400 }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            {loading ? (
              <p style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', fontSize: 16 }}>Loading books...</p>
            ) : books.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <BookOpen size={48} style={{ color: 'rgba(255,255,255,0.15)', marginBottom: 16 }} />
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 18 }}>Books coming soon</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%,300px),1fr))', gap: 'clamp(20px,4vw,32px)' }}>
                {books.map(b => (
                  <div key={b.id} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(232,76,14,0.12)', borderRadius: 12, overflow: 'hidden', transition: 'border-color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(232,76,14,0.3)')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(232,76,14,0.12)')}>
                    {/* Cover */}
                    <div style={{ background: 'rgba(0,0,0,0.3)', padding: 24, display: 'flex', justifyContent: 'center' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={b.cover_url || '/images/book-cover.jpg'} alt={b.title}
                        style={{ width: 140, height: 'auto', borderRadius: 4, boxShadow: '8px 8px 24px rgba(0,0,0,0.5)' }}
                        onError={e => { (e.target as HTMLImageElement).src = '/images/book-cover.jpg'; }} />
                    </div>
                    {/* Info */}
                    <div style={{ padding: 'clamp(16px,3vw,24px)' }}>
                      {b.is_featured && (
                        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.5, color: 'var(--orange)', textTransform: 'uppercase', marginBottom: 8 }}>Featured</div>
                      )}
                      <h3 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(18px,2.5vw,22px)', color: 'white', marginBottom: 6, lineHeight: 1.3 }}>{b.title}</h3>
                      <p style={{ fontFamily: 'Cormorant Garamond,serif', fontStyle: 'italic', fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 12 }}>By {b.author}</p>
                      {b.description && (
                        <p style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 15, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: 16 }}>
                          {b.description.slice(0, 140)}{b.description.length > 140 ? '…' : ''}
                        </p>
                      )}
                      <div style={{ display: 'flex', gap: 10 }}>
                        <a href={b.download_url}
                          download={!b.download_url.startsWith('http') ? `${b.title}.pdf` : undefined}
                          target={b.download_url.startsWith('http') ? '_blank' : undefined}
                          rel="noopener noreferrer"
                          className="btn-primary"
                          style={{ flex: 1, justifyContent: 'center', padding: '11px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                          <Download size={13} /> Download Free
                        </a>
                      </div>
                      <p style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.25)', textAlign: 'center', marginTop: 8 }}>Free forever. No sign-up required.</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
