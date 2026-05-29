'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function HomeHero() {
  return (
    <section style={{
      minHeight: '100vh',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      background: 'linear-gradient(160deg, #0d0500 0%, #1a0a00 30%, #2e1200 60%, #0d0500 100%)',
    }}>
      {/* Decorative crosses / orbs */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {[...Array(20)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            background: '#d4af37',
            borderRadius: '50%',
            opacity: Math.random() * 0.5 + 0.1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 4 + 3}s ease-in-out ${Math.random() * 2}s infinite alternate`,
          }} />
        ))}
        {/* Large radial glow */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800, height: 800,
          background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)',
          borderRadius: '50%',
        }} />
        {/* Cross overlay */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 1, height: 500,
          background: 'linear-gradient(transparent, rgba(212,175,55,0.15), transparent)',
        }} />
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500, height: 1,
          background: 'linear-gradient(transparent, rgba(212,175,55,0.1), transparent)',
        }} />
      </div>

      {/* Content */}
      <div style={{ position: 'relative', textAlign: 'center', padding: '120px 24px 80px', maxWidth: 900, animation: 'fadeUp 1s ease forwards' }}>
        <div className="section-label" style={{ color: 'rgba(212,175,55,0.8)', marginBottom: 24, opacity: 0, animation: 'fadeUp 0.8s ease 0.2s forwards' }}>
          ✦ Global Ministry ✦
        </div>
        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(48px, 8vw, 96px)',
          fontWeight: 700,
          lineHeight: 1.05,
          marginBottom: 24,
          opacity: 0,
          animation: 'fadeUp 0.8s ease 0.4s forwards',
        }}>
          <span style={{ color: 'white', display: 'block' }}>Heaven's</span>
          <span className="gold-shimmer" style={{ display: 'block' }}>Hospitality</span>
          <span style={{ color: 'rgba(255,255,255,0.85)', fontStyle: 'italic', fontWeight: 400, fontSize: '0.7em', display: 'block' }}>Ministries</span>
        </h1>

        <div style={{ width: 80, height: 1, background: 'linear-gradient(90deg, transparent, #d4af37, transparent)', margin: '0 auto 32px', opacity: 0, animation: 'fadeUp 0.8s ease 0.6s forwards' }} />

        <p style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(18px, 2.5vw, 24px)',
          color: 'rgba(255,255,255,0.75)',
          lineHeight: 1.8,
          maxWidth: 680,
          margin: '0 auto 48px',
          fontStyle: 'italic',
          opacity: 0,
          animation: 'fadeUp 0.8s ease 0.7s forwards',
        }}>
          "For I was a stranger and you welcomed me." Spreading the love, grace, and warm hospitality of Heaven to every nation on earth.
        </p>

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', opacity: 0, animation: 'fadeUp 0.8s ease 0.9s forwards' }}>
          <Link href="/devotions" className="btn-primary">
            Daily Devotions
          </Link>
          <Link href="/sermons" className="btn-outline">
            Watch Sermons
          </Link>
        </div>

        {/* Scroll hint */}
        <div style={{ position: 'absolute', bottom: -60, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: 0.5 }}>
          <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, letterSpacing: 3, color: '#d4af37', textTransform: 'uppercase' }}>Scroll</div>
          <div style={{ width: 1, height: 40, background: 'linear-gradient(#d4af37, transparent)' }} />
        </div>
      </div>

      {/* Scripture band */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: 'rgba(212,175,55,0.08)',
        borderTop: '1px solid rgba(212,175,55,0.2)',
        padding: '16px 24px',
        textAlign: 'center',
        backdropFilter: 'blur(10px)',
      }}>
        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 16, color: 'rgba(255,255,255,0.7)' }}>
          "Be not forgetful to entertain strangers: for thereby some have entertained angels unawares." — <span style={{ color: '#d4af37' }}>Hebrews 13:2</span>
        </p>
      </div>
    </section>
  );
}
