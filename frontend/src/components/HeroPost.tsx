import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Eye, Heart, MessageCircle, ArrowRight, Bookmark } from 'lucide-react';

const HERO_POST = {
  id: 'post-hero-001',
  title: 'The Architecture Behind Modern AI Systems: How Large Language Models Actually Work',
  excerpt:
    'From transformer attention mechanisms to RLHF training pipelines — a deep technical dive into the engineering decisions that made ChatGPT, Claude, and Gemini possible. No hype, just architecture.',
  author: {
    name: 'Dr. Priya Nair',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya',
    role: 'ML Research Engineer',
  },
  category: 'Technology',
  readTime: '14 min read',
  publishedAt: 'June 8, 2026',
  views: 48200,
  likes: 3410,
  comments: 287,
  image: 'https://img.rocket.new/generatedImages/rocket_gen_img_19f8fe7fc-1772547120162.png',
  imageAlt: 'Abstract neural network visualization with glowing blue nodes and connections on dark background',
};

function formatNumber(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
  return n.toString();
}

export default function HeroPost() {
  return (
    <div
      style={{
        position: 'relative',
        borderRadius: '16px',
        overflow: 'hidden',
        backgroundColor: '#ffffff',
        border: '1px solid #E5E7EB',
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
        marginBottom: '8px',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.10)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.06)';
      }}
    >
      {/* Image container — responsive height */}
      <div
        style={{ position: 'relative', overflow: 'hidden' }}
        className="hero-img-wrap"
      >
        <img
          src={HERO_POST.image}
          alt={HERO_POST.imageAlt}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />

        {/* Dark gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.28) 50%, transparent 100%)',
          }}
        />

        {/* Featured badge — top left */}
        <div style={{ position: 'absolute', top: '16px', left: '16px' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              backgroundColor: '#F59E0B',
              color: '#ffffff',
              fontSize: '0.72rem',
              fontWeight: 700,
              borderRadius: '9999px',
            }}
          >
            ⭐ Featured
          </span>
        </div>

        {/* Bookmark — top right */}
        <button
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            padding: '8px',
            backgroundColor: 'rgba(255,255,255,0.18)',
            backdropFilter: 'blur(6px)',
            border: 'none',
            borderRadius: '8px',
            color: '#ffffff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.15s ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.28)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.18)';
          }}
        >
          <Bookmark size={16} />
        </button>

        {/* Bottom content overlay */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '24px 32px 28px',
          }}
          className="hero-content-pad"
        >
          {/* Category chip */}
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '2px 10px',
              borderRadius: '9999px',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.02em',
              backgroundColor: 'rgba(219,234,254,0.9)',
              color: '#1d4ed8',
              marginBottom: '12px',
            }}
          >
            {HERO_POST.category}
          </span>

          {/* Title */}
          <h1
            style={{
              color: '#ffffff',
              fontWeight: 800,
              fontSize: 'clamp(1.6rem, 3.2vw, 3rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              marginBottom: '12px',
              maxWidth: '760px',
            }}
          >
            {HERO_POST.title}
          </h1>

          {/* Excerpt — hidden on mobile */}
          <p
            style={{
              color: 'rgba(255,255,255,0.78)',
              fontSize: '0.9375rem',
              lineHeight: 1.65,
              maxWidth: '640px',
              marginBottom: '20px',
            }}
            className="hero-excerpt"
          >
            {HERO_POST.excerpt}
          </p>

          {/* Author + stats + CTA row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            {/* Author */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img
                src={HERO_POST.author.avatar}
                alt={`${HERO_POST.author.name} profile photo`}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: '2px solid rgba(255,255,255,0.35)',
                  backgroundColor: '#E5E7EB',
                }}
              />
              <div>
                <p style={{ color: '#ffffff', fontWeight: 600, fontSize: '0.875rem', margin: 0 }}>
                  {HERO_POST.author.name}
                </p>
                <p style={{ color: 'rgba(255,255,255,0.58)', fontSize: '0.72rem', margin: 0 }}>
                  {HERO_POST.author.role}
                </p>
              </div>
              <span style={{ color: 'rgba(255,255,255,0.38)', fontSize: '0.75rem' }} className="hero-dot">·</span>
              <span style={{ color: 'rgba(255,255,255,0.58)', fontSize: '0.72rem' }} className="hero-date">
                {HERO_POST.publishedAt}
              </span>
            </div>

            {/* Stats + CTA */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {/* Stats */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  color: 'rgba(255,255,255,0.68)',
                  fontSize: '0.72rem',
                }}
                className="hero-stats"
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={13} /> {HERO_POST.readTime}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Eye size={13} /> {formatNumber(HERO_POST.views)}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Heart size={13} /> {formatNumber(HERO_POST.likes)}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MessageCircle size={13} /> {HERO_POST.comments}
                </span>
              </div>

              {/* Read Article CTA */}
              <Link
                to="/post-details-page"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  backgroundColor: '#ffffff',
                  color: '#111827',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  borderRadius: '12px',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.88)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = '#ffffff';
                }}
              >
                Read Article
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        .hero-img-wrap { height: 340px; }
        @media (min-width: 768px) { .hero-img-wrap { height: 420px; } .hero-content-pad { padding: 32px 40px 36px !important; } }
        @media (min-width: 1024px) { .hero-img-wrap { height: 480px; } }
        @media (max-width: 767px) {
          .hero-excerpt { display: none !important; }
          .hero-stats { display: none !important; }
          .hero-dot { display: none !important; }
          .hero-date { display: none !important; }
          .hero-content-pad { padding: 20px !important; }
        }
      `}</style>
    </div>
  );
}