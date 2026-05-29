'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({email, password}),
      });
      if (res.ok) {
        router.push('/admin/dashboard');
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(160deg, #0d0500, #1a0a00, #2e1200)', display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
      <div style={{ width:'100%', maxWidth:420 }}>
        {/* Logo */}
        <div style={{ textAlign:'center', marginBottom:48 }}>
          <div style={{ width:64, height:64, background:'linear-gradient(135deg,#a07820,#d4af37)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:30, margin:'0 auto 20px' }}>✝</div>
          <h1 style={{ fontFamily:'Playfair Display,serif', fontSize:28, color:'#d4af37', marginBottom:8 }}>Admin Portal</h1>
          <p style={{ fontFamily:'Montserrat,sans-serif', fontSize:11, letterSpacing:3, color:'rgba(255,255,255,0.4)', textTransform:'uppercase' }}>Heaven's Hospitality Ministries</p>
        </div>

        <div style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(212,175,55,0.2)', borderRadius:4, padding:40 }}>
          <form onSubmit={handleLogin} style={{ display:'flex', flexDirection:'column', gap:20 }}>
            <div>
              <label style={{ fontFamily:'Montserrat,sans-serif', fontSize:10, letterSpacing:2, color:'rgba(212,175,55,0.8)', textTransform:'uppercase', display:'block', marginBottom:8 }}>Email Address</label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                style={{ width:'100%', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(212,175,55,0.2)', borderRadius:2, padding:'12px 16px', color:'white', fontFamily:'Cormorant Garamond,serif', fontSize:17, outline:'none' }}
                placeholder="admin@heavenshospitality.org" />
            </div>
            <div>
              <label style={{ fontFamily:'Montserrat,sans-serif', fontSize:10, letterSpacing:2, color:'rgba(212,175,55,0.8)', textTransform:'uppercase', display:'block', marginBottom:8 }}>Password</label>
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
                style={{ width:'100%', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(212,175,55,0.2)', borderRadius:2, padding:'12px 16px', color:'white', fontFamily:'Cormorant Garamond,serif', fontSize:17, outline:'none' }}
                placeholder="••••••••" />
            </div>
            {error && <p style={{ fontFamily:'Montserrat,sans-serif', fontSize:12, color:'#ff8a80' }}>{error}</p>}
            <button type="submit" disabled={loading} className="btn-primary" style={{ width:'100%', justifyContent:'center', padding:'14px', marginTop:8 }}>
              {loading ? 'Signing In…' : 'Sign In to Admin'}
            </button>
          </form>
        </div>
        <p style={{ textAlign:'center', marginTop:24, fontFamily:'Montserrat,sans-serif', fontSize:11, color:'rgba(255,255,255,0.3)' }}>
          <a href="/" style={{ color:'rgba(212,175,55,0.5)' }}>← Back to Website</a>
        </p>
      </div>
    </div>
  );
}
