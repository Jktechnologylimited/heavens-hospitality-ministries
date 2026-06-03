'use client';
import { useState } from 'react';
import { MessageCircle, Phone, Mail, Globe, CreditCard } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import dynamic from 'next/dynamic';
const OfferingModal = dynamic(() => import('./OfferingModal'), { ssr: false });

export default function HomeContact() {
  const [showOffering, setShowOffering] = useState(false);

  const contacts = [
    { icon: <Mail size={18} />, label: 'Email', value: 'hospitalityheavens@gmail.com', href: 'mailto:hospitalityheavens@gmail.com' },
    { icon: <MessageCircle size={18} />, label: 'WhatsApp', value: '+27 763 511 196', href: 'https://wa.me/27763511196' },
    { icon: <Phone size={18} />, label: 'Direct Call', value: '+234 913 868 8465', href: 'tel:+2349138688465' },
    { icon: <Globe size={18} />, label: 'Ministry', value: 'Global — Reaching the Nations', href: null },
  ];

  return (
    <>
      {showOffering && <OfferingModal onClose={() => setShowOffering(false)} />}

      {/* GIVE SECTION */}
      <section id="give" style={{ background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-mid) 50%, var(--navy-light) 100%)', padding: 'clamp(64px,10vw,100px) clamp(16px,5vw,24px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 30% 60%, rgba(232,76,14,0.08) 0%, transparent 50%), radial-gradient(circle at 70% 20%, rgba(232,76,14,0.06) 0%, transparent 40%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <div style={{ width: 56, height: 56, background: 'rgba(232,76,14,0.15)', border: '1.5px solid rgba(232,76,14,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <CreditCard size={24} color="var(--orange)" />
          </div>
          <div className="section-label" style={{ marginBottom: 16 }}>Support the Ministry</div>
          <div style={{ width: 56, height: 3, background: 'linear-gradient(90deg,var(--orange),var(--orange-light))', margin: '0 auto 24px', borderRadius: 2 }} />
          <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(28px,5vw,52px)', color: 'white', marginBottom: 20, lineHeight: 1.2 }}>
            Partner With <span style={{ background: 'linear-gradient(90deg,#C03A08,#E84C0E,#FF8C55,#E84C0E)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'shimmer 3s linear infinite' }}>Heaven's Mission</span>
          </h2>
          <p style={{ fontFamily: 'Cormorant Garamond,serif', fontStyle: 'italic', fontSize: 'clamp(16px,2.5vw,21px)', color: 'rgba(255,255,255,0.75)', maxWidth: 620, margin: '0 auto 40px', lineHeight: 1.8 }}>
            Your giving fuels crusades, free training, missions, and the spread of the Gospel to the nations. Every seed sown here carries eternal fruit.
          </p>
          <blockquote style={{ borderLeft: '3px solid var(--orange)', paddingLeft: 20, marginBottom: 40, display: 'inline-block', textAlign: 'left', maxWidth: 520 }}>
            <p style={{ fontFamily: 'Cormorant Garamond,serif', fontStyle: 'italic', fontSize: 'clamp(16px,2.5vw,20px)', color: 'rgba(255,255,255,0.8)', lineHeight: 1.8 }}>
              "Bring the whole tithe into the storehouse... and see if I will not throw open the floodgates of heaven."
            </p>
            <cite style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 11, color: 'var(--orange)', letterSpacing: 1, display: 'block', marginTop: 8 }}>Malachi 3:10</cite>
          </blockquote>
          <div style={{ display: 'flex', gap: 'clamp(12px,3vw,20px)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => setShowOffering(true)} className="btn-primary" style={{ padding: 'clamp(14px,3vw,18px) clamp(28px,6vw,48px)', fontSize: 'clamp(12px,2vw,15px)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <CreditCard size={16} /> Give an Offering
            </button>
            <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(232,76,14,0.2)', borderRadius: 8, padding: 'clamp(14px,3vw,18px) clamp(20px,4vw,32px)', textAlign: 'center' }}>
              <div style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 9, letterSpacing: 2, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: 4 }}>Bank Transfer · Access Bank</div>
              <div style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(18px,3vw,24px)', color: 'var(--orange)', fontWeight: 700 }}>1971079112</div>
              <div style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>HEAVEN'S HOSPITALITY MINISTRIES</div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ background: 'var(--off-white)', padding: 'clamp(64px,10vw,100px) clamp(16px,5vw,24px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,340px),1fr))', gap: 'clamp(40px,8vw,80px)' }}>
          <div>
            <div className="section-label" style={{ marginBottom: 16 }}>Get in Touch</div>
            <div style={{ width: 56, height: 3, background: 'linear-gradient(90deg,var(--orange),var(--orange-light))', marginBottom: 24, borderRadius: 2 }} />
            <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(28px,5vw,44px)', color: 'var(--navy)', marginBottom: 24, lineHeight: 1.2 }}>
              Connect With <span style={{ background: 'linear-gradient(135deg,var(--orange),var(--orange-light))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Our Ministry</span>
            </h2>
            <p style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(15px,2.5vw,19px)', color: 'var(--text-mid)', lineHeight: 1.85, marginBottom: 'clamp(28px,5vw,40px)' }}>
              Whether you need prayer, want to partner, or simply want to connect — Heaven's table is always open.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(14px,3vw,20px)' }}>
              {contacts.map(({ icon, label, value, href }) => (
                <div key={label} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{ width: 44, height: 44, background: 'var(--off-white)', border: '1.5px solid rgba(232,76,14,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--orange)', flexShrink: 0, boxShadow: 'var(--shadow)' }}>
                    {icon}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 10, letterSpacing: 2, color: 'var(--orange)', textTransform: 'uppercase', marginBottom: 3 }}>{label}</div>
                    {href ? (
                      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener"
                        style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(15px,2.5vw,18px)', color: 'var(--text-dark)', textDecoration: 'underline', textDecorationColor: 'rgba(232,76,14,0.3)' }}>
                        {value}
                      </a>
                    ) : (
                      <div style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(15px,2.5vw,18px)', color: 'var(--text-dark)' }}>{value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ background: 'var(--navy)', borderRadius: 12, padding: 'clamp(28px,5vw,40px)', color: 'white', marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
                <div style={{ width: 52, height: 52, background: '#25D366', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MessageCircle size={24} color="white" />
                </div>
              </div>
              <h3 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(20px,3.5vw,26px)', textAlign: 'center', marginBottom: 14 }}>Chat on WhatsApp</h3>
              <p style={{ fontFamily: 'Cormorant Garamond,serif', fontStyle: 'italic', fontSize: 'clamp(15px,2.5vw,17px)', color: 'rgba(255,255,255,0.7)', textAlign: 'center', lineHeight: 1.75, marginBottom: 24 }}>
                For prayer requests, partnership enquiries, or just to say hello.
              </p>
              <a href="https://wa.me/27763511196" target="_blank" rel="noopener"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, background: '#25D366', color: 'white', fontFamily: 'Montserrat,sans-serif', fontSize: 13, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', padding: '15px 24px', borderRadius: 8, textDecoration: 'none', transition: 'all 0.2s' }}>
                <MessageCircle size={16} /> Message on WhatsApp
              </a>
            </div>
            <div style={{ background: 'var(--orange-pale)', border: '1.5px solid rgba(232,76,14,0.2)', borderRadius: 12, padding: 'clamp(20px,4vw,28px)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <Phone size={18} color="var(--orange)" />
                <h4 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(18px,3vw,22px)', color: 'var(--navy)' }}>Prayer Line</h4>
              </div>
              <p style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(15px,2vw,17px)', color: 'var(--text-mid)', lineHeight: 1.7, marginBottom: 14 }}>
                Call us directly for urgent prayer needs.
              </p>
              <a href="tel:+2349138688465" style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(18px,3vw,22px)', color: 'var(--orange)', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Phone size={18} /> +234 913 868 8465
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
