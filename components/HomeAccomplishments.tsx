'use client';
import { useEffect, useState } from 'react';

const defaults = [
  { icon:'', stat_number:'20+', stat_label:'Nations Reached', title:'Global Ministry Impact' },
  { icon:'', stat_number:'10,000+', stat_label:'Souls Won', title:'Lives Transformed' },
  { icon:'', stat_number:'500+', stat_label:'Devotions Published', title:'Daily Word Ministry' },
  { icon:'', stat_number:'200+', stat_label:'Sermons Delivered', title:'Preaching the Gospel' },
];

export default function HomeAccomplishments() {
  const [items, setItems] = useState<any[]>([]);
  useEffect(() => { fetch('/api/accomplishments').then(r=>r.json()).then(d=>setItems(d.accomplishments||[])).catch(()=>{}); }, []);
  const display = items.length > 0 ? items : defaults;

  return (
    <section style={{ background:'var(--navy)', padding:'clamp(48px,8vw,72px) clamp(16px,5vw,24px)', borderBottom:'1px solid rgba(232,76,14,0.15)' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:'clamp(32px,6vw,48px)' }}>
          <div className="section-label" style={{ marginBottom:12 }}>God's Faithfulness</div>
          <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(26px,4.5vw,44px)', color:'white' }}>
            What We've <span className="accent-shimmer">Accomplished Together</span>
          </h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap:'clamp(16px,3vw,24px)' }}>
          {display.map((item:any, i:number) => (
            <div key={i} style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(232,76,14,0.15)', borderRadius:10, padding:'clamp(20px,4vw,28px)', textAlign:'center', transition:'all 0.3s' }}>
              <div style={{ fontSize:'clamp(28px,5vw,40px)', marginBottom:12 }}>{item.icon}</div>
              {item.stat_number && <div style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(24px,4vw,36px)', color:'var(--orange)', fontWeight:700, lineHeight:1 }}>{item.stat_number}</div>}
              {item.stat_label && <div style={{ fontFamily:'Montserrat,sans-serif', fontSize:'clamp(9px,1.5vw,11px)', letterSpacing:2, color:'rgba(255,255,255,0.5)', textTransform:'uppercase', margin:'6px 0 10px' }}>{item.stat_label}</div>}
              <div style={{ fontFamily:'Cormorant Garamond,serif', fontStyle:'italic', fontSize:'clamp(14px,2vw,17px)', color:'rgba(255,255,255,0.7)' }}>{item.title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
