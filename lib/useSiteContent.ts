'use client';
import { useEffect, useState } from 'react';

// Default values — used if DB hasn't been set yet
export const DEFAULTS: Record<string, string> = {
  // Hero
  hero_headline: "Where Heaven's Hospitality Meets the Nations",
  hero_subheadline: "Spreading the love, grace, and warm hospitality of Heaven to every nation on earth.",
  hero_cta_text: "Watch Our Ministry",
  // About
  about_headline: "About Evangelist Bob Edward",
  about_paragraph_1: "Heaven's Hospitality Ministries is a global ministry founded by Evangelist Bob Edward — dedicated to embodying the radical, transforming hospitality that God shows to every human soul.",
  about_paragraph_2: "From crusades across Africa to free training sessions and daily devotions, the ministry exists to see believers walk in the full inheritance Christ secured on the cross.",
  about_tagline: "Taking the Gospel to every nation, tribe, and tongue.",
  // Contact
  contact_email: "hospitalityheavens@gmail.com",
  contact_whatsapp: "+27763511196",
  contact_phone: "+2349138688465",
  contact_address: "Global Ministry",
  // Social
  social_tiktok: "heavenshospitality",
  social_youtube: "HeveansHospitality",
  social_youtube_video_id: "",
  // Newsletter
  newsletter_headline: "Daily Devotions to Your Inbox",
  newsletter_subtext: "Join thousands of believers receiving the Word of God every morning. Free. No spam. Unsubscribe anytime.",
  // Footer
  footer_tagline: "Spreading the love and hospitality of Heaven to every nation, tribe, and tongue.",
  footer_scripture: '"For I was hungry and you gave me food, I was thirsty and you gave me drink, I was a stranger and you welcomed me."',
  footer_scripture_ref: "Matthew 25:35",
};

let cachedContent: Record<string, string> | null = null;
let fetchPromise: Promise<void> | null = null;

export function useSiteContent() {
  const [content, setContent] = useState<Record<string, string>>(cachedContent || DEFAULTS);
  const [loaded, setLoaded] = useState(!!cachedContent);

  useEffect(() => {
    if (cachedContent) { setContent(cachedContent); setLoaded(true); return; }
    if (!fetchPromise) {
      fetchPromise = fetch('/api/site-content')
        .then(r => r.json())
        .then(d => {
          const merged = { ...DEFAULTS, ...d.content };
          cachedContent = merged;
        })
        .catch(() => { cachedContent = DEFAULTS; });
    }
    fetchPromise.then(() => {
      setContent(cachedContent || DEFAULTS);
      setLoaded(true);
    });
  }, []);

  // Helper — returns DB value if set, otherwise default
  const get = (key: string) => content[key] || DEFAULTS[key] || '';

  return { content, get, loaded };
}
