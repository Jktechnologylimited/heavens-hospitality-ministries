'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const defaults = [
  { id:0, title:'South Africa Mission', location:'Cape Town', country:'South Africa', description:'Reaching communities with the Gospel of hospitality and healing.', status:'active' },
  { id:0, title:'Nigeria Crusades', location:'Lagos & Abuja', country:'Nigeria', description:'Mass evangelism crusades bringing healing and salvation to thousands.', status:'active' },
  { id:0, title:'UK Ministry Outreach', location:'London', country:'United Kingdom', description:'Extending the ministry to diaspora communities across the United Kingdom.', status:'active' },
];

const statusColor: Record<string, string> = { active:'#4caf50', completed:'#2196f3', planned:'#ff9800' };

export default function HomeMissions() {
  const [missions, setMissions] = useState<any[]>([]);
  useEffect(() => { fetch('/api/missions').then(r=>r.json()).then(d=>setMissions(d.missions||[])).catch(()=>{}); }, []);
  const display = missions.length > 0 ? missions : defaults;

  return (
    <section style={{ background:'var(--off-white)', padding:'clamp(64px,10vw,100px) clamp(16px,5vw,24px)' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:'clamp(40px,7vw,60px)' }}>
          <div className="section-label" style={{ marginBottom:16 }}>Global Outreach</div>
          <div style={{ width:56, height:3, background:'linear-gradient(90deg,var(--orange),var(--orange-light))', margin:'0 auto 24px', borderRadius:2 }} />
          <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(28px,5vw,52px)', color:'var(--navy)', marginBottom:16 }}>
            Ministry <span className="accent-text">Missions</span>
          </h2>
          <p style={{ fontFamily:'Cormorant Garamond,serif', fontStyle:'italic', fontSize:'clamp(16px,2.5vw,20px)', color:'var(--text-light)', maxWidth:560, margin:'0 auto' }}>
            Taking the love and hospitality of Heaven to the ends of the earth.
          </p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap:'clamp(16px,3vw,24px)' }}>
          {display.map((m:any, i:number) => (
            <div key={i} className="card-ministry" style={{ padding:'clamp(20px,4vw,28px)' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:14 }}>
                <div style={{ fontSize:'clamp(28px,5vw,36px)' }}></div>
                <span style={{ fontFamily:'Montserrat,sans-serif', fontSize:9, fontWeight:700, letterSpacing:1.5, padding:'3px 10px', borderRadius:12, background:`${statusColor[m.status]||'#4caf50'}22`, color:statusColor[m.status]||'#4caf50', textTransform:'uppercase' }}>{m.status}</span>
              </div>
              <h3 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(17px,2.5vw,20px)', color:'var(--navy)', marginBottom:6, lineHeight:1.3 }}>{m.title}</h3>
              <div style={{ fontFamily:'Montserrat,sans-serif', fontSize:11, color:'var(--orange)', letterSpacing:0.5, marginBottom:12 }}> {m.location}{m.country?`, ${m.country}`:''}</div>
              {m.description && <p style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(14px,2vw,16px)', color:'var(--text-mid)', lineHeight:1.75 }}>{m.description}</p>}
            </div>
          ))}
        </div>
        {/* Crusade photo gallery strip */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(min(140px, 30%), 1fr))', gap:12, marginTop:'clamp(32px,6vw,48px)', marginBottom:'clamp(24px,4vw,32px)', borderRadius:10, overflow:'hidden' }}>
          {['/images/pastor-2.jpg','/images/ministry-1.jpg','/images/pastor-3.jpg','/images/pastor-4.jpg'].map((src,i) => (
            <div key={i} style={{ aspectRatio:'1', overflow:'hidden', borderRadius:8, border:'2px solid rgba(232,76,14,0.15)' }}>
              <img src={src} alt="Ministry" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition: i===0 ? 'center top' : i===2 ? 'center 20%' : 'center center', display:'block', transition:'transform 0.5s ease' }} onMouseEnter={e=>(e.currentTarget.style.transform='scale(1.05)')} onMouseLeave={e=>(e.currentTarget.style.transform='scale(1)')} />
            </div>
          ))}
        </div>

        <div style={{ textAlign:'center' }}>
          <Link href="/#give" className="btn-primary">Support Our Missions </Link>
        </div>
      </div>
    </section>
  );
}
// Note: gallery images are appended via the photo strip in the section
