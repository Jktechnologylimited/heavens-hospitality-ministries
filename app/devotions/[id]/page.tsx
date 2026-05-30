'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Devotion {
  id: number;
  title: string;
  scripture: string;
  content: string;
  author: string;
  published_at: string;
}

export default function DevotionDetail() {
  const params = useParams();
  const [devotion, setDevotion] = useState<Devotion | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/devotions/${params.id}`)
      .then(r => r.json())
      .then(d => setDevotion(d.devotion))
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) return (
    <>
      <Navbar />
      <div style={{ minHeight: '100vh', background: 'var(--off-white)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, fontStyle: 'italic', color: 'var(--text-light)' }}>Loading…</p>
      </div>
      <Footer />
    </>
  );

  if (!devotion) return (
    <>
      <Navbar />
      <div style={{ minHeight: '100vh', background: 'var(--off-white)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif' }}>Devotion not found</h2>
        <Link href="/devotions" className="btn-primary">Back to Devotions</Link>
      </div>
      <Footer />
    </>
  );

  return (
    <>
      <Navbar />
      <main>
        {/* Header */}
        <div style={{ background: 'linear-gradient(160deg, var(--navy), var(--navy-mid))', padding: '140px 24px 60px', textAlign: 'center' }}>
          <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, letterSpacing: 3, color: 'var(--orange)', textTransform: 'uppercase', marginBottom: 20 }}>
            {new Date(devotion.published_at).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(36px, 5vw, 64px)', color: 'white', maxWidth: 900, margin: '0 auto 24px', lineHeight: 1.15 }}>
            {devotion.title}
          </h1>
          {devotion.scripture && (
            <div style={{ display: 'inline-block', background: 'rgba(232,76,14,0.15)', border: '1px solid rgba(232,76,14,0.3)', borderRadius: 2, padding: '8px 20px', fontFamily: 'Montserrat, sans-serif', fontSize: 12, letterSpacing: 2, color: 'var(--orange)', textTransform: 'uppercase' }}>
               {devotion.scripture}
            </div>
          )}
        </div>

        {/* Content */}
        <div style={{ background: 'var(--off-white)', padding: '64px 24px 80px' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            {/* Scripture highlight */}
            {devotion.scripture && (
              <div style={{ background: 'white', border: '1px solid rgba(232,76,14,0.2)', borderLeft: '4px solid var(--orange)', borderRadius: '0 4px 4px 0', padding: '24px 32px', marginBottom: 48, boxShadow: 'var(--shadow)' }}>
                <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, letterSpacing: 3, color: 'var(--orange)', textTransform: 'uppercase', marginBottom: 8 }}>Scripture</div>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 22, color: 'var(--navy-light)', lineHeight: 1.6 }}>{devotion.scripture}</p>
              </div>
            )}

            {/* Main content */}
            <div className="prose-ministry" dangerouslySetInnerHTML={{ __html: devotion.content.includes('<') ? devotion.content : devotion.content.split('\n').map(p => p ? `<p>${p}</p>` : '').join('') }} />

            {/* Author */}
            <div style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid rgba(232,76,14,0.2)', display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 48, height: 48, background: 'linear-gradient(135deg, var(--navy), var(--navy-light))', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}></div>
              <div>
                <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, letterSpacing: 2, color: 'var(--orange)', textTransform: 'uppercase', marginBottom: 4 }}>Written by</div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: 18, color: 'var(--navy)' }}>{devotion.author}</div>
              </div>
            </div>

            {/* Navigation */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 48, paddingTop: 32, borderTop: '1px solid rgba(232,76,14,0.15)', flexWrap: 'wrap', gap: 16 }}>
              <Link href="/devotions" className="btn-outline">← All Devotions</Link>
              <Link href="/#newsletter" className="btn-primary">Subscribe for Daily Updates</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
