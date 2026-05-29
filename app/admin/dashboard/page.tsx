'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Stats {
  devotions: number;
  sermons: number;
  subscribers: number;
  prayers: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats>({ devotions:0, sermons:0, subscribers:0, prayers:0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/me').then(r => {
      if (!r.ok) router.push('/admin');
    });

    Promise.all([
      fetch('/api/devotions?limit=1').then(r=>r.json()),
      fetch('/api/sermons?limit=1').then(r=>r.json()),
      fetch('/api/newsletter').then(r=>r.json()),
      fetch('/api/prayer').then(r=>r.json()),
    ]).then(([d, s, n, p]) => {
      setStats({ devotions: d.total||0, sermons: s.total||0, subscribers: n.total||0, prayers: p.prayers?.length||0 });
    }).finally(() => setLoading(false));
  }, [router]);

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin');
  };

  return (
    <div style={{ minHeight:'100vh', background:'#0d0500', display:'flex' }}>
      {/* Sidebar */}
      <aside style={{ width:260, background:'rgba(255,255,255,0.03)', borderRight:'1px solid rgba(212,175,55,0.15)', padding:'32px 0', display:'flex', flexDirection:'column' }}>
        <div style={{ padding:'0 24px 32px', borderBottom:'1px solid rgba(212,175,55,0.1)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <div style={{ width:40, height:40, background:'linear-gradient(135deg,#a07820,#d4af37)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>✝</div>
            <div>
              <div style={{ fontFamily:'Playfair Display,serif', color:'#d4af37', fontSize:14, fontWeight:700 }}>HHM Admin</div>
              <div style={{ fontFamily:'Montserrat,sans-serif', fontSize:9, letterSpacing:2, color:'rgba(255,255,255,0.4)', textTransform:'uppercase' }}>Ministry Portal</div>
            </div>
          </div>
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
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='rgba(212,175,55,0.1)'; (e.currentTarget as HTMLElement).style.color='#d4af37'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='transparent'; (e.currentTarget as HTMLElement).style.color='rgba(255,255,255,0.7)'; }}
            >
              <span>{icon}</span> {label}
            </Link>
          ))}
        </nav>

        <div style={{ padding:'0 12px 16px' }}>
          <button onClick={logout} style={{ width:'100%', padding:'11px 14px', background:'rgba(255,0,0,0.08)', border:'1px solid rgba(255,0,0,0.2)', borderRadius:4, color:'rgba(255,100,100,0.8)', fontFamily:'Montserrat,sans-serif', fontSize:13, cursor:'pointer', textAlign:'left' }}>
            🚪 Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex:1, padding:'48px 40px', overflow:'auto' }}>
        <div style={{ marginBottom:40 }}>
          <h1 style={{ fontFamily:'Playfair Display,serif', fontSize:36, color:'white', marginBottom:8 }}>Dashboard</h1>
          <p style={{ fontFamily:'Cormorant Garamond,serif', fontStyle:'italic', fontSize:18, color:'rgba(255,255,255,0.5)' }}>Welcome back to Heaven's Hospitality Ministries admin portal.</p>
        </div>

        {/* Stats */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:20, marginBottom:48 }}>
          {[
            { label:'Total Devotions', value: stats.devotions, icon:'📖', href:'/admin/devotions' },
            { label:'Sermons Posted', value: stats.sermons, icon:'🎙️', href:'/admin/sermons' },
            { label:'Subscribers', value: stats.subscribers, icon:'📧', href:'/admin/subscribers' },
            { label:'Prayer Requests', value: stats.prayers, icon:'🙏', href:'/admin/prayers' },
          ].map(item => (
            <Link key={item.label} href={item.href} style={{ textDecoration:'none' }}>
              <div style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(212,175,55,0.15)', borderRadius:4, padding:'28px 24px', transition:'all 0.2s', cursor:'pointer' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor='rgba(212,175,55,0.4)'; (e.currentTarget as HTMLElement).style.background='rgba(212,175,55,0.05)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor='rgba(212,175,55,0.15)'; (e.currentTarget as HTMLElement).style.background='rgba(255,255,255,0.04)'; }}
              >
                <div style={{ fontSize:32, marginBottom:12 }}>{item.icon}</div>
                <div style={{ fontFamily:'Playfair Display,serif', fontSize:36, color:'#d4af37', fontWeight:700 }}>{loading ? '—' : item.value}</div>
                <div style={{ fontFamily:'Montserrat,sans-serif', fontSize:11, letterSpacing:1, color:'rgba(255,255,255,0.5)', textTransform:'uppercase', marginTop:4 }}>{item.label}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:24, color:'white', marginBottom:20 }}>Quick Actions</h2>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:16 }}>
          {[
            { href:'/admin/devotions/new', label:'Create Devotion', icon:'✍️', desc:'Post a new daily devotion' },
            { href:'/admin/sermons/new', label:'Add Sermon', icon:'🎙️', desc:'Upload a new sermon' },
            { href:'/admin/subscribers', label:'View Subscribers', icon:'📧', desc:'Manage newsletter list' },
            { href:'/api/init', label:'Init Database', icon:'🗄️', desc:'Set up database tables', external:true },
          ].map(item => (
            item.external ? (
              <a key={item.label} href={item.href} target="_blank" rel="noopener"
                style={{ display:'block', background:'rgba(255,255,255,0.03)', border:'1px solid rgba(212,175,55,0.12)', borderRadius:4, padding:24, textDecoration:'none', transition:'all 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor='rgba(212,175,55,0.3)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor='rgba(212,175,55,0.12)'; }}
              >
                <div style={{ fontSize:28, marginBottom:10 }}>{item.icon}</div>
                <div style={{ fontFamily:'Montserrat,sans-serif', fontSize:14, fontWeight:600, color:'white', marginBottom:4 }}>{item.label}</div>
                <div style={{ fontFamily:'Cormorant Garamond,serif', fontSize:15, color:'rgba(255,255,255,0.5)' }}>{item.desc}</div>
              </a>
            ) : (
              <Link key={item.label} href={item.href}
                style={{ display:'block', background:'rgba(255,255,255,0.03)', border:'1px solid rgba(212,175,55,0.12)', borderRadius:4, padding:24, textDecoration:'none', transition:'all 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor='rgba(212,175,55,0.3)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor='rgba(212,175,55,0.12)'; }}
              >
                <div style={{ fontSize:28, marginBottom:10 }}>{item.icon}</div>
                <div style={{ fontFamily:'Montserrat,sans-serif', fontSize:14, fontWeight:600, color:'white', marginBottom:4 }}>{item.label}</div>
                <div style={{ fontFamily:'Cormorant Garamond,serif', fontSize:15, color:'rgba(255,255,255,0.5)' }}>{item.desc}</div>
              </Link>
            )
          ))}
        </div>
      </main>
    </div>
  );
}
