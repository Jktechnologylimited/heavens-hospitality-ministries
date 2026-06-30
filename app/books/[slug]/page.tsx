'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Download, BookOpen, ArrowLeft } from 'lucide-react';

interface Book {
  id: number; title: string; slug: string; author: string; description: string;
  cover_url: string; cover_image: string | null; download_url: string; is_featured: boolean;
}

function getBookCover(book: Book): string {
  if (book.cover_image) return book.cover_image;
  if (book.cover_url) return book.cover_url;
  return '/images/book-cover.jpg';
}

export default function BookDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    fetch(`/api/books/${slug}`)
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(d => setBook(d.book))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/book-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, book_title: book?.title }),
      });
      if (res.ok) setStatus('success');
      else setStatus('error');
    } catch { setStatus('error'); }
  };

  const inp: React.CSSProperties = {
    width: '100%', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(232,76,14,0.3)',
    borderRadius: 6, padding: 'clamp(12px,2vw,15px) clamp(14px,3vw,18px)', color: 'white',
    fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(16px,2.5vw,18px)', outline: 'none',
  };
  const lbl: React.CSSProperties = {
    fontFamily: 'Montserrat, sans-serif', fontSize: 10, letterSpacing: 2,
    color: 'rgba(232,76,14,0.85)', textTransform: 'uppercase', display: 'block', marginBottom: 8,
  };

  if (loading) return (
    <>
      <Navbar />
      <main style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0B1A2E' }}>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Cormorant Garamond, serif', fontSize: 20 }}>Loading book…</p>
      </main>
      <Footer />
    </>
  );

  if (notFound || !book) return (
    <>
      <Navbar />
      <main style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#0B1A2E', gap: 20 }}>
        <BookOpen size={48} style={{ color: 'rgba(255,255,255,0.15)' }} />
        <p style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontStyle: 'italic' }}>This book could not be found.</p>
        <Link href="/books" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 12, color: 'var(--orange)', letterSpacing: 1 }}>← Back to all books</Link>
      </main>
      <Footer />
    </>
  );

  const coverSrc = getBookCover(book);
  const isExternal = book.download_url.startsWith('http');

  return (
    <>
      <Navbar />
      <main style={{ overflowX: 'hidden' }}>

        {/* HERO */}
        <section style={{
          background: 'linear-gradient(160deg, #060e1a 0%, #0B1A2E 50%, #0f2240 100%)',
          padding: 'clamp(100px,15vw,140px) clamp(16px,5vw,24px) clamp(60px,10vw,80px)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position:'absolute', top:'30%', left:'50%', transform:'translate(-50%,-50%)', width:'min(700px,100vw)', height:'min(700px,100vw)', background:'radial-gradient(circle,rgba(232,76,14,0.07) 0%,transparent 70%)', borderRadius:'50%', pointerEvents:'none' }} />

          <div style={{ maxWidth: 1100, margin: '0 auto 32px' }}>
            <Link href="/books" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'Montserrat, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: 1, textDecoration: 'none' }}>
              <ArrowLeft size={13} /> All Books
            </Link>
          </div>

          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 'clamp(48px,8vw,80px)', alignItems: 'center', position: 'relative' }}>

            {/* Cover */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ position: 'relative', width: 'min(280px, 72vw)' }}>
                <div style={{ borderRadius: 8, overflow: 'hidden', boxShadow: '12px 16px 48px rgba(0,0,0,0.7), -3px 0 0 rgba(232,76,14,0.2)', transform: 'perspective(800px) rotateY(-3deg)' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={coverSrc} alt={`${book.title} by ${book.author}`}
                    style={{ width: '100%', display: 'block' }}
                    onError={e => { (e.target as HTMLImageElement).src = '/images/book-cover.jpg'; }} />
                </div>
                <div style={{ position:'absolute', top:-14, right:-14, width:58, height:58, background:'linear-gradient(135deg,#C03A08,#E84C0E)', borderRadius:'50%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 20px rgba(232,76,14,0.5)', border:'2px solid rgba(255,255,255,0.15)' }}>
                  <span style={{ fontFamily:'Montserrat,sans-serif', fontSize:9, fontWeight:800, color:'white' }}>100%</span>
                  <span style={{ fontFamily:'Montserrat,sans-serif', fontSize:10, fontWeight:900, color:'white' }}>FREE</span>
                </div>
                <div style={{ width:'90%', height:24, background:'rgba(0,0,0,0.3)', borderRadius:'50%', margin:'12px auto 0', filter:'blur(10px)' }} />
              </div>
            </div>

            {/* Content + form */}
            <div>
              <div style={{ display:'inline-block', background:'rgba(232,76,14,0.12)', border:'1px solid rgba(232,76,14,0.3)', borderRadius:3, padding:'6px 16px', marginBottom:20 }}>
                <span style={{ fontFamily:'Montserrat,sans-serif', fontSize:10, letterSpacing:2, color:'#FF6B35', textTransform:'uppercase' }}>Free Download · PDF</span>
              </div>

              <h1 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(30px,5.5vw,56px)', color:'white', lineHeight:1.1, marginBottom:16 }}>
                <span style={{ background:'linear-gradient(90deg,#C03A08,#E84C0E,#FF8C55,#E84C0E)', backgroundSize:'200% auto', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', animation:'shimmer 3s linear infinite' }}>
                  {book.title}
                </span>
              </h1>

              <p style={{ fontFamily:'Cormorant Garamond,serif', fontStyle:'italic', fontSize:'clamp(16px,2.5vw,20px)', color:'rgba(255,255,255,0.65)', marginBottom:8 }}>
                By {book.author}
              </p>
              <p style={{ fontFamily:'Montserrat,sans-serif', fontSize:10, letterSpacing:2, color:'rgba(232,76,14,0.7)', textTransform:'uppercase', marginBottom:28 }}>
                Heaven's Hospitality Ministries
              </p>

              {book.description && (
                <p style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(17px,2.5vw,21px)', color:'rgba(255,255,255,0.8)', lineHeight:1.8, marginBottom:32, fontStyle:'italic' }}>
                  {book.description}
                </p>
              )}

              {status === 'success' ? (
                <div style={{ background:'rgba(232,76,14,0.1)', border:'1px solid rgba(232,76,14,0.35)', borderRadius:10, padding:'clamp(24px,5vw,32px)', textAlign:'center' }}>
                  <h3 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(20px,3.5vw,26px)', color:'white', marginBottom:12 }}>Your Book is Ready</h3>
                  <p style={{ fontFamily:'Cormorant Garamond,serif', fontSize:17, color:'rgba(255,255,255,0.75)', marginBottom:24, lineHeight:1.7, fontStyle:'italic' }}>
                    {form.email ? 'A copy is being sent to your inbox. You can also download directly:' : 'Click below to download your free copy:'}
                  </p>
                  <a href={book.download_url}
                    download={!isExternal ? `${book.title}.pdf` : undefined}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className="btn-primary"
                    style={{ display:'inline-flex', justifyContent:'center', alignItems:'center', gap:8, padding:'16px 36px', fontSize:14, width:'100%', marginBottom:16 }}>
                    <Download size={15} /> Download Free PDF
                  </a>
                  <p style={{ fontFamily:'Montserrat,sans-serif', fontSize:10, color:'rgba(255,255,255,0.35)' }}>Free forever. No sign-up required.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(232,76,14,0.18)', borderRadius:10, padding:'clamp(20px,4vw,28px)', display:'flex', flexDirection:'column', gap:14 }}>
                  <p style={{ fontFamily:'Montserrat,sans-serif', fontSize:10, color:'rgba(232,76,14,0.8)', letterSpacing:1.5, textTransform:'uppercase', marginBottom:2 }}>
                    Get your free copy — all fields optional
                  </p>
                  <div>
                    <label style={lbl}>Your Name</label>
                    <input type="text" placeholder="Optional" value={form.name} onChange={e => setForm({...form, name:e.target.value})} style={inp} />
                  </div>
                  <div>
                    <label style={lbl}>Email Address</label>
                    <input type="email" placeholder="Optional — we'll send a copy to your inbox" value={form.email} onChange={e => setForm({...form, email:e.target.value})} style={inp} />
                  </div>
                  <div>
                    <label style={lbl}>WhatsApp Number</label>
                    <input type="tel" placeholder="Optional" value={form.phone} onChange={e => setForm({...form, phone:e.target.value})} style={inp} />
                  </div>
                  <p style={{ fontFamily:'Montserrat,sans-serif', fontSize:10, color:'rgba(255,255,255,0.3)', lineHeight:1.6 }}>
                    This book is completely free. You are not required to leave any details.
                  </p>
                  {status === 'error' && <p style={{ fontFamily:'Montserrat,sans-serif', fontSize:12, color:'#ff8a80' }}>Something went wrong. Please try again.</p>}
                  <button type="submit" disabled={status === 'loading'} className="btn-primary" style={{ width:'100%', justifyContent:'center', padding:'clamp(14px,3vw,17px)', fontSize:'clamp(12px,2vw,14px)' }}>
                    {status === 'loading' ? 'Preparing your copy…' : 'Download Free Book'}
                  </button>
                  <p style={{ fontFamily:'Montserrat,sans-serif', fontSize:10, color:'rgba(255,255,255,0.25)', textAlign:'center' }}>No credit card. No spam. Free forever.</p>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Author */}
        <section style={{ background:'var(--off-white)', padding:'clamp(56px,10vw,80px) clamp(16px,5vw,24px)' }}>
          <div style={{ maxWidth:960, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap:'clamp(32px,6vw,56px)', alignItems:'center' }}>
            <div style={{ display:'flex', justifyContent:'center' }}>
              <div style={{ width:'min(240px,65vw)', aspectRatio:'4/5', borderRadius:12, overflow:'hidden', boxShadow:'0 24px 56px rgba(11,26,46,0.18)', border:'3px solid rgba(232,76,14,0.2)', position:'relative' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/pastor-1.jpg" alt="Evangelist Bob Edward" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top', display:'block' }} />
                <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'35%', background:'linear-gradient(transparent,rgba(11,26,46,0.85))' }} />
                <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:'linear-gradient(90deg,var(--orange),var(--orange-light))' }} />
              </div>
            </div>
            <div>
              <div className="section-label" style={{ marginBottom:14 }}>About the Author</div>
              <div style={{ width:56, height:3, background:'linear-gradient(90deg,var(--orange),var(--orange-light))', marginBottom:20, borderRadius:2 }} />
              <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(24px,4vw,38px)', color:'var(--navy)', marginBottom:16 }}>{book.author}</h2>
              <p style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(16px,2.5vw,19px)', lineHeight:1.85, color:'var(--text-mid)', marginBottom:16 }}>
                Evangelist Bob Edward is the founder of Heaven's Hospitality Ministries — a global ministry taking the Gospel and the healing power of Jesus Christ across Africa and the nations.
              </p>
              <p style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(16px,2.5vw,19px)', lineHeight:1.85, color:'var(--text-mid)', marginBottom:28 }}>
                His ministry began with a personal encounter with God and a burning desire to see believers walk in the full inheritance Christ secured on the cross.
              </p>
              <a href="https://www.tiktok.com/@heavenshospitality" target="_blank" rel="noopener" className="btn-primary">
                Follow the Ministry on TikTok
              </a>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background:'linear-gradient(135deg, var(--navy), var(--navy-mid))', padding:'clamp(56px,10vw,80px) clamp(16px,5vw,24px)' }}>
          <div style={{ maxWidth:700, margin:'0 auto', textAlign:'center' }}>
            <div style={{ width:56, height:3, background:'linear-gradient(90deg,var(--orange),var(--orange-light))', margin:'0 auto 28px', borderRadius:2 }} />
            <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(26px,5vw,44px)', color:'white', marginBottom:16, lineHeight:1.2 }}>
              This Book Is <span style={{ background:'linear-gradient(90deg,#C03A08,#E84C0E,#FF8C55)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Completely Free</span>
            </h2>
            <a href={book.download_url}
              download={!isExternal ? `${book.title}.pdf` : undefined}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              className="btn-primary"
              style={{ display:'inline-flex', justifyContent:'center', alignItems:'center', gap:8, padding:'clamp(14px,3vw,18px) clamp(28px,6vw,48px)', fontSize:'clamp(12px,2vw,15px)', marginBottom:16 }}>
              <Download size={15} /> Download the Free Book
            </a>
            <div style={{ marginTop:40, paddingTop:32, borderTop:'1px solid rgba(232,76,14,0.1)' }}>
              <Link href="/books" style={{ fontFamily:'Montserrat,sans-serif', fontSize:11, color:'rgba(255,255,255,0.35)', letterSpacing:1 }}>
                ← View All Books
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
