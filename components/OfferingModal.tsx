'use client';
import { useState, useEffect, useRef } from 'react';

interface Props { onClose: () => void; }
declare global { interface Window { PaystackPop: any; } }

// Country display info — we detect location for personalisation
// but ALL payments are charged in NGN via Paystack subaccount
const COUNTRY_INFO: Record<string, { flag: string; name: string }> = {
  NG: { flag: '🇳🇬', name: 'Nigeria' },
  GB: { flag: '🇬🇧', name: 'United Kingdom' },
  US: { flag: '🇺🇸', name: 'United States' },
  GH: { flag: '🇬🇭', name: 'Ghana' },
  ZA: { flag: '🇿🇦', name: 'South Africa' },
  KE: { flag: '🇰🇪', name: 'Kenya' },
  CA: { flag: '🇨🇦', name: 'Canada' },
  AU: { flag: '🇦🇺', name: 'Australia' },
};

export default function OfferingModal({ onClose }: Props) {
  const [step, setStep] = useState<'form'|'processing'|'success'|'error'>('form');
  const [form, setForm] = useState({ name: '', email: '', amount: '' });
  const [paid, setPaid] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [scriptReady, setScriptReady] = useState(false);
  const [country, setCountry] = useState<{flag:string;name:string}|null>(null);
  const [detecting, setDetecting] = useState(true);
  const hasLoadedScript = useRef(false);

  // Detect country from IP — for display only, payment is always NGN
  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(r => r.json())
      .then(data => {
        const cc = data.country_code as string;
        setCountry(COUNTRY_INFO[cc] || null);
      })
      .catch(() => {})
      .finally(() => setDetecting(false));
  }, []);

  // Load Paystack script
  useEffect(() => {
    if (hasLoadedScript.current) return;
    hasLoadedScript.current = true;
    if (typeof window !== 'undefined' && window.PaystackPop) { setScriptReady(true); return; }
    const s = document.createElement('script');
    s.src = 'https://js.paystack.co/v1/inline.js';
    s.async = true;
    s.onload = () => setScriptReady(true);
    document.head.appendChild(s);
  }, []);

  const amountNum = Number(form.amount);
  const isValid = amountNum >= 100; // NGN minimum

  const handleGive = async () => {
    if (!isValid) return;

    const pk = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
    if (!pk || pk.includes('PASTE')) {
      setErrorMsg('Payment not configured. Please use bank transfer below.');
      setStep('error');
      return;
    }
    if (!scriptReady || !window.PaystackPop) {
      setErrorMsg('Payment system loading. Please try again in a moment.');
      return;
    }

    const reference = `HHM-${Date.now()}-${Math.random().toString(36).slice(2,8).toUpperCase()}`;

    try {
      await fetch('/api/offerings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ donor_name: form.name || 'Anonymous', donor_email: form.email || null, amount: amountNum, currency: 'NGN', reference }),
      });
    } catch {}

    const paystackRef = reference;

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
            setErrorMsg(`Payment received but verification failed. Contact support@jktl.com.ng — Ref: ${paystackRef}`);
            setStep('error');
          }
        })
        .catch(() => {
          setErrorMsg(`Verification error. Contact support@jktl.com.ng — Ref: ${paystackRef}`);
          setStep('error');
        });
    }

    function onPopupClose() { setStep('form'); }

    try {
      const handler = window.PaystackPop.setup({
        key: pk,
        email: form.email || 'anonymous@heavenshospitality.org',
        amount: amountNum * 100, // smallest unit
        currency: 'NGN', // All offerings collected in NGN
        ref: paystackRef,
        label: form.name || 'Anonymous Donor',
        // Always NGN — subaccount routes to Access Bank 1971079112
        subaccount: 'ACCT_da4dqrx0zink1hd',
        bearer: 'subaccount',
        channels: ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer'],
        metadata: {
          custom_fields: [
            { display_name: 'Donor Name', variable_name: 'donor_name', value: form.name || 'Anonymous' },
            { display_name: 'Currency', variable_name: 'currency', value: 'NGN' },
          ],
        },
        callback: onPaymentSuccess,
        onClose: onPopupClose,
      });
      handler.openIframe();
    } catch (e) {
      console.error('Paystack error:', e);
      setErrorMsg('Could not open payment. Please use bank transfer below.');
      setStep('error');
    }
  };

  const BankTransfer = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {/* NGN */}
      <div style={{ background: 'rgba(232,76,14,0.07)', border: '1px solid rgba(232,76,14,0.15)', borderRadius: 8, padding: '14px 16px' }}>
        <div style={{ fontSize: 9, letterSpacing: 2, color: 'rgba(232,76,14,0.7)', textTransform: 'uppercase', marginBottom: 6, fontWeight: 600 }}>Access Bank · Nigeria (NGN)</div>
        <div style={{ fontSize: 20, color: 'var(--orange)', fontWeight: 700, letterSpacing: 1, fontFamily: 'monospace' }}>1971079112</div>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 3 }}>HEAVEN'S HOSPITALITY MINISTRIES</div>
      </div>
      {/* USD */}
      <div style={{ background: 'rgba(232,76,14,0.07)', border: '1px solid rgba(232,76,14,0.15)', borderRadius: 8, padding: '14px 16px' }}>
        <div style={{ fontSize: 9, letterSpacing: 2, color: 'rgba(232,76,14,0.7)', textTransform: 'uppercase', marginBottom: 6, fontWeight: 600 }}>Access Bank · USD</div>
        <div style={{ fontSize: 20, color: 'var(--orange)', fontWeight: 700, letterSpacing: 1, fontFamily: 'monospace' }}>1981712542</div>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 3 }}>HEAVEN'S HOSPITALITY MINISTRIES (USD)</div>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>Swift: ABNGNGLA</div>
      </div>
      {/* EUR */}
      <div style={{ background: 'rgba(232,76,14,0.07)', border: '1px solid rgba(232,76,14,0.15)', borderRadius: 8, padding: '14px 16px' }}>
        <div style={{ fontSize: 9, letterSpacing: 2, color: 'rgba(232,76,14,0.7)', textTransform: 'uppercase', marginBottom: 6, fontWeight: 600 }}>Access Bank · EUR</div>
        <div style={{ fontSize: 20, color: 'var(--orange)', fontWeight: 700, letterSpacing: 1, fontFamily: 'monospace' }}>1981676800</div>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 3 }}>HEAVEN'S HOSPITALITY MINISTRIES (EUR)</div>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>Swift: ABNGNGLA</div>
      </div>
    </div>
  );

  const inp: React.CSSProperties = { width: '100%', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(232,76,14,0.25)', borderRadius: 6, padding: '13px 16px', color: 'white', fontSize: 16, outline: 'none', WebkitAppearance: 'none' };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, background: 'rgba(6,14,26,0.92)', backdropFilter: 'blur(12px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ background: 'linear-gradient(160deg,#0B1A2E,#152744)', border: '1px solid rgba(232,76,14,0.25)', borderRadius: 14, padding: 'clamp(24px,5vw,36px)', width: '100%', maxWidth: 460, position: 'relative', maxHeight: '92vh', overflowY: 'auto' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(255,255,255,0.08)', border: 'none', color: 'rgba(255,255,255,0.6)', width: 30, height: 30, borderRadius: '50%', cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>

        {/* SUCCESS */}
        {step === 'success' && (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ width: 56, height: 56, background: 'rgba(46,204,113,0.15)', border: '2px solid rgba(46,204,113,0.4)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 22, color: '#2ecc71' }}>✓</div>
            <h3 style={{ fontSize: 24, fontWeight: 700, color: 'white', marginBottom: 12 }}>God Bless You!</h3>
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, marginBottom: 8, fontStyle: 'italic' }}>
              Your offering of <strong style={{ color: 'var(--orange)' }}>₦{paid.toLocaleString()}</strong> has been received.
            </p>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', marginBottom: 28, fontStyle: 'italic' }}>"Give, and it will be given to you." — Luke 6:38</p>
            <button onClick={onClose} className="btn-primary" style={{ width: '100%', padding: '14px' }}>Close</button>
          </div>
        )}

        {/* PROCESSING */}
        {step === 'processing' && (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', letterSpacing: 1 }}>Verifying payment...</p>
          </div>
        )}

        {/* ERROR */}
        {step === 'error' && (
          <div style={{ padding: '8px 0' }}>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: 'white', marginBottom: 12 }}>Payment Issue</h3>
            {errorMsg && <p style={{ fontSize: 12, color: 'rgba(255,180,100,0.85)', lineHeight: 1.6, marginBottom: 20 }}>{errorMsg}</p>}
            <BankTransfer />
            <button onClick={() => { setStep('form'); setErrorMsg(''); }} className="btn-outline" style={{ width: '100%', justifyContent: 'center', marginTop: 16 }}>Try Again</button>
          </div>
        )}

        {/* FORM */}
        {step === 'form' && (
          <>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <h3 style={{ fontSize: 'clamp(20px,4vw,26px)', fontWeight: 700, color: 'white', marginBottom: 8 }}>Give an Offering</h3>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', fontStyle: 'italic' }}>
                "Bring the whole tithe into the storehouse." — Malachi 3:10
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

              {/* Country greeting — detection only, payment always NGN */}
              {!detecting && country && (
                <div style={{ background: 'rgba(232,76,14,0.07)', border: '1px solid rgba(232,76,14,0.15)', borderRadius: 8, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 22 }}>{country.flag}</span>
                  <div>
                    <div style={{ fontSize: 13, color: 'white', fontWeight: 600 }}>Giving from {country.name}</div>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>All offerings are processed in Nigerian Naira (₦)</div>
                  </div>
                </div>
              )}

              {/* Free amount input — no presets */}
              <div>
                <label style={{ fontSize: 10, letterSpacing: 2, color: 'rgba(232,76,14,0.8)', textTransform: 'uppercase', display: 'block', marginBottom: 8, fontWeight: 600 }}>
                  Amount (₦ Naira)
                </label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 18, color: 'rgba(255,255,255,0.5)', fontWeight: 700 }}>₦</span>
                  <input
                    type="number"
                    placeholder="Minimum ₦100"
                    value={form.amount}
                    onChange={e => setForm({ ...form, amount: e.target.value })}
                    style={{ ...inp, paddingLeft: 36 }}
                    min={100}
                    step="any"
                  />
                </div>
                {form.amount && !isValid && (
                  <p style={{ fontSize: 11, color: 'rgba(255,120,80,0.8)', marginTop: 6 }}>
                    Minimum amount is ₦100
                  </p>
                )}
              </div>

              <div>
                <label style={{ fontSize: 10, letterSpacing: 2, color: 'rgba(232,76,14,0.8)', textTransform: 'uppercase', display: 'block', marginBottom: 8, fontWeight: 600 }}>Your Name (optional)</label>
                <input type="text" placeholder="Anonymous" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inp} />
              </div>

              <div>
                <label style={{ fontSize: 10, letterSpacing: 2, color: 'rgba(232,76,14,0.8)', textTransform: 'uppercase', display: 'block', marginBottom: 8, fontWeight: 600 }}>Email for Receipt (optional)</label>
                <input type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={inp} />
              </div>

              <button
                onClick={handleGive}
                disabled={!isValid}
                className="btn-primary"
                style={{ width: '100%', padding: '16px', fontSize: 14, marginTop: 4, opacity: !isValid ? 0.4 : 1, cursor: !isValid ? 'not-allowed' : 'pointer' }}
              >
                {isValid ? `Give ₦${Number(form.amount).toLocaleString()}` : 'Enter an amount to continue'}
              </button>

              {/* Bank transfer */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 16 }}>
                <div style={{ fontSize: 9, letterSpacing: 1.5, color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', textAlign: 'center', marginBottom: 12 }}>Or transfer directly via bank</div>
                <BankTransfer />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
