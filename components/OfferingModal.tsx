'use client';
import { useState, useEffect } from 'react';

interface Props { onClose: () => void; }

declare global { interface Window { PaystackPop: any; } }

export default function OfferingModal({ onClose }: Props) {
  const [step, setStep] = useState<'form'|'loading'|'success'|'error'>('form');
  const [form, setForm] = useState({ name: '', email: '', amount: '' });
  const [paid, setPaid] = useState(0);
  const [scriptReady, setScriptReady] = useState(false);

  useEffect(() => {
    // Load Paystack inline script
    if (typeof window === 'undefined') return;
    if (window.PaystackPop) { setScriptReady(true); return; }
    const s = document.createElement('script');
    s.src = 'https://js.paystack.co/v1/inline.js';
    s.async = true;
    s.onload = () => setScriptReady(true);
    s.onerror = () => console.error('Paystack script failed to load');
    document.head.appendChild(s);
  }, []);

  const presets = [500, 1000, 2000, 5000, 10000, 20000];
  const amountNum = Number(form.amount);

  const handleGive = async () => {
    if (!amountNum || amountNum < 100) return;

    const pk = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
    if (!pk || pk.includes('PASTE_YOUR')) {
      alert('Paystack is not configured yet. Please add your public key to .env.local and redeploy.');
      return;
    }
    if (!scriptReady || !window.PaystackPop) {
      alert('Payment system is loading. Please try again in a moment.');
      return;
    }

    // Generate unique reference
    const reference = `HHM-${Date.now()}-${Math.random().toString(36).slice(2,8).toUpperCase()}`;

    // Save pending record to DB
    setStep('loading');
    try {
      await fetch('/api/offerings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          donor_name: form.name || 'Anonymous',
          donor_email: form.email || null,
          amount: amountNum,
          reference,
        }),
      });
    } catch (e) {
      console.error('Failed to save offering record:', e);
    }

    setStep('form'); // Reset so Paystack popup shows over the form

    const handler = window.PaystackPop.setup({
      key: pk,
      email: form.email || 'anonymous@heavenshospitality.org',
      amount: amountNum * 100, // Paystack uses kobo (100 kobo = ₦1)
      currency: 'NGN',
      ref: reference,
      label: form.name || 'Anonymous Donor',
      metadata: {
        custom_fields: [
          { display_name: 'Donor Name', variable_name: 'donor_name', value: form.name || 'Anonymous' },
          { display_name: 'Ministry', variable_name: 'ministry', value: "Heaven's Hospitality Ministries" },
        ],
      },
      callback: async (response: { reference: string }) => {
        // Verify on server side
        try {
          const verify = await fetch('/api/offerings/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reference: response.reference }),
          });
          const data = await verify.json();
          if (data.success) {
            setPaid(data.amount);
            setStep('success');
          } else {
            setStep('error');
          }
        } catch {
          setStep('error');
        }
      },
      onClose: () => {
        // User closed Paystack popup without paying — just go back to form
        setStep('form');
      },
    });

    handler.openIframe();
  };

  const inp: React.CSSProperties = {
    width: '100%',
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(232,76,14,0.25)',
    borderRadius: 6,
    padding: '13px 16px',
    color: 'white',
    fontFamily: 'Cormorant Garamond,serif',
    fontSize: 17,
    outline: 'none',
    WebkitAppearance: 'none',
  };

  const lbl: React.CSSProperties = {
    fontFamily: 'Montserrat,sans-serif',
    fontSize: 10,
    letterSpacing: 2,
    color: 'rgba(232,76,14,0.8)',
    textTransform: 'uppercase',
    display: 'block',
    marginBottom: 8,
  };

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, background: 'rgba(6,14,26,0.88)', backdropFilter: 'blur(10px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{ background: 'linear-gradient(160deg,#0B1A2E,#152744)', border: '1px solid rgba(232,76,14,0.25)', borderRadius: 14, padding: 'clamp(24px,5vw,36px)', width: '100%', maxWidth: 460, position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(255,255,255,0.08)', border: 'none', color: 'rgba(255,255,255,0.7)', width: 30, height: 30, borderRadius: '50%', cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          ×
        </button>

        {step === 'success' ? (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <h3 style={{ fontFamily: 'Playfair Display,serif', fontSize: 26, color: 'white', marginBottom: 14 }}>God Bless You!</h3>
            <p style={{ fontFamily: 'Cormorant Garamond,serif', fontStyle: 'italic', fontSize: 18, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, marginBottom: 10 }}>
              Your offering of <strong style={{ color: 'var(--orange)' }}>₦{paid.toLocaleString()}</strong> has been received.
            </p>
            <p style={{ fontFamily: 'Cormorant Garamond,serif', fontStyle: 'italic', fontSize: 16, color: 'rgba(255,255,255,0.45)', marginBottom: 24 }}>
              "Give, and it will be given to you." — Luke 6:38
            </p>
            <button onClick={onClose} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px' }}>Close</button>
          </div>

        ) : step === 'error' ? (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <h3 style={{ fontFamily: 'Playfair Display,serif', fontSize: 22, color: 'white', marginBottom: 12 }}>Payment Issue</h3>
            <p style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 16, color: 'rgba(255,255,255,0.6)', marginBottom: 24 }}>
              You can also give directly via bank transfer below.
            </p>
            <div style={{ background: 'rgba(232,76,14,0.08)', border: '1px solid rgba(232,76,14,0.18)', borderRadius: 8, padding: '18px 20px', marginBottom: 20, textAlign: 'left' }}>
              <div style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 9, letterSpacing: 2, color: 'rgba(232,76,14,0.7)', textTransform: 'uppercase', marginBottom: 8 }}>Bank Transfer</div>
              <div style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 16, color: 'rgba(255,255,255,0.7)', marginBottom: 4 }}>Access Bank</div>
              <div style={{ fontFamily: 'Playfair Display,serif', fontSize: 22, color: 'var(--orange)', fontWeight: 700, margin: '4px 0' }}>1971079112</div>
              <div style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.45)' }}>HEAVEN'S HOSPITALITY MINISTRIES</div>
            </div>
            <button onClick={() => setStep('form')} className="btn-outline" style={{ width: '100%', justifyContent: 'center' }}>Try Again</button>
          </div>

        ) : (
          <>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <h3 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(20px,4vw,26px)', color: 'white', marginBottom: 8 }}>Give an Offering</h3>
              <p style={{ fontFamily: 'Cormorant Garamond,serif', fontStyle: 'italic', fontSize: 15, color: 'rgba(255,255,255,0.5)' }}>
                "Bring the whole tithe into the storehouse." — Malachi 3:10
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={lbl}>Amount (₦)</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginBottom: 10 }}>
                  {presets.map(p => (
                    <button
                      key={p}
                      onClick={() => setForm({ ...form, amount: String(p) })}
                      style={{
                        padding: '10px 4px',
                        background: form.amount === String(p) ? 'linear-gradient(135deg,#C03A08,#E84C0E)' : 'rgba(255,255,255,0.05)',
                        border: `1px solid ${form.amount === String(p) ? 'var(--orange)' : 'rgba(232,76,14,0.15)'}`,
                        borderRadius: 6,
                        color: 'white',
                        fontFamily: 'Montserrat,sans-serif',
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      ₦{p.toLocaleString()}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  placeholder="Or enter custom amount"
                  value={form.amount}
                  onChange={e => setForm({ ...form, amount: e.target.value })}
                  style={inp}
                  min={100}
                />
              </div>

              <div>
                <label style={lbl}>Your Name (optional)</label>
                <input type="text" placeholder="Anonymous" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inp} />
              </div>

              <div>
                <label style={lbl}>Email for Receipt (optional)</label>
                <input type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={inp} />
              </div>

              <button
                onClick={handleGive}
                disabled={step === 'loading' || !amountNum || amountNum < 100}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '15px', fontSize: 13, marginTop: 4, opacity: (!amountNum || amountNum < 100) ? 0.5 : 1 }}
              >
                {step === 'loading' ? 'Processing...' : amountNum >= 100 ? `Give ₦${amountNum.toLocaleString()}` : 'Enter an amount'}
              </button>

              {/* Bank transfer fallback */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 16 }}>
                <div style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 9, letterSpacing: 1.5, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', textAlign: 'center', marginBottom: 10 }}>
                  Or transfer directly
                </div>
                <div style={{ background: 'rgba(232,76,14,0.07)', border: '1px solid rgba(232,76,14,0.12)', borderRadius: 8, padding: '14px 16px', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 9, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>Access Bank</div>
                  <div style={{ fontFamily: 'Playfair Display,serif', fontSize: 20, color: 'var(--orange)', fontWeight: 700 }}>1971079112</div>
                  <div style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 9, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>HEAVEN'S HOSPITALITY MINISTRIES</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
