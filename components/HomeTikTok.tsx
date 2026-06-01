'use client';
import { useEffect, useState } from 'react';
import { PlayCircle } from 'lucide-react';

const YT_HANDLE = 'HeveansHospitality';
const YT_URL = `https://www.youtube.com/@${YT_HANDLE}`;
const TT_URL = 'https://www.tiktok.com/@heavenshospitality';

// TikTok SVG — lucide doesn't have it, so we keep a minimal inline SVG
function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.77a4.85 4.85 0 01-1.01-.08z"/>
    </svg>
  );
}

function PlayCircleEmbed() {
  const [videoId, setVideoId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/settings?key=youtube_video_id')
      .then(r => r.json())
      .then(d => { if (d.value) setVideoId(d.value); })
      .catch(() => {});
  }, []);

  return (
    <div style={{ borderRadius: 10, overflow: 'hidden', background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.08)' }}>
      {videoId ? (
        <div style={{ position: 'relative', paddingTop: '56.25%' }}>
          <iframe
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
            src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
            title="Heaven's Hospitality Ministries"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
      ) : (
        <div style={{ padding: 'clamp(28px,5vw,48px)', textAlign: 'center' }}>
          <div style={{ width: 64, height: 64, background: '#FF0000', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <PlayCircle size={28} color="white" />
          </div>
          <h3 style={{ fontFamily: 'Playfair Display,serif', fontSize: 20, color: 'white', marginBottom: 8 }}>Heaven's Hospitality Ministries</h3>
          <p style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.4)', letterSpacing: 1, marginBottom: 24 }}>@{YT_HANDLE}</p>
          <a href={YT_URL} target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#FF0000', color: 'white', fontFamily: 'Montserrat,sans-serif', fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', padding: '12px 24px', borderRadius: 6, textDecoration: 'none', marginBottom: 20 }}>
            <PlayCircle size={16} /> Watch on YouTube
          </a>
          <p style={{ fontFamily: 'Cormorant Garamond,serif', fontStyle: 'italic', fontSize: 14, color: 'rgba(255,255,255,0.3)' }}>
            Sermons, crusades, and ministry moments — updated regularly.
          </p>
        </div>
      )}
      <div style={{ padding: '12px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.3)', gap: 12, flexWrap: 'wrap' }}>
        <span style={{ fontFamily: 'Cormorant Garamond,serif', fontStyle: 'italic', fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>Watch our latest sermons</span>
        <a href={YT_URL} target="_blank" rel="noopener noreferrer"
          style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 10, letterSpacing: 1.5, color: 'var(--orange)', textTransform: 'uppercase', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
          View Channel
        </a>
      </div>
    </div>
  );
}

export default function HomeSocial() {
  return (
    <section style={{ background: 'linear-gradient(160deg, var(--navy) 0%, var(--navy-mid) 100%)', padding: 'clamp(64px,10vw,100px) clamp(16px,5vw,24px)', borderTop: '1px solid rgba(232,76,14,0.1)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(40px,7vw,56px)' }}>
          <div className="section-label" style={{ marginBottom: 14 }}>Follow Along</div>
          <div style={{ width: 56, height: 3, background: 'linear-gradient(90deg,var(--orange),var(--orange-light))', margin: '0 auto 24px', borderRadius: 2 }} />
          <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(28px,5vw,52px)', color: 'white', marginBottom: 14 }}>
            Join Our <span style={{ background: 'linear-gradient(90deg,#C03A08,#E84C0E,#FF8C55,#E84C0E)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'shimmer 3s linear infinite' }}>Community</span>
          </h2>
          <p style={{ fontFamily: 'Cormorant Garamond,serif', fontStyle: 'italic', fontSize: 'clamp(16px,2.5vw,20px)', color: 'rgba(255,255,255,0.6)', maxWidth: 560, margin: '0 auto' }}>
            Watch our latest messages and ministry moments on TikTok and YouTube.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,420px),1fr))', gap: 'clamp(24px,4vw,40px)', alignItems: 'start' }}>

          {/* TikTok */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, padding: '12px 16px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8 }}>
              <div style={{ width: 36, height: 36, background: '#010101', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0 }}>
                <TikTokIcon size={18} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 13, fontWeight: 700, color: 'white' }}>TikTok</div>
                <div style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.45)' }}>@heavenshospitality</div>
              </div>
              <a href={TT_URL} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '8px 16px', fontSize: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                <TikTokIcon size={12} /> Follow
              </a>
            </div>
            <div style={{ borderRadius: 10, overflow: 'hidden', background: '#010101', border: '1px solid rgba(255,255,255,0.08)', minHeight: 500, display: 'flex', alignItems: 'stretch' }}>
              <iframe
                src="https://www.tiktok.com/embed/@heavenshospitality"
                style={{ width: '100%', minHeight: 500, border: 'none', display: 'block' }}
                allow="fullscreen"
                title="Heaven's Hospitality Ministries TikTok"
                loading="lazy"
              />
            </div>
          </div>

          {/* YouTube */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, padding: '12px 16px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8 }}>
              <div style={{ width: 36, height: 36, background: '#FF0000', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <PlayCircle size={18} color="white" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 13, fontWeight: 700, color: 'white' }}>YouTube</div>
                <div style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.45)' }}>@{YT_HANDLE}</div>
              </div>
              <a href={YT_URL} target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#FF0000', color: 'white', fontFamily: 'Montserrat,sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', padding: '8px 14px', borderRadius: 4, textDecoration: 'none' }}>
                <PlayCircle size={12} /> Subscribe
              </a>
            </div>
            <PlayCircleEmbed />
          </div>

        </div>
      </div>
    </section>
  );
}
