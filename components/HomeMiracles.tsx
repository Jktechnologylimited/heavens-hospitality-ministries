'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const defaults = [
  { title:'Healed of Terminal Illness', story:'After the ministry prayed over me, doctors confirmed what God had already done. I was completely healed. There is no medical explanation — only God.', person_name:'Sister Grace', location:'Lagos, Nigeria', is_featured:true },
  { title:'Marriage Restored', story:'Our marriage was on the brink of divorce. We attended one service and God showed up. Two years later we are stronger than ever. Heaven\'s Hospitality changed our lives.', person_name:'The Adeyemi Family', location:'Abuja, Nigeria', is_featured:false },
  { title:'Deliverance and Freedom', story:'I was bound for years. After one prayer session with the ministry, I walked out completely free. What years of struggle could not solve, God did in one moment.', person_name:'Brother Emmanuel', location:'Cape Town, SA', is_featured:false },
];

export default function HomeMiracles() {
  const [miracles, setMiracles] = useState<any[]>([]);
  useEffect(() => { fetch('/api/miracles').then(r=>r.json()).then(d=>setMiracles(d.miracles||[])).catch(()=>{}); }, []);
  const display = miracles.length > 0 ? miracles.slice(0,3) : defaults;

  return (
    <section style={{ background:'var(--navy)', padding:'clamp(64px,10vw,100px) clamp(16px,5vw,24px)' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:'clamp(40px,7vw,60px)' }}>
          <div className="section-label" style={{ marginBottom:16 }}>Signs & Wonders</div>
          <div style={{ width:56, height:3, background:'linear-gradient(90deg,var(--orange),var(--orange-light))', margin:'0 auto 24px', borderRadius:2 }} />
          <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(28px,5vw,52px)', color:'white', marginBottom:16 }}>
            Miracles & <span className="accent-shimmer">Testimonies</span>
          </h2>
          <p style={{ fontFamily:'Cormorant Garamond,serif', fontStyle:'italic', fontSize:'clamp(16px,2.5vw,20px)', color:'rgba(255,255,255,0.65)', maxWidth:560, margin:'0 auto' }}>
            God is still working miracles. These testimonies are proof of His power.
          </p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(min(100%,290px),1fr))', gap:'clamp(16px,3vw,24px)' }}>
          {display.map((m:any, i:number) => (
            <div key={i} style={{ background:'rgba(255,255,255,0.04)', border:`1px solid ${m.is_featured?'rgba(232,76,14,0.35)':'rgba(255,255,255,0.07)'}`, borderRadius:10, padding:'clamp(20px,4vw,28px)', position:'relative' }}>
              {m.is_featured && <div style={{ position:'absolute', top:-10, left:20, background:'linear-gradient(135deg,var(--orange),var(--orange-light))', color:'white', fontFamily:'Montserrat,sans-serif', fontSize:9, fontWeight:700, letterSpacing:1, padding:'3px 12px', borderRadius:12, textTransform:'uppercase' }}>Featured</div>}
              <div style={{ fontSize:'clamp(24px,4vw,32px)', marginBottom:14 }}></div>
              <h3 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(17px,2.5vw,20px)', color:'white', marginBottom:12, lineHeight:1.3 }}>{m.title}</h3>
              <p style={{ fontFamily:'Cormorant Garamond,serif', fontStyle:'italic', fontSize:'clamp(15px,2vw,18px)', color:'rgba(255,255,255,0.72)', lineHeight:1.8, marginBottom:16 }}>"{m.story.slice(0,300)}{m.story.length>300?'…':''}"</p>
              <div style={{ borderTop:'1px solid rgba(255,255,255,0.08)', paddingTop:12, display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:6 }}>
                {m.person_name && <span style={{ fontFamily:'Playfair Display,serif', fontSize:14, color:'var(--orange)', fontStyle:'italic' }}>— {m.person_name}</span>}
                {m.location && <span style={{ fontFamily:'Montserrat,sans-serif', fontSize:10, color:'rgba(255,255,255,0.4)' }}> {m.location}</span>}
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign:'center', marginTop:'clamp(32px,6vw,48px)', display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap' }}>
          <Link href="/miracles" className="btn-primary">View All Testimonies</Link>
          <Link href="/miracles" className="btn-outline" style={{ color:'rgba(255,255,255,0.8)', borderColor:'rgba(255,255,255,0.3)' }}>Share Your Miracle</Link>
        </div>
      </div>
    </section>
  );
}
