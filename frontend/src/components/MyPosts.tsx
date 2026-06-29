import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FileText, SquarePen } from 'lucide-react';
import { useAuth } from '../context/Authcontext';
import { getMyFavorites, getMyLikes, getMyPosts } from '../api/posts';
import PostCard from './PostCard';

interface Post {
  id: number;
  title: string;
  content: string;
  image_url: string | null;
  category: string | null;
  view_count: number;
  like_count: number;
  comment_count: number;
  is_published: boolean;
  created_at: string;
  is_favorited: boolean;
}

export default function MyPosts() {
  const { isAuthenticated, loading: authLoading, user } = useAuth();
  const navigate = useNavigate();
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set());
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favoritedIds, setFavoritedIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [authLoading, isAuthenticated, navigate]);

  useEffect(() => {
  if (!isAuthenticated) return;

  const fetchPosts = async () => {
    try {
      const [postsRes, favsRes,likesRes] = await Promise.all([
        getMyPosts(),
        getMyFavorites(),
        getMyLikes(),
      ]);
      setPosts(postsRes.data.posts);
      const favIds = new Set<number>(favsRes.data.posts.map((p: any) => p.id));
      setFavoritedIds(favIds);
      setLikedIds(new Set(likesRes.data.posts.map((p: any) => p.id)));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Xəta baş verdi');
    } finally {
      setLoading(false);
    }
  };

  fetchPosts();
}, [isAuthenticated]);

  if (authLoading || loading) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 16px', textAlign: 'center', color: '#6B7280' }}>
        Yüklənir...
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FileText size={20} style={{ color: '#2563EB' }} />
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', margin: 0 }}>
            Mənim Postlarım
          </h1>
          <span style={{ fontSize: '0.875rem', color: '#6B7280' }}>
            ({posts.length} post)
          </span>
        </div>
        <Link
          to="/create-post"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 14px',
            backgroundColor: '#2563EB',
            color: '#ffffff',
            fontSize: '0.875rem',
            fontWeight: 600,
            borderRadius: '8px',
            textDecoration: 'none',
          }}
        >
          <SquarePen size={15} />
          Yeni Post
        </Link>
      </div>

      {error && (
        <div
          style={{
            padding: '10px 12px',
            backgroundColor: '#FEF2F2',
            border: '1px solid #FECACA',
            borderRadius: '8px',
            color: '#DC2626',
            fontSize: '0.875rem',
            marginBottom: '16px',
          }}
        >
          {error}
        </div>
      )}

      {!error && posts.length === 0 && (
        <div
          style={{
            textAlign: 'center',
            padding: '64px 16px',
            color: '#6B7280',
            border: '1px dashed #E5E7EB',
            borderRadius: '12px',
          }}
        >
          Hələ heç bir post yazmamısan.
        </div>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px',
        }}
      >
        {posts.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            image_url={post.image_url}
            category={post.category}
            view_count={post.view_count}
            like_count={post.like_count}
            comment_count={post.comment_count}
            created_at={post.created_at}
            authorName={user?.username || 'Mən'}
            authorAvatar={user ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}` : undefined}
            isFavorited={favoritedIds.has(post.id)}
            onFavoriteToggle={(id) => {
              setFavoritedIds((prev) => {
                const next = new Set(prev);
                if (next.has(id)) next.delete(id);
                else next.add(id);
                return next;
              });
            }}
            isLiked={likedIds.has(post.id)}
            onLikeToggle={(id) => {
              setLikedIds((prev) => {
                const next = new Set(prev);
                next.has(id) ? next.delete(id) : next.add(id);
                return next;
              });
            }}
          />
        ))}
      </div>
    </div>
  );
}