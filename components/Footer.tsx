'use client';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ background: '#0d0500', borderTop: '1px solid rgba(212,175,55,0.2)', color: 'rgba(255,255,255,0.7)', paddingTop: 64 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 48, paddingBottom: 48 }}>
        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ width: 42, height: 42, background: 'linear-gradient(135deg,#a07820,#d4af37)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>✝</div>
            <div>
              <div style={{ fontFamily: 'Playfair Display, serif', color: '#d4af37', fontSize: 18, fontWeight: 700 }}>Heaven's Hospitality</div>
              <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>Ministries</div>
            </div>
          </div>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 16, lineHeight: 1.8, color: 'rgba(255,255,255,0.6)', marginBottom: 20 }}>
            Spreading the warmth, love, and hospitality of Heaven to every nation, tribe, and tongue.
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            <a href="https://www.tiktok.com/@heavenshospitality" target="_blank" rel="noopener" style={{ width: 36, height: 36, background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d4af37', fontSize: 16, transition: 'all 0.2s' }}>
              𝕋
            </a>
            <a href="#" style={{ width: 36, height: 36, background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d4af37', fontSize: 14, transition: 'all 0.2s' }}>
              f
            </a>
            <a href="#" style={{ width: 36, height: 36, background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d4af37', fontSize: 14, transition: 'all 0.2s' }}>
              ▶
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#d4af37', marginBottom: 24 }}>Ministry</h4>
          {[['/', 'Home'],['/#about','About Us'],['/devotions','Daily Devotions'],['/sermons','Sermons'],['/sermons?series=all','Sermon Series']].map(([href, label]) => (
            <Link key={href} href={href} style={{ display: 'block', fontFamily: 'Cormorant Garamond, serif', fontSize: 16, color: 'rgba(255,255,255,0.6)', marginBottom: 10, transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#d4af37')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
            >{label}</Link>
          ))}
        </div>

        {/* Connect */}
        <div>
          <h4 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#d4af37', marginBottom: 24 }}>Connect</h4>
          {[['/#contact','Contact Us'],['/#newsletter','Subscribe'],['/#prayer','Prayer Requests'],['/#give','Give / Support']].map(([href, label]) => (
            <Link key={href} href={href} style={{ display: 'block', fontFamily: 'Cormorant Garamond, serif', fontSize: 16, color: 'rgba(255,255,255,0.6)', marginBottom: 10, transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#d4af37')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
            >{label}</Link>
          ))}
        </div>

        {/* Scripture */}
        <div>
          <h4 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#d4af37', marginBottom: 24 }}>Our Foundation</h4>
          <blockquote style={{ borderLeft: '2px solid #d4af37', paddingLeft: 16, fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 17, color: 'rgba(255,255,255,0.7)', lineHeight: 1.8 }}>
            "For I was hungry and you gave me food, I was thirsty and you gave me drink, I was a stranger and you welcomed me."
          </blockquote>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 11, color: '#d4af37', marginTop: 12, letterSpacing: 1 }}>Matthew 25:35</p>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(212,175,55,0.1)', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, maxWidth: 1200, margin: '0 auto' }}>
        <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.4)', letterSpacing: 0.5 }}>
          © {new Date().getFullYear()} Heaven's Hospitality Ministries. All rights reserved.
        </p>
        <Link href="/admin" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: 1 }}>
          Admin Portal
        </Link>
      </div>
    </footer>
  );
}
