'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Miracle { id:number; title:string; story:string; person_name:string; location:string; is_featured:boolean; created_at:string; }

export default function MiraclesPage() {
  const [miracles, setMiracles] = useState<Miracle[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title:'', story:'', person_name:'', location:'' });
  const [formStatus, setFormStatus] = useState<'idle'|'loading'|'success'>('idle');

  useEffect(() => { fetch('/api/miracles').then(r=>r.json()).then(d=>setMiracles(d.miracles||[])).finally(()=>setLoading(false)); }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setFormStatus('loading');
    await fetch('/api/miracles', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({...form, submitted_by_visitor:true}) });
    setFormStatus('success');
  };

  const inputStyle: React.CSSProperties = { width:'100%', border:'1px solid rgba(232,76,14,0.25)', borderRadius:6, padding:'12px 16px', fontFamily:'Cormorant Garamond,serif', fontSize:17, outline:'none', color:'var(--text-dark)', background:'white' };

  return (
    <>
      <Navbar />
      <main>
        <div style={{ background:'linear-gradient(160deg,var(--navy),var(--navy-mid))', padding:'clamp(100px,15vw,140px) clamp(16px,5vw,24px) clamp(60px,10vw,80px)', textAlign:'center', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(circle at 50% 30%, rgba(232,76,14,0.1) 0%, transparent 60%)', pointerEvents:'none' }} />
          <div className="section-label" style={{ marginBottom:16 }}>Signs & Wonders</div>
          <div style={{ width:56, height:3, background:'linear-gradient(90deg,var(--orange),var(--orange-light))', margin:'0 auto 24px', borderRadius:2 }} />
          <h1 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(36px,7vw,68px)', color:'white', marginBottom:16 }}>
            Miracles & <span className="accent-shimmer">Testimonies</span>
          </h1>
          <p style={{ fontFamily:'Cormorant Garamond,serif', fontStyle:'italic', fontSize:'clamp(16px,2.5vw,22px)', color:'rgba(255,255,255,0.7)', maxWidth:580, margin:'0 auto 32px' }}>
            God is still in the miracle-working business. These are testimonies of His power and love in action.
          </p>
          <button onClick={() => setShowForm(true)} className="btn-primary">Share Your Testimony</button>
        </div>

        <div style={{ background:'var(--off-white)', padding:'clamp(48px,8vw,80px) clamp(16px,5vw,24px)' }}>
          <div style={{ maxWidth:1100, margin:'0 auto' }}>
            {loading ? (
              <p style={{ textAlign:'center', color:'var(--text-light)', fontFamily:'Cormorant Garamond,serif', fontSize:20, fontStyle:'italic', padding:'60px 0' }}>Loading testimonies…</p>
            ) : miracles.length === 0 ? (
              <div style={{ textAlign:'center', padding:'60px 0' }}>
                <div style={{ fontSize:56, marginBottom:16 }}></div>
                <h3 style={{ fontFamily:'Playfair Display,serif', fontSize:28, color:'var(--navy)', marginBottom:12 }}>Testimonies Coming Soon</h3>
                <p style={{ fontFamily:'Cormorant Garamond,serif', fontSize:18, color:'var(--text-light)', fontStyle:'italic', marginBottom:24 }}>Be the first to share what God has done in your life.</p>
                <button onClick={() => setShowForm(true)} className="btn-primary">Share Your Miracle</button>
              </div>
            ) : (
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(min(100%,340px),1fr))', gap:'clamp(16px,3vw,24px)' }}>
                {miracles.map(m => (
                  <div key={m.id} className="card-ministry" style={{ padding:'clamp(20px,4vw,28px)', position:'relative' }}>
                    {m.is_featured && <div style={{ position:'absolute', top:16, right:16, background:'linear-gradient(135deg,var(--orange),var(--orange-light))', color:'white', fontFamily:'Montserrat,sans-serif', fontSize:9, fontWeight:700, letterSpacing:1, padding:'3px 10px', borderRadius:12, textTransform:'uppercase' }}> Featured</div>}
                    <div style={{ fontSize:'clamp(28px,5vw,36px)', marginBottom:14 }}></div>
                    <h3 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(18px,3vw,22px)', color:'var(--navy)', marginBottom:10, lineHeight:1.3 }}>{m.title}</h3>
                    <p style={{ fontFamily:'Cormorant Garamond,serif', fontStyle:'italic', fontSize:'clamp(15px,2vw,18px)', color:'var(--text-mid)', lineHeight:1.8, marginBottom:16 }}>"{m.story}"</p>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', borderTop:'1px solid rgba(11,26,46,0.08)', paddingTop:14, flexWrap:'wrap', gap:8 }}>
                      {m.person_name && <span style={{ fontFamily:'Playfair Display,serif', fontSize:15, color:'var(--navy)', fontStyle:'italic' }}>— {m.person_name}</span>}
                      {m.location && <span style={{ fontFamily:'Montserrat,sans-serif', fontSize:10, color:'var(--text-light)' }}> {m.location}</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Testimony submission modal */}
      {showForm && (
        <div style={{ position:'fixed', inset:0, zIndex:999, display:'flex', alignItems:'center', justifyContent:'center', padding:16, background:'rgba(11,26,46,0.85)', backdropFilter:'blur(8px)' }} onClick={e=>{ if(e.target===e.currentTarget) setShowForm(false); }}>
          <div style={{ background:'white', borderRadius:16, padding:'clamp(24px,5vw,36px)', width:'100%', maxWidth:500, position:'relative', maxHeight:'90vh', overflowY:'auto' }}>
            <button onClick={() => setShowForm(false)} style={{ position:'absolute', top:14, right:14, background:'rgba(11,26,46,0.08)', border:'none', width:30, height:30, borderRadius:'50%', cursor:'pointer', fontSize:14, display:'flex', alignItems:'center', justifyContent:'center' }}>✕</button>
            {formStatus === 'success' ? (
              <div style={{ textAlign:'center', padding:'20px 0' }}>
                <div style={{ fontSize:48, marginBottom:12 }}></div>
                <h3 style={{ fontFamily:'Playfair Display,serif', fontSize:26, color:'var(--navy)', marginBottom:12 }}>Thank You!</h3>
                <p style={{ fontFamily:'Cormorant Garamond,serif', fontSize:18, color:'var(--text-mid)', fontStyle:'italic', lineHeight:1.7, marginBottom:20 }}>
                  Your testimony has been submitted and will be reviewed before publishing. God bless you for sharing.
                </p>
                <button onClick={() => setShowForm(false)} className="btn-primary">Close</button>
              </div>
            ) : (
              <>
                <h3 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(22px,4vw,28px)', color:'var(--navy)', marginBottom:6 }}>Share Your Testimony</h3>
                <p style={{ fontFamily:'Cormorant Garamond,serif', fontStyle:'italic', fontSize:16, color:'var(--text-light)', marginBottom:24 }}>What has God done for you?</p>
                <form onSubmit={submit} style={{ display:'flex', flexDirection:'column', gap:16 }}>
                  <div><label style={{ fontFamily:'Montserrat,sans-serif', fontSize:10, letterSpacing:2, color:'var(--orange)', textTransform:'uppercase', display:'block', marginBottom:8 }}>Title *</label>
                  <input required type="text" placeholder="e.g. Healed from cancer" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} style={inputStyle} /></div>
                  <div><label style={{ fontFamily:'Montserrat,sans-serif', fontSize:10, letterSpacing:2, color:'var(--orange)', textTransform:'uppercase', display:'block', marginBottom:8 }}>Your Story *</label>
                  <textarea required rows={6} placeholder="Share what God did..." value={form.story} onChange={e=>setForm({...form,story:e.target.value})} style={{...inputStyle,resize:'vertical',lineHeight:1.7}} /></div>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                    <div><label style={{ fontFamily:'Montserrat,sans-serif', fontSize:10, letterSpacing:2, color:'var(--orange)', textTransform:'uppercase', display:'block', marginBottom:8 }}>Your Name</label>
                    <input type="text" placeholder="Optional" value={form.person_name} onChange={e=>setForm({...form,person_name:e.target.value})} style={inputStyle} /></div>
                    <div><label style={{ fontFamily:'Montserrat,sans-serif', fontSize:10, letterSpacing:2, color:'var(--orange)', textTransform:'uppercase', display:'block', marginBottom:8 }}>Location</label>
                    <input type="text" placeholder="City, Country" value={form.location} onChange={e=>setForm({...form,location:e.target.value})} style={inputStyle} /></div>
                  </div>
                  <button type="submit" disabled={formStatus==='loading'} className="btn-primary" style={{ width:'100%', justifyContent:'center', padding:'14px' }}>
                    {formStatus==='loading' ? 'Submitting...' : ' Submit Testimony'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
