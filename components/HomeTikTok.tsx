'use client';
import { useEffect, useRef, useState } from 'react';

export default function HomeSocial() {
  const [tiktokLoaded, setTiktokLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !tiktokLoaded) {
          setTiktokLoaded(true);
          const script = document.createElement('script');
          script.src = 'https://www.tiktok.com/embed.js';
          script.async = true;
          document.body.appendChild(script);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [tiktokLoaded]);

  return (
    <section ref={ref} style={{
      background: 'linear-gradient(160deg, var(--navy) 0%, var(--navy-mid) 100%)',
      padding: 'clamp(64px,10vw,100px) clamp(16px,5vw,24px)',
      overflow: 'hidden',
      position: 'relative',
      borderTop: '1px solid rgba(232,76,14,0.1)',
    }}>
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 'min(600px,100vw)', height: 'min(600px,100vw)', background: 'radial-gradient(circle, rgba(232,76,14,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(40px,7vw,64px)' }}>
          <div className="section-label" style={{ marginBottom: 14 }}>Follow Along</div>
          <div style={{ width: 56, height: 3, background: 'linear-gradient(90deg,var(--orange),var(--orange-light))', margin: '0 auto 24px', borderRadius: 2 }} />
          <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(28px,5vw,52px)', color: 'white', marginBottom: 14, lineHeight: 1.2 }}>
            Join Our <span style={{ background: 'linear-gradient(90deg,#C03A08,#E84C0E,#FF8C55,#E84C0E)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'shimmer 3s linear infinite' }}>Community</span>
          </h2>
          <p style={{ fontFamily: 'Cormorant Garamond,serif', fontStyle: 'italic', fontSize: 'clamp(16px,2.5vw,20px)', color: 'rgba(255,255,255,0.6)', maxWidth: 560, margin: '0 auto' }}>
            Watch our latest messages, devotions, and ministry moments. Thousands are being touched by God's Word daily.
          </p>
        </div>

        {/* Two-column: TikTok + YouTube */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,400px),1fr))', gap: 'clamp(24px,4vw,48px)', alignItems: 'start' }}>

          {/* TikTok */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div style={{ width: 36, height: 36, background: '#000', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 13, fontWeight: 900, color: 'white' }}>T</span>
              </div>
              <div>
                <div style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 12, fontWeight: 700, color: 'white' }}>TikTok</div>
                <div style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.45)' }}>@heavenshospitality</div>
              </div>
              <a href="https://www.tiktok.com/@heavenshospitality" target="_blank" rel="noopener" className="btn-primary" style={{ marginLeft: 'auto', padding: '8px 16px', fontSize: 10 }}>
                Follow
              </a>
            </div>
            <div style={{ borderRadius: 10, overflow: 'hidden', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(232,76,14,0.1)', minHeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {tiktokLoaded ? (
                <blockquote
                  className="tiktok-embed"
                  cite="https://www.tiktok.com/@heavenshospitality"
                  data-unique-id="heavenshospitality"
                  data-embed-type="creator"
                  style={{ maxWidth: '100%', minWidth: 288, margin: 0 }}
                >
                  <section>
                    <a target="_blank" rel="noopener noreferrer" href="https://www.tiktok.com/@heavenshospitality">
                      @heavenshospitality
                    </a>
                  </section>
                </blockquote>
              ) : (
                <div style={{ textAlign: 'center', padding: 40 }}>
                  <div style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: 1 }}>Loading TikTok...</div>
                </div>
              )}
            </div>
          </div>

          {/* YouTube */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div style={{ width: 36, height: 36, background: '#FF0000', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 14, color: 'white', fontWeight: 900 }}>Y</span>
              </div>
              <div>
                <div style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 12, fontWeight: 700, color: 'white' }}>YouTube</div>
                <div style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.45)' }}>@HeveansHospitality</div>
              </div>
              <a href="https://www.youtube.com/@HeveansHospitality" target="_blank" rel="noopener" style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 6, background: '#FF0000', color: 'white', fontFamily: 'Montserrat,sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', padding: '8px 16px', borderRadius: 4, textDecoration: 'none', transition: 'all 0.2s' }}>
                Subscribe
              </a>
            </div>
            <div style={{ borderRadius: 10, overflow: 'hidden', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(232,76,14,0.1)' }}>
              {/* YouTube channel embed */}
              <div style={{ position: 'relative', paddingTop: '56.25%' }}>
                <iframe
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none', borderRadius: 10 }}
                  src="https://www.youtube.com/embed?listType=user_uploads&list=HeveansHospitality&rel=0&modestbranding=1"
                  title="Heaven's Hospitality Ministries YouTube"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  loading="lazy"
                />
              </div>
              <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(232,76,14,0.08)' }}>
                <span style={{ fontFamily: 'Cormorant Garamond,serif', fontStyle: 'italic', fontSize: 15, color: 'rgba(255,255,255,0.55)' }}>Watch our latest sermons and messages</span>
                <a href="https://www.youtube.com/@HeveansHospitality" target="_blank" rel="noopener" style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 10, letterSpacing: 1.5, color: 'var(--orange)', textTransform: 'uppercase', whiteSpace: 'nowrap', textDecoration: 'none' }}>
                  View Channel
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
