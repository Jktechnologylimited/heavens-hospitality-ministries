'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Devotion {
  id: number;
  title: string;
  slug: string;
  scripture_reference: string;
  content: string;
  author: string;
  devotion_date: string;
}

export default function DevotionsList() {
  const [devotions, setDevotions] = useState<Devotion[]>([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/devotions?page=${page}&limit=9`)
      .then((r) => r.json())
      .then((data) => {
        setDevotions(data.devotions || []);
        setPages(data.pages || 1);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [page]);

  const placeholder = [
    {
      id: 1,
      title: 'The Lord Is My Shepherd',
      slug: '#',
      scripture_reference: 'Psalm 23:1-3',
      content: 'In every season of life, God promises to lead, guide, and provide for His children. Today, rest in the truth that you are never alone.',
      author: "Heaven's Hospitality Ministries",
      devotion_date: new Date().toISOString(),
    },
    {
      id: 2,
      title: 'Plans to Prosper You',
      slug: '#',
      scripture_reference: 'Jeremiah 29:11',
      content: 'God has declared His intention for your life — plans filled with hope, purpose, and a future far beyond what you can imagine.',
      author: "Heaven's Hospitality Ministries",
      devotion_date: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: 3,
      title: 'Soaring on Eagles\' Wings',
      slug: '#',
      scripture_reference: 'Isaiah 40:31',
      content: 'When weariness threatens to overwhelm, there is a divine exchange available. Trade your exhaustion for His boundless strength.',
      author: "Heaven's Hospitality Ministries",
      devotion_date: new Date(Date.now() - 172800000).toISOString(),
    },
  ];

  const displayDevotions = devotions.length > 0 ? devotions : (loading ? [] : placeholder);

  return (
    <section className="py-20 px-6" style={{ background: '#faf7f0' }}>
      <div className="max-w-7xl mx-auto">
        {loading && (
          <div className="text-center py-20">
            <div
              className="font-display"
              style={{ color: '#c9a84c', letterSpacing: '3px', fontSize: '11px' }}
            >
              LOADING DEVOTIONS...
            </div>
          </div>
        )}

        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayDevotions.map((d) => (
              <Link
                href={d.slug !== '#' ? `/devotions/${d.slug}` : '#'}
                key={d.id}
                className="ministry-card block rounded overflow-hidden"
                style={{ background: 'white', border: '1px solid rgba(201,168,76,0.2)', textDecoration: 'none' }}
              >
                <div
                  className="p-3 text-center"
                  style={{ background: 'linear-gradient(135deg, #071428, #1a2744)' }}
                >
                  <span
                    className="font-display text-white"
                    style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase' }}
                  >
                    {new Date(d.devotion_date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <div className="p-8">
                  <div
                    className="font-serif mb-3"
                    style={{ fontSize: '14px', color: '#c9a84c', letterSpacing: '1px' }}
                  >
                    {d.scripture_reference}
                  </div>
                  <h3
                    className="font-display mb-4"
                    style={{ fontSize: '18px', letterSpacing: '1px', color: '#071428', lineHeight: 1.4 }}
                  >
                    {d.title}
                  </h3>
                  <div className="gold-divider mb-5" />
                  <p
                    className="font-serif"
                    style={{ fontSize: '17px', color: '#666', lineHeight: 1.7 }}
                  >
                    {d.content.replace(/<[^>]*>/g, '').substring(0, 150)}...
                  </p>
                  <div
                    className="mt-6 font-display"
                    style={{ fontSize: '10px', letterSpacing: '2px', color: '#c9a84c' }}
                  >
                    READ MORE →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pages > 1 && !loading && (
          <div className="flex justify-center gap-3 mt-16">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="btn-outline"
              style={{ padding: '10px 20px', fontSize: '10px', opacity: page === 1 ? 0.4 : 1 }}
            >
              Previous
            </button>
            <span
              className="font-display flex items-center px-4"
              style={{ fontSize: '12px', color: '#c9a84c', letterSpacing: '2px' }}
            >
              {page} / {pages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(pages, p + 1))}
              disabled={page === pages}
              className="btn-outline"
              style={{ padding: '10px 20px', fontSize: '10px', opacity: page === pages ? 0.4 : 1 }}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
