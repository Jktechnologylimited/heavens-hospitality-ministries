'use client';
import { useSiteContent } from '@/lib/useSiteContent';
import { Mail } from 'lucide-react';
import { useState } from 'react';

export default function HomeNewsletter() {
  const { get } = useSiteContent();
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
      if (res.ok) { setStatus('success'); setMsg("You're now part of our family! Check your inbox."); setEmail(''); setName(''); }
      else { setStatus('error'); setMsg(data.error || 'Something went wrong.'); }
    } catch { setStatus('error'); setMsg('Network error. Please try again.'); }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(232,76,14,0.25)', borderRadius: 2,
    padding: 'clamp(12px,2vw,14px) clamp(14px,3vw,18px)',
    color: 'white', fontFamily: 'Cormorant Garamond, serif',
    fontSize: 'clamp(15px,2vw,17px)', outline: 'none',
    WebkitAppearance: 'none',
  };

  return (
    <section id="newsletter" style={{
      background: 'linear-gradient(135deg, var(--navy-mid) 0%, var(--navy) 50%, var(--navy-light) 100%)',
      padding: 'clamp(64px,10vw,100px) clamp(16px,5vw,24px)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(232,76,14,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(232,76,14,0.05) 0%, transparent 40%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
        <div style={{ fontSize: 'clamp(36px,8vw,48px)', marginBottom: 16 }}>✉️</div>
        <div style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: 4, textTransform: 'uppercase', color: 'rgba(232,76,14,0.8)', marginBottom: 16 }}>Daily Devotions Newsletter</div>
        <div style={{ width: 60, height: 1, background: 'linear-gradient(90deg,transparent,var(--orange),transparent)', margin: '0 auto 24px' }} />
        <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(26px,5vw,52px)', color: 'white', marginBottom: 16, lineHeight: 1.2 }}>
          Start Every Morning<br />
          <span style={{ background: 'linear-gradient(135deg,var(--orange),var(--orange),var(--orange-light),var(--orange))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>With Heaven's Word</span>
        </h2>
        <p style={{ fontFamily: 'Cormorant Garamond,serif', fontStyle: 'italic', fontSize: 'clamp(16px,2.5vw,20px)', color: 'rgba(255,255,255,0.7)', marginBottom: 'clamp(32px,6vw,48px)', lineHeight: 1.8 }}>
          Subscribe to receive daily devotions, sermon updates, and ministry news directly to your inbox.
        </p>

        {status === 'success' ? (
          <div style={{ background: 'rgba(232,76,14,0.15)', border: '1px solid rgba(232,76,14,0.4)', borderRadius: 4, padding: 'clamp(24px,5vw,32px)' }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}></div>
            <p style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(16px,2.5vw,20px)', color: 'var(--orange)' }}>{msg}</p>
          </div>
        ) : (
          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: 16 }}>
              <input type="text" placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} style={inputStyle} />
              <input type="email" placeholder="Your Email *" value={email} onChange={e => setEmail(e.target.value)} required style={inputStyle} />
            </div>
            {status === 'error' && <p style={{ color: '#ff8a80', fontFamily: 'Montserrat,sans-serif', fontSize: 13 }}>{msg}</p>}
            <button type="submit" disabled={status === 'loading'} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: 'clamp(14px,3vw,16px)', fontSize: 'clamp(11px,2vw,14px)' }}>
              {status === 'loading' ? 'Subscribing...' : ' Subscribe to Daily Devotions '}
            </button>
          </form>
        )}
        <p style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 16, letterSpacing: 0.5 }}>
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}
