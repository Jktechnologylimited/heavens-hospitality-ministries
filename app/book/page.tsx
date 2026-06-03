'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const CHAPTERS = [
  {
    number: 'Introduction',
    title: 'The Journey to Living in God\'s Fullness',
    desc: 'Evangelist Bob Pepple shares his personal encounter with God at age four — and how at 21 he broke free from religion masquerading as Christianity to discover what was always rightfully his in Christ.',
  },
  {
    number: 'Chapter One',
    title: 'The Blessings of Remission of Sin',
    desc: 'Your new identity in Christ fully exposed. Generational curses are dismantled by the authority of the Word. The consequences of sin have been dealt with — and the Holy Spirit now dwells within you.',
  },
  {
    number: 'Chapter Two',
    title: 'The Blessing of Physical Health and Strength',
    desc: 'The healing virtues of Christ are at work in you right now. Revelational truths that produce healing, sustain health, and generate mental and physical strength — grounded in the resurrection power of Jesus.',
  },
  {
    number: 'Chapter Three',
    title: 'The Blessing Over the Material Realm',
    desc: 'God\'s blessing extends to every area of your life — your home, your family, your finances, and your future. Discover how to walk in the fullness of what Christ secured for you through the cross.',
  },
];

const TESTIMONIALS = [
  {
    name: 'Sister Grace A.',
    role: 'Lagos, Nigeria',
    text: 'This book broke every religious lie I had believed for years. I finally understood that the blessings of God were mine — not something to beg for, but something to walk in.',
  },
  {
    name: 'Pastor Emmanuel T.',
    role: 'Cape Town, South Africa',
    text: 'I have read many books on faith and the Christian life. "In the Fullness of His Blessings" is different. It is not motivational writing — it is revelation. My congregation has been transformed.',
  },
  {
    name: 'Mrs. Adaeze O.',
    role: 'Abuja, Nigeria',
    text: 'The chapter on physical health alone was worth everything. I stood on those scriptures during my illness and God moved. This book is not to be read once — it is to be lived.',
  },
];

