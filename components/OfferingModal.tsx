'use client';
import { useState, useEffect, useRef } from 'react';

interface Props { onClose: () => void; }
declare global { interface Window { PaystackPop: any; } }

export default function OfferingModal({ onClose }: Props) {
  const [step, setStep] = useState<'form'|'processing'|'success'|'error'>('form');
  const [form, setForm] = useState({ name: '', email: '', amount: '' });
  const [paid, setPaid] = useState(0);
  const [scriptReady, setScriptReady] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const hasLoadedScript = useRef(false);

  useEffect(() => {
    if (hasLoadedScript.current) return;
    hasLoadedScript.current = true;

    // If already loaded from a previous modal open
    if (typeof window !== 'undefined' && window.PaystackPop) {
      setScriptReady(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    script.onload = () => {
      console.log('Paystack script loaded');
      setScriptReady(true);
    };
    script.onerror = () => {
      console.error('Failed to load Paystack script');
      setErrorMsg('Payment system failed to load. Please use bank transfer.');
    };
    document.head.appendChild(script);
  }, []);

  const amountNum = Number(form.amount);
  const presets = [500, 1000, 2000, 5000, 10000, 20000];

  const handleGive = async () => {
    if (!amountNum || amountNum < 100) return;

    const pk = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;

    // Clear check — if key is missing or still placeholder, show bank transfer
    if (!pk || pk === '' || pk.startsWith('pk_live_PASTE') || pk.startsWith('pk_test_PASTE')) {
      setErrorMsg('Paystack keys are not configured. Please add your Paystack public key to your environment variables and redeploy, or use the bank transfer below.');
      setStep('error');
      return;
    }

    if (!scriptReady || !window.PaystackPop) {
      setErrorMsg('Payment system is still loading. Please wait a moment and try again.');
      return;
    }

    // Save pending record
    const reference = `HHM-${Date.now()}-${Math.random().toString(36).slice(2,8).toUpperCase()}`;
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
      console.warn('Could not save offering record:', e);
    }

    // Open Paystack popup
    // NOTE: Paystack requires callback to be a plain non-async function.
    // We handle the async verification inside using .then() chains.
    const paystackRef = reference; // capture for closure

    function onPaymentSuccess(response: { reference: string }) {
      setStep('processing');
      fetch('/api/offerings/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reference: response.reference }),
      })
        .then(r => r.json())
        .then(data => {
          if (data.success) {
            setPaid(data.amount);
            setStep('success');
          } else {
            setErrorMsg('Payment received but verification failed. Contact support@jktl.com.ng — Ref: ' + paystackRef);
            setStep('error');
          }
        })
        .catch(() => {
          setErrorMsg('Verification error. If charged, contact support@jktl.com.ng — Ref: ' + paystackRef);
          setStep('error');
        });
    }

    function onPopupClose() {
      setStep('form');
    }

    try {
      const handler = window.PaystackPop.setup({
        key: pk,
        email: form.email || 'anonymous@heavenshospitality.org',
        amount: amountNum * 100,
        currency: 'NGN',
        ref: paystackRef,
        label: form.name || 'Anonymous Donor',
        subaccount: 'ACCT_da4dqrx0zink1hd',
        bearer: 'subaccount',
        channels: ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer'],
        metadata: {
          custom_fields: [
            { display_name: 'Donor Name', variable_name: 'donor_name', value: form.name || 'Anonymous' },
            { display_name: 'Ministry', variable_name: 'ministry', value: "Heaven's Hospitality Ministries" },
          ],
        },
        callback: onPaymentSuccess,
        onClose: onPopupClose,
      });

      handler.openIframe();
    } catch (e) {
      console.error('Paystack setup error:', e);
      setErrorMsg('Could not open payment. Please use bank transfer below.');
      setStep('error');
    }
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

  const BankTransfer = () => (
    <div style={{ background: 'rgba(232,76,14,0.07)', border: '1px solid rgba(232,76,14,0.15)', borderRadius: 8, padding: '16px 18px' }}>
      <div style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 9, letterSpacing: 2, color: 'rgba(232,76,14,0.7)', textTransform: 'uppercase', marginBottom: 8 }}>Bank Transfer</div>
      <div style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 15, color: 'rgba(255,255,255,0.6)', marginBottom: 3 }}>Access Bank</div>
      <div style={{ fontFamily: 'Playfair Display,serif', fontSize: 22, color: 'var(--orange)', fontWeight: 700, letterSpacing: 1 }}>1971079112</div>
      <div style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>HEAVEN'S HOSPITALITY MINISTRIES</div>
    </div>
  );

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, background: 'rgba(6,14,26,0.92)', backdropFilter: 'blur(12px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{ background: 'linear-gradient(160deg,#0B1A2E,#152744)', border: '1px solid rgba(232,76,14,0.25)', borderRadius: 14, padding: 'clamp(24px,5vw,36px)', width: '100%', maxWidth: 460, position: 'relative', maxHeight: '92vh', overflowY: 'auto' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(255,255,255,0.08)', border: 'none', color: 'rgba(255,255,255,0.6)', width: 30, height: 30, borderRadius: '50%', cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}>
          ×
        </button>

        {/* SUCCESS */}
        {step === 'success' && (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ width: 56, height: 56, background: 'rgba(46,204,113,0.15)', border: '2px solid rgba(46,204,113,0.4)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 24 }}>✓</div>
            <h3 style={{ fontFamily: 'Playfair Display,serif', fontSize: 26, color: 'white', marginBottom: 12 }}>God Bless You!</h3>
            <p style={{ fontFamily: 'Cormorant Garamond,serif', fontStyle: 'italic', fontSize: 18, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, marginBottom: 8 }}>
              Your offering of{' '}
              <strong style={{ color: 'var(--orange)' }}>₦{paid.toLocaleString()}</strong>{' '}
              has been received.
            </p>
            <p style={{ fontFamily: 'Cormorant Garamond,serif', fontStyle: 'italic', fontSize: 15, color: 'rgba(255,255,255,0.4)', marginBottom: 28 }}>
              "Give, and it will be given to you." — Luke 6:38
            </p>
            <button onClick={onClose} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px' }}>Close</button>
          </div>
        )}

        {/* PROCESSING */}
        {step === 'processing' && (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.6)', letterSpacing: 1 }}>Verifying payment...</div>
          </div>
        )}

        {/* ERROR */}
        {step === 'error' && (
          <div style={{ padding: '8px 0' }}>
            <h3 style={{ fontFamily: 'Playfair Display,serif', fontSize: 22, color: 'white', marginBottom: 12 }}>Payment Issue</h3>
            {errorMsg && <p style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 12, color: 'rgba(255,180,100,0.85)', lineHeight: 1.6, marginBottom: 20 }}>{errorMsg}</p>}
            <BankTransfer />
            <button onClick={() => { setStep('form'); setErrorMsg(''); }} className="btn-outline" style={{ width: '100%', justifyContent: 'center', marginTop: 16 }}>Try Again</button>
          </div>
        )}

        {/* FORM */}
        {step === 'form' && (
          <>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <h3 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(20px,4vw,26px)', color: 'white', marginBottom: 8 }}>Give an Offering</h3>
              <p style={{ fontFamily: 'Cormorant Garamond,serif', fontStyle: 'italic', fontSize: 15, color: 'rgba(255,255,255,0.45)' }}>
                "Bring the whole tithe into the storehouse." — Malachi 3:10
              </p>
              {!scriptReady && !errorMsg && (
                <div style={{ marginTop: 10, fontFamily: 'Montserrat,sans-serif', fontSize: 10, color: 'rgba(232,76,14,0.6)', letterSpacing: 0.5 }}>
                  Loading payment system...
                </div>
              )}
              {errorMsg && (
                <div style={{ marginTop: 10, fontFamily: 'Montserrat,sans-serif', fontSize: 10, color: 'rgba(255,150,80,0.8)', letterSpacing: 0.5 }}>
                  {errorMsg}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Preset amounts */}
              <div>
                <label style={lbl}>Select Amount (₦)</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginBottom: 10 }}>
                  {presets.map(p => (
                    <button
                      key={p}
                      onClick={() => setForm({ ...form, amount: String(p) })}
                      style={{
                        padding: '11px 4px',
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
                  placeholder="Or type a custom amount"
                  value={form.amount}
                  onChange={e => setForm({ ...form, amount: e.target.value })}
                  style={inp}
                  min={100}
                />
                {amountNum > 0 && amountNum < 100 && (
                  <p style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 10, color: 'rgba(255,120,80,0.8)', marginTop: 6 }}>Minimum amount is ₦100</p>
                )}
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
                disabled={!amountNum || amountNum < 100}
                className="btn-primary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '16px',
                  fontSize: 14,
                  marginTop: 4,
                  opacity: (!amountNum || amountNum < 100) ? 0.45 : 1,
                  cursor: (!amountNum || amountNum < 100) ? 'not-allowed' : 'pointer',
                }}
              >
                {amountNum >= 100 ? `Give ₦${amountNum.toLocaleString()}` : 'Enter an amount to continue'}
              </button>

              {/* Bank transfer */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 16 }}>
                <div style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 9, letterSpacing: 1.5, color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', textAlign: 'center', marginBottom: 12 }}>
                  Prefer bank transfer?
                </div>
                <BankTransfer />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
