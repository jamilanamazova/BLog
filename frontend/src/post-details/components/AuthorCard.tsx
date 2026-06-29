import React from 'react';
import { Link } from 'react-router-dom';
import { Users, FileText, ArrowUpRight } from 'lucide-react';

const AUTHOR = {
  name: 'Dr. Priya Nair',
  handle: '@priyanair_ml',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya',
  role: 'ML Research Engineer',
  company: 'DeepMind',
  bio: 'I research the intersection of large-scale machine learning systems and practical deployment challenges. Previously at Google Brain and CMU. I write about AI architecture, scaling, and the engineering decisions that rarely make it into papers.',
  posts: 34,
  followers: 12800,
  following: 287,
};

function formatNumber(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
  return n.toString();
}

export default function AuthorCard() {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 mb-8">
      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
        Written by
      </p>
      <div className="flex items-start gap-4">
        <img
          src={AUTHOR.avatar}
          alt={`${AUTHOR.name} profile photo`}
          className="w-14 h-14 rounded-full bg-muted border-2 border-border shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="font-bold text-base text-foreground">{AUTHOR.name}</h3>
              <p className="text-sm text-muted-foreground">{AUTHOR.handle}</p>
              <p className="text-sm text-muted-foreground mt-0.5">
                {AUTHOR.role} · {AUTHOR.company}
              </p>
            </div>
            <Link
              to="/sign-up-login-screen"
              className="flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground text-sm font-bold rounded-xl hover:bg-primary/90 transition-all duration-150 active:scale-95"
            >
              Follow
              <ArrowUpRight size={13} />
            </Link>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed mt-3">{AUTHOR.bio}</p>

          <div className="flex items-center gap-5 mt-4 pt-4 border-t border-border">
            <div className="flex items-center gap-1.5 text-sm">
              <FileText size={14} className="text-muted-foreground" />
              <span className="font-bold text-foreground tabular-nums">{AUTHOR.posts}</span>
              <span className="text-muted-foreground">articles</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm">
              <Users size={14} className="text-muted-foreground" />
              <span className="font-bold text-foreground tabular-nums">{formatNumber(AUTHOR.followers)}</span>
              <span className="text-muted-foreground">followers</span>
            </div>
            <div className="text-sm text-muted-foreground">
              <span className="font-bold text-foreground tabular-nums">{AUTHOR.following}</span>
              {' '}following
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}