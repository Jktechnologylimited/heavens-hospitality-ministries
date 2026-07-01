'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Download, BookOpen } from 'lucide-react';

interface Book {
  id: number; title: string; slug: string | null; author: string; description: string;
  cover_url: string; cover_image: string | null; download_url: string;
  is_featured: boolean; isLegacy?: boolean;
}

// The first book lives as a static file — always show it
const LEGACY_BOOK: Book = {
  id: -1,
  title: 'In the Fullness of His Blessings',
  slug: 'in-the-fullness-of-his-blessings',
  author: 'Evangelist Bob Edward',
  description: 'Religion told Bob Edward that suffering was his lot. At 21, God showed him the truth. Your blessings are not on the way — they are already yours in Christ Jesus.',
  cover_url: '/images/book-cover.jpg',
  cover_image: null,
  download_url: '/book/in-the-fullness-of-his-blessings.pdf',
  is_featured: true,
  isLegacy: true,
};

function getBookCover(b: Book): string {
  if (b.cover_image) return b.cover_image;
  if (b.cover_url) return b.cover_url;
  return '/images/book-cover.jpg';
}

function getHref(b: Book): string {
  if (b.isLegacy) return '/book';
  if (!b.slug) return '/books';
  return `/books/${b.slug}`;
}

export default function BooksPage() {
  const [dbBooks, setDbBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/books')
      .then(r => r.json())
      .then(d => setDbBooks(d.books || []))
      .finally(() => setLoading(false));
  }, []);

  // Merge: legacy book first, then DB books (skip any DB book that duplicates it by title)
  const books: Book[] = [
    LEGACY_BOOK,
    ...dbBooks.filter(b => b.title !== LEGACY_BOOK.title),
  ];

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section style={{ background: 'linear-gradient(160deg,#06101C,#0B1A2E)', padding: 'clamp(96px,14vw,120px) clamp(16px,5vw,24px) clamp(48px,8vw,64px)', borderBottom: '1px solid rgba(232,76,14,0.1)' }}>
          <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
            <div className="section-label" style={{ marginBottom: 16 }}>Ministry Resources</div>
            <h1 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(32px,6vw,60px)', color: 'white', marginBottom: 16, lineHeight: 1.1 }}>
              Free{' '}
              <span style={{ background: 'linear-gradient(90deg,#C03A08,#E84C0E,#FF8C55)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Books</span>
            </h1>
            <p style={{ fontFamily: 'Cormorant Garamond,serif', fontStyle: 'italic', fontSize: 'clamp(17px,2.5vw,22px)', color: 'rgba(255,255,255,0.65)', maxWidth: 560, margin: '0 auto' }}>
              All books from Evangelist Bob Edward are completely free. Download, read, and share.
            </p>
          </div>
        </section>

        {/* Grid */}
        <section style={{ background: 'var(--navy)', padding: 'clamp(48px,8vw,72px) clamp(16px,5vw,24px)', minHeight: 400 }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            {loading ? (
              <p style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', fontSize: 16 }}>Loading books…</p>
            ) : (
              <>
                {/* 2-col on mobile, auto-fill on larger screens */}
                <style>{`
                  .books-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 16px;
                  }
                  @media (min-width: 640px) {
                    .books-grid {
                      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                      gap: clamp(20px, 4vw, 32px);
                    }
                  }
                  .book-card-cover img {
                    width: clamp(80px, 40%, 140px);
                  }
                `}</style>

                <div className="books-grid">
                  {books.map(b => (
                    <div key={b.id}
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(232,76,14,0.12)', borderRadius: 12, overflow: 'hidden', transition: 'border-color 0.2s', display: 'flex', flexDirection: 'column' }}
                      onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(232,76,14,0.35)')}
                      onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(232,76,14,0.12)')}>

                      {/* Cover */}
                      <div className="book-card-cover" style={{ background: 'rgba(0,0,0,0.3)', padding: 'clamp(14px,4vw,24px)', display: 'flex', justifyContent: 'center' }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={getBookCover(b)} alt={b.title}
                          style={{ height: 'auto', borderRadius: 4, boxShadow: '8px 8px 24px rgba(0,0,0,0.5)' }}
                          onError={e => { (e.target as HTMLImageElement).src = '/images/book-cover.jpg'; }} />
                      </div>

                      {/* Info */}
                      <div style={{ padding: 'clamp(12px,3vw,20px)', display: 'flex', flexDirection: 'column', flex: 1 }}>
                        {b.is_featured && (
                          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.5, color: 'var(--orange)', textTransform: 'uppercase', marginBottom: 6 }}>Featured</div>
                        )}
                        <h3 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(14px,2.5vw,20px)', color: 'white', marginBottom: 4, lineHeight: 1.3 }}>{b.title}</h3>
                        <p style={{ fontFamily: 'Cormorant Garamond,serif', fontStyle: 'italic', fontSize: 'clamp(12px,1.8vw,14px)', color: 'rgba(255,255,255,0.5)', marginBottom: 10 }}>By {b.author}</p>
                        {b.description && (
                          <p style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(13px,2vw,15px)', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: 14, display: 'none' }}
                            className="book-desc">
                            {b.description.slice(0, 120)}{b.description.length > 120 ? '…' : ''}
                          </p>
                        )}

                        {/* Buttons stacked on mobile, side by side on desktop */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 'auto' }}>
                          <Link href={getHref(b)}
                            className="btn-primary"
                            style={{ justifyContent: 'center', padding: 'clamp(9px,2vw,11px)', fontSize: 'clamp(10px,1.8vw,12px)', display: 'flex', alignItems: 'center', gap: 5 }}>
                            <BookOpen size={12} /> Learn More
                          </Link>
                          <a href={b.download_url}
                            download={!b.download_url.startsWith('http') ? `${b.title}.pdf` : undefined}
                            target={b.download_url.startsWith('http') ? '_blank' : undefined}
                            rel="noopener noreferrer"
                            className="btn-outline"
                            style={{ justifyContent: 'center', padding: 'clamp(8px,2vw,10px)', fontSize: 'clamp(10px,1.8vw,12px)', display: 'flex', alignItems: 'center', gap: 5, color: 'rgba(255,255,255,0.7)', borderColor: 'rgba(255,255,255,0.2)' }}>
                            <Download size={12} /> Download Free
                          </a>
                        </div>
                        <p style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 9, color: 'rgba(255,255,255,0.2)', textAlign: 'center', marginTop: 8 }}>Free forever. No sign-up required.</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Show description on larger screens via CSS */}
                <style>{`@media (min-width: 480px) { .book-desc { display: block !important; } }`}</style>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
