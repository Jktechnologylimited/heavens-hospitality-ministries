'use client';
export default function HomeContact() {
  return (
    <section id="contact" style={{ background: 'linear-gradient(135deg, var(--deep-brown), var(--mid-brown))', padding: '100px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80 }}>
        <div>
          <div className="section-label" style={{ marginBottom: 16 }}>Get in Touch</div>
          <div style={{ width: 60, height: 1, background: 'linear-gradient(90deg, transparent, #d4af37, transparent)', marginBottom: 24 }} />
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(32px, 4vw, 48px)', color: 'white', marginBottom: 24 }}>
            Connect With <span className="gold-text">Our Ministry</span>
          </h2>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 19, color: 'rgba(255,255,255,0.7)', lineHeight: 1.85, marginBottom: 40 }}>
            Whether you need prayer, want to partner with our ministry, or simply want to connect — we would love to hear from you. Heaven's table is always open.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              ['📧', 'Email', 'hello@heavenshospitality.org'],
              ['📱', 'TikTok', '@heavenshospitality'],
              ['🌍', 'Ministry', 'Global — Reaching the Nations'],
            ].map(([icon, label, value]) => (
              <div key={label} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ width: 44, height: 44, background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.25)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>
                  {icon}
                </div>
                <div>
                  <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, letterSpacing: 2, color: '#d4af37', textTransform: 'uppercase', marginBottom: 4 }}>{label}</div>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 18, color: 'rgba(255,255,255,0.85)' }}>{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div id="give" style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: 4, padding: 48 }}>
            <div style={{ fontSize: 40, textAlign: 'center', marginBottom: 20 }}>💛</div>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, color: 'white', textAlign: 'center', marginBottom: 16 }}>Support Our Ministry</h3>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 18, color: 'rgba(255,255,255,0.7)', textAlign: 'center', lineHeight: 1.8, marginBottom: 32 }}>
              Your generosity helps us reach more souls with the Gospel and extend the hospitality of Heaven to the world.
            </p>
            <div style={{ borderLeft: '2px solid #d4af37', paddingLeft: 16, marginBottom: 32 }}>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 18, color: 'rgba(255,255,255,0.8)' }}>
                "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."
              </p>
              <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 11, color: '#d4af37', marginTop: 8, letterSpacing: 1 }}>2 Corinthians 9:7</p>
            </div>
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: 13 }}>
              Give to the Ministry
            </button>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){#contact>div{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}
