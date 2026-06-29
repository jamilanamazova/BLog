import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, FileText } from 'lucide-react';
import { createPost } from '../api/posts';
import { useAuth } from '../context/Authcontext';

export default function CreatePost() {
  const { isAuthenticated, loading: authLoading, logout } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auth check bitənə qədər gözlə, sonra login olmayanı /login-ə göndər
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [authLoading, isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim() || !content.trim()) {
      setError('Başlıq və mətn boş ola bilməz');
      return;
    }

    setSubmitting(true);

    try {
      const response = await createPost({
        title: title.trim(),
        content: content.trim(),
        image_url: imageUrl.trim() || undefined,
        category: category || undefined,
      });

      const newPost = response.data.post;

      // Real route-un fərqlidirsə (məs. /posts/:id) burda dəyiş
      navigate('/home-page', { state: { newPostId: newPost?.id } });
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError('Sessiyanız bitib, yenidən daxil olun');
        logout();
        navigate('/login');
        return;
      }

      setError(err.response?.data?.message || 'Xəta baş verdi, yenidən cəhd edin');
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading) {
    return null;
  }

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '32px 16px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '24px',
        }}
      >
        <FileText size={20} style={{ color: '#2563EB' }} />
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', margin: 0 }}>
          Yeni Post
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #E5E7EB',
            borderRadius: '12px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#111827',
                marginBottom: '6px',
              }}
            >
              Başlıq
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post başlığını yaz..."
              maxLength={200}
              style={{
                width: '100%',
                padding: '10px 12px',
                fontSize: '1rem',
                color: '#111827',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = '#2563EB';
              }}
              onBlur={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = '#E5E7EB';
              }}
            />
          </div>

          {/* Content */}
          <div>
            <label
              htmlFor="content"
              style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#111827',
                marginBottom: '6px',
              }}
            >
              Mətn
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Post mətnini yaz..."
              rows={12}
              style={{
                width: '100%',
                padding: '10px 12px',
                fontSize: '1rem',
                color: '#111827',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                outline: 'none',
                resize: 'vertical',
                fontFamily: 'inherit',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = '#2563EB';
              }}
              onBlur={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = '#E5E7EB';
              }}
            />
          </div>
          {/* Category */}
          <div>
            <label htmlFor="category" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#111827', marginBottom: '6px' }}>
              Kateqoriya
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                width: '100%', padding: '10px 12px', fontSize: '1rem', color: '#111827',
                border: '1px solid #E5E7EB', borderRadius: '8px', outline: 'none',
                backgroundColor: '#ffffff', boxSizing: 'border-box',
              }}
            >
              <option value="">Seçilməyib</option>
              <option value="Technology">Technology</option>
              <option value="Design">Design</option>
              <option value="Culture">Culture</option>
              <option value="Science">Science</option>
              <option value="Career">Career</option>
            </select>
          </div>

          {/* Image URL */}
          <div>
            <label htmlFor="imageUrl" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#111827', marginBottom: '6px' }}>
              Şəkil URL (istəyə bağlı)
            </label>
            <input
              id="imageUrl"
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://..."
              style={{
                width: '100%', padding: '10px 12px', fontSize: '1rem', color: '#111827',
                border: '1px solid #E5E7EB', borderRadius: '8px', outline: 'none', boxSizing: 'border-box',
              }}
            />
            {imageUrl.trim() && (
              <img
                src={imageUrl.trim()}
                alt="Önizləmə"
                style={{ marginTop: '8px', maxHeight: '160px', borderRadius: '8px', objectFit: 'cover' }}
                onError={(e) => { (e.currentTarget as HTMLElement).style.display = 'none'; }}
              />
            )}
          </div>

          {/* Error */}
          {error && (
            <div
              style={{
                padding: '10px 12px',
                backgroundColor: '#FEF2F2',
                border: '1px solid #FECACA',
                borderRadius: '8px',
                color: '#DC2626',
                fontSize: '0.875rem',
              }}
            >
              {error}
            </div>
          )}

          {/* Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <button
              type="button"
              onClick={() => navigate(-1)}
              disabled={submitting}
              style={{
                padding: '8px 16px',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#6B7280',
                background: 'none',
                border: 'none',
                borderRadius: '8px',
                cursor: submitting ? 'not-allowed' : 'pointer',
              }}
            >
              İmtina
            </button>
            <button
              type="submit"
              disabled={submitting}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#ffffff',
                backgroundColor: submitting ? '#93C5FD' : '#2563EB',
                border: 'none',
                borderRadius: '8px',
                cursor: submitting ? 'not-allowed' : 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {submitting && <Loader2 size={15} className="animate-spin" />}
              {submitting ? 'Paylaşılır...' : 'Paylaş'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}