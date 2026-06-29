'use client';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Eye, Heart, MessageCircle, Bookmark, BookmarkCheck } from 'lucide-react';
import { getPosts, toggleFavorite, removeFavorite, toggleLike, removeLike } from '../api/posts';
import { useAuth } from '../context/Authcontext';

function formatNumber(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
  return n.toString();
}

function getReadTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

const SORT_OPTIONS = [
  { id: 'sort-latest', label: 'Latest' },
  { id: 'sort-trending', label: 'Trending' },
  { id: 'sort-most-liked', label: 'Most Liked' },
  { id: 'sort-most-read', label: 'Most Read' },
];

const CATEGORY_STYLES: Record<string, { bg: string; color: string }> = {
  Technology: { bg: '#DBEAFE', color: '#1D4ED8' },
  Design: { bg: '#FCE7F3', color: '#BE185D' },
  Culture: { bg: '#D1FAE5', color: '#065F46' },
  Science: { bg: '#CCFBF1', color: '#0F766E' },
  Career: { bg: '#FEF3C7', color: '#92400E' },
};
const DEFAULT_CAT = { bg: '#F3F4F6', color: '#6B7280' };

interface Post {
  id: number;
  title: string;
  content: string;
  image_url: string | null;
  category: string | null;
  view_count: number;
  like_count: number;
  comment_count: number;
  created_at: string;
  author: { id: number; username: string; avatar_url: string | null } | null;
  isLiked?: boolean;     
  isFavorited?: boolean;
}