export default function BookPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/book-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) setStatus('success');
      else setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(232,76,14,0.3)',
    borderRadius: 6,
    padding: 'clamp(12px,2vw,15px) clamp(14px,3vw,18px)',
    color: 'white',
    fontFamily: 'Cormorant Garamond, serif',
    fontSize: 'clamp(16px,2.5vw,18px)',
    outline: 'none',
    WebkitAppearance: 'none',
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: 'Montserrat, sans-serif',
    fontSize: 10,
    letterSpacing: 2,
    color: 'rgba(232,76,14,0.85)',
    textTransform: 'uppercase',
    display: 'block',
    marginBottom: 8,
  };

  return (
    <>
      <Navbar />
      <main style={{ overflowX: 'hidden' }}>

        {/* HERO */}
        <section style={{
          background: 'linear-gradient(160deg, #060e1a 0%, #0B1A2E 50%, #0f2240 100%)',
          padding: 'clamp(100px,15vw,140px) clamp(16px,5vw,24px) clamp(60px,10vw,80px)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position:'absolute', top:'30%', left:'50%', transform:'translate(-50%,-50%)', width:'min(700px,100vw)', height:'min(700px,100vw)', background:'radial-gradient(circle,rgba(232,76,14,0.07) 0%,transparent 70%)', borderRadius:'50%', pointerEvents:'none' }} />

          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 'clamp(48px,8vw,80px)', alignItems: 'center', position: 'relative' }}>

            {/* Book cover */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ position: 'relative', width: 'min(280px, 72vw)' }}>
                <div style={{
                  borderRadius: 8,
                  overflow: 'hidden',
                  boxShadow: '12px 16px 48px rgba(0,0,0,0.7), -3px 0 0 rgba(232,76,14,0.2)',
                  transform: 'perspective(800px) rotateY(-3deg)',
                  transition: 'transform 0.4s ease',
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/book-cover.jpg"
                    alt="In the Fullness of His Blessings by Bob Edward"
                    style={{ width: '100%', display: 'block' }}
                  />
                </div>
                {/* Free badge */}
                <div style={{ position:'absolute', top:-14, right:-14, width:58, height:58, background:'linear-gradient(135deg,#C03A08,#E84C0E)', borderRadius:'50%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 20px rgba(232,76,14,0.5)', border:'2px solid rgba(255,255,255,0.15)' }}>
                  <span style={{ fontFamily:'Montserrat,sans-serif', fontSize:9, fontWeight:800, color:'white', letterSpacing:0.5 }}>100%</span>
                  <span style={{ fontFamily:'Montserrat,sans-serif', fontSize:10, fontWeight:900, color:'white' }}>FREE</span>
                </div>
                {/* Shadow */}
                <div style={{ width:'90%', height:24, background:'rgba(0,0,0,0.3)', borderRadius:'50%', margin:'12px auto 0', filter:'blur(10px)' }} />
              </div>
            </div>

            {/* Headline + form */}
            <div>
              <div style={{ display:'inline-block', background:'rgba(232,76,14,0.12)', border:'1px solid rgba(232,76,14,0.3)', borderRadius:3, padding:'6px 16px', marginBottom:20 }}>
                <span style={{ fontFamily:'Montserrat,sans-serif', fontSize:10, letterSpacing:2, color:'#FF6B35', textTransform:'uppercase' }}>Free Download — 108 Pages — PDF</span>
              </div>

              <h1 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(30px,5.5vw,56px)', color:'white', lineHeight:1.1, marginBottom:16 }}>
                In the Fullness of<br />
                <span style={{ background:'linear-gradient(90deg,#C03A08,#E84C0E,#FF8C55,#E84C0E)', backgroundSize:'200% auto', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', animation:'shimmer 3s linear infinite' }}>
                  His Blessings
                </span>
              </h1>

              <p style={{ fontFamily:'Cormorant Garamond,serif', fontStyle:'italic', fontSize:'clamp(16px,2.5vw,20px)', color:'rgba(255,255,255,0.65)', marginBottom:8 }}>
                By Evangelist Bob Edward 
              </p>
              <p style={{ fontFamily:'Montserrat,sans-serif', fontSize:10, letterSpacing:2, color:'rgba(232,76,14,0.7)', textTransform:'uppercase', marginBottom:28 }}>
                Heaven's Hospitality Ministries
              </p>

              <p style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(17px,2.5vw,21px)', color:'rgba(255,255,255,0.8)', lineHeight:1.8, marginBottom:32, fontStyle:'italic' }}>
                Religion told Bob Edward that suffering was his lot — that heaven would come later. At 21, God showed him the truth. This book is that revelation. Your blessings are not on the way. They are already yours in Christ Jesus.
              </p>

              {/* Download form */}
              {status === 'success' ? (
                <div style={{ background:'rgba(232,76,14,0.1)', border:'1px solid rgba(232,76,14,0.35)', borderRadius:10, padding:'clamp(24px,5vw,32px)', textAlign:'center' }}>
                  <h3 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(20px,3.5vw,26px)', color:'white', marginBottom:12 }}>Your Book is Ready</h3>
                  <p style={{ fontFamily:'Cormorant Garamond,serif', fontSize:17, color:'rgba(255,255,255,0.75)', marginBottom:24, lineHeight:1.7, fontStyle:'italic' }}>
                    {form.email ? 'A copy is being sent to your inbox. You can also download directly:' : 'Click below to download your free copy:'}
                  </p>
                  <a
                    href="/book/in-the-fullness-of-his-blessings.pdf"
                    download="In-the-Fullness-of-His-Blessings-Bob-Edward-Pepple.pdf"
                    className="btn-primary"
                    style={{ display:'inline-flex', justifyContent:'center', padding:'16px 36px', fontSize:14, width:'100%', marginBottom:16 }}
                    onClick={() => {
                      // Force download by creating a temporary anchor
                      const link = document.createElement('a');
                      link.href = '/book/in-the-fullness-of-his-blessings.pdf';
                      link.download = 'In-the-Fullness-of-His-Blessings-Bob-Edward-Pepple.pdf';
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                  >
                    Download Free PDF
                  </a>
                  <p style={{ fontFamily:'Montserrat,sans-serif', fontSize:10, color:'rgba(255,255,255,0.35)', letterSpacing:0.5 }}>
                    108 pages · PDF format · Free forever
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(232,76,14,0.18)', borderRadius:10, padding:'clamp(20px,4vw,28px)', display:'flex', flexDirection:'column', gap:14 }}>
                  <p style={{ fontFamily:'Montserrat,sans-serif', fontSize:10, color:'rgba(232,76,14,0.8)', letterSpacing:1.5, textTransform:'uppercase', marginBottom:2 }}>
                    Get your free copy — all fields optional
                  </p>
                  <div>
                    <label style={labelStyle}>Your Name</label>
                    <input type="text" placeholder="Optional" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Email Address</label>
                    <input type="email" placeholder="Optional — we'll send a copy to your inbox" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>WhatsApp Number</label>
                    <input type="tel" placeholder="Optional" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} style={inputStyle} />
                  </div>
                  <p style={{ fontFamily:'Montserrat,sans-serif', fontSize:10, color:'rgba(255,255,255,0.3)', lineHeight:1.6 }}>
                    This book is completely free. You are not required to leave any details. We will send ministry updates if you share your email.
                  </p>
                  {status === 'error' && <p style={{ fontFamily:'Montserrat,sans-serif', fontSize:12, color:'#ff8a80' }}>Something went wrong. Please try again.</p>}
                  <button type="submit" disabled={status === 'loading'} className="btn-primary" style={{ width:'100%', justifyContent:'center', padding:'clamp(14px,3vw,17px)', fontSize:'clamp(12px,2vw,14px)' }}>
                    {status === 'loading' ? 'Preparing your copy...' : 'Download Free Book'}
                  </button>
                  <p style={{ fontFamily:'Montserrat,sans-serif', fontSize:10, color:'rgba(255,255,255,0.25)', textAlign:'center' }}>No credit card. No spam. Free forever.</p>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* AUTHOR */}
        <section style={{ background:'var(--off-white)', padding:'clamp(56px,10vw,80px) clamp(16px,5vw,24px)' }}>
          <div style={{ maxWidth:960, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap:'clamp(32px,6vw,56px)', alignItems:'center' }}>
            <div style={{ display:'flex', justifyContent:'center' }}>
              <div style={{ width:'min(240px,65vw)', aspectRatio:'4/5', borderRadius:12, overflow:'hidden', boxShadow:'0 24px 56px rgba(11,26,46,0.18)', border:'3px solid rgba(232,76,14,0.2)', position:'relative' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/pastor-1.jpg" alt="Evangelist Bob Edward" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top', display:'block' }} />
                <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'35%', background:'linear-gradient(transparent,rgba(11,26,46,0.85))' }} />
                <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:'linear-gradient(90deg,var(--orange),var(--orange-light))' }} />
              </div>
            </div>
            <div>
              <div className="section-label" style={{ marginBottom:14 }}>About the Author</div>
              <div style={{ width:56, height:3, background:'linear-gradient(90deg,var(--orange),var(--orange-light))', marginBottom:20, borderRadius:2 }} />
              <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(24px,4vw,38px)', color:'var(--navy)', marginBottom:16 }}>Evangelist Bob Edward </h2>
              <p style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(16px,2.5vw,19px)', lineHeight:1.85, color:'var(--text-mid)', marginBottom:16 }}>
                Bob Edward is an anointed evangelist, teacher, and the Presiding President of Heaven’s Hospitality Ministries, a rapidly growing ministry reaching nations through crusades and conferences. </p>
              <p style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(16px,2.5vw,19px)', lineHeight:1.85, color:'var(--text-mid)', marginBottom:16 }}>
                His ministry is marked by notable miraculous healings, signs, and wonders. His message emphasizes the God-life, immortality, true success, and the believer’s oneness with the Lord Jesus Christ. </p>
              <p style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(16px,2.5vw,19px)', lineHeight:1.85, color:'var(--text-mid)', marginBottom:28 }}>
                He also convenes quarterly ministers’ classes for newly called ministers through the Immortality Ministerial School (IMS), a training platform rooted in the message of grace and power.</p>
              <a href="https://www.tiktok.com/@heavenshospitality" target="_blank" rel="noopener" className="btn-primary">
                Follow the Ministry on TikTok
              </a>
            </div>
          </div>
        </section>

        {/* WHAT'S INSIDE */}
        <section style={{ background:'var(--navy)', padding:'clamp(56px,10vw,80px) clamp(16px,5vw,24px)' }}>
          <div style={{ maxWidth:1100, margin:'0 auto' }}>
            <div style={{ textAlign:'center', marginBottom:'clamp(36px,6vw,56px)' }}>
              <div className="section-label" style={{ marginBottom:14 }}>What's Inside</div>
              <div style={{ width:56, height:3, background:'linear-gradient(90deg,var(--orange),var(--orange-light))', margin:'0 auto 24px', borderRadius:2 }} />
              <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(28px,5vw,48px)', color:'white', lineHeight:1.2 }}>
                108 Pages of <span style={{ background:'linear-gradient(90deg,#C03A08,#E84C0E,#FF8C55)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Pure Revelation</span>
              </h2>
              <p style={{ fontFamily:'Cormorant Garamond,serif', fontStyle:'italic', fontSize:'clamp(16px,2.5vw,20px)', color:'rgba(255,255,255,0.65)', maxWidth:580, margin:'20px auto 0' }}>
                Three chapters and a life-changing introduction — each one designed to dismantle religious lies and restore you to your rightful inheritance in Christ.
              </p>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap:'clamp(14px,3vw,20px)' }}>
              {CHAPTERS.map((ch, i) => (
                <div key={i} style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(232,76,14,0.15)', borderRadius:10, padding:'clamp(20px,4vw,28px)', transition:'border-color 0.3s' }}>
                  <div style={{ fontFamily:'Montserrat,sans-serif', fontSize:9, letterSpacing:2, color:'var(--orange)', textTransform:'uppercase', marginBottom:10 }}>{ch.number}</div>
                  <h3 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(16px,2.5vw,20px)', color:'white', marginBottom:12, lineHeight:1.3 }}>{ch.title}</h3>
                  <p style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(14px,2vw,17px)', color:'rgba(255,255,255,0.65)', lineHeight:1.8 }}>{ch.desc}</p>
                </div>
              ))}
            </div>

            {/* Key quote */}
            <div style={{ marginTop:'clamp(32px,6vw,48px)', background:'rgba(232,76,14,0.08)', border:'1px solid rgba(232,76,14,0.2)', borderRadius:10, padding:'clamp(24px,5vw,40px)', textAlign:'center' }}>
              <div style={{ width:40, height:3, background:'linear-gradient(90deg,var(--orange),var(--orange-light))', margin:'0 auto 20px', borderRadius:2 }} />
              <blockquote style={{ fontFamily:'Playfair Display,serif', fontStyle:'italic', fontSize:'clamp(18px,3vw,26px)', color:'white', lineHeight:1.65, maxWidth:700, margin:'0 auto' }}>
                "This book in your hand is one less person who would get to judgment day and realise they lived way below the life that Jesus secured for them."
              </blockquote>
              <cite style={{ fontFamily:'Montserrat,sans-serif', fontSize:11, color:'var(--orange)', display:'block', marginTop:16, letterSpacing:1 }}>
                — Evangelist Bob Edward 
              </cite>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section style={{ background:'var(--off-white)', padding:'clamp(56px,10vw,80px) clamp(16px,5vw,24px)' }}>
          <div style={{ maxWidth:1100, margin:'0 auto' }}>
            <div style={{ textAlign:'center', marginBottom:'clamp(36px,6vw,48px)' }}>
              <div className="section-label" style={{ marginBottom:14 }}>Reader Testimonies</div>
              <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(28px,5vw,44px)', color:'var(--navy)' }}>What Readers Are Saying</h2>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap:'clamp(16px,3vw,24px)' }}>
              {TESTIMONIALS.map((t, i) => (
                <div key={i} style={{ background:'white', border:'1px solid rgba(11,26,46,0.08)', borderRadius:10, padding:'clamp(20px,4vw,28px)', boxShadow:'0 2px 16px rgba(11,26,46,0.06)' }}>
                  <div style={{ color:'var(--orange)', fontSize:18, marginBottom:14, letterSpacing:2 }}>★★★★★</div>
                  <p style={{ fontFamily:'Cormorant Garamond,serif', fontStyle:'italic', fontSize:'clamp(15px,2.5vw,18px)', color:'var(--text-mid)', lineHeight:1.8, marginBottom:20 }}>"{t.text}"</p>
                  <div>
                    <div style={{ fontFamily:'Playfair Display,serif', fontSize:15, color:'var(--navy)', fontWeight:600 }}>{t.name}</div>
                    <div style={{ fontFamily:'Montserrat,sans-serif', fontSize:10, color:'var(--text-light)', letterSpacing:0.5, marginTop:2 }}>{t.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section style={{ background:'linear-gradient(135deg, var(--navy), var(--navy-mid))', padding:'clamp(56px,10vw,80px) clamp(16px,5vw,24px)' }}>
          <div style={{ maxWidth:700, margin:'0 auto', textAlign:'center' }}>
            <div style={{ width:56, height:3, background:'linear-gradient(90deg,var(--orange),var(--orange-light))', margin:'0 auto 28px', borderRadius:2 }} />
            <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(26px,5vw,44px)', color:'white', marginBottom:16, lineHeight:1.2 }}>
              You Are Not Meant to Live<br />
              <span style={{ background:'linear-gradient(90deg,#C03A08,#E84C0E,#FF8C55)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Below Your Inheritance</span>
            </h2>
            <p style={{ fontFamily:'Cormorant Garamond,serif', fontStyle:'italic', fontSize:'clamp(16px,2.5vw,20px)', color:'rgba(255,255,255,0.75)', lineHeight:1.8, marginBottom:'clamp(24px,5vw,36px)' }}>
              The blessings of remission, divine health, and God's provision over your life are not future promises — they are present realities. This book will show you how to step fully into them.
            </p>
            <p style={{ fontFamily:'Montserrat,sans-serif', fontSize:'clamp(10px,2vw,12px)', fontWeight:700, letterSpacing:2, color:'var(--orange)', textTransform:'uppercase', marginBottom:12 }}>
              P.S. — This book is completely free. No strings attached.
            </p>
            <a
              href="/book/in-the-fullness-of-his-blessings.pdf"
              download="In-the-Fullness-of-His-Blessings-Bob-Edward-Pepple.pdf"
              className="btn-primary"
              style={{ display:'inline-flex', justifyContent:'center', padding:'clamp(14px,3vw,18px) clamp(28px,6vw,48px)', fontSize:'clamp(12px,2vw,15px)', marginBottom:16 }}
            >
              Download the Free Book
            </a>
            <div style={{ marginTop:40, paddingTop:32, borderTop:'1px solid rgba(232,76,14,0.1)' }}>
              <Link href="/" style={{ fontFamily:'Montserrat,sans-serif', fontSize:11, color:'rgba(255,255,255,0.35)', letterSpacing:1 }}>
                Back to Heaven's Hospitality Ministries
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
