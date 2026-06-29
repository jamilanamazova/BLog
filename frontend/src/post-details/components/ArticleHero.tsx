import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Eye, Calendar, ChevronRight } from 'lucide-react';

const ARTICLE = {
  title: 'The Architecture Behind Modern AI Systems: How Large Language Models Actually Work',
  excerpt:
  'From transformer attention mechanisms to RLHF training pipelines — a deep technical dive into the engineering decisions that made ChatGPT, Claude, and Gemini possible. No hype, just architecture.',
  category: 'Technology',
  categoryColor: 'bg-blue-100 text-blue-700',
  readTime: '14 min read',
  publishedAt: 'June 8, 2026',
  updatedAt: 'June 9, 2026',
  views: 48200,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_19f8fe7fc-1772547120162.png",
  imageAlt: 'Abstract neural network visualization with glowing blue nodes on dark background showing AI architecture',
  author: {
    name: 'Dr. Priya Nair',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya',
    role: 'ML Research Engineer',
    company: 'DeepMind'
  },
  tags: ['AI', 'Machine Learning', 'LLM', 'Transformers', 'Deep Learning']
};

function formatNumber(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
  return n.toString();
}

export default function ArticleHero() {
  return (
    <div className="mb-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-5" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight size={12} />
        <Link to="/home-page" className="hover:text-primary transition-colors">Articles</Link>
        <ChevronRight size={12} />
        <span className="text-foreground font-medium truncate max-w-[200px]">{ARTICLE.category}</span>
      </nav>

      {/* Category */}
      <span className={`tag-chip ${ARTICLE.categoryColor} mb-4 inline-block`}>
        {ARTICLE.category}
      </span>

      {/* Title */}
      <h1 className="text-article-title font-extrabold text-foreground mb-4 leading-tight">
        {ARTICLE.title}
      </h1>

      {/* Excerpt */}
      <p className="text-base text-muted-foreground leading-relaxed mb-6 max-w-3xl">
        {ARTICLE.excerpt}
      </p>

      {/* Author + meta */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border">
        <div className="flex items-center gap-3">
          <img
            src={ARTICLE.author.avatar}
            alt={`${ARTICLE.author.name} profile photo`}
            className="w-11 h-11 rounded-full bg-muted border-2 border-border" />
          
          <div>
            <p className="font-bold text-sm text-foreground">{ARTICLE.author.name}</p>
            <p className="text-xs text-muted-foreground">
              {ARTICLE.author.role} · {ARTICLE.author.company}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar size={13} />
            {ARTICLE.publishedAt}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={13} />
            {ARTICLE.readTime}
          </span>
          <span className="flex items-center gap-1.5">
            <Eye size={13} />
            {formatNumber(ARTICLE.views)} views
          </span>
        </div>
      </div>

      {/* Hero Image */}
      <div className="mt-6 rounded-2xl overflow-hidden aspect-video">
        <img
          src={ARTICLE.image}
          alt={ARTICLE.imageAlt}
          className="w-full h-full object-cover" />
        
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-5">
        {ARTICLE.tags.map((tag) =>
        <span
          key={`article-tag-${tag}`}
          className="text-xs px-3 py-1 bg-muted text-muted-foreground rounded-full font-medium hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer">
          
            #{tag}
          </span>
        )}
      </div>
    </div>);

}