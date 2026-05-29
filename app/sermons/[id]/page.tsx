'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Sermon {
  id: number;
  title: string;
  speaker: string;
  description: string;
  content: string;
  series: string;
  scripture: string;
  duration: string;
  video_url: string;
  audio_url: string;
  published_at: string;
}

function getYouTubeId(url: string) {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?]+)/);
  return match ? match[1] : null;
}

export default function SermonDetail() {
  const params = useParams();
  const [sermon, setSermon] = useState<Sermon | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/sermons/${params.id}`)
      .then(r => r.json())
      .then(d => setSermon(d.sermon))
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) return (
    <>
      <Navbar />
      <div style={{ minHeight: '100vh', background: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, fontStyle: 'italic', color: 'var(--text-light)' }}>Loading…</p>
      </div>
      <Footer />
    </>
  );

  if (!sermon) return (
    <>
      <Navbar />
      <div style={{ minHeight: '100vh', background: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif' }}>Sermon not found</h2>
        <Link href="/sermons" className="btn-primary">Back to Sermons</Link>
      </div>
      <Footer />
    </>
  );

  const ytId = sermon.video_url ? getYouTubeId(sermon.video_url) : null;

  return (
    <>
      <Navbar />
      <main>
        <div style={{ background: 'linear-gradient(160deg, var(--deep-brown), var(--mid-brown))', padding: '140px 24px 60px', textAlign: 'center' }}>
          {sermon.series && <div style={{ fontFamily:'Montserrat,sans-serif', fontSize:10, letterSpacing:3, color:'#d4af37', textTransform:'uppercase', marginBottom:16, background:'rgba(212,175,55,0.1)', display:'inline-block', padding:'4px 14px', borderRadius:2 }}>{sermon.series}</div>}
          <h1 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(32px,5vw,60px)', color:'white', maxWidth:900, margin:'0 auto 20px', lineHeight:1.15 }}>{sermon.title}</h1>
          <div style={{ display:'flex', justifyContent:'center', gap:24, flexWrap:'wrap' }}>
            <span style={{ fontFamily:'Montserrat,sans-serif', fontSize:12, color:'rgba(255,255,255,0.7)' }}>🎙️ {sermon.speaker}</span>
            {sermon.scripture && <span style={{ fontFamily:'Montserrat,sans-serif', fontSize:12, color:'#d4af37' }}>📖 {sermon.scripture}</span>}
            {sermon.duration && <span style={{ fontFamily:'Montserrat,sans-serif', fontSize:12, color:'rgba(255,255,255,0.7)' }}>⏱ {sermon.duration}</span>}
          </div>
        </div>

        <div style={{ background:'var(--cream)', padding:'64px 24px 80px' }}>
          <div style={{ maxWidth:900, margin:'0 auto' }}>
            {/* Video embed */}
            {ytId && (
              <div style={{ position:'relative', paddingTop:'56.25%', marginBottom:48, borderRadius:4, overflow:'hidden', boxShadow:'var(--shadow-lg)' }}>
                <iframe
                  style={{ position:'absolute', inset:0, width:'100%', height:'100%', border:'none' }}
                  src={`https://www.youtube.com/embed/${ytId}`}
                  allowFullScreen
                  title={sermon.title}
                />
              </div>
            )}
            {sermon.video_url && !ytId && (
              <a href={sermon.video_url} target="_blank" rel="noopener" className="btn-primary" style={{ display:'inline-flex', marginBottom:48 }}>▶ Watch Sermon</a>
            )}
            {sermon.audio_url && (
              <div style={{ marginBottom:48, background:'white', border:'1px solid rgba(212,175,55,0.2)', borderRadius:4, padding:24, boxShadow:'var(--shadow)' }}>
                <div style={{ fontFamily:'Montserrat,sans-serif', fontSize:11, letterSpacing:2, color:'var(--gold)', textTransform:'uppercase', marginBottom:12 }}>🎵 Listen to Audio</div>
                <audio controls style={{ width:'100%' }}>
                  <source src={sermon.audio_url} />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}

            {/* Description */}
            {sermon.description && (
              <div style={{ fontFamily:'Cormorant Garamond,serif', fontSize:20, color:'var(--text-mid)', lineHeight:1.85, marginBottom:32, fontStyle:'italic', borderLeft:'3px solid var(--gold)', paddingLeft:24 }}>
                {sermon.description}
              </div>
            )}

            {/* Notes */}
            {sermon.content && (
              <div>
                <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:28, color:'var(--deep-brown)', marginBottom:24 }}>Sermon Notes</h2>
                <div className="prose-ministry" dangerouslySetInnerHTML={{ __html: sermon.content.includes('<') ? sermon.content : sermon.content.split('\n').map(p => p ? `<p>${p}</p>` : '').join('') }} />
              </div>
            )}

            <div style={{ display:'flex', justifyContent:'space-between', marginTop:48, paddingTop:32, borderTop:'1px solid rgba(212,175,55,0.15)', flexWrap:'wrap', gap:16 }}>
              <Link href="/sermons" className="btn-outline">← All Sermons</Link>
              <Link href="/#newsletter" className="btn-primary">Subscribe for Updates</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
