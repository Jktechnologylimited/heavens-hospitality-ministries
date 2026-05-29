'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Cross } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/devotions', label: 'Devotions' },
    { href: '/sermons', label: 'Sermons' },
    { href: '/#about', label: 'About' },
    { href: '/#contact', label: 'Contact' },
  ];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? 'rgba(26,10,0,0.97)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(212,175,55,0.2)' : 'none',
      transition: 'all 0.4s ease',
      padding: '0 24px',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 38, height: 38, background: 'linear-gradient(135deg, #a07820, #d4af37)',
            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <span style={{ fontSize: 18 }}>✝</span>
          </div>
          <div>
            <div style={{ fontFamily: 'Playfair Display, serif', color: '#d4af37', fontSize: 16, fontWeight: 700, lineHeight: 1.2 }}>
              Heaven's Hospitality
            </div>
            <div style={{ fontFamily: 'Montserrat, sans-serif', color: 'rgba(255,255,255,0.6)', fontSize: 9, letterSpacing: 3, textTransform: 'uppercase' }}>
              Ministries
            </div>
          </div>
        </Link>

        {/* Desktop Links */}
        <div style={{ display: 'flex', gap: 36, alignItems: 'center' }} className="hidden-mobile">
          {links.map(l => (
            <Link key={l.href} href={l.href} style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.85)',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.target as HTMLElement).style.color = '#d4af37'}
            onMouseLeave={e => (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.85)'}
            >{l.label}</Link>
          ))}
          <Link href="/#newsletter" className="btn-primary" style={{ padding: '10px 22px', fontSize: 11 }}>
            Subscribe
          </Link>
        </div>

        {/* Mobile Menu */}
        <button onClick={() => setOpen(!open)} style={{ display: 'none', color: 'white', background: 'none', border: 'none', cursor: 'pointer' }} className="show-mobile">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div style={{
          background: 'rgba(26,10,0,0.98)',
          borderTop: '1px solid rgba(212,175,55,0.2)',
          padding: '24px',
        }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
              display: 'block',
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 14,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.85)',
              padding: '12px 0',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
            }}>{l.label}</Link>
          ))}
          <Link href="/#newsletter" onClick={() => setOpen(false)} className="btn-primary" style={{ marginTop: 20, display: 'block', textAlign: 'center' }}>
            Subscribe to Devotions
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
