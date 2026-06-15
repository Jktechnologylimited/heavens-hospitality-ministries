'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useSiteContent } from '@/lib/useSiteContent';
import { Mail, Phone, MessageCircle } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { SiTiktok, SiYoutube } from 'react-icons/si';

export default function Footer() {
  const { get } = useSiteContent();
  const email = get('contact_email');
  const whatsapp = get('contact_whatsapp').replace(/[^0-9]/g, '');
  const phone = get('contact_phone');
  const ttHandle = get('social_tiktok').replace('@', '');
  const ytHandle = get('social_youtube').replace('@', '');
  return (
    <footer style={{ background: '#060e1a', borderTop: '1px solid rgba(232,76,14,0.15)', color: 'rgba(255,255,255,0.65)', paddingTop: 'clamp(40px,8vw,64px)' }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        padding: '0 clamp(16px,5vw,24px) clamp(40px,8vw,48px)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,200px),1fr))',
        gap: 'clamp(32px,5vw,48px)',
      }}>

        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
            <Image src="/logo.png" alt="Heaven's Hospitality Ministries" width={44} height={44} style={{ objectFit: 'contain', flexShrink: 0 }} />
            <div>
              <div style={{ fontFamily: 'Playfair Display,serif', color: 'white', fontSize: 'clamp(13px,2vw,16px)', fontWeight: 700 }}>Heaven's Hospitality</div>
              <div style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 8, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>Ministries</div>
            </div>
          </div>
          <p style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(14px,1.8vw,16px)', lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', marginBottom: 20 }}>
            {get('footer_tagline')}
          </p>
          {/* Socials — TikTok + YouTube only */}
          <div style={{ display: 'flex', gap: 10 }}>
            <a
              href={`https://www.tiktok.com/@${ttHandle}`}
              target="_blank" rel="noopener" aria-label="TikTok"
              style={{ width: 36, height: 36, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(232,76,14,0.2)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontFamily: 'Montserrat,sans-serif', fontSize: 11, fontWeight: 900, transition: 'all 0.2s', textDecoration: 'none' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.12)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)'; }}
            >
              T
            </a>
            <a
              href={`https://www.youtube.com/@${ytHandle}`}
              target="_blank" rel="noopener" aria-label="YouTube"
              style={{ width: 36, height: 36, background: 'rgba(255,0,0,0.12)', border: '1px solid rgba(255,0,0,0.2)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ff4444', fontFamily: 'Montserrat,sans-serif', fontSize: 11, fontWeight: 900, transition: 'all 0.2s', textDecoration: 'none' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,0,0,0.2)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,0,0,0.12)'; }}
            >
              Y
            </a>
          </div>
        </div>

        {/* Ministry */}
        <div>
          <h4 style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 18 }}>Ministry</h4>
          {[
            ['/', 'Home'],
            ['/#about', 'About Us'],
            ['/devotions', 'Daily Devotions'],
            ['/sermons', 'Sermons'],
            ['/events', 'Events'],
            ['/training', 'Free Training'],
            ['/book', 'Free Book'],
            ['/miracles', 'Testimonies'],
          ].map(([href, label]) => (
            <Link
              key={href} href={href}
              style={{ display: 'block', fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(14px,1.8vw,16px)', color: 'rgba(255,255,255,0.5)', marginBottom: 9, transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--orange)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
            >{label}</Link>
          ))}
        </div>

        {/* Connect */}
        <div>
          <h4 style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 18 }}>Connect</h4>
          {[
            ['/#contact', 'Contact Us'],
            ['/#newsletter', 'Subscribe'],
            ['/#prayer', 'Prayer Requests'],
            ['/#give', 'Give / Support'],
          ].map(([href, label]) => (
            <Link
              key={href} href={href}
              style={{ display: 'block', fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(14px,1.8vw,16px)', color: 'rgba(255,255,255,0.5)', marginBottom: 9, transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--orange)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
            >{label}</Link>
          ))}
          <div style={{ marginTop: 20 }}>
            <a href={`mailto:${email}`} style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.45)', letterSpacing: 0.5, display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8, textDecoration: 'none' }}>
              <Mail size={12} /> {email}
            </a>
            <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener" style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 11, color: '#25D366', letterSpacing: 0.5, display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8, textDecoration: 'none' }}>
              <FaWhatsapp size={12} /> +27 763 511 196
            </a>
            <a href={`tel:${phone}`} style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.45)', letterSpacing: 0.5, display: 'flex', alignItems: 'center', gap: 6, textDecoration: 'none' }}>
              <Phone size={12} /> +234 913 868 8465
            </a>
          </div>
        </div>

        {/* Scripture */}
        <div>
          <h4 style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 18 }}>Our Foundation</h4>
          <blockquote style={{ borderLeft: '2px solid rgba(232,76,14,0.5)', paddingLeft: 16, fontFamily: 'Cormorant Garamond,serif', fontStyle: 'italic', fontSize: 'clamp(14px,1.8vw,17px)', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
            {get('footer_scripture')}
          </blockquote>
          <p style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 10, color: 'var(--orange)', marginTop: 12, letterSpacing: 1 }}>{get('footer_scripture_ref')}</p>
        </div>
      </div>

      {/* Developer credit bar */}
      <div style={{ borderTop: '1px solid rgba(232,76,14,0.08)', background: 'rgba(0,0,0,0.3)', maxWidth: '100%' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(14px,2.5vw,20px) clamp(16px,5vw,24px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
          {/* Left: copyright + admin */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(12px,3vw,24px)', alignItems: 'center' }}>
            <p style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.28)' }}>
              © {new Date().getFullYear()} Heaven's Hospitality Ministries. All rights reserved.
            </p>
            <Link href="/admin" style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.18)', letterSpacing: 0.5, textDecoration: 'none' }}>
              Admin
            </Link>
          </div>

          {/* Right: JKTL developer credit */}
          <a
            href="https://www.jktl.com.ng"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', opacity: 0.7, transition: 'opacity 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '0.7')}
            title="Built by JK Technology Limited"
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <span style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 9, letterSpacing: 1.5, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>JKTL V2 System</span>
              <span style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 9, color: 'rgba(255,255,255,0.25)' }}>Built by JK Technology Limited</span>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/jktl-logo.png"
              alt="JK Technology Limited"
              style={{ height: 28, width: 'auto', objectFit: 'contain', filter: 'brightness(0.8)' }}
            />
          </a>
        </div>

        {/* Support line */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)', padding: 'clamp(8px,1.5vw,10px) clamp(16px,5vw,24px)', textAlign: 'center', maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.2)', letterSpacing: 0.5 }}>
            System support:{' '}
            <a href="mailto:support@jktl.com.ng" style={{ color: 'rgba(100,150,255,0.45)', textDecoration: 'none' }}>
              support@jktl.com.ng
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
