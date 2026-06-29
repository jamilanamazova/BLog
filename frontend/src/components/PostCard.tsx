import React, { useEffect, useState } from 'react';
import { Bookmark, Heart, Eye, MessageCircle, Clock, ImageOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import { removeFavorite, removeLike, toggleFavorite, toggleLike } from '../api/posts';
import api from '../api/axios';

interface PostCardProps {
  id: number;
  title: string;
  content: string;
  image_url?: string | null;
  category?: string | null;
  view_count: number;
  like_count: number;
  comment_count: number;
  created_at: string;
  authorName: string;
  authorAvatar?: string;
  isFavorited?: boolean;
  onFavoriteToggle?: (id: number) => void;
  isLiked?: boolean;
  onLikeToggle?: (id: number) => void;
}

const CATEGORY_STYLES: Record<string, { bg: string; color: string }> = {
  Technology: { bg: 'rgba(124,58,237,0.12)', color: '#7C3AED' },
  Design: { bg: 'rgba(236,72,153,0.12)', color: '#EC4899' },
  Culture: { bg: 'rgba(16,185,129,0.12)', color: '#10B981' },
  Science: { bg: 'rgba(37,99,235,0.12)', color: '#2563EB' },
  Career: { bg: 'rgba(245,158,11,0.12)', color: '#F59E0B' },
};
const DEFAULT_CATEGORY_STYLE = { bg: '#F3F4F6', color: '#6B7280' };

function getReadTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}



export default function PostCard({
  id,
  title,
  content,
  image_url,
  category,
  view_count,
  like_count,
  comment_count,
  authorName,
  authorAvatar,
  isFavorited,        
  onFavoriteToggle, 
  isLiked,
  onLikeToggle,
}: PostCardProps) {

const [favorited, setFavorited] = useState(isFavorited ?? false);
const [favLoading, setFavLoading] = useState(false);
const [liked, setLiked] = useState(isLiked ?? false);
const [likeCount, setLikeCount] = useState(like_count);
const [likeLoading, setLikeLoading] = useState(false);

useEffect(() => {
  setFavorited(isFavorited ?? false);
}, [isFavorited]);

useEffect(() => {
  setLiked(isLiked ?? false);
}, [isLiked]);

const handleFavorite = async (e: React.MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();
  if (favLoading) return;
  setFavLoading(true);
  try {
    if (favorited) {
      await removeFavorite(id);
      setFavorited(false);
    } else {
      await toggleFavorite(id);
      setFavorited(true);
    }
    onFavoriteToggle?.(id);
  } catch (err: any) {
    if (err.response?.status === 409) setFavorited(true);
  } finally {
    setFavLoading(false);
  }
};

const handleLike = async (e: React.MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();
  if (likeLoading) return;
  setLikeLoading(true);
  try {
    if (liked) {
      await removeLike(id);
      setLiked(false);
    } else {
      await toggleLike(id);
      setLiked(true);
    }
    onLikeToggle?.(id);
  } catch (err: any) {
    if (err.response?.status === 409) setLiked(true);
  } finally {
    setLikeLoading(false);
  }
};

  const categoryStyle = category ? (CATEGORY_STYLES[category] || DEFAULT_CATEGORY_STYLE) : null;
  
  const readTime = getReadTime(content);

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid #E5E7EB',
        borderRadius: '16px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'box-shadow 0.15s ease, transform 0.15s ease',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
      }}
    >
      {/* Image / placeholder */}
      <div style={{ position: 'relative', height: '180px', backgroundColor: '#F3F4F6', zIndex: 1}}>
        {image_url ? (
          <img
  src={image_url}
  alt={title}
  style={{ 
    width: '100%', 
    height: '100%', 
    objectFit: 'cover',
    pointerEvents: 'none', // ← əlavə et
  }}
/>
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #E0E7FF 0%, #F3F4F6 100%)',
              color: '#9CA3AF',
              pointerEvents: 'none',
            }}
          >
            <ImageOff size={28} />
          </div>
        )}

        <button
          aria-label="Save"
          onClick={(e) => {
            console.log('BUTTON CLICKED');
            handleFavorite(e);
          }}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255,255,255,0.9)',
            border: 'none',
            borderRadius: '8px',
            cursor: favLoading ? 'wait' : 'pointer',
            zIndex: 10,  
          }}
        >
          <Bookmark
            size={15}
            fill={favorited ? '#2563EB' : 'none'}
            style={{ color: favorited ? '#2563EB' : '#374151' }}
          />
        </button>

        {categoryStyle && category && (
          <span
            style={{
              position: 'absolute',
              bottom: '10px',
              left: '10px',
              padding: '4px 10px',
              fontSize: '0.7rem',
              fontWeight: 700,
              borderRadius: '999px',
              backgroundColor: categoryStyle.bg,
              color: categoryStyle.color,
            }}
          >
            {category}
          </span>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
        <Link to={`/posts/${id}`} style={{ textDecoration: 'none' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#111827', margin: 0, lineHeight: 1.35 }}>
            {title}
          </h3>
        </Link>
        <p
          style={{
            fontSize: '0.875rem',
            color: '#6B7280',
            margin: 0,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {content}
        </p>

        <div style={{ flex: 1 }} />

        <hr style={{ border: 'none', borderTop: '1px solid #F3F4F6', margin: '4px 0' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {authorAvatar ? (
            <img
              src={authorAvatar}
              alt={authorName}
              style={{ width: '28px', height: '28px', borderRadius: '50%' }}
            />
          ) : (
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                backgroundColor: '#2563EB',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.7rem',
                fontWeight: 700,
              }}
            >
              {authorName.charAt(0).toUpperCase()}
            </div>
          )}
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#111827', margin: 0 }}>
              {authorName}
            </p>
            <p style={{ fontSize: '0.7rem', color: '#6B7280', margin: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={11} /> {readTime} min read
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '0.75rem', color: '#6B7280' }}>
          <button
            onClick={handleLike}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              background: 'none',
              border: 'none',
              cursor: likeLoading ? 'wait' : 'pointer',
              color: liked ? '#EF4444' : '#6B7280',
              fontSize: '0.75rem',
              padding: 0,
            }}
          >
            <Heart size={13} fill={liked ? '#EF4444' : 'none'} />
            {like_count}
          </button>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Eye size={13} /> {view_count}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <MessageCircle size={13} /> {comment_count}
          </span>
        </div>
      </div>
    </div>
  );
}