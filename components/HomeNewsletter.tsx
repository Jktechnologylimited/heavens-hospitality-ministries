'use client';
import { useState } from 'react';

export default function HomeNewsletter() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle');
  const [msg, setMsg] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, name}),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setMsg("You're now part of our family! Check your inbox for a welcome message.");
        setEmail(''); setName('');
      } else {
        setStatus('error');
        setMsg(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMsg('Network error. Please try again.');
    }
  };

  return (
    <section id="newsletter" style={{ background: 'linear-gradient(135deg, var(--mid-brown) 0%, var(--deep-brown) 50%, var(--warm-brown) 100%)', padding: '100px 24px', position: 'relative', overflow: 'hidden' }}>
      {/* Background pattern */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(212,175,55,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(212,175,55,0.05) 0%, transparent 40%)' }} />

      <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>✉️</div>
        <div className="section-label" style={{ marginBottom: 16 }}>Daily Devotions Newsletter</div>
        <div style={{ width: 60, height: 1, background: 'linear-gradient(90deg, transparent, #d4af37, transparent)', margin: '0 auto 24px' }} />
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(32px, 4vw, 52px)', color: 'white', marginBottom: 16 }}>
          Start Every Morning<br />
          <span className="gold-text">With Heaven's Word</span>
        </h2>
        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 20, color: 'rgba(255,255,255,0.7)', marginBottom: 48, lineHeight: 1.8 }}>
          Subscribe to receive daily devotions, sermon updates, and ministry news directly to your inbox.
        </p>

        {status === 'success' ? (
          <div style={{ background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.4)', borderRadius: 4, padding: 32 }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>🙏</div>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, color: '#d4af37' }}>{msg}</p>
          </div>
        ) : (
          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={e => setName(e.target.value)}
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(212,175,55,0.25)', borderRadius: 2, padding: '14px 18px', color: 'white', fontFamily: 'Cormorant Garamond, serif', fontSize: 17, outline: 'none' }}
              />
              <input
                type="email"
                placeholder="Your Email *"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(212,175,55,0.25)', borderRadius: 2, padding: '14px 18px', color: 'white', fontFamily: 'Cormorant Garamond, serif', fontSize: 17, outline: 'none' }}
              />
            </div>
            {status === 'error' && <p style={{ color: '#ff8a80', fontFamily: 'Montserrat, sans-serif', fontSize: 13 }}>{msg}</p>}
            <button type="submit" disabled={status === 'loading'} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: 14 }}>
              {status === 'loading' ? 'Subscribing...' : '✦ Subscribe to Daily Devotions ✦'}
            </button>
          </form>
        )}
        <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 16, letterSpacing: 0.5 }}>
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>

      <style>{`@media(max-width:600px){form>div{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}