export default function PostsGrid() {
  const { isAuthenticated } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [savedPosts, setSavedPosts] = useState<Set<number>>(new Set());
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [activeSort, setActiveSort] = useState('sort-latest');

  useEffect(() => {
    const fetchPosts = async () => {
        try {
            const res = await getPosts();
            const data: Post[] = res.data.posts;
            setPosts(data);
            // Backend-dən gələn isLiked/isFavorited ilə Set-ləri doldur
            setSavedPosts(new Set(data.filter(p => p.isFavorited).map(p => p.id)));
            setLikedPosts(new Set(data.filter(p => p.isLiked).map(p => p.id)));
        } catch {
            setError('Postlar yüklənmədi');
        } finally {
            setLoading(false);
        }
    };
    fetchPosts();
}, []);

  const sortedPosts = [...posts].sort((a, b) => {
    if (activeSort === 'sort-most-liked') return b.like_count - a.like_count;
    if (activeSort === 'sort-most-read') return b.view_count - a.view_count;
    if (activeSort === 'sort-trending') return (b.like_count + b.view_count) - (a.like_count + a.view_count);
    return b.id - a.id; // latest
  });

  const handleSave = async (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) return;
    try {
      if (savedPosts.has(id)) {
        await removeFavorite(id);
        setSavedPosts(prev => { const n = new Set(prev); n.delete(id); return n; });
      } else {
        await toggleFavorite(id);
        setSavedPosts(prev => new Set(prev).add(id));
      }
    } catch {}
  };

  const handleLike = async (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) return;
    try {
      if (likedPosts.has(id)) {
        await removeLike(id);
        setLikedPosts(prev => { const n = new Set(prev); n.delete(id); return n; });
        setPosts(prev => prev.map(p => p.id === id ? { ...p, like_count: p.like_count - 1 } : p));
      } else {
        await toggleLike(id);
        setLikedPosts(prev => new Set(prev).add(id));
        setPosts(prev => prev.map(p => p.id === id ? { ...p, like_count: p.like_count + 1 } : p));
      }
    } catch {}
  };

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '64px', color: '#6B7280' }}>
      Yüklənir...
    </div>
  );

  if (error) return (
    <div style={{ textAlign: 'center', padding: '64px', color: '#EF4444' }}>
      {error}
    </div>
  );

  if (posts.length === 0) return (
    <div style={{ textAlign: 'center', padding: '64px', color: '#6B7280', border: '1px dashed #E5E7EB', borderRadius: '12px' }}>
      Hələ heç bir post yoxdur.
    </div>
  );

  return (
    <div>
      {/* Sort bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <p style={{ fontSize: '0.875rem', color: '#6B7280', margin: 0 }}>
          <span style={{ fontWeight: 700, color: '#111827' }}>{posts.length}</span> articles
        </p>
        <div style={{ display: 'flex', gap: '2px', backgroundColor: '#F3F4F6', borderRadius: '12px', padding: '4px' }}>
          {SORT_OPTIONS.map(opt => {
            const isActive = activeSort === opt.id;
            return (
              <button key={opt.id} onClick={() => setActiveSort(opt.id)} style={{
                padding: '5px 12px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 600,
                border: 'none', cursor: 'pointer', transition: 'all 0.15s ease',
                backgroundColor: isActive ? '#ffffff' : 'transparent',
                color: isActive ? '#111827' : '#6B7280',
                boxShadow: isActive ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              }}>
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }} className="posts-grid">
        {sortedPosts.map(post => {
          const isSaved = savedPosts.has(post.id);
          const isLiked = likedPosts.has(post.id);
          const catStyle = post.category ? (CATEGORY_STYLES[post.category] || DEFAULT_CAT) : DEFAULT_CAT;
          const authorName = post.author?.username || 'Unknown';
          const authorAvatar = post.author
            ? (post.author.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.author.username}`)
            : undefined;

          return (
            <article key={post.id} style={{
              backgroundColor: '#ffffff', border: '1px solid #E5E7EB',
              borderRadius: '16px', overflow: 'hidden',
              display: 'flex', flexDirection: 'column',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.09)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
            >
              {/* Image */}
              <div style={{ position: 'relative', height: '176px', flexShrink: 0, overflow: 'hidden', backgroundColor: '#F3F4F6' }}>
                {post.image_url ? (
                  <img src={post.image_url} alt={post.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #E0E7FF 0%, #F3F4F6 100%)' }} />
                )}

                {/* Save button — yalnız login olunubsa */}
                {isAuthenticated && (
                  <button onClick={(e) => handleSave(e, post.id)} style={{
                    position: 'absolute', top: '10px', right: '10px',
                    padding: '6px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                    backgroundColor: isSaved ? '#2563EB' : 'rgba(255,255,255,0.85)',
                    color: isSaved ? '#ffffff' : '#111827',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.15s ease',
                  }}>
                    {isSaved ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
                  </button>
                )}

                {post.category && (
                  <span style={{
                    position: 'absolute', bottom: '10px', left: '10px',
                    padding: '3px 10px', borderRadius: '9999px',
                    fontSize: '0.72rem', fontWeight: 700,
                    backgroundColor: catStyle.bg, color: catStyle.color,
                  }}>
                    {post.category}
                  </span>
                )}
              </div>

              {/* Content */}
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '16px' }}>
                <Link to={`/posts/${post.id}`} style={{ textDecoration: 'none' }}>
                  <h2 style={{
                    fontWeight: 700, fontSize: '0.9375rem', color: '#111827',
                    lineHeight: 1.4, marginBottom: '8px',
                    display: '-webkit-box', WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical', overflow: 'hidden',
                  }}>
                    {post.title}
                  </h2>
                </Link>

                <p style={{
                  fontSize: '0.8125rem', color: '#6B7280', lineHeight: 1.6,
                  display: '-webkit-box', WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical', overflow: 'hidden',
                  marginBottom: '12px', flex: 1,
                }}>
                  {post.content}
                </p>

                {/* Author + stats */}
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  paddingTop: '12px', borderTop: '1px solid #F3F4F6',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {authorAvatar ? (
                      <img src={authorAvatar} alt={authorName}
                        style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#E5E7EB' }} />
                    ) : (
                      <div style={{
                        width: '28px', height: '28px', borderRadius: '50%',
                        backgroundColor: '#2563EB', color: '#fff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.7rem', fontWeight: 700,
                      }}>
                        {authorName.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#111827', margin: 0 }}>{authorName}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                        <Clock size={10} style={{ color: '#9CA3AF' }} />
                        <span style={{ fontSize: '0.7rem', color: '#9CA3AF' }}>{getReadTime(post.content)} min read</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button onClick={(e) => handleLike(e, post.id)} style={{
                      display: 'flex', alignItems: 'center', gap: '3px',
                      fontSize: '0.72rem', fontWeight: 600, border: 'none',
                      background: 'none', cursor: isAuthenticated ? 'pointer' : 'default',
                      color: isLiked ? '#EF4444' : '#9CA3AF', padding: 0,
                    }}>
                      <Heart size={13} fill={isLiked ? '#EF4444' : 'none'} />
                      {formatNumber(post.like_count)}
                    </button>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.72rem', color: '#9CA3AF' }}>
                      <Eye size={12} /> {formatNumber(post.view_count)}
                    </span>
                    <Link to={`/posts/${post.id}`} style={{
                      display: 'flex', alignItems: 'center', gap: '3px',
                      fontSize: '0.72rem', color: '#9CA3AF', textDecoration: 'none',
                    }}>
                      <MessageCircle size={12} /> {post.comment_count}
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <style>{`
        @media (max-width: 1023px) { .posts-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 639px)  { .posts-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}