'use client';
export default function HomeAbout() {
  return (
    <section id="about" style={{ background: 'var(--cream)', padding: '100px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
        {/* Left: decorative cross panel */}
        <div style={{ position: 'relative' }}>
          <div style={{
            background: 'linear-gradient(135deg, var(--deep-brown), var(--mid-brown))',
            borderRadius: 4,
            padding: 60,
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Cross */}
            <div style={{ fontSize: 80, marginBottom: 24, animation: 'float 4s ease-in-out infinite', display: 'block' }}>✝</div>
            <div style={{ color: 'var(--gold)', fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: 22, lineHeight: 1.7, marginBottom: 16 }}>
              "Welcome one another as Christ has welcomed you, for the glory of God."
            </div>
            <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 11, letterSpacing: 2, color: 'rgba(212,175,55,0.6)', textTransform: 'uppercase' }}>Romans 15:7</div>

            {/* Corner ornaments */}
            <div style={{ position: 'absolute', top: 16, left: 16, width: 30, height: 30, borderTop: '2px solid rgba(212,175,55,0.4)', borderLeft: '2px solid rgba(212,175,55,0.4)' }} />
            <div style={{ position: 'absolute', top: 16, right: 16, width: 30, height: 30, borderTop: '2px solid rgba(212,175,55,0.4)', borderRight: '2px solid rgba(212,175,55,0.4)' }} />
            <div style={{ position: 'absolute', bottom: 16, left: 16, width: 30, height: 30, borderBottom: '2px solid rgba(212,175,55,0.4)', borderLeft: '2px solid rgba(212,175,55,0.4)' }} />
            <div style={{ position: 'absolute', bottom: 16, right: 16, width: 30, height: 30, borderBottom: '2px solid rgba(212,175,55,0.4)', borderRight: '2px solid rgba(212,175,55,0.4)' }} />
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
            {[['🌍','Global Reach'],['📖','Daily Devotions'],['🎙️','Weekly Sermons'],['🙏','Prayer Community']].map(([icon, label]) => (
              <div key={label} style={{ background: 'white', padding: '20px', borderRadius: 4, textAlign: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid rgba(212,175,55,0.1)' }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
                <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--text-mid)' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: text */}
        <div>
          <div className="section-label" style={{ marginBottom: 16 }}>About Our Ministry</div>
          <div className="divider-gold" />
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(32px, 4vw, 48px)', marginBottom: 24, lineHeight: 1.2, color: 'var(--deep-brown)' }}>
            Reflecting the<br />
            <span className="gold-text">Hospitality of Heaven</span>
          </h2>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 19, lineHeight: 1.85, color: 'var(--text-mid)', marginBottom: 20 }}>
            Heaven's Hospitality Ministries is a global ministry dedicated to embodying the radical, transforming hospitality that God shows to every human soul. We believe that every person is a beloved child of God — deserving of welcome, love, and a seat at the table.
          </p>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 19, lineHeight: 1.85, color: 'var(--text-mid)', marginBottom: 32 }}>
            Through powerful preaching, daily devotional content, and community outreach, we carry the Gospel to the ends of the earth — serving, welcoming, and transforming lives by the power of the Holy Spirit.
          </p>
          <div style={{ borderLeft: '3px solid var(--gold)', paddingLeft: 20, marginBottom: 32 }}>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 20, color: 'var(--warm-brown)' }}>
              Our mission: To extend the table of Heaven — where everyone is invited, everyone is valued, and no one is left behind.
            </p>
          </div>
          <a href="https://www.tiktok.com/@heavenshospitality" target="_blank" rel="noopener" className="btn-primary">
            Follow on TikTok ↗
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about > div { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}
