'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLayout({ children, title }: { children: React.ReactNode; title: string }) {
  const router = useRouter();

  useEffect(() => {
    fetch('/api/auth/me').then(r => {
      if (!r.ok) router.push('/admin');
    });
  }, [router]);

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin');
  };

  return (
    <div style={{ minHeight:'100vh', background:'#0d0500', display:'flex' }}>
      <aside style={{ width:260, background:'rgba(255,255,255,0.03)', borderRight:'1px solid rgba(212,175,55,0.15)', padding:'32px 0', display:'flex', flexDirection:'column', flexShrink:0 }}>
        <div style={{ padding:'0 24px 32px', borderBottom:'1px solid rgba(212,175,55,0.1)' }}>
          <Link href="/admin/dashboard" style={{ display:'flex', alignItems:'center', gap:12, textDecoration:'none' }}>
            <div style={{ width:40, height:40, background:'linear-gradient(135deg,#a07820,#d4af37)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>✝</div>
            <div>
              <div style={{ fontFamily:'Playfair Display,serif', color:'#d4af37', fontSize:14, fontWeight:700 }}>HHM Admin</div>
              <div style={{ fontFamily:'Montserrat,sans-serif', fontSize:9, letterSpacing:2, color:'rgba(255,255,255,0.4)', textTransform:'uppercase' }}>Ministry Portal</div>
            </div>
          </Link>
        </div>
        <nav style={{ padding:'24px 12px', flex:1 }}>
          {[
            ['/', '🏠', 'Website'],
            ['/admin/dashboard', '📊', 'Dashboard'],
            ['/admin/devotions', '📖', 'Devotions'],
            ['/admin/sermons', '🎙️', 'Sermons'],
            ['/admin/subscribers', '📧', 'Subscribers'],
            ['/admin/prayers', '🙏', 'Prayer Requests'],
          ].map(([href, icon, label]) => (
            <Link key={href} href={href} style={{ display:'flex', alignItems:'center', gap:12, padding:'11px 14px', borderRadius:4, color:'rgba(255,255,255,0.7)', fontFamily:'Montserrat,sans-serif', fontSize:13, fontWeight:500, marginBottom:2, transition:'all 0.2s', textDecoration:'none' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background='rgba(212,175,55,0.1)'; el.style.color='#d4af37'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background='transparent'; el.style.color='rgba(255,255,255,0.7)'; }}
            >{icon} {label}</Link>
          ))}
        </nav>
        <div style={{ padding:'0 12px 16px' }}>
          <button onClick={logout} style={{ width:'100%', padding:'11px 14px', background:'rgba(255,0,0,0.08)', border:'1px solid rgba(255,0,0,0.2)', borderRadius:4, color:'rgba(255,100,100,0.8)', fontFamily:'Montserrat,sans-serif', fontSize:13, cursor:'pointer', textAlign:'left' }}>
            🚪 Sign Out
          </button>
        </div>
      </aside>
      <main style={{ flex:1, padding:'48px 40px', overflow:'auto' }}>
        <h1 style={{ fontFamily:'Playfair Display,serif', fontSize:32, color:'white', marginBottom:32 }}>{title}</h1>
        {children}
      </main>
    </div>
  );
}
