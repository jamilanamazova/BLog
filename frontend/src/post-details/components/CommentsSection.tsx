'use client';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { MessageCircle, Heart, Reply, MoreHorizontal, Loader2, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';

import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/Authcontext';
import { createComment, getComments } from '../../api/comments';

interface CommentForm {
  content: string;
}

const COMMENTS = [
  {
    id: 'comment-001',
    author: { name: 'Marcus Oyelaran', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=marcus', handle: '@moyelaran' },
    content: 'This is the most technically accurate explanation of RLHF I\'ve read outside of the original papers. The Chinchilla scaling section especially — I had no idea GPT-3 was that undertrained. Changes how I think about our own fine-tuning experiments.',
    publishedAt: '2 hours ago',
    likes: 87,
    liked: false,
    replies: [
      {
        id: 'comment-001-reply-001',
        author: { name: 'Dr. Priya Nair', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya', handle: '@priyanair_ml' },
        content: 'Thanks Marcus! The Chinchilla insight was genuinely surprising when that paper dropped. It retroactively explained a lot of the "why does this smaller, better-trained model beat the giant one?" questions we were seeing.',
        publishedAt: '1 hour ago',
        likes: 34,
        liked: false,
        isAuthor: true,
      },
    ],
  },
  {
    id: 'comment-002',
    author: { name: 'Aiko Tanaka', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=aiko', handle: '@aitanaka' },
    content: 'Great breakdown. One thing I\'d add: the KL divergence penalty in PPO is doing a LOT of heavy lifting that doesn\'t get mentioned enough. Without it, the policy collapses to reward hacking almost immediately. Would love a follow-up post specifically on RLHF failure modes.',
    publishedAt: '4 hours ago',
    likes: 62,
    liked: false,
    replies: [],
  },
  {
    id: 'comment-003',
    author: { name: 'Kwame Asante', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=kwame', handle: '@kwameasante' },
    content: 'The section on MoE is timely. We\'ve been running Mixtral 8x7B in production for 3 months and the inference cost per token is genuinely 40% lower than a comparable dense model at the same benchmark performance. The routing overhead is real but manageable.',
    publishedAt: '6 hours ago',
    likes: 45,
    liked: false,
    replies: [],
  },
  {
    id: 'comment-004',
    author: { name: 'Elena Vasquez', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=elena', handle: '@evasquez_eng' },
    content: 'Bookmarked. I\'m sharing this with our entire ML platform team — it\'s the clearest explanation of the training pipeline I\'ve found for engineers who need the conceptual model without the full paper math.',
    publishedAt: '8 hours ago',
    likes: 91,
    liked: false,
    replies: [],
  },
  {
    id: 'comment-005',
    author: { name: 'Ravi Krishnamurthy', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ravi', handle: '@ravikrish' },
    content: 'The code block for scaling laws is a nice touch. Minor note: the exponents α and β are actually architecture-dependent and vary more than 0.5 for some configurations — Chinchilla\'s estimates assume a specific tokenizer/architecture family. But for the intuition, the simplified version works perfectly.',
    publishedAt: '10 hours ago',
    likes: 28,
    liked: false,
    replies: [],
  },
];

export default function CommentsSection() {
  const { id: postId } = useParams();
  const { isAuthenticated, user } = useAuth();

  const [comments, setComments] = useState(COMMENTS);
  const [expandedReplies, setExpandedReplies] = useState<Set<string>>(new Set(['comment-001']));
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyTexts, setReplyTexts] = useState<Record<string, string>>({});
  const [submittingReply, setSubmittingReply] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CommentForm>();

  useEffect(() => {
    loadComments();
  }, [postId]);

  async function loadComments() {
    try {
      const res = await getComments(postId!);
      const fetched = (res.data.comments || []).map((c: any) => ({
        id: String(c.id),
        author: {
          name: c.user?.username ?? 'User',
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${c.user?.username ?? 'unknown'}`,
          handle: `@${c.user?.username ?? 'unknown'}`,
        },
        content: c.content,
        publishedAt: new Date(c.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
        likes: 0,
        liked: false,
        replies: (c.replies || []).map((r: any) => ({
          id: String(r.id),
          author: {
            name: r.user?.username ?? 'User',
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${r.user?.username ?? 'unknown'}`,
            handle: `@${r.user?.username ?? 'unknown'}`,
          },
          content: r.content,
          publishedAt: new Date(r.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
          likes: 0,
          liked: false,
          isAuthor: false,
        })),
      }));
      setComments(fetched);
    } catch {
      // silently keep COMMENTS fallback
    }
  }

  // Backend integration point: POST /api/posts/:id/comments
  async function onSubmit(data: CommentForm) {
    try {
      const res = await createComment(postId!, data.content);
      const newComment = {
        id: String(res.data.id ?? `comment-new-${Date.now()}`),
        author: {
          name: user?.username ?? 'Sarah Chen',
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username ?? 'sarah'}`,
          handle: `@${user?.username ?? 'sarahchen'}`,
        },
        content: data.content,
        publishedAt: 'Just now',
        likes: 0,
        liked: false,
        replies: [],
      };
      setComments((prev) => [newComment, ...prev]);
      reset();
      toast.success('Comment posted!');
    } catch {
      toast.error('Failed to post comment');
    }
  }

  async function handleReplySubmit(commentId: string) {
    const text = replyTexts[commentId]?.trim();
    if (!text) return;
    console.log('Reply göndərilir:', { postId, text, parentId: Number(commentId), commentId });
    try {
      setSubmittingReply(commentId);
      const res = await createComment(postId!, text, Number(commentId));
      const newReply = {
        id: String(res.data.id ?? `reply-new-${Date.now()}`),
        author: {
          name: user?.username ?? 'Sarah Chen',
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username ?? 'sarah'}`,
          handle: `@${user?.username ?? 'sarahchen'}`,
        },
        content: text,
        publishedAt: 'Just now',
        likes: 0,
        liked: false,
        isAuthor: false,
      };
      setComments((prev) =>
        prev.map((c) =>
          c.id === commentId ? { ...c, replies: [...c.replies, newReply] } : c
        )
      );
      setReplyTexts((prev) => ({ ...prev, [commentId]: '' }));
      setReplyingTo(null);
      setExpandedReplies((prev) => new Set([...prev, commentId]));
      toast.success('Reply posted!');
    } catch {
      toast.error('Failed to post reply');
    } finally {
      setSubmittingReply(null);
    }
  }

  function toggleLike(commentId: string) {
    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId
          ? { ...c, liked: !c.liked, likes: c.liked ? c.likes - 1 : c.likes + 1 }
          : c
      )
    );
  }

  function toggleReplies(commentId: string) {
    setExpandedReplies((prev) => {
      const next = new Set(prev);
      next.has(commentId) ? next.delete(commentId) : next.add(commentId);
      return next;
    });
  }

  const totalComments = comments.reduce((acc, c) => acc + 1 + c.replies.length, 0);

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle size={18} className="text-foreground" />
        <h2 className="font-bold text-lg text-foreground">
          {totalComments} Comments
        </h2>
      </div>

      {/* Comment Form */}
      <div className="bg-card border border-border rounded-2xl p-5 mb-6">
        <div className="flex items-start gap-3">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=sarah"
            alt="Your profile avatar"
            className="w-9 h-9 rounded-full bg-muted shrink-0 mt-1"
          />
          <form onSubmit={handleSubmit(onSubmit)} className="flex-1">
            <label htmlFor="comment-input" className="sr-only">Write a comment</label>
            <textarea
              id="comment-input"
              placeholder="Share your thoughts on this article..."
              rows={3}
              {...register('content', {
                required: 'Comment cannot be empty',
                minLength: { value: 10, message: 'Comment must be at least 10 characters' },
              })}
              className="w-full px-4 py-3 bg-muted border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
            />
            {errors.content && (
              <p className="text-red-500 text-xs mt-1">{errors.content.message}</p>
            )}
            <div className="flex items-center justify-between mt-3">
              <p className="text-xs text-muted-foreground">
                Be respectful and constructive.{' '}
                <Link to="/sign-up-login-screen" className="text-primary hover:underline">
                  Sign in
                </Link>{' '}
                to save your profile.
              </p>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-bold rounded-xl hover:bg-primary/90 transition-all duration-150 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Posting...
                  </>
                ) : (
                  'Post Comment'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Comments list */}
      <div className="space-y-5">
        {comments.map((comment) => {
          const repliesExpanded = expandedReplies.has(comment.id);
          return (
            <div key={comment.id} className="fade-in">
              {/* Main comment */}
              <div className="flex items-start gap-3 group">
                <img
                  src={comment.author.avatar}
                  alt={`${comment.author.name} avatar`}
                  className="w-9 h-9 rounded-full bg-muted shrink-0 mt-0.5"
                />
                <div className="flex-1 min-w-0">
                  <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-foreground">{comment.author.name}</span>
                        <span className="text-xs text-muted-foreground">{comment.author.handle}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{comment.publishedAt}</span>
                        <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-lg hover:bg-muted">
                          <MoreHorizontal size={13} className="text-muted-foreground" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">{comment.content}</p>
                  </div>

                  {/* Comment actions */}
                  <div className="flex items-center gap-3 mt-2 px-1">
                    <button
                      onClick={() => toggleLike(comment.id)}
                      className={`flex items-center gap-1 text-xs font-semibold transition-colors ${
                        comment.liked ? 'text-red-500' : 'text-muted-foreground hover:text-red-400'
                      }`}
                    >
                      <Heart size={12} fill={comment.liked ? 'currentColor' : 'none'} />
                      {comment.likes}
                    </button>
                    <button
                      onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                      className="flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Reply size={12} />
                      Reply
                    </button>
                    {comment.replies.length > 0 && (
                      <button
                        onClick={() => toggleReplies(comment.id)}
                        className="flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                      >
                        <ChevronDown
                          size={12}
                          className={`transition-transform duration-200 ${repliesExpanded ? 'rotate-180' : ''}`}
                        />
                        {repliesExpanded ? 'Hide' : `${comment.replies.length}`} {comment.replies.length === 1 ? 'reply' : 'replies'}
                      </button>
                    )}
                  </div>

                  {/* Reply input */}
                  {replyingTo === comment.id && (
                    <div className="mt-3 flex items-start gap-2 fade-in">
                      <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=sarah"
                        alt="Your avatar"
                        className="w-7 h-7 rounded-full bg-muted shrink-0 mt-1"
                      />
                      <div className="flex-1">
                        <textarea
                          placeholder={`Reply to ${comment.author.name}...`}
                          rows={2}
                          value={replyTexts[comment.id] ?? ''}
                          onChange={(e) =>
                            setReplyTexts((prev) => ({ ...prev, [comment.id]: e.target.value }))
                          }
                          className="w-full px-3 py-2 bg-muted border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                        />
                        <div className="flex justify-end gap-2 mt-2">
                          <button
                            onClick={() => {
                              setReplyingTo(null);
                              setReplyTexts((prev) => ({ ...prev, [comment.id]: '' }));
                            }}
                            className="px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleReplySubmit(comment.id)}
                            disabled={submittingReply === comment.id}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground text-xs font-bold rounded-lg hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                          >
                            {submittingReply === comment.id ? (
                              <><Loader2 size={11} className="animate-spin" /> Posting...</>
                            ) : (
                              'Reply'
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Replies */}
                  {repliesExpanded && comment.replies.length > 0 && (
                    <div className="mt-3 space-y-3 pl-4 border-l-2 border-border fade-in">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="flex items-start gap-3">
                          <img
                            src={reply.author.avatar}
                            alt={`${reply.author.name} avatar`}
                            className="w-7 h-7 rounded-full bg-muted shrink-0 mt-0.5"
                          />
                          <div className="flex-1">
                            <div className="bg-primary/5 border border-primary/15 rounded-2xl rounded-tl-sm px-4 py-3">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-bold text-xs text-foreground">{reply.author.name}</span>
                                {reply.isAuthor && (
                                  <span className="text-xs px-1.5 py-0.5 bg-primary/10 text-primary rounded-full font-semibold">Author</span>
                                )}
                                <span className="text-xs text-muted-foreground">{reply.publishedAt}</span>
                              </div>
                              <p className="text-sm text-foreground leading-relaxed">{reply.content}</p>
                            </div>
                            <div className="flex items-center gap-2 mt-1.5 px-1">
                              <button className="flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-red-400 transition-colors">
                                <Heart size={11} />
                                {reply.likes}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}