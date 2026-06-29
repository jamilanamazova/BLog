'use client';
import React, { useState } from 'react';

const CATEGORIES = [
  { id: 'cat-all', label: 'All Topics', count: 847 },
  { id: 'cat-tech', label: 'Technology', count: 312 },
  { id: 'cat-design', label: 'Design', count: 189 },
  { id: 'cat-science', label: 'Science', count: 143 },
  { id: 'cat-culture', label: 'Culture', count: 98 },
  { id: 'cat-career', label: 'Career', count: 76 },
  { id: 'cat-startup', label: 'Startups', count: 64 },
  { id: 'cat-ai', label: 'AI & ML', count: 211 },
  { id: 'cat-webdev', label: 'Web Dev', count: 155 },
  { id: 'cat-ux', label: 'UX Research', count: 87 },
];

export default function CategoryFilterBar() {
  const [active, setActive] = useState('cat-all');

  return (
    <div style={{ marginTop: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto', paddingBottom: '8px', scrollbarWidth: 'none' }}>
        {CATEGORIES.map((cat) => {
          const isActive = active === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              style={{
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '7px 16px',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                fontWeight: 600,
                border: isActive ? 'none' : '1px solid #E5E7EB',
                backgroundColor: isActive ? '#2563EB' : '#ffffff',
                color: isActive ? '#ffffff' : '#6B7280',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                boxShadow: isActive ? '0 1px 4px rgba(37,99,235,0.2)' : 'none',
                outline: 'none',
              }}
              onMouseEnter={e => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.color = '#111827';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(37,99,235,0.4)';
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(37,99,235,0.04)';
                }
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.color = '#6B7280';
                  (e.currentTarget as HTMLElement).style.borderColor = '#E5E7EB';
                  (e.currentTarget as HTMLElement).style.backgroundColor = '#ffffff';
                }
              }}
            >
              {cat.label}
              <span style={{ fontSize: '0.75rem', fontWeight: 500, color: isActive ? 'rgba(255,255,255,0.75)' : '#9CA3AF' }}>
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>
      <style>{`div::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
}
