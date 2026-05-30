'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Training { id:number; title:string; description:string; trainer:string; scheduled_at:string; is_published:boolean; max_attendees:number|null; registrations:number; }

export default function TrainingPage() {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Training|null>(null);
  const [form, setForm] = useState({ name:'', email:'', phone:'' });
  const [regStatus, setRegStatus] = useState<'idle'|'loading'|'success'|'error'>('idle');
  const [zoomDetails, setZoomDetails] = useState<{link:string;password:string}|null>(null);

  useEffect(() => { fetch('/api/trainings').then(r=>r.json()).then(d=>setTrainings(d.trainings||[])).finally(()=>setLoading(false)); }, []);

  const register = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) return;
    setRegStatus('loading');
    try {
      const res = await fetch(`/api/trainings/${selected.id}/register`, {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setRegStatus('success');
        setZoomDetails({ link: data.zoom_link, password: data.zoom_password });
      } else setRegStatus('error');
    } catch { setRegStatus('error'); }
  };

  const inputStyle: React.CSSProperties = { width:'100%', background:'rgba(255,255,255,0.08)', border:'1px solid rgba(232,76,14,0.25)', borderRadius:6, padding:'12px 16px', color:'white', fontFamily:'Cormorant Garamond,serif', fontSize:17, outline:'none' };

  return (
    <>
      <Navbar />
      <main>
        <div style={{ background:'linear-gradient(160deg,var(--navy),var(--navy-mid))', padding:'clamp(100px,15vw,140px) clamp(16px,5vw,24px) clamp(60px,10vw,80px)', textAlign:'center', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(circle at 50% 30%, rgba(232,76,14,0.1) 0%, transparent 60%)', pointerEvents:'none' }} />
          <div className="section-label" style={{ marginBottom:16 }}>Free Training</div>
          <div style={{ width:56, height:3, background:'linear-gradient(90deg,var(--orange),var(--orange-light))', margin:'0 auto 24px', borderRadius:2 }} />
          <h1 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(36px,7vw,68px)', color:'white', marginBottom:16 }}>
            Free <span className="accent-shimmer">Zoom Training</span>
          </h1>
          <p style={{ fontFamily:'Cormorant Garamond,serif', fontStyle:'italic', fontSize:'clamp(16px,2.5vw,22px)', color:'rgba(255,255,255,0.7)', maxWidth:580, margin:'0 auto' }}>
            Live online training sessions by Evangelist Bob Pepple — free for everyone. Register to get your Zoom link instantly.
          </p>
        </div>

        <div style={{ background:'var(--off-white)', padding:'clamp(48px,8vw,80px) clamp(16px,5vw,24px)' }}>
          <div style={{ maxWidth:1100, margin:'0 auto' }}>
            {loading ? (
              <p style={{ textAlign:'center', color:'var(--text-light)', fontFamily:'Cormorant Garamond,serif', fontSize:20, fontStyle:'italic', padding:'60px 0' }}>Loading sessions…</p>
            ) : trainings.length === 0 ? (
              <div style={{ textAlign:'center', padding:'80px 0' }}>
                <div style={{ fontSize:56, marginBottom:16 }}>📹</div>
                <h3 style={{ fontFamily:'Playfair Display,serif', fontSize:28, color:'var(--navy)', marginBottom:12 }}>Sessions Coming Soon</h3>
                <p style={{ fontFamily:'Cormorant Garamond,serif', fontSize:18, color:'var(--text-light)', fontStyle:'italic' }}>New training sessions are being scheduled. Subscribe to be notified.</p>
              </div>
            ) : (
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(min(100%,340px),1fr))', gap:'clamp(16px,3vw,24px)' }}>
                {trainings.map(t => {
                  const d = new Date(t.scheduled_at);
                  const isPast = d < new Date();
                  return (
                    <div key={t.id} className="card-ministry" style={{ display:'flex', flexDirection:'column', opacity: isPast ? 0.7 : 1 }}>
                      <div style={{ background:'linear-gradient(135deg,var(--navy),var(--navy-light))', padding:'clamp(20px,4vw,28px)' }}>
                        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:12 }}>
                          <span style={{ fontFamily:'Montserrat,sans-serif', fontSize:9, fontWeight:700, letterSpacing:2, color: isPast ? 'rgba(255,255,255,0.4)' : '#FF6B35', textTransform:'uppercase', background: isPast ? 'rgba(255,255,255,0.08)' : 'rgba(232,76,14,0.15)', padding:'4px 10px', borderRadius:12 }}>
                            {isPast ? 'Past' : ' Live Zoom'}
                          </span>
                          {t.max_attendees && <span style={{ fontFamily:'Montserrat,sans-serif', fontSize:9, color:'rgba(255,255,255,0.5)' }}>{t.registrations}/{t.max_attendees} spots</span>}
                        </div>
                        <h3 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(18px,3vw,22px)', color:'white', lineHeight:1.3, marginBottom:8 }}>{t.title}</h3>
                        <div style={{ fontFamily:'Montserrat,sans-serif', fontSize:10, color:'rgba(255,255,255,0.6)', letterSpacing:0.5 }}>
                          {d.toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long',year:'numeric'})} · {d.toLocaleTimeString('en',{hour:'2-digit',minute:'2-digit'})}
                        </div>
                      </div>
                      <div style={{ padding:'clamp(16px,3vw,20px)', flex:1 }}>
                        <p style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(15px,2vw,17px)', color:'var(--text-mid)', lineHeight:1.75, marginBottom:12 }}>{t.description?.slice(0,160)}{t.description?.length>160?'…':''}</p>
                        <div style={{ fontFamily:'Montserrat,sans-serif', fontSize:11, color:'var(--text-light)' }}> {t.trainer}</div>
                      </div>
                      <div style={{ padding:'14px clamp(16px,3vw,20px)', borderTop:'1px solid rgba(11,26,46,0.08)' }}>
                        {!isPast ? (
                          <button onClick={() => { setSelected(t); setRegStatus('idle'); setForm({name:'',email:'',phone:''}); setZoomDetails(null); }} className="btn-primary" style={{ width:'100%', justifyContent:'center', padding:'11px' }}>
                            Register Free →
                          </button>
                        ) : <span style={{ fontFamily:'Montserrat,sans-serif', fontSize:11, color:'var(--text-light)' }}>Session completed</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Registration Modal */}
      {selected && (
        <div style={{ position:'fixed', inset:0, zIndex:999, display:'flex', alignItems:'center', justifyContent:'center', padding:16, background:'rgba(11,26,46,0.85)', backdropFilter:'blur(8px)' }} onClick={e => { if (e.target===e.currentTarget) setSelected(null); }}>
          <div style={{ background:'linear-gradient(160deg,#0B1A2E,#152744)', border:'1px solid rgba(232,76,14,0.3)', borderRadius:16, padding:'clamp(24px,5vw,36px)', width:'100%', maxWidth:460, position:'relative', maxHeight:'90vh', overflowY:'auto' }}>
            <button onClick={() => setSelected(null)} style={{ position:'absolute', top:14, right:14, background:'rgba(255,255,255,0.1)', border:'none', color:'white', width:30, height:30, borderRadius:'50%', cursor:'pointer', fontSize:14, display:'flex', alignItems:'center', justifyContent:'center' }}>✕</button>
            {regStatus === 'success' ? (
              <div style={{ textAlign:'center', padding:'12px 0' }}>
                <div style={{ fontSize:48, marginBottom:12 }}></div>
                <h3 style={{ fontFamily:'Playfair Display,serif', fontSize:26, color:'white', marginBottom:12 }}>You're Registered!</h3>
                <p style={{ fontFamily:'Cormorant Garamond,serif', fontSize:17, color:'rgba(255,255,255,0.75)', marginBottom:20, lineHeight:1.7 }}>
                  Your spot for <strong style={{color:'#FF6B35'}}>{selected.title}</strong> is confirmed.
                </p>
                {zoomDetails?.link && (
                  <div style={{ background:'rgba(232,76,14,0.12)', border:'1px solid rgba(232,76,14,0.3)', borderRadius:8, padding:20, marginBottom:20, textAlign:'left' }}>
                    <div style={{ fontFamily:'Montserrat,sans-serif', fontSize:10, letterSpacing:2, color:'#FF6B35', textTransform:'uppercase', marginBottom:8 }}> Your Zoom Link</div>
                    <a href={zoomDetails.link} target="_blank" rel="noopener" style={{ fontFamily:'Montserrat,sans-serif', fontSize:12, color:'white', wordBreak:'break-all' }}>{zoomDetails.link}</a>
                    {zoomDetails.password && <div style={{ fontFamily:'Montserrat,sans-serif', fontSize:11, color:'rgba(255,255,255,0.6)', marginTop:8 }}>Password: <strong>{zoomDetails.password}</strong></div>}
                  </div>
                )}
                <button onClick={() => setSelected(null)} className="btn-primary" style={{ width:'100%', justifyContent:'center' }}>Done</button>
              </div>
            ) : (
              <>
                <h3 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(20px,4vw,26px)', color:'white', marginBottom:6 }}>Register for Free</h3>
                <p style={{ fontFamily:'Cormorant Garamond,serif', fontStyle:'italic', fontSize:16, color:'rgba(255,255,255,0.6)', marginBottom:24 }}>{selected.title}</p>
                <form onSubmit={register} style={{ display:'flex', flexDirection:'column', gap:14 }}>
                  <div>
                    <label style={{ fontFamily:'Montserrat,sans-serif', fontSize:10, letterSpacing:2, color:'rgba(232,76,14,0.8)', textTransform:'uppercase', display:'block', marginBottom:8 }}>Full Name *</label>
                    <input required type="text" placeholder="Your name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ fontFamily:'Montserrat,sans-serif', fontSize:10, letterSpacing:2, color:'rgba(232,76,14,0.8)', textTransform:'uppercase', display:'block', marginBottom:8 }}>Email</label>
                    <input type="email" placeholder="your@email.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ fontFamily:'Montserrat,sans-serif', fontSize:10, letterSpacing:2, color:'rgba(232,76,14,0.8)', textTransform:'uppercase', display:'block', marginBottom:8 }}>WhatsApp / Phone</label>
                    <input type="tel" placeholder="+234..." value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} style={inputStyle} />
                  </div>
                  {regStatus==='error' && <p style={{ fontFamily:'Montserrat,sans-serif', fontSize:12, color:'#ff8a80' }}>Registration failed. Please try again.</p>}
                  <button type="submit" disabled={regStatus==='loading'} className="btn-primary" style={{ width:'100%', justifyContent:'center', padding:'14px', marginTop:4 }}>
                    {regStatus==='loading' ? 'Registering...' : ' Register & Get Zoom Link'}
                  </button>
                  <p style={{ fontFamily:'Montserrat,sans-serif', fontSize:10, color:'rgba(255,255,255,0.3)', textAlign:'center' }}>100% Free. No payment required.</p>
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
