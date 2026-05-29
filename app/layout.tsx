import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "Heaven's Hospitality Ministries | Global Ministry",
  description: "Spreading the love, warmth, and hospitality of Heaven to every corner of the earth. Daily devotions, sermons, and community.",
  keywords: "ministry, church, devotions, sermons, gospel, Christianity, Heaven's Hospitality",
  openGraph: {
    title: "Heaven's Hospitality Ministries",
    description: "Spreading the love and hospitality of Heaven to the world.",
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
