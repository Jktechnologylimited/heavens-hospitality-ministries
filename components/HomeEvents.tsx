'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function HomeEvents() {
  const [events, setEvents] = useState<any[]>([]);
  useEffect(() => { fetch('/api/events').then(r=>r.json()).then(d=>setEvents((d.events||[]).filter((e:any)=>new Date(e.event_date)>=new Date()).slice(0,3))).catch(()=>{}); }, []);

  if (events.length === 0) return null;

  return (
    <section style={{ background:'var(--orange-pale)', padding:'clamp(48px,8vw,72px) clamp(16px,5vw,24px)', borderTop:'3px solid var(--orange)' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'clamp(24px,5vw,36px)', flexWrap:'wrap', gap:16 }}>
          <div>
            <div className="section-label" style={{ marginBottom:8 }}>Upcoming</div>
            <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(24px,4vw,40px)', color:'var(--navy)' }}>Events & <span className="accent-text">Gatherings</span></h2>
          </div>
          <Link href="/events" className="btn-outline">View All Events →</Link>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(min(100%,280px),1fr))', gap:'clamp(14px,3vw,20px)' }}>
          {events.map((e:any) => {
            const d = new Date(e.event_date);
            return (
              <div key={e.id} className="card-ministry" style={{ display:'flex', gap:0, overflow:'hidden' }}>
                <div style={{ background:'linear-gradient(135deg,var(--orange),var(--orange-light))', padding:'clamp(16px,3vw,20px)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minWidth:'clamp(60px,12vw,80px)', flexShrink:0 }}>
                  <div style={{ fontFamily:'Montserrat,sans-serif', fontSize:10, fontWeight:700, color:'rgba(255,255,255,0.8)', textTransform:'uppercase', letterSpacing:1 }}>{d.toLocaleDateString('en',{month:'short'})}</div>
                  <div style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(24px,5vw,32px)', color:'white', fontWeight:700, lineHeight:1 }}>{d.getDate()}</div>
                </div>
                <div style={{ padding:'clamp(14px,3vw,18px)', flex:1, minWidth:0 }}>
                  <h3 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(15px,2.5vw,18px)', color:'var(--navy)', lineHeight:1.3, marginBottom:6, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{e.title}</h3>
                  <div style={{ fontFamily:'Montserrat,sans-serif', fontSize:10, color:'var(--text-light)', letterSpacing:0.5, marginBottom:6 }}>
                    {d.toLocaleTimeString('en',{hour:'2-digit',minute:'2-digit'})}
                    {e.is_online ? ' · Online Online' : e.location ? ` · ${e.location}` : ''}
                  </div>
                  {e.is_online && e.meeting_link && <a href={e.meeting_link} target="_blank" rel="noopener" style={{ fontFamily:'Montserrat,sans-serif', fontSize:10, color:'var(--orange)', letterSpacing:1, textTransform:'uppercase', fontWeight:700 }}>Join Online →</a>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
