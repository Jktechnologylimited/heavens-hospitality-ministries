'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const NAV = [
  ['/admin/dashboard', 'Dashboard'],
  ['/admin/devotions', 'Devotions'],
  ['/admin/sermons', 'Sermons'],
  ['/admin/events', 'Events'],
  ['/admin/training', 'Training'],
  ['/admin/missions', 'Missions'],
  ['/admin/accomplishments', 'Accomplishments'],
  ['/admin/miracles', 'Miracles'],
  ['/admin/subscribers', 'Subscribers'],
  ['/admin/prayers', 'Prayer Requests'],
  ['/admin/offerings', 'Offerings'],
  ['/admin/settings', 'Settings'],
  ['/', 'View Website'],
];

export default function AdminLayout({ children, title }: { children: React.ReactNode; title: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    fetch('/api/auth/me').then(r => { if (!r.ok) router.push('/admin'); });
  }, [router]);

  // Collapse on mobile by default
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setCollapsed(true);
    }
  }, []);

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin');
  };

  const sidebarW = collapsed ? 56 : 220;

  return (
    <div style={{ minHeight: '100vh', background: '#06101C', display: 'flex', position: 'relative' }}>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(6,16,28,0.7)', zIndex: 98, backdropFilter: 'blur(4px)' }}
        />
      )}

      {/* SIDEBAR */}
      <aside style={{
        width: sidebarW,
        minWidth: sidebarW,
        background: '#0B1A2E',
        borderRight: '1px solid rgba(232,76,14,0.12)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.25s ease, min-width 0.25s ease',
        overflow: 'hidden',
        position: 'sticky',
        top: 0,
        height: '100vh',
        flexShrink: 0,
        zIndex: 10,
      }}>
        {/* Logo + toggle */}
        <div style={{
          height: 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          padding: collapsed ? '0' : '0 14px',
          borderBottom: '1px solid rgba(232,76,14,0.1)',
          flexShrink: 0,
        }}>
          {!collapsed && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, overflow: 'hidden' }}>
              <Image src="/logo.png" alt="HHM" width={30} height={30} style={{ objectFit: 'contain', flexShrink: 0 }} />
              <div style={{ overflow: 'hidden' }}>
                <div style={{ fontFamily: 'Playfair Display,serif', color: 'var(--orange)', fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap' }}>HHM Admin</div>
                <div style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 7, letterSpacing: 1.5, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Ministry Portal</div>
              </div>
            </div>
          )}
          {collapsed && (
            <Image src="/logo.png" alt="HHM" width={28} height={28} style={{ objectFit: 'contain' }} />
          )}
          <button
            onClick={() => setCollapsed(c => !c)}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            style={{
              background: 'rgba(232,76,14,0.1)',
              border: '1px solid rgba(232,76,14,0.2)',
              borderRadius: 4,
              color: 'var(--orange)',
              cursor: 'pointer',
              padding: '4px 6px',
              fontSize: 12,
              lineHeight: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              marginLeft: collapsed ? 0 : 6,
              transition: 'all 0.2s',
            }}
          >
            {collapsed ? '»' : '«'}
          </button>
        </div>

        {/* Nav links */}
        <nav style={{ padding: '10px 6px', flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
          {NAV.map(([href, label]) => {
            const active = pathname === href;
            const isViewSite = href === '/';
            return (
              <Link
                key={href}
                href={href}
                title={collapsed ? label : undefined}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: collapsed ? 0 : 10,
                  padding: collapsed ? '10px 0' : '9px 10px',
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  borderRadius: 6,
                  color: active ? 'var(--orange)' : isViewSite ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.7)',
                  fontFamily: 'Montserrat,sans-serif',
                  fontSize: 12,
                  fontWeight: active ? 700 : 500,
                  marginBottom: isViewSite ? 0 : 2,
                  background: active ? 'rgba(232,76,14,0.1)' : 'transparent',
                  borderLeft: active && !collapsed ? '2px solid var(--orange)' : '2px solid transparent',
                  transition: 'all 0.15s',
                  textDecoration: 'none',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  borderTop: isViewSite ? '1px solid rgba(232,76,14,0.1)' : 'none',
                  marginTop: isViewSite ? 8 : 0,
                  paddingTop: isViewSite ? 11 : undefined,
                }}
                onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'rgba(232,76,14,0.06)'; }}
                onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              >
                {/* Icon dot */}
                <span style={{
                  width: 7, height: 7, borderRadius: '50%',
                  background: active ? 'var(--orange)' : isViewSite ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.35)',
                  flexShrink: 0,
                  transition: 'background 0.15s',
                }} />
                {!collapsed && <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Sign out */}
        <div style={{ padding: '8px 6px 0', flexShrink: 0 }}>
          <button
            onClick={logout}
            title={collapsed ? 'Sign Out' : undefined}
            style={{
              width: '100%',
              padding: collapsed ? '10px 0' : '9px 10px',
              background: 'rgba(255,60,60,0.07)',
              border: '1px solid rgba(255,60,60,0.12)',
              borderRadius: 6,
              color: 'rgba(255,110,110,0.8)',
              fontFamily: 'Montserrat,sans-serif',
              fontSize: 12,
              cursor: 'pointer',
              textAlign: collapsed ? 'center' : 'left',
              display: 'flex',
              alignItems: 'center',
              justifyContent: collapsed ? 'center' : 'flex-start',
              gap: collapsed ? 0 : 8,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'rgba(255,100,100,0.5)', flexShrink: 0 }} />
            {!collapsed && 'Sign Out'}
          </button>
        </div>

        {/* JKTL Developer Credit */}
        <div style={{ borderTop: '1px solid rgba(232,76,14,0.08)', padding: collapsed ? '10px 4px' : '10px 8px', marginTop: 6, flexShrink: 0, overflow: 'hidden' }}>
          <a
            href="https://www.jktl.com.ng"
            target="_blank"
            rel="noopener noreferrer"
            title="JKTL V2 System — Built by JK Technology Limited"
            style={{ display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start', gap: collapsed ? 0 : 8, textDecoration: 'none', opacity: 0.5, transition: 'opacity 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '0.5')}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/jktl-logo.png" alt="JKTL" style={{ height: 20, width: 'auto', objectFit: 'contain', flexShrink: 0, filter: 'brightness(1.3)' }} />
            {!collapsed && (
              <div style={{ overflow: 'hidden' }}>
                <div style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 8, fontWeight: 700, color: 'rgba(100,160,255,0.7)', letterSpacing: 1, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>JKTL V2 System</div>
                <div style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 7, color: 'rgba(255,255,255,0.28)', whiteSpace: 'nowrap' }}>jktl.com.ng</div>
              </div>
            )}
          </a>
        </div>
      </aside>

      {/* MAIN */}
      <main style={{ flex: 1, padding: 'clamp(20px,3vw,36px)', overflow: 'auto', minWidth: 0 }}>
        {/* Mobile header */}
        <div style={{ display: 'none' }} className="admin-mobile-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, padding: '12px 16px', background: '#0B1A2E', borderRadius: 8, border: '1px solid rgba(232,76,14,0.1)' }}>
            <button onClick={() => setCollapsed(c => !c)} style={{ background: 'rgba(232,76,14,0.1)', border: '1px solid rgba(232,76,14,0.2)', borderRadius: 4, color: 'var(--orange)', cursor: 'pointer', padding: '6px 10px', fontSize: 14 }}>
              {collapsed ? '»' : '«'}
            </button>
            <h1 style={{ fontFamily: 'Playfair Display,serif', fontSize: 18, color: 'white', margin: 0 }}>{title}</h1>
          </div>
        </div>

        {/* Top bar with JKTL info */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
          <h1 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(20px,3vw,28px)', color: 'white', margin: 0 }} className="admin-desktop-title">{title}</h1>
          <a
            href="mailto:support@jktl.com.ng"
            style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(100,150,255,0.12)', borderRadius: 6, padding: '7px 14px', opacity: 0.6, transition: 'opacity 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '0.6')}
            title="Contact JKTL Support"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/jktl-logo.png" alt="JKTL" style={{ height: 16, width: 'auto', filter: 'brightness(1.3)' }} />
            <span style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 9, color: 'rgba(100,160,255,0.7)', letterSpacing: 0.5 }}>JKTL Support</span>
          </a>
        </div>
        {children}
      </main>

      <style>{`
        @media (max-width: 768px) {
          .admin-mobile-header { display: block !important; }
          .admin-desktop-title { display: none; }
        }
      `}</style>
    </div>
  );
}
