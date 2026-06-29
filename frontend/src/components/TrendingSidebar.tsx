import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Users, Flame, Tag, ArrowUpRight } from 'lucide-react';

const TRENDING_POSTS = [
  { id: 'trend-001', rank: 1, title: 'How I Went From Bootcamp Graduate to Staff Engineer in 4 Years', author: 'Ravi Krishnamurthy', readTime: '8 min', views: 54600 },
  { id: 'trend-002', rank: 2, title: 'The Physics of Attention: Why Your Brain Craves Novelty', author: 'Dr. Fatima Al-Rashid', readTime: '10 min', views: 41300 },
  { id: 'trend-003', rank: 3, title: 'The Quiet Crisis in Open Source Maintainership', author: 'Kwame Asante', readTime: '7 min', views: 31200 },
  { id: 'trend-004', rank: 4, title: 'Kubernetes Is Too Complex — What We Built Instead', author: 'Elena Vasquez', readTime: '11 min', views: 27800 },
  { id: 'trend-005', rank: 5, title: 'The Architecture Behind Modern AI Systems', author: 'Dr. Priya Nair', readTime: '14 min', views: 48200 },
];

const TOP_AUTHORS = [
  { id: 'author-001', name: 'Dr. Priya Nair', role: 'ML Research Engineer', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya' },
  { id: 'author-002', name: 'Ravi Krishnamurthy', role: 'Staff Engineer', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ravi' },
  { id: 'author-003', name: 'Aiko Tanaka', role: 'UX Researcher', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=aiko' },
];

const POPULAR_TAGS = [
  { id: 'tag-react', label: 'React', count: 142 },
  { id: 'tag-ai', label: 'AI & ML', count: 211 },
  { id: 'tag-typescript', label: 'TypeScript', count: 98 },
  { id: 'tag-design', label: 'UX Design', count: 87 },
  { id: 'tag-career', label: 'Career', count: 76 },
  { id: 'tag-oss', label: 'Open Source', count: 64 },
  { id: 'tag-devops', label: 'DevOps', count: 55 },
  { id: 'tag-webdev', label: 'Web Dev', count: 155 },
];

function formatNumber(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
  return n.toString();
}

const card: React.CSSProperties = {
  backgroundColor: '#ffffff',
  border: '1px solid #E5E7EB',
  borderRadius: '16px',
  padding: '20px',
  marginBottom: '16px',
};

const sectionTitle: React.CSSProperties = {
  fontSize: '0.72rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  color: '#111827',
  margin: 0,
};

export default function TrendingSidebar() {
  return (
    <aside>
      {/* Trending Now */}
      <div style={card}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Flame size={15} style={{ color: '#F59E0B' }} />
          <p style={sectionTitle}>Trending Now</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {TRENDING_POSTS.map(post => (
            <Link key={post.id} to="/post-details-page" style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', textDecoration: 'none' }}
              onMouseEnter={e => { (e.currentTarget.querySelector('.trend-title') as HTMLElement).style.color = '#2563EB'; }}
              onMouseLeave={e => { (e.currentTarget.querySelector('.trend-title') as HTMLElement).style.color = '#111827'; }}
            >
              <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#E5E7EB', lineHeight: 1, minWidth: '24px', marginTop: '2px' }}>
                {post.rank}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p className="trend-title" style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#111827', lineHeight: 1.4, marginBottom: '4px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', transition: 'color 0.15s ease' }}>
                  {post.title}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', color: '#9CA3AF', flexWrap: 'wrap' }}>
                  <span>{post.author}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                  <span>·</span>
                  <span>{formatNumber(post.views)} views</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Top Authors */}
      <div style={card}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Users size={15} style={{ color: '#2563EB' }} />
          <p style={sectionTitle}>Top Authors</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {TOP_AUTHORS.map(author => (
            <div key={author.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                <img src={author.avatar} alt={author.name} style={{ width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0, backgroundColor: '#E5E7EB' }} />
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#111827', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {author.name}
                  </p>
                  <p style={{ fontSize: '0.72rem', color: '#9CA3AF', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {author.role}
                  </p>
                </div>
              </div>
              <Link
                to="/sign-up-login-screen"
                style={{
                  flexShrink: 0, display: 'flex', alignItems: 'center', gap: '3px',
                  padding: '4px 10px', border: '1px solid #E5E7EB', borderRadius: '8px',
                  fontSize: '0.72rem', fontWeight: 600, color: '#6B7280', textDecoration: 'none',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.color = '#2563EB';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(37,99,235,0.35)';
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(37,99,235,0.04)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.color = '#6B7280';
                  (e.currentTarget as HTMLElement).style.borderColor = '#E5E7EB';
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                }}
              >
                Follow <ArrowUpRight size={11} />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Tags */}
      <div style={card}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Tag size={15} style={{ color: '#9CA3AF' }} />
          <p style={sectionTitle}>Popular Tags</p>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {POPULAR_TAGS.map(tag => (
            <button
              key={tag.id}
              style={{
                display: 'flex', alignItems: 'center', gap: '4px',
                padding: '4px 10px', borderRadius: '9999px', border: 'none',
                backgroundColor: '#F3F4F6', color: '#6B7280',
                fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(37,99,235,0.08)';
                (e.currentTarget as HTMLElement).style.color = '#2563EB';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.backgroundColor = '#F3F4F6';
                (e.currentTarget as HTMLElement).style.color = '#6B7280';
              }}
            >
              #{tag.label}
              <span style={{ fontWeight: 400, color: '#9CA3AF' }}>{tag.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Platform Stats */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(37,99,235,0.06) 0%, rgba(245,158,11,0.06) 100%)',
        border: '1px solid rgba(37,99,235,0.15)',
        borderRadius: '16px',
        padding: '20px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <TrendingUp size={15} style={{ color: '#2563EB' }} />
          <p style={{ ...sectionTitle, textTransform: 'none', letterSpacing: 0, fontSize: '0.8125rem' }}>Platform Stats</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {[
            { label: 'Articles', value: '4.2k' },
            { label: 'Authors', value: '847' },
            { label: 'Readers', value: '128k' },
            { label: 'This Week', value: '312' },
          ].map(stat => (
            <div key={stat.label} style={{
              backgroundColor: 'rgba(255,255,255,0.7)',
              borderRadius: '12px',
              padding: '12px',
              textAlign: 'center',
            }}>
              <p style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111827', margin: 0 }}>{stat.value}</p>
              <p style={{ fontSize: '0.7rem', color: '#9CA3AF', fontWeight: 500, margin: 0 }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
