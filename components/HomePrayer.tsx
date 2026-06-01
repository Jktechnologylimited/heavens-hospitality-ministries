'use client';
import { Send } from 'lucide-react';
import { useState } from 'react';

export default function HomePrayer() {
  const [form, setForm] = useState({ name: '', email: '', request: '', is_anonymous: false });
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/prayer', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(form) });
      if (res.ok) { setStatus('success'); setForm({ name:'', email:'', request:'', is_anonymous:false }); }
      else setStatus('error');
    } catch { setStatus('error'); }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', border: '1px solid rgba(232,76,14,0.3)', borderRadius: 2,
    padding: 'clamp(11px,2vw,12px) clamp(12px,3vw,16px)',
    fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(15px,2vw,17px)',
    outline: 'none', color: 'var(--text-dark)', background: 'white',
    WebkitAppearance: 'none',
  };

  return (
    <section id="prayer" style={{ background: 'var(--off-white)', padding: 'clamp(64px,10vw,100px) clamp(16px,5vw,24px)' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(36px,7vw,56px)' }}>
          <div style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 16 }}> Prayer Ministry</div>
          <div style={{ width: 60, height: 1, background: 'linear-gradient(90deg,transparent,var(--orange),transparent)', margin: '0 auto 24px' }} />
          <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(28px,5vw,52px)', color: 'var(--navy)', marginBottom: 16, lineHeight: 1.2 }}>
            Submit a <span style={{ background: 'linear-gradient(135deg,var(--orange),var(--orange),var(--orange-light),var(--orange))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Prayer Request</span>
          </h2>
          <p style={{ fontFamily: 'Cormorant Garamond,serif', fontStyle: 'italic', fontSize: 'clamp(15px,2.5vw,19px)', color: 'var(--text-light)' }}>
            We believe in the power of prayer. Share your burden and let our team lift you up before God.
          </p>
        </div>

        {status === 'success' ? (
          <div style={{ textAlign: 'center', background: 'white', border: '1px solid rgba(232,76,14,0.2)', borderRadius: 4, padding: 'clamp(32px,6vw,48px)', boxShadow: 'var(--shadow)' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}></div>
            <h3 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(22px,4vw,28px)', color: 'var(--navy)', marginBottom: 12 }}>Prayer Received</h3>
            <p style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(15px,2.5vw,19px)', color: 'var(--text-light)', fontStyle: 'italic' }}>
              Your prayer request has been submitted. Our team will be interceding on your behalf.
            </p>
            <button onClick={() => setStatus('idle')} className="btn-primary" style={{ marginTop: 24 }}>Submit Another Request</button>
          </div>
        ) : (
          <form onSubmit={submit} style={{ background: 'white', borderRadius: 4, padding: 'clamp(24px,5vw,48px)', boxShadow: 'var(--shadow)', border: '1px solid rgba(232,76,14,0.1)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: 20, marginBottom: 20 }}>
              <div>
                <label style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 10, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--text-mid)', display: 'block', marginBottom: 8 }}>Name *</label>
                <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} style={inputStyle} placeholder="Your name" />
              </div>
              <div>
                <label style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 10, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--text-mid)', display: 'block', marginBottom: 8 }}>Email</label>
                <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} style={inputStyle} placeholder="your@email.com" />
              </div>
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 10, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--text-mid)', display: 'block', marginBottom: 8 }}>Prayer Request *</label>
              <textarea required value={form.request} onChange={e => setForm({...form, request: e.target.value})} rows={5}
                style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.7 }} placeholder="Share your prayer request..." />
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28, cursor: 'pointer' }}>
              <input type="checkbox" checked={form.is_anonymous} onChange={e => setForm({...form, is_anonymous: e.target.checked})} style={{ width: 18, height: 18, flexShrink: 0 }} />
              <span style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 'clamp(11px,2vw,12px)', color: 'var(--text-mid)' }}>Submit anonymously</span>
            </label>
            {status === 'error' && <p style={{ color: '#c0392b', fontFamily: 'Montserrat,sans-serif', fontSize: 13, marginBottom: 16 }}>Something went wrong. Please try again.</p>}
            <button type="submit" disabled={status === 'loading'} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: 'clamp(14px,3vw,16px)', fontSize: 'clamp(12px,2vw,13px)' }}>
              {status === 'loading' ? 'Submitting...' : ' Submit Prayer Request'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
