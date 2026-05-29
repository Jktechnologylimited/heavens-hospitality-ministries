'use client';
import { useState } from 'react';

export default function HomePrayer() {
  const [form, setForm] = useState({ name: '', email: '', request: '', is_anonymous: false });
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/prayer', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(form),
      });
      if (res.ok) { setStatus('success'); setForm({ name:'', email:'', request:'', is_anonymous:false }); }
      else setStatus('error');
    } catch { setStatus('error'); }
  };

  return (
    <section id="prayer" style={{ background: 'var(--cream)', padding: '100px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="section-label" style={{ marginBottom: 16 }}>🙏 Prayer Ministry</div>
          <div style={{ width: 60, height: 1, background: 'linear-gradient(90deg, transparent, var(--gold), transparent)', margin: '0 auto 24px' }} />
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(32px, 4vw, 52px)', color: 'var(--deep-brown)', marginBottom: 16 }}>
            Submit a <span className="gold-text">Prayer Request</span>
          </h2>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 19, color: 'var(--text-light)' }}>
            We believe in the power of prayer. Share your burden and let our ministry team lift you up before God.
          </p>
        </div>

        {status === 'success' ? (
          <div style={{ textAlign: 'center', background: 'white', border: '1px solid rgba(212,175,55,0.2)', borderRadius: 4, padding: 48, boxShadow: 'var(--shadow)' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🙏</div>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, color: 'var(--deep-brown)', marginBottom: 12 }}>Prayer Received</h3>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 19, color: 'var(--text-light)', fontStyle: 'italic' }}>
              Your prayer request has been submitted. Our team will be interceding on your behalf. God hears every prayer.
            </p>
            <button onClick={() => setStatus('idle')} className="btn-primary" style={{ marginTop: 24 }}>Submit Another Request</button>
          </div>
        ) : (
          <form onSubmit={submit} style={{ background: 'white', borderRadius: 4, padding: 48, boxShadow: 'var(--shadow)', border: '1px solid rgba(212,175,55,0.1)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
              <div>
                <label style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--text-mid)', display: 'block', marginBottom: 8 }}>Name *</label>
                <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                  style={{ width: '100%', border: '1px solid rgba(212,175,55,0.3)', borderRadius: 2, padding: '12px 16px', fontFamily: 'Cormorant Garamond, serif', fontSize: 17, outline: 'none', color: 'var(--text-dark)' }}
                  placeholder="Your name" />
              </div>
              <div>
                <label style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--text-mid)', display: 'block', marginBottom: 8 }}>Email</label>
                <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                  style={{ width: '100%', border: '1px solid rgba(212,175,55,0.3)', borderRadius: 2, padding: '12px 16px', fontFamily: 'Cormorant Garamond, serif', fontSize: 17, outline: 'none', color: 'var(--text-dark)' }}
                  placeholder="your@email.com" />
              </div>
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--text-mid)', display: 'block', marginBottom: 8 }}>Prayer Request *</label>
              <textarea required value={form.request} onChange={e => setForm({...form, request: e.target.value})}
                rows={5}
                style={{ width: '100%', border: '1px solid rgba(212,175,55,0.3)', borderRadius: 2, padding: '12px 16px', fontFamily: 'Cormorant Garamond, serif', fontSize: 17, outline: 'none', resize: 'vertical', color: 'var(--text-dark)' }}
                placeholder="Share your prayer request..." />
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28, cursor: 'pointer' }}>
              <input type="checkbox" checked={form.is_anonymous} onChange={e => setForm({...form, is_anonymous: e.target.checked})} style={{ width: 16, height: 16 }} />
              <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 12, color: 'var(--text-mid)' }}>Submit anonymously</span>
            </label>
            {status === 'error' && <p style={{ color: '#c0392b', fontFamily: 'Montserrat, sans-serif', fontSize: 13, marginBottom: 16 }}>Something went wrong. Please try again.</p>}
            <button type="submit" disabled={status === 'loading'} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '16px' }}>
              {status === 'loading' ? 'Submitting...' : '🙏 Submit Prayer Request'}
            </button>
          </form>
        )}
      </div>
      <style>{`@media(max-width:600px){form>div:first-child{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}
