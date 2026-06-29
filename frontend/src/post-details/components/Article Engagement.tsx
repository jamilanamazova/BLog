'use client';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Bookmark, BookmarkCheck, Share2, ExternalLink, Link2, Check } from 'lucide-react';
import { toast } from 'sonner';

const INITIAL_LIKES = 3410;
const INITIAL_FAVORITES = 892;

export default function ArticleEngagement() {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(INITIAL_LIKES);
  const [saved, setSaved] = useState(false);
  const [saveCount, setSaveCount] = useState(INITIAL_FAVORITES);
  const [likeAnimating, setLikeAnimating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  // Backend integration point: POST /api/posts/:id/like
  function handleLike() {
    setLikeAnimating(true);
    setLiked((prev) => {
      setLikeCount((c) => (prev ? c - 1 : c + 1));
      return !prev;
    });
    setTimeout(() => setLikeAnimating(false), 350);
  }

  // Backend integration point: POST /api/posts/:id/favorite
  function handleSave() {
    setSaved((prev) => {
      setSaveCount((c) => (prev ? c - 1 : c + 1));
      if (!prev) toast?.success('Saved to your favorites');
      else toast?.info('Removed from favorites');
      return !prev;
    });
  }

  function handleCopyLink() {
    navigator.clipboard?.writeText(window.location?.href)?.then(() => {
      setCopied(true);
      toast?.success('Link copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="mb-8">
      {/* Engagement bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-5 border-y border-border">
        <div className="flex items-center gap-3">
          {/* Like */}
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-150 active:scale-95 font-semibold text-sm ${
              liked
                ? 'bg-red-50 border-red-200 text-red-500' :'border-border text-muted-foreground hover:border-red-200 hover:text-red-400 hover:bg-red-50'
            }`}
          >
            <Heart
              size={16}
              className={likeAnimating ? 'like-pop' : ''}
              fill={liked ? 'currentColor' : 'none'}
            />
            <span className="tabular-nums">{likeCount?.toLocaleString()}</span>
          </button>

          {/* Save */}
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-150 active:scale-95 font-semibold text-sm ${
              saved
                ? 'bg-primary/5 border-primary/30 text-primary' :'border-border text-muted-foreground hover:border-primary/30 hover:text-primary hover:bg-primary/5'
            }`}
          >
            {saved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
            <span className="tabular-nums">{saveCount?.toLocaleString()}</span>
          </button>
        </div>

        {/* Share */}
        <div className="relative">
          <button
            onClick={() => setShareOpen(!shareOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-150 text-sm font-semibold"
          >
            <Share2 size={15} />
            Share
          </button>
          {shareOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-lg z-20 fade-in">
              <div className="p-1">
                <a
                  href="https://twitter.com/intent/tweet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-lg transition-colors"
                  onClick={() => setShareOpen(false)}
                >
                  <ExternalLink size={14} className="text-sky-500" />
                  Share on Twitter
                </a>
                <button
                  onClick={() => { handleCopyLink(); setShareOpen(false); }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-lg transition-colors"
                >
                  {copied ? <Check size={14} className="text-green-500" /> : <Link2 size={14} className="text-muted-foreground" />}
                  {copied ? 'Copied!' : 'Copy Link'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Sign-in prompt for guests */}
      <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-foreground">Join the conversation</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Sign in to like posts, save favorites, and leave comments.
          </p>
        </div>
        <Link
          to="/sign-up-login-screen"
          className="shrink-0 px-4 py-2 bg-primary text-primary-foreground text-sm font-bold rounded-xl hover:bg-primary/90 transition-all duration-150 active:scale-95"
        >
          Sign In Free
        </Link>
      </div>
    </div>
  );
}