'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) router.push('/admin/dashboard');
      else setError('Invalid credentials. Please try again.');
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inp: React.CSSProperties = {
    width: '100%',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(232,76,14,0.2)',
    borderRadius: 6,
    padding: '13px 16px',
    color: 'white',
    fontFamily: 'Cormorant Garamond,serif',
    fontSize: 17,
    outline: 'none',
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #06101C 0%, #0B1A2E 60%, #0f2240 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <Image src="/logo.png" alt="HHM" width={60} height={60} style={{ objectFit: 'contain', marginBottom: 16 }} />
          <h1 style={{ fontFamily: 'Playfair Display,serif', fontSize: 26, color: 'var(--orange)', marginBottom: 6 }}>Admin Portal</h1>
          <p style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 10, letterSpacing: 2.5, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>Heaven's Hospitality Ministries</p>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(232,76,14,0.15)', borderRadius: 10, padding: 36 }}>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <label style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 10, letterSpacing: 2, color: 'rgba(232,76,14,0.8)', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
                Email Address
              </label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} style={inp} placeholder="admin@heavenshospitality.org" />
            </div>
            <div>
              <label style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 10, letterSpacing: 2, color: 'rgba(232,76,14,0.8)', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
                Password
              </label>
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)} style={inp} placeholder="••••••••" />
            </div>
            {error && <p style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 12, color: '#ff8a80' }}>{error}</p>}
            <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px', marginTop: 4 }}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
        <p style={{ textAlign: 'center', marginTop: 24, fontFamily: 'Montserrat,sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>
          <a href="/" style={{ color: 'rgba(232,76,14,0.5)' }}>Back to Website</a>
        </p>

        {/* JKTL Developer Credit */}
        <div style={{ textAlign: 'center', marginTop: 32, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <a href="https://www.jktl.com.ng" target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 8, textDecoration: 'none', opacity: 0.45, transition: 'opacity 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '0.45')}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/jktl-logo.png" alt="JK Technology Limited" style={{ height: 28, width: 'auto', objectFit: 'contain', filter: 'brightness(1.2)' }} />
            <div>
              <div style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 9, fontWeight: 700, color: 'rgba(100,160,255,0.6)', letterSpacing: 1.5, textTransform: 'uppercase' }}>JKTL V2 System</div>
              <div style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 8, color: 'rgba(255,255,255,0.25)', marginTop: 2 }}>Built by JK Technology Limited</div>
            </div>
          </a>
          <div style={{ marginTop: 10 }}>
            <a href="mailto:support@jktl.com.ng" style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 9, color: 'rgba(100,150,255,0.35)', textDecoration: 'none', letterSpacing: 0.5 }}>
              support@jktl.com.ng
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
