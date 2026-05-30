'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const SLIDES = [
  {
    url: '/images/pastor-2.jpg',
    alt: 'Evangelist Bob Pepple preaching',
    caption: 'Proclaiming the Word to the Nations',
    position: 'center top',
  },
  {
    url: '/images/ministry-1.jpg',
    alt: 'Heaven\'s Hospitality Ministries crusade',
    caption: 'A Community of Faith & Belonging',
    position: 'center center',
  },
  {
    url: '/images/pastor-3.jpg',
    alt: 'Evangelist Bob Pepple on stage',
    caption: 'Moving in the Power of the Holy Spirit',
    position: 'center 20%',
  },
  {
    url: '/images/ministry-2.jpg',
    alt: 'Ministry prayer and healing',
    caption: 'Extending the Hospitality of Heaven',
    position: 'center center',
  },
  {
    url: '/images/pastor-4.jpg',
    alt: 'Evangelist Bob Pepple ministering',
    caption: 'Reaching Every Nation, Every Soul',
    position: 'center 30%',
  },
];

export default function HomeHero() {
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    const timer = setInterval(() => setCurrent(c => (c + 1) % SLIDES.length), 5500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section style={{
      minHeight: '100vh',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      background: '#060e1a',
    }}>
      {/* SLIDESHOW BACKGROUND */}
      {SLIDES.map((slide, i) => (
        <div key={i} style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${slide.url})`,
          backgroundSize: 'cover',
          backgroundPosition: slide.position,
          opacity: i === current ? 0.42 : 0,
          transition: 'opacity 1.6s ease',
          willChange: 'opacity',
        }} />
      ))}

      {/* Layered overlays for depth */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(6,14,26,0.4) 0%, rgba(6,14,26,0.15) 35%, rgba(6,14,26,0.6) 75%, rgba(6,14,26,0.92) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 30%, rgba(6,14,26,0.5) 100%)' }} />

      {/* Orange glow */}
      <div style={{ position: 'absolute', bottom: '20%', left: '50%', transform: 'translateX(-50%)', width: 'min(500px, 80vw)', height: 300, background: 'radial-gradient(ellipse, rgba(232,76,14,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Particle dots */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {loaded && [...Array(12)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: (i % 3) + 1, height: (i % 3) + 1,
            background: '#E84C0E',
            borderRadius: '50%',
            opacity: 0.15 + (i % 4) * 0.06,
            left: `${(i * 19 + 5) % 100}%`,
            top: `${(i * 27 + 8) % 100}%`,
            animation: `float ${3 + (i % 3)}s ease-in-out ${i * 0.4}s infinite alternate`,
          }} />
        ))}
      </div>

      {/* CONTENT */}
      <div style={{
        position: 'relative', textAlign: 'center',
        padding: 'clamp(100px,15vw,140px) clamp(16px,5vw,40px) clamp(80px,12vw,100px)',
        maxWidth: 960, width: '100%',
      }}>
        {/* Logo mark */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 'clamp(16px,3vw,24px)',
          opacity: loaded ? 1 : 0, transition: 'opacity 0.8s ease 0.1s',
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="HHM Logo" style={{ width: 'clamp(52px,8vw,72px)', height: 'clamp(52px,8vw,72px)', objectFit: 'contain', filter: 'drop-shadow(0 0 20px rgba(232,76,14,0.6))' }} />
        </div>

        <div style={{
          fontFamily: 'Montserrat, sans-serif',
          fontSize: 'clamp(9px,1.5vw,11px)', fontWeight: 600,
          letterSpacing: 'clamp(2px,1vw,5px)', textTransform: 'uppercase',
          color: 'rgba(232,76,14,0.9)', marginBottom: 'clamp(12px,2.5vw,20px)',
          opacity: loaded ? 1 : 0, transition: 'all 0.8s ease 0.2s',
        }}>
          Global Ministry
        </div>

        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(40px,9.5vw,100px)',
          fontWeight: 700, lineHeight: 1.05,
          marginBottom: 'clamp(12px,2.5vw,20px)',
          opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'translateY(30px)',
          transition: 'all 0.9s ease 0.35s',
        }}>
          <span style={{ color: 'white', display: 'block' }}>Heaven's</span>
          <span style={{
            display: 'block',
            background: 'linear-gradient(90deg, #C03A08 0%, #E84C0E 35%, #FF8C55 65%, #E84C0E 100%)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            animation: 'shimmer 3s linear infinite',
          }}>Hospitality</span>
          <span style={{ color: 'rgba(255,255,255,0.8)', fontStyle: 'italic', fontWeight: 400, fontSize: '0.55em', display: 'block', letterSpacing: '0.15em' }}>Ministries</span>
        </h1>

        <div style={{
          width: 70, height: 2,
          background: 'linear-gradient(90deg, transparent, #E84C0E, transparent)',
          margin: '0 auto clamp(16px,3vw,28px)',
          opacity: loaded ? 1 : 0, transition: 'opacity 0.8s ease 0.55s',
        }} />

        <p style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(16px,2.5vw,22px)',
          color: 'rgba(255,255,255,0.8)',
          lineHeight: 1.8, maxWidth: 640,
          margin: '0 auto clamp(28px,5vw,44px)',
          fontStyle: 'italic', padding: '0 8px',
          opacity: loaded ? 1 : 0, transition: 'all 0.8s ease 0.65s',
        }}>
          "For I was a stranger and you welcomed me." Spreading the love, grace, and warm hospitality of Heaven to every nation on earth.
        </p>

        <div style={{
          display: 'flex', gap: 'clamp(10px,2vw,16px)',
          justifyContent: 'center', flexWrap: 'wrap', padding: '0 16px',
          opacity: loaded ? 1 : 0, transition: 'all 0.8s ease 0.8s',
        }}>
          <Link href="/devotions" className="btn-primary" style={{ fontSize: 'clamp(11px,1.5vw,13px)', padding: 'clamp(11px,2vw,14px) clamp(20px,4vw,32px)' }}>
            Daily Devotions
          </Link>
          <Link href="/sermons" className="btn-outline" style={{ fontSize: 'clamp(11px,1.5vw,13px)', padding: 'clamp(10px,2vw,13px) clamp(18px,4vw,30px)', color: 'white', borderColor: 'rgba(255,255,255,0.4)' }}>
            Watch Sermons
          </Link>
          <Link href="/#give" className="btn-primary" style={{ fontSize: 'clamp(11px,1.5vw,13px)', padding: 'clamp(11px,2vw,14px) clamp(20px,4vw,32px)', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}>
             Give Now
          </Link>
        </div>

        {/* Slide caption + dots */}
        <div style={{ marginTop: 'clamp(28px,5vw,44px)' }}>
          <div style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: 'clamp(9px,1.2vw,11px)', letterSpacing: 2,
            color: 'rgba(232,76,14,0.7)', textTransform: 'uppercase',
            minHeight: 16, marginBottom: 12, transition: 'opacity 0.5s',
          }}>
            {SLIDES[current].caption}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
            {SLIDES.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} aria-label={`Slide ${i + 1}`} style={{
                width: i === current ? 28 : 8, height: 8, borderRadius: 4,
                background: i === current ? '#E84C0E' : 'rgba(232,76,14,0.3)',
                border: 'none', cursor: 'pointer',
                transition: 'all 0.3s ease', padding: 0,
              }} />
            ))}
          </div>
        </div>
      </div>

      {/* Scripture band */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: 'rgba(11,26,46,0.7)',
        borderTop: '1px solid rgba(232,76,14,0.2)',
        padding: 'clamp(12px,2vw,16px) clamp(16px,4vw,24px)',
        textAlign: 'center', backdropFilter: 'blur(12px)',
      }}>
        <p style={{
          fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic',
          fontSize: 'clamp(13px,1.8vw,16px)', color: 'rgba(255,255,255,0.65)', lineHeight: 1.5,
        }}>
          "Be not forgetful to entertain strangers: for thereby some have entertained angels unawares."
          {' '}<span style={{ color: '#E84C0E', whiteSpace: 'nowrap' }}>— Hebrews 13:2</span>
        </p>
      </div>
    </section>
  );
}
