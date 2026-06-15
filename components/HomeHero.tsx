'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSiteContent } from '@/lib/useSiteContent';

const SLIDES = [
  { src: '/images/pastor-1.jpg', alt: "Evangelist Bob Edward preaching" },
  { src: '/images/pastor-2.jpg', alt: "Evangelist Bob Edward in ministry" },
  { src: '/images/ministry-1.jpg', alt: "Heaven's Hospitality Ministries crusade" },
  { src: '/images/ministry-2.jpg', alt: "Ministry laying hands in prayer" },
  { src: '/images/ministry-3.jpg', alt: "Heaven's Hospitality Ministries congregation" },
];

export default function HomeHero() {
  const { get } = useSiteContent();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section style={{ position: 'relative', height: '100svh', minHeight: 560, overflow: 'hidden', background: '#06101C' }}>
      {/* Slides */}
      {SLIDES.map((s, i) => (
        <div key={i} style={{ position: 'absolute', inset: 0, transition: 'opacity 1.2s ease', opacity: i === current ? 1 : 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={s.src} alt={s.alt} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(6,16,28,0.55) 0%, rgba(6,16,28,0.35) 40%, rgba(6,16,28,0.75) 75%, rgba(6,16,28,0.97) 100%)' }} />
        </div>
      ))}

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 'clamp(16px,5vw,48px) clamp(16px,5vw,48px) clamp(48px,10vw,80px)', maxWidth: 900, margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ marginBottom: 20 }}>
          <div className="section-label" style={{ marginBottom: 16 }}>Heaven's Hospitality Ministries</div>
          <div style={{ width: 56, height: 3, background: 'linear-gradient(90deg,var(--orange),var(--orange-light))', marginBottom: 20, borderRadius: 2 }} />
        </div>
        <h1 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(28px,6vw,72px)', color: 'white', lineHeight: 1.1, marginBottom: 16, textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>
          {get('hero_headline')}
        </h1>
        <p style={{ fontFamily: 'Cormorant Garamond,serif', fontStyle: 'italic', fontSize: 'clamp(16px,2.5vw,22px)', color: 'rgba(255,255,255,0.8)', maxWidth: 640, lineHeight: 1.7, marginBottom: 32 }}>
          {get('hero_subheadline')}
        </p>
        <div style={{ display: 'flex', gap: 'clamp(10px,2vw,16px)', flexWrap: 'wrap' }}>
          <a href="https://www.tiktok.com/@heavenshospitality" target="_blank" rel="noopener" className="btn-primary" style={{ fontSize: 'clamp(11px,1.8vw,14px)', padding: 'clamp(12px,2vw,15px) clamp(20px,4vw,36px)' }}>
            {get('hero_cta_text')}
          </a>
          <Link href="/devotions" className="btn-outline" style={{ fontSize: 'clamp(11px,1.8vw,14px)', padding: 'clamp(11px,2vw,14px) clamp(18px,4vw,32px)', color: 'white', borderColor: 'rgba(255,255,255,0.5)' }}>
            Daily Devotions
          </Link>
        </div>
      </div>

      {/* Slide indicators */}
      <div style={{ position: 'absolute', bottom: 24, right: 24, zIndex: 3, display: 'flex', gap: 6 }}>
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} style={{ width: i === current ? 20 : 6, height: 6, borderRadius: 3, background: i === current ? 'var(--orange)' : 'rgba(255,255,255,0.4)', border: 'none', cursor: 'pointer', transition: 'all 0.3s', padding: 0 }} />
        ))}
      </div>
    </section>
  );
}
