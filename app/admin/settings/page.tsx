'use client';
import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';

export default function AdminSettings() {
  const [ytVideoId, setYtVideoId] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/settings?key=youtube_video_id')
      .then(r => r.json())
      .then(d => { if (d.value) setYtVideoId(d.value); });
  }, []);

  const saveYt = async () => {
    setSaving(true);
    // Extract video ID from full URL if pasted
    let id = ytVideoId.trim();
    const urlMatch = id.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
    if (urlMatch) id = urlMatch[1];

    await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: 'youtube_video_id', value: id }),
    });
    setYtVideoId(id);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const clearYt = async () => {
    await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: 'youtube_video_id', value: '' }),
    });
    setYtVideoId('');
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const inp: React.CSSProperties = {
    width: '100%', background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(232,76,14,0.2)', borderRadius: 6,
    padding: '12px 16px', color: 'white',
    fontFamily: 'Cormorant Garamond,serif', fontSize: 17, outline: 'none',
  };

  const previewId = (() => {
    const m = ytVideoId.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
    return m ? m[1] : ytVideoId.length === 11 ? ytVideoId : null;
  })();

  return (
    <AdminLayout title="Site Settings">
      <div style={{ maxWidth: 680 }}>

        {/* YouTube video pin */}
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(232,76,14,0.12)', borderRadius: 10, padding: 'clamp(20px,4vw,32px)', marginBottom: 24 }}>
          <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: 22, color: 'white', marginBottom: 6 }}>
            Pin a YouTube Video
          </h2>
          <p style={{ fontFamily: 'Cormorant Garamond,serif', fontStyle: 'italic', fontSize: 16, color: 'rgba(255,255,255,0.5)', marginBottom: 24, lineHeight: 1.6 }}>
            Paste a YouTube video URL or video ID here. It will embed directly on the homepage social section. To show the channel card instead, leave this blank.
          </p>

          <div style={{ marginBottom: 16 }}>
            <label style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 10, letterSpacing: 2, color: 'rgba(232,76,14,0.8)', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
              YouTube Video URL or ID
            </label>
            <input
              type="text"
              value={ytVideoId}
              onChange={e => setYtVideoId(e.target.value)}
              style={inp}
              placeholder="https://www.youtube.com/watch?v=xxxxxxxxxx  or  xxxxxxxxxx"
            />
            {previewId && (
              <p style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 10, color: 'rgba(100,200,100,0.7)', marginTop: 6 }}>
                Video ID detected: <strong>{previewId}</strong>
              </p>
            )}
          </div>

          {/* Preview */}
          {previewId && (
            <div style={{ marginBottom: 20, borderRadius: 8, overflow: 'hidden', position: 'relative', paddingTop: '56.25%' }}>
              <iframe
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
                src={`https://www.youtube.com/embed/${previewId}?rel=0&modestbranding=1`}
                title="Preview"
                allowFullScreen
              />
            </div>
          )}

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button onClick={saveYt} disabled={saving} className="btn-primary" style={{ padding: '12px 24px' }}>
              {saving ? 'Saving...' : saved ? 'Saved' : 'Save & Pin Video'}
            </button>
            {ytVideoId && (
              <button onClick={clearYt} className="btn-outline" style={{ padding: '12px 24px' }}>
                Clear (show channel card)
              </button>
            )}
          </div>
        </div>

        {/* Domain note */}
        <div style={{ background: 'rgba(100,150,255,0.05)', border: '1px solid rgba(100,150,255,0.15)', borderRadius: 10, padding: 'clamp(16px,3vw,24px)' }}>
          <h3 style={{ fontFamily: 'Playfair Display,serif', fontSize: 18, color: 'white', marginBottom: 10 }}>
            Email & Domain
          </h3>
          <div style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.8 }}>
            <p style={{ marginBottom: 6 }}>
              <span style={{ color: 'rgba(232,76,14,0.7)' }}>Current send address:</span>{' '}
              <span style={{ color: 'white' }}>noreply@mail.ibiz.name.ng</span>
            </p>
            <p style={{ marginBottom: 6 }}>
              <span style={{ color: 'rgba(232,76,14,0.7)' }}>Contact email:</span>{' '}
              <span style={{ color: 'white' }}>hospitalityheavens@gmail.com</span>
            </p>
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, marginTop: 10 }}>
              Once heavenshospitality.org propagates (usually 24-48hrs), update EMAIL_FROM in your Vercel environment variables to noreply@heavenshospitality.org and add the domain to Resend.
            </p>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
