import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Heart, ArrowRight } from 'lucide-react';

const RELATED = [
{
  id: 'related-001',
  title: 'Prompt Engineering Is Not a Skill — It\'s a Crutch',
  author: 'Dr. Fatima Al-Rashid',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=fatima',
  category: 'AI & ML',
  categoryColor: 'bg-blue-100 text-blue-700',
  readTime: '6 min',
  views: 28400,
  likes: 2190,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_128ecb31b-1772674895515.png",
  imageAlt: 'Abstract AI chat interface with glowing text prompt on dark blue background'
},
{
  id: 'related-002',
  title: 'Fine-Tuning vs RAG: When to Use Each (With Real Benchmarks)',
  author: 'Sofia Bergström',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sofia',
  category: 'AI & ML',
  categoryColor: 'bg-blue-100 text-blue-700',
  readTime: '11 min',
  views: 19700,
  likes: 1640,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_10b9ec249-1781099700562.png",
  imageAlt: 'Data pipeline diagram showing vector embeddings and retrieval augmented generation workflow'
},
{
  id: 'related-003',
  title: 'The Hidden Cost of RLHF: What OpenAI\'s Contractors Actually Experienced',
  author: 'Kwame Asante',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=kwame',
  category: 'Culture',
  categoryColor: 'bg-green-100 text-green-700',
  readTime: '8 min',
  views: 41800,
  likes: 5320,
  image: "https://images.unsplash.com/photo-1733333823951-a8fa61c5c5fc",
  imageAlt: 'Person working at computer in dim office environment reviewing content on screen'
}];


function formatNumber(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
  return n.toString();
}

export default function RelatedPosts() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-sm text-foreground uppercase tracking-wider">Related Articles</h3>
        <Link to="/home-page" className="text-xs text-primary hover:text-primary/80 transition-colors font-semibold flex items-center gap-1">
          More <ArrowRight size={11} />
        </Link>
      </div>

      {RELATED.map((post) =>
      <Link key={post.id} to={`/post-details-page/${post.id}`} className="block group">          <div className="bg-card border border-border rounded-2xl overflow-hidden card-hover">
            <div className="h-36 overflow-hidden">
              <img
              src={post.image}
              alt={post.imageAlt}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
            
            </div>
            <div className="p-4">
              <span className={`tag-chip ${post.categoryColor} mb-2 inline-block`}>
                {post.category}
              </span>
              <h4 className="font-bold text-sm text-foreground leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                {post.title}
              </h4>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                  src={post.avatar}
                  alt={`${post.author} avatar`}
                  className="w-5 h-5 rounded-full bg-muted" />
                
                  <span className="text-xs text-muted-foreground truncate max-w-[100px]">{post.author}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-0.5">
                    <Clock size={10} /> {post.readTime}
                  </span>
                  <span className="flex items-center gap-0.5">
                    <Heart size={10} /> {formatNumber(post.likes)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* Table of Contents */}
      <div className="bg-card border border-border rounded-2xl p-5">
        <h3 className="font-bold text-sm text-foreground uppercase tracking-wider mb-4">
          In This Article
        </h3>
        <nav className="space-y-2">
          {[
          { id: 'toc-1', label: 'What Is a Large Language Model?' },
          { id: 'toc-2', label: 'The Attention Mechanism' },
          { id: 'toc-3', label: 'Scaling Laws and Why Size Matters' },
          { id: 'toc-4', label: 'RLHF: Teaching Models to Be Helpful' },
          { id: 'toc-5', label: 'MoE, Multimodality, and Beyond' }].
          map((item, i) =>
          <a
            key={item.id}
            href={`#section-${i + 1}`}
            className="flex items-start gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors group">
            
              <span className="text-xs font-bold tabular-nums text-muted/60 mt-0.5 w-4 shrink-0">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="group-hover:underline leading-snug">{item.label}</span>
            </a>
          )}
        </nav>
      </div>
    </div>);

}