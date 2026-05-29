'use client';
import { useState } from 'react';

export default function SubscribeSection() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setMsg(data.message || 'You\'ve been added to our community!');
        setEmail('');
        setName('');
      } else {
        setStatus('error');
        setMsg(data.error || 'Something went wrong.');
      }
    } catch {
      setStatus('error');
      setMsg('Failed to subscribe. Please try again.');
    }
  };

  return (
    <section
      className="cross-bg py-20 px-6"
      style={{ background: 'linear-gradient(135deg, #071428 0%, #0d2240 100%)' }}
    >
      <div className="max-w-2xl mx-auto text-center">
        <div className="section-title mb-4">Stay Connected</div>
        <h2
          className="font-display text-white mb-4"
          style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 400, letterSpacing: '2px' }}
        >
          Daily Devotions in Your Inbox
        </h2>
        <div className="gold-divider mx-auto mb-6" />
        <p
          className="font-serif text-gray-300 mb-10"
          style={{ fontSize: '20px', lineHeight: 1.7 }}
        >
          Receive daily devotions, sermon announcements, and ministry updates to nourish your faith journey.
        </p>

        {status === 'success' ? (
          <div
            className="py-8 px-6 rounded text-center"
            style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)' }}
          >
            <div style={{ color: '#c9a84c', fontSize: '32px', marginBottom: '12px' }}>✦</div>
            <p className="font-serif text-white" style={{ fontSize: '20px' }}>{msg}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Your name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="admin-input"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(201,168,76,0.3)',
                color: 'white',
                borderRadius: '2px',
                flex: 1,
              }}
            />
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="admin-input"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(201,168,76,0.3)',
                color: 'white',
                borderRadius: '2px',
                flex: 2,
              }}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-gold whitespace-nowrap"
              style={{ padding: '12px 28px' }}
            >
              {status === 'loading' ? 'Joining...' : 'Join Community'}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className="mt-4 text-sm" style={{ color: '#f87171' }}>{msg}</p>
        )}
      </div>
    </section>
  );
}
