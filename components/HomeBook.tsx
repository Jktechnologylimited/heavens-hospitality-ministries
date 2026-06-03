'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Download, BookOpen } from 'lucide-react';

interface BookSettings {
  featured_book_title: string;
  featured_book_author: string;
  featured_book_description: string;
  featured_book_url: string;
  featured_book_cover_url: string;
}

const DEFAULTS: BookSettings = {
  featured_book_title: 'In the Fullness of His Blessings',
  featured_book_author: 'Evangelist Bob Edward',
  featured_book_description: "Religion told Bob Edward that suffering was his lot. At 21, God showed him the truth. Your blessings are not on the way — they are already yours in Christ Jesus.",
  featured_book_url: '/book/in-the-fullness-of-his-blessings.pdf',
  featured_book_cover_url: '/images/book-cover.jpg',
};

export default function HomeBook() {
  const [book, setBook] = useState<BookSettings>(DEFAULTS);

  useEffect(() => {
    fetch('/api/book-settings')
      .then(r => r.json())
      .then(d => setBook(d))
      .catch(() => {});
  }, []);

  const isExternal = book.featured_book_url.startsWith('http');

  return (
    <section style={{
      background: 'linear-gradient(135deg, #0B1A2E 0%, #152744 50%, #1E3A5F 100%)',
      padding: 'clamp(48px,8vw,72px) clamp(16px,5vw,24px)',
      borderTop: '3px solid var(--orange)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ position:'absolute', right:'-5%', top:'50%', transform:'translateY(-50%)', width:'min(400px,60vw)', height:'min(400px,60vw)', background:'radial-gradient(circle,rgba(232,76,14,0.07) 0%,transparent 70%)', borderRadius:'50%', pointerEvents:'none' }} />

      <div style={{ maxWidth:1100, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(min(100%,300px),1fr))', gap:'clamp(32px,6vw,64px)', alignItems:'center', position:'relative' }}>

        {/* Book cover */}
        <div style={{ display:'flex', justifyContent:'center' }}>
          <div style={{ position:'relative', width:'min(220px,55vw)' }}>
            <div style={{ borderRadius:8, overflow:'hidden', boxShadow:'10px 14px 40px rgba(0,0,0,0.6), -2px 0 0 rgba(232,76,14,0.2)', transform:'perspective(800px) rotateY(-4deg)' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={book.featured_book_cover_url}
                alt={book.featured_book_title}
                style={{ width:'100%', display:'block' }}
                onError={e => { (e.target as HTMLImageElement).src = '/images/book-cover.jpg'; }}
              />
            </div>
            <div style={{ position:'absolute', top:-12, right:-12, width:52, height:52, background:'linear-gradient(135deg,#C03A08,#E84C0E)', borderRadius:'50%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 16px rgba(232,76,14,0.5)', border:'2px solid rgba(255,255,255,0.15)' }}>
              <span style={{ fontFamily:'Montserrat,sans-serif', fontSize:8, fontWeight:800, color:'white' }}>100%</span>
              <span style={{ fontFamily:'Montserrat,sans-serif', fontSize:9, fontWeight:900, color:'white' }}>FREE</span>
            </div>
            <div style={{ width:'85%', height:18, background:'rgba(0,0,0,0.35)', borderRadius:'50%', margin:'10px auto 0', filter:'blur(8px)' }} />
          </div>
        </div>

        {/* Content */}
        <div>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(232,76,14,0.12)', border:'1px solid rgba(232,76,14,0.3)', borderRadius:3, padding:'5px 14px', marginBottom:16 }}>
            <BookOpen size={12} color="var(--orange)" />
            <span style={{ fontFamily:'Montserrat,sans-serif', fontSize:10, letterSpacing:2, color:'var(--orange)', textTransform:'uppercase' }}>Free Book</span>
          </div>

          <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(26px,4.5vw,48px)', color:'white', lineHeight:1.15, marginBottom:12 }}>
            <span style={{ background:'linear-gradient(90deg,#C03A08,#E84C0E,#FF8C55,#E84C0E)', backgroundSize:'200% auto', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', animation:'shimmer 3s linear infinite' }}>
              {book.featured_book_title}
            </span>
          </h2>

          <p style={{ fontFamily:'Cormorant Garamond,serif', fontStyle:'italic', fontSize:'clamp(14px,2vw,17px)', color:'rgba(255,255,255,0.55)', marginBottom:16 }}>
            By {book.featured_book_author}
          </p>

          <p style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(16px,2.5vw,19px)', color:'rgba(255,255,255,0.8)', lineHeight:1.8, marginBottom:28 }}>
            {book.featured_book_description}
          </p>

          <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
            <a
              href={book.featured_book_url}
              download={!isExternal ? `${book.featured_book_title}.pdf` : undefined}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              className="btn-primary"
              style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'clamp(12px,2.5vw,15px) clamp(20px,4vw,32px)', fontSize:'clamp(11px,1.8vw,13px)' }}
            >
              <Download size={15} /> Download Free PDF
            </a>
            <Link href="/book" className="btn-outline"
              style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'clamp(11px,2.5vw,14px) clamp(18px,4vw,28px)', fontSize:'clamp(11px,1.8vw,13px)', color:'rgba(255,255,255,0.8)', borderColor:'rgba(255,255,255,0.3)' }}>
              <BookOpen size={15} /> Learn More
            </Link>
          </div>

          <p style={{ fontFamily:'Montserrat,sans-serif', fontSize:10, color:'rgba(255,255,255,0.25)', marginTop:14, letterSpacing:0.5 }}>
            No sign-up required. Downloads instantly.
          </p>
        </div>

      </div>
    </section>
  );
}
