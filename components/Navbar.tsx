'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MessageCircle, CreditCard } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/devotions', label: 'Devotions' },
    { href: '/sermons', label: 'Sermons' },
    { href: '/events', label: 'Events' },
    { href: '/training', label: 'Free Training' },
    { href: '/book', label: 'Free Book' },
    { href: '/#about', label: 'About' },
  ];

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(11,26,46,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(232,76,14,0.25)' : 'none',
        transition: 'all 0.4s ease',
        padding: '0 clamp(16px,4vw,24px)',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 'clamp(60px,8vw,72px)' }}>
          <Link href="/" onClick={() => setOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <Image src="/logo.png" alt="Heaven's Hospitality Ministries" width={44} height={44} style={{ objectFit: 'contain' }} />
            <div style={{ display: 'none' }} className="logo-text">
              <div style={{ fontFamily: 'Playfair Display,serif', color: 'white', fontSize: 14, fontWeight: 700, lineHeight: 1.1 }}>Heaven's Hospitality</div>
              <div style={{ fontFamily: 'Montserrat,sans-serif', color: 'rgba(255,255,255,0.5)', fontSize: 7, letterSpacing: 2, textTransform: 'uppercase' }}>Ministries</div>
            </div>
          </Link>

          <div className="nav-desktop" style={{ gap: 'clamp(16px,2.5vw,28px)', alignItems: 'center' }}>
            {links.map(l => (
              <Link key={l.href} href={l.href} style={{
                fontFamily: 'Montserrat,sans-serif', fontSize: 11, fontWeight: 600,
                letterSpacing: 1.5, textTransform: 'uppercase',
                color: l.href === '/training' ? '#FF6B35' : 'rgba(255,255,255,0.85)',
                transition: 'color 0.2s',
              }}>{l.label}</Link>
            ))}
            <Link href="/#give" className="btn-primary" style={{ padding: '9px 18px', fontSize: 10, gap: 6 }}>
              Give Now
            </Link>
          </div>

          <button onClick={() => setOpen(!open)} className="nav-mobile" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, flexDirection: 'column', gap: 5 }} aria-label="Menu">
            <span style={{ display: 'block', width: 24, height: 2, background: open ? '#E84C0E' : 'white', borderRadius: 2, transition: 'all 0.3s', transform: open ? 'rotate(45deg) translateY(7px)' : 'none' }} />
            <span style={{ display: 'block', width: 24, height: 2, background: open ? '#E84C0E' : 'white', borderRadius: 2, transition: 'all 0.3s', opacity: open ? 0 : 1 }} />
            <span style={{ display: 'block', width: 24, height: 2, background: open ? '#E84C0E' : 'white', borderRadius: 2, transition: 'all 0.3s', transform: open ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 99,
        background: 'rgba(11,26,46,0.99)',
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
        display: 'flex', flexDirection: 'column',
        padding: 'clamp(80px,15vw,100px) clamp(24px,6vw,36px) 40px',
        overflowY: 'auto',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
          <Image src="/logo.png" alt="Logo" width={48} height={48} style={{ objectFit: 'contain' }} />
          <div>
            <div style={{ fontFamily: 'Playfair Display,serif', color: 'white', fontSize: 16, fontWeight: 700 }}>Heaven's Hospitality</div>
            <div style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 8, letterSpacing: 2, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Ministries</div>
          </div>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {links.map((l, i) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
              fontFamily: 'Playfair Display,serif',
              fontSize: 'clamp(22px,6vw,32px)',
              color: l.href === '/training' ? '#FF6B35' : 'white',
              padding: '10px 0', borderBottom: '1px solid rgba(232,76,14,0.12)',
              opacity: open ? 1 : 0,
              transform: open ? 'translateX(0)' : 'translateX(20px)',
              transition: `all 0.3s ease ${i * 0.05}s`,
            }}>{l.label}</Link>
          ))}
        </nav>
        <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Link href="/#give" onClick={() => setOpen(false)} className="btn-primary" style={{ justifyContent: 'center', padding: '15px' }}>Give / Offering</Link>
          <a href={`https://wa.me/27763511196`} target="_blank" rel="noopener" className="btn-navy" style={{ justifyContent: 'center', padding: '15px', background: '#25D366', borderColor: '#25D366' }}>
            WhatsApp Us
          </a>
        </div>
        <p style={{ marginTop: 'auto', paddingTop: 32, fontFamily: 'Cormorant Garamond,serif', fontStyle: 'italic', fontSize: 15, color: 'rgba(255,255,255,0.35)', textAlign: 'center' }}>
          "For I was a stranger and you welcomed me."
        </p>
      </div>

      <style>{`.logo-text { display: block !important; } @media(max-width:500px){ .logo-text{display:none!important;} }`}</style>
    </>
  );
}
