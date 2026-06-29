import React from 'react';
import Navbar from '../components/Navbar';
import Footer from  '../components/Footer';
import ArticleHero from './components/ArticleHero';
import ArticleContent from './components/ArticleContent';
import ArticleEngagement from './components/Article Engagement';
import AuthorCard from './components/AuthorCard';
import CommentsSection from './components/CommentsSection';
import ReadingProgressBar from './components/ReadingProgressBar';
import RelatedPosts from './components/RelatedPosts';


export default function PostDetailsPage() {
  return (
    <div className="min-h-screen bg-background">
      <ReadingProgressBar/>
      <Navbar/>
      <main className="max-w-screen-xl mx-auto px-4 lg:px-8 xl:px-10 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {/* Main article column */}
          <div className="lg:col-span-2 xl:col-span-3">
            <ArticleHero />
            <ArticleContent />
            <ArticleEngagement />
            <AuthorCard />
            <CommentsSection />
          </div>
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <RelatedPosts/>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}