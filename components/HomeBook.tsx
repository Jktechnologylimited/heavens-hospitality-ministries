'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Download, BookOpen, ArrowRight } from 'lucide-react';

interface Book {
  id: number; title: string; slug: string | null; author: string; description: string;
  cover_url: string; cover_image: string | null; download_url: string; is_featured: boolean;
}

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
};

function getCover(b: Book): string {
  if (b.cover_image) return b.cover_image;
  if (b.cover_url) return b.cover_url;
  return '/images/book-cover.jpg';
}

function getHref(b: Book): string {
  if (b.id === -1) return '/book';           // legacy static book
  if (!b.slug) return '/books';              // slug not yet set — go to books page
  return `/books/${b.slug}`;
}

const SHOW_MAX = 4; // max cards before "Find More Books" appears

export default function HomeBook() {
  const [dbBooks, setDbBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/books')
      .then(r => r.json())
      .then(d => setDbBooks(d.books || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Legacy book always first, then DB books (dedupe by title)
  const allBooks: Book[] = [
    LEGACY_BOOK,
    ...dbBooks.filter(b => b.title !== LEGACY_BOOK.title),
  ];

  const visible = allBooks.slice(0, SHOW_MAX);
  const hasMore = allBooks.length > SHOW_MAX;

  return (
    <section style={{
      background: 'linear-gradient(160deg, #06101C 0%, #0B1A2E 50%, #0f2240 100%)',
      padding: 'clamp(56px,10vw,80px) clamp(16px,5vw,24px)',
      borderTop: '3px solid var(--orange)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* BG glow */}
      <div style={{ position:'absolute', left:'50%', top:'40%', transform:'translate(-50%,-50%)', width:'min(700px,120vw)', height:'min(700px,120vw)', background:'radial-gradient(circle,rgba(232,76,14,0.05) 0%,transparent 70%)', borderRadius:'50%', pointerEvents:'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>

        {/* Section header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'clamp(28px,5vw,40px)', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(232,76,14,0.12)', border:'1px solid rgba(232,76,14,0.3)', borderRadius:3, padding:'5px 14px', marginBottom:12 }}>
              <BookOpen size={12} color="var(--orange)" />
              <span style={{ fontFamily:'Montserrat,sans-serif', fontSize:10, letterSpacing:2, color:'var(--orange)', textTransform:'uppercase' }}>Free Books</span>
            </div>
            <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(26px,4.5vw,42px)', color:'white', lineHeight:1.15, margin:0 }}>
              Ministry{' '}
              <span style={{ background:'linear-gradient(90deg,#C03A08,#E84C0E,#FF8C55)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                Books
              </span>
            </h2>
            <p style={{ fontFamily:'Cormorant Garamond,serif', fontStyle:'italic', fontSize:'clamp(14px,2vw,17px)', color:'rgba(255,255,255,0.5)', margin:'8px 0 0' }}>
              All books are completely free — no sign-up required
            </p>
          </div>
          <Link href="/books" style={{ display:'inline-flex', alignItems:'center', gap:6, fontFamily:'Montserrat,sans-serif', fontSize:11, letterSpacing:1.5, color:'rgba(232,76,14,0.8)', textTransform:'uppercase', textDecoration:'none', whiteSpace:'nowrap' }}>
            All Books <ArrowRight size={13} />
          </Link>
        </div>

        {/* Grid */}
        {loading ? (
          <p style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'Cormorant Garamond,serif', fontSize: 18, fontStyle: 'italic' }}>Loading books…</p>
        ) : (
          <>
            <style>{`
              .home-books-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 14px;
              }
              @media (min-width: 640px) {
                .home-books-grid {
                  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
                  gap: clamp(16px, 3vw, 24px);
                }
              }
            `}</style>

            <div className="home-books-grid">
              {visible.map(b => {
                const href = getHref(b);
                const isExternal = b.download_url.startsWith('http');
                return (
                  <div key={b.id}
                    style={{ background: b.is_featured ? 'rgba(232,76,14,0.07)' : 'rgba(255,255,255,0.04)', border: `1px solid ${b.is_featured ? 'rgba(232,76,14,0.3)' : 'rgba(255,255,255,0.07)'}`, borderRadius: 10, overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'border-color 0.2s, transform 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(232,76,14,0.4)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = b.is_featured ? 'rgba(232,76,14,0.3)' : 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'translateY(0)'; }}>

                    {/* Cover */}
                    <div style={{ background: 'rgba(0,0,0,0.25)', padding: 'clamp(14px,3vw,20px)', display: 'flex', justifyContent: 'center' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={getCover(b)} alt={b.title}
                        style={{ width: 'clamp(80px,45%,130px)', height: 'auto', borderRadius: 4, boxShadow: '6px 8px 20px rgba(0,0,0,0.5)', display: 'block' }}
                        onError={e => { (e.target as HTMLImageElement).src = '/images/book-cover.jpg'; }} />
                    </div>

                    {/* Info */}
                    <div style={{ padding: 'clamp(10px,2.5vw,16px)', display: 'flex', flexDirection: 'column', flex: 1, gap: 0 }}>
                      {b.is_featured && (
                        <span style={{ fontFamily:'Montserrat,sans-serif', fontSize:8, fontWeight:700, letterSpacing:1.5, color:'var(--orange)', textTransform:'uppercase', marginBottom:4 }}>Featured</span>
                      )}
                      <h3 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(13px,2.2vw,17px)', color:'white', lineHeight:1.3, marginBottom:4 }}>{b.title}</h3>
                      <p style={{ fontFamily:'Cormorant Garamond,serif', fontStyle:'italic', fontSize:'clamp(11px,1.6vw,13px)', color:'rgba(255,255,255,0.45)', marginBottom:'auto', paddingBottom:12 }}>By {b.author}</p>

                      {/* Buttons */}
                      <div style={{ display:'flex', flexDirection:'column', gap:6, marginTop:10 }}>
                        <Link href={href}
                          className="btn-primary"
                          style={{ justifyContent:'center', padding:'clamp(8px,1.8vw,10px)', fontSize:'clamp(9px,1.5vw,11px)', display:'flex', alignItems:'center', gap:5, letterSpacing:0.5 }}>
                          <BookOpen size={11} /> Learn More
                        </Link>
                        <a href={b.download_url}
                          download={!isExternal ? `${b.title}.pdf` : undefined}
                          target={isExternal ? '_blank' : undefined}
                          rel="noopener noreferrer"
                          className="btn-outline"
                          style={{ justifyContent:'center', padding:'clamp(7px,1.8vw,9px)', fontSize:'clamp(9px,1.5vw,11px)', display:'flex', alignItems:'center', gap:5, color:'rgba(255,255,255,0.6)', borderColor:'rgba(255,255,255,0.15)', letterSpacing:0.5 }}>
                          <Download size={11} /> Download Free
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Find More Books CTA */}
            {hasMore && (
              <div style={{ marginTop: 'clamp(28px,5vw,40px)', textAlign: 'center' }}>
                <Link href="/books"
                  className="btn-outline"
                  style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'clamp(12px,2.5vw,15px) clamp(24px,5vw,40px)', fontSize:'clamp(11px,1.8vw,13px)', color:'rgba(255,255,255,0.75)', borderColor:'rgba(255,255,255,0.2)' }}>
                  <BookOpen size={14} />
                  Find More Books — {allBooks.length - SHOW_MAX} more available
                  <ArrowRight size={14} />
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
