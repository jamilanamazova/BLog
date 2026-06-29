import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Eye, Heart, MessageCircle, ArrowLeft, Send } from 'lucide-react';
import { useAuth } from '../context/Authcontext';
import { getPostById } from '../api/posts';
import { getComments, createComment } from '../api/comments';

interface Author {
  id: number;
  username: string;
}

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
  author: Author | null;
}

interface CommentItem {
  id: number;
  content: string;
  created_at: string;
  user: { id: number; username: string } | null;
}

const CATEGORY_STYLES: Record<string, { bg: string; color: string }> = {
  Technology: { bg: 'rgba(124,58,237,0.12)', color: '#7C3AED' },
  Design: { bg: 'rgba(236,72,153,0.12)', color: '#EC4899' },
  Culture: { bg: 'rgba(16,185,129,0.12)', color: '#10B981' },
  Science: { bg: 'rgba(37,99,235,0.12)', color: '#2563EB' },
  Career: { bg: 'rgba(245,158,11,0.12)', color: '#F59E0B' },
};
const DEFAULT_CATEGORY_STYLE = { bg: '#F3F4F6', color: '#6B7280' };

function avatarUrl(username: string) {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(username)}`;
}

function timeAgo(dateStr: string) {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'indicə';
  if (mins < 60) return `${mins} dəq əvvəl`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} saat əvvəl`;
  return `${Math.floor(hours / 24)} gün əvvəl`;
}

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [commentError, setCommentError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const [postRes, commentsRes] = await Promise.all([
          getPostById(id),
          getComments(id),
        ]);
        setPost(postRes.data.post);
        setComments(commentsRes.data.comments);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Post yüklənərkən xəta baş verdi');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setCommentError(null);

  if (!isAuthenticated) { navigate('/login'); return; }
  if (!newComment.trim()) { setCommentError('Şərh boş ola bilməz'); return; }
  if (!id) return;

  setSubmitting(true);
  try {
    const response = await createComment(id, newComment.trim());
    const saved = response.data;

    setComments((prev) => [
      ...prev,
      {
        id: saved.id,
        content: saved.content,
        created_at: saved.created_at,
        user: user ? { id: Number(user.id), username: user.username } : null,
      },
    ]);

    // ← əlavə et: post-un comment_count-unu artır
    setPost((prev) => prev ? { ...prev, comment_count: (prev.comment_count ?? 0) + 1 } : prev);

    setNewComment('');
  } catch (err: any) {
    setCommentError(err.response?.data?.message || 'Şərh göndərilmədi');
  } finally {
    setSubmitting(false);
  }
};

  if (loading) {
    return (
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '48px 16px', textAlign: 'center', color: '#6B7280' }}>
        Yüklənir...
      </div>
    );
  }

  if (error || !post) {
    return (
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '48px 16px', textAlign: 'center' }}>
        <p style={{ color: '#DC2626', marginBottom: '16px' }}>{error || 'Post tapılmadı'}</p>
        <Link to="/home-page" style={{ color: '#2563EB', fontWeight: 600, textDecoration: 'none' }}>
          Ana səhifəyə qayıt
        </Link>
      </div>
    );
  }

  const categoryStyle = post.category ? (CATEGORY_STYLES[post.category] || DEFAULT_CATEGORY_STYLE) : null;

  return (
    <div style={{ maxWidth: '760px', margin: '0 auto', padding: '32px 16px' }}>
      <button
        onClick={() => navigate(-1)}
        style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.875rem', color: '#6B7280', background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: '20px' }}
      >
        <ArrowLeft size={16} /> Geri
      </button>

      {post.image_url && (
        <img
          src={post.image_url}
          alt={post.title}
          style={{ width: '100%', maxHeight: '360px', objectFit: 'cover', borderRadius: '16px', marginBottom: '20px' }}
        />
      )}

      {categoryStyle && post.category && (
        <span
          style={{ display: 'inline-block', padding: '4px 12px', fontSize: '0.75rem', fontWeight: 700, borderRadius: '999px', backgroundColor: categoryStyle.bg, color: categoryStyle.color, marginBottom: '12px' }}
        >
          {post.category}
        </span>
      )}

      <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#111827', lineHeight: 1.3, margin: '0 0 16px 0' }}>
        {post.title}
      </h1>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingBottom: '20px', borderBottom: '1px solid #E5E7EB', marginBottom: '20px' }}>
        <img
          src={avatarUrl(post.author?.username || 'unknown')}
          alt={post.author?.username || 'Müəllif'}
          style={{ width: '40px', height: '40px', borderRadius: '50%' }}
        />
        <div>
          <p style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111827', margin: 0 }}>
            {post.author?.username || 'Naməlum müəllif'}
          </p>
          <p style={{ fontSize: '0.75rem', color: '#6B7280', margin: 0 }}>
            {new Date(post.created_at).toLocaleDateString('az-AZ')}
          </p>
        </div>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '14px', fontSize: '0.8rem', color: '#6B7280' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Eye size={14} /> {post.view_count}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Heart size={14} /> {post.like_count}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MessageCircle size={14} /> {comments.length}</span>
        </div>
      </div>

      <div style={{ fontSize: '1rem', color: '#111827', lineHeight: 1.8, whiteSpace: 'pre-wrap', marginBottom: '40px' }}>
        {post.content}
      </div>

      <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '24px' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827', marginBottom: '16px' }}>
          Şərhlər ({comments.length})
        </h2>

        <form onSubmit={handleCommentSubmit} style={{ marginBottom: '24px' }}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={isAuthenticated ? 'Şərh yaz...' : 'Şərh yazmaq üçün daxil ol'}
            disabled={!isAuthenticated}
            rows={3}
            style={{ width: '100%', padding: '10px 12px', fontSize: '0.9rem', color: '#111827', border: '1px solid #E5E7EB', borderRadius: '8px', outline: 'none', resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box', backgroundColor: isAuthenticated ? '#ffffff' : '#F9FAFB' }}
          />
          {commentError && <p style={{ fontSize: '0.8rem', color: '#DC2626', marginTop: '6px' }}>{commentError}</p>}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
            {isAuthenticated ? (
              <button
                type="submit"
                disabled={submitting}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', fontSize: '0.875rem', fontWeight: 600, color: '#ffffff', backgroundColor: submitting ? '#93C5FD' : '#2563EB', border: 'none', borderRadius: '8px', cursor: submitting ? 'not-allowed' : 'pointer' }}
              >
                <Send size={14} />
                {submitting ? 'Göndərilir...' : 'Göndər'}
              </button>
            ) : (
              <Link to="/login" style={{ fontSize: '0.875rem', fontWeight: 600, color: '#2563EB', textDecoration: 'none' }}>
                Daxil ol →
              </Link>
            )}
          </div>
        </form>

        {comments.length === 0 ? (
          <p style={{ color: '#6B7280', fontSize: '0.875rem' }}>Hələ şərh yoxdur. İlk şərhi sən yaz!</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {comments.map((c) => (
              <div key={c.id} style={{ display: 'flex', gap: '10px' }}>
                <img
                  src={avatarUrl(c.user?.username || 'unknown')}
                  alt={c.user?.username || 'İstifadəçi'}
                  style={{ width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0 }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111827' }}>
                      {c.user?.username || 'Silinmiş istifadəçi'}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>{timeAgo(c.created_at)}</span>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: '#374151', margin: '4px 0 0 0' }}>{c.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}