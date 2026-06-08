'use client';
import { SiTiktok } from 'react-icons/si';
export default function HomeAbout() {
  return (
    <section id="about" style={{ background: 'var(--off-white)', padding: 'clamp(64px,10vw,100px) clamp(16px,5vw,24px)' }}>
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
        gap: 'clamp(40px,8vw,80px)',
        alignItems: 'center',
      }}>
        {/* Left: Pastor photo stack */}
        <div style={{ position: 'relative' }}>
          {/* Main photo */}
          <div style={{
            borderRadius: 12, overflow: 'hidden',
            boxShadow: '0 24px 64px rgba(11,26,46,0.2)',
            position: 'relative',
            aspectRatio: '4/5',
            maxHeight: 560,
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/pastor-1.jpg"
              alt="Evangelist Bob Pepple"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
            />
            {/* Overlay gradient at bottom */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(transparent, rgba(11,26,46,0.85))' }} />
            {/* Name tag */}
            <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20 }}>
              <div style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 10, letterSpacing: 3, color: 'rgba(232,76,14,0.9)', textTransform: 'uppercase', marginBottom: 4 }}>Founder & Senior Evangelist</div>
              <div style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(18px,3vw,24px)', color: 'white', fontWeight: 700 }}>Evangelist Bob Edward</div>
            </div>
            {/* Orange border accent */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, var(--orange), var(--orange-light))' }} />
          </div>

          {/* Floating ministry photo */}
          <div style={{
            position: 'absolute', bottom: -24, right: -20,
            width: 'clamp(120px,28vw,180px)', aspectRatio: '1',
            borderRadius: 10, overflow: 'hidden',
            border: '4px solid white',
            boxShadow: '0 12px 32px rgba(11,26,46,0.25)',
            display: 'none',
          }} className="about-float">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/ministry-2.jpg" alt="Ministry prayer" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          {/* Stats strip */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginTop: 16 }}>
            {[
              ['20+', 'Nations'],
              ['100s', 'Crusades'],
              ['1000s', 'Souls Won'],
            ].map(([num, label]) => (
              <div key={label} style={{ background: 'white', borderRadius: 8, padding: 'clamp(12px,2.5vw,16px) 8px', textAlign: 'center', boxShadow: '0 2px 12px rgba(11,26,46,0.08)', border: '1px solid rgba(11,26,46,0.06)' }}>
                <div style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(18px,3vw,24px)', color: 'var(--orange)', fontWeight: 700 }}>{num}</div>
                <div style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 'clamp(8px,1.5vw,10px)', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--text-light)', marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>

          <style>{`@media(min-width:600px){ .about-float{ display:block !important; } }`}</style>
        </div>

        {/* Right: text */}
        <div>
          <div className="section-label" style={{ marginBottom: 16 }}>About Our Ministry</div>
          <div style={{ width: 56, height: 3, background: 'linear-gradient(90deg,var(--orange),var(--orange-light))', marginBottom: 20, borderRadius: 2 }} />
          <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(28px,5vw,48px)', marginBottom: 20, lineHeight: 1.2, color: 'var(--navy)' }}>
            Reflecting the<br />
            <span style={{ background: 'linear-gradient(135deg,var(--orange),var(--orange-light))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Hospitality of Heaven</span>
          </h2>
          <p style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(16px,2.5vw,19px)', lineHeight: 1.85, color: 'var(--text-mid)', marginBottom: 20 }}>
            Heaven's Hospitality Ministries is a global ministry founded by <strong>Evangelist Bob Edward</strong> — dedicated to embodying the radical, transforming hospitality that God shows to every human soul.
          </p>
          <p style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(16px,2.5vw,19px)', lineHeight: 1.85, color: 'var(--text-mid)', marginBottom: 20 }}>
            From powerful crusades across Africa to healing services, free training, and daily online ministry — we carry the Gospel to the ends of the earth, serving, welcoming, and transforming lives by the power of the Holy Spirit.
          </p>
          <p style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(16px,2.5vw,19px)', lineHeight: 1.85, color: 'var(--text-mid)', marginBottom: 28 }}>
            Every person deserves to experience the warmth of God's love — and Heaven's table is always open.
          </p>
          <div style={{ borderLeft: '3px solid var(--orange)', paddingLeft: 20, marginBottom: 32, background: 'var(--orange-pale)', borderRadius: '0 8px 8px 0', padding: '16px 20px' }}>
            <p style={{ fontFamily: 'Cormorant Garamond,serif', fontStyle: 'italic', fontSize: 'clamp(16px,2.5vw,20px)', color: 'var(--navy)' }}>
              "Our mission: To extend the table of Heaven — where everyone is invited, everyone is valued, and no one is left behind."
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="https://www.tiktok.com/@heavenshospitality" target="_blank" rel="noopener" className="btn-primary">
              Follow on TikTok 
            </a>
            <a href="https://wa.me/27763511196" target="_blank" rel="noopener" style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#25D366', color:'white', fontFamily:'Montserrat,sans-serif', fontSize:12, fontWeight:700, letterSpacing:1.5, textTransform:'uppercase', padding:'13px 24px', borderRadius:4, textDecoration:'none', transition:'all 0.2s' }}>
               WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
