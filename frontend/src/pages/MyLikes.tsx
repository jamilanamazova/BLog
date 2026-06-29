import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useAuth } from '../context/Authcontext';
import { getMyLikes } from '../api/posts';
import PostCard from '../components/PostCard';


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
}

export default function MyLikes() {
  const { isAuthenticated, loading: authLoading, user } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) navigate('/login');
  }, [authLoading, isAuthenticated, navigate]);

  useEffect(() => {
    if (!isAuthenticated) return;
    const fetch = async () => {
      try {
        const res = await getMyLikes();
        setPosts(res.data.posts);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Xəta baş verdi');
      } finally {
        setLoading(false);
      }
    };
    fetch();
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
        <Heart size={20} style={{ color: '#EF4444' }} />
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', margin: 0 }}>
          Bəyəndiklərim
        </h1>
        <span style={{ fontSize: '0.875rem', color: '#6B7280' }}>({posts.length} post)</span>
      </div>

      {error && (
        <div style={{ padding: '10px 12px', backgroundColor: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px', color: '#DC2626', fontSize: '0.875rem', marginBottom: '16px' }}>
          {error}
        </div>
      )}

      {!error && posts.length === 0 && (
        <div style={{ textAlign: 'center', padding: '64px 16px', color: '#6B7280', border: '1px dashed #E5E7EB', borderRadius: '12px' }}>
          Hələ heç bir post bəyənməmisən.
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {posts.map(post => (
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
            authorName={user?.username || ''}
            authorAvatar={user ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}` : undefined}
            isFavorited={false}
            onFavoriteToggle={() => {}}
            isLiked={true}  
            onLikeToggle={() => {}}
          />
        ))}
      </div>
    </div>
  );
}