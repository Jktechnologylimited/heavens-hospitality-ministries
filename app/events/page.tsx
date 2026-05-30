'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Event { id:number; title:string; description:string; event_date:string; end_date:string; location:string; is_online:boolean; meeting_link:string; image_url:string; }

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { fetch('/api/events').then(r=>r.json()).then(d=>setEvents(d.events||[])).finally(()=>setLoading(false)); }, []);

  const upcoming = events.filter(e => new Date(e.event_date) >= new Date());
  const past = events.filter(e => new Date(e.event_date) < new Date());

  return (
    <>
      <Navbar />
      <main>
        <div style={{ background:'linear-gradient(160deg,var(--navy),var(--navy-mid))', padding:'clamp(100px,15vw,140px) clamp(16px,5vw,24px) clamp(60px,10vw,80px)', textAlign:'center', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(circle at 50% 30%, rgba(232,76,14,0.1) 0%, transparent 60%)', pointerEvents:'none' }} />
          <div className="section-label" style={{ marginBottom:16 }}>Ministry Calendar</div>
          <div style={{ width:56, height:3, background:'linear-gradient(90deg,var(--orange),var(--orange-light))', margin:'0 auto 24px', borderRadius:2 }} />
          <h1 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(36px,7vw,68px)', color:'white', marginBottom:16, lineHeight:1.15 }}>
            Events & <span className="accent-shimmer">Gatherings</span>
          </h1>
          <p style={{ fontFamily:'Cormorant Garamond,serif', fontStyle:'italic', fontSize:'clamp(16px,2.5vw,22px)', color:'rgba(255,255,255,0.7)', maxWidth:580, margin:'0 auto' }}>
            Join us in person or online for life-changing ministry events, crusades, and special gatherings.
          </p>
        </div>

        <div style={{ background:'var(--off-white)', padding:'clamp(48px,8vw,80px) clamp(16px,5vw,24px)' }}>
          <div style={{ maxWidth:1100, margin:'0 auto' }}>
            {loading ? (
              <p style={{ textAlign:'center', color:'var(--text-light)', fontFamily:'Cormorant Garamond,serif', fontSize:20, fontStyle:'italic', padding:'60px 0' }}>Loading events…</p>
            ) : events.length === 0 ? (
              <div style={{ textAlign:'center', padding:'80px 0' }}>
                <div style={{ fontSize:56, marginBottom:16 }}></div>
                <h3 style={{ fontFamily:'Playfair Display,serif', fontSize:28, color:'var(--navy)', marginBottom:12 }}>Events Coming Soon</h3>
                <p style={{ fontFamily:'Cormorant Garamond,serif', fontSize:18, color:'var(--text-light)', fontStyle:'italic' }}>Check back soon for upcoming ministry events and gatherings.</p>
              </div>
            ) : (
              <>
                {upcoming.length > 0 && (
                  <>
                    <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(24px,4vw,36px)', color:'var(--navy)', marginBottom:28 }}>Upcoming Events</h2>
                    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(min(100%,320px),1fr))', gap:'clamp(16px,3vw,24px)', marginBottom:56 }}>
                      {upcoming.map(e => <EventCard key={e.id} event={e} upcoming />)}
                    </div>
                  </>
                )}
                {past.length > 0 && (
                  <>
                    <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(22px,3.5vw,30px)', color:'var(--text-light)', marginBottom:24 }}>Past Events</h2>
                    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(min(100%,300px),1fr))', gap:'clamp(14px,3vw,20px)', opacity:0.7 }}>
                      {past.map(e => <EventCard key={e.id} event={e} upcoming={false} />)}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function EventCard({ event: e, upcoming }: { event: any; upcoming: boolean }) {
  const date = new Date(e.event_date);
  return (
    <div className="card-ministry" style={{ display:'flex', flexDirection:'column' }}>
      <div style={{ background:`linear-gradient(135deg, ${upcoming?'var(--navy)':'#2a3f5f'}, ${upcoming?'var(--navy-light)':'#3a5070'})`, padding:'clamp(20px,4vw,28px)', display:'flex', gap:16, alignItems:'flex-start' }}>
        <div style={{ background: upcoming ? 'linear-gradient(135deg,var(--orange),var(--orange-light))' : 'rgba(255,255,255,0.15)', borderRadius:8, padding:'10px 14px', textAlign:'center', flexShrink:0 }}>
          <div style={{ fontFamily:'Montserrat,sans-serif', fontSize:10, fontWeight:700, color: upcoming ? 'white' : 'rgba(255,255,255,0.6)', textTransform:'uppercase', letterSpacing:1 }}>{date.toLocaleDateString('en',{month:'short'})}</div>
          <div style={{ fontFamily:'Playfair Display,serif', fontSize:26, color:'white', fontWeight:700, lineHeight:1 }}>{date.getDate()}</div>
        </div>
        <div>
          <h3 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(16px,2.5vw,20px)', color:'white', lineHeight:1.3, marginBottom:6 }}>{e.title}</h3>
          <div style={{ fontFamily:'Montserrat,sans-serif', fontSize:10, color:'rgba(255,255,255,0.6)', letterSpacing:1 }}>
            {date.toLocaleTimeString('en',{hour:'2-digit',minute:'2-digit'})}
            {e.is_online ? ' · Online Online' : e.location ? ` ·  ${e.location}` : ''}
          </div>
        </div>
      </div>
      {e.description && (
        <div style={{ padding:'clamp(16px,3vw,20px)', flex:1 }}>
          <p style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(15px,2vw,17px)', color:'var(--text-mid)', lineHeight:1.75 }}>
            {e.description.slice(0,180)}{e.description.length>180?'…':''}
          </p>
        </div>
      )}
      <div style={{ padding:'14px clamp(16px,3vw,20px)', borderTop:'1px solid rgba(11,26,46,0.08)', display:'flex', gap:10, flexWrap:'wrap' }}>
        {e.is_online && e.meeting_link && upcoming && (
          <a href={e.meeting_link} target="_blank" rel="noopener" className="btn-primary" style={{ padding:'9px 18px', fontSize:11 }}>Join Online →</a>
        )}
        <div style={{ fontFamily:'Montserrat,sans-serif', fontSize:10, color:'var(--text-light)', display:'flex', alignItems:'center' }}>
          {upcoming ? '🗓 Upcoming' : ' Past Event'}
        </div>
      </div>
    </div>
  );
}
