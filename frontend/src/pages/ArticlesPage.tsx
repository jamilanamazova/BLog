import React from 'react';
import Navbar from '../components/Navbar';
import PostsGrid from '../components/PostsGrid';
import Footer from '../components/Footer';

export default function ArticlesPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAFAF9' }}>
      <Navbar />

      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{
            fontSize: '2rem', fontWeight: 800, color: '#111827',
            letterSpacing: '-0.03em', marginBottom: '8px',
          }}>
            All Articles
          </h1>
          <p style={{ fontSize: '1rem', color: '#6B7280' }}>
            Discover stories, ideas and expertise from our community.
          </p>
        </div>

        <PostsGrid />
      </main>

      <Footer />

      <style>{`
        @media (max-width: 639px) {
          main { padding: 16px !important; }
        }
      `}</style>
    </div>
  );
}