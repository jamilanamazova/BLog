import React from 'react';
import Navbar from '../components/Navbar';
import HeroPost from '../components/HeroPost';
import CategoryFilterBar from '../components/CategoryFilterBar';
import PostsGrid from '../components/PostsGrid';
import TrendingSidebar from '../components/TrendingSidebar';
import NewsletterCTA from '../components/NewsletterCta';
import Footer from '../components/Footer';

export default function HomePageRoute() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAFAF9' }}>
      <Navbar />

      <main
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '32px 24px',
        }}
      >
        <HeroPost />
        <CategoryFilterBar />
        <div
          style={{
            marginTop: '32px',
            display: 'grid',
            gridTemplateColumns: '1fr 300px',
            gap: '32px',
            alignItems: 'start',
          }}
          className="home-content-grid"
        >
          <div>
            <PostsGrid />
          </div>

          <div style={{ position: 'sticky', top: '80px' }}>
            <TrendingSidebar />
          </div>
        </div>
        <NewsletterCTA />
      </main>

      <Footer />

      <style>{`
        @media (max-width: 1023px) {
          .home-content-grid {
            grid-template-columns: 1fr !important;
          }
          .home-content-grid > div:last-child {
            position: static !important;
          }
        }
        @media (max-width: 639px) {
          main { padding: 16px !important; }
        }
      `}</style>
    </div>
  );
}
