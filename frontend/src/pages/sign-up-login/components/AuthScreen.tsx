import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { ArrowLeft, BookOpen, Sparkles, Quote } from 'lucide-react';
import AppLogo from '../../../components/ui/AppLogo';

const EDITORIAL_QUOTES = [
  { id: 'q1', text: "The best articles don't just inform — they change how you see the world.", author: 'Marcus Oyelaran', role: 'Senior Frontend Engineer', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=marcus' },
  { id: 'q2', text: 'BlogFlow helped me find my writing voice. My first post got 12,000 reads in a week.', author: 'Aiko Tanaka', role: 'UX Researcher at Figma', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=aiko' },
  { id: 'q3', text: "I read 3 articles here every morning. It's the only newsletter I actually open.", author: 'Dr. Fatima Al-Rashid', role: 'Cognitive Neuroscientist', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=fatima' },
];

const STATS = [
  { id: 'stat-articles', value: '4,200+', label: 'Articles published' },
  { id: 'stat-authors', value: '847', label: 'Active authors' },
  { id: 'stat-readers', value: '128k', label: 'Monthly readers' },
];

export default function AuthScreen() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const quote = EDITORIAL_QUOTES[0];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAFAF9', display: 'flex' }}>

      {/* ── Left panel ── */}
      <div
        style={{
          width: '55%',
          background: 'linear-gradient(135deg, #2563EB 0%, #1e3a8a 100%)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
        className="auth-left-panel"
      >
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: '-80px', right: '-60px', width: '320px', height: '320px', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '280px', height: '280px', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', top: '45%', left: '40%', width: '200px', height: '200px', backgroundColor: 'rgba(245,158,11,0.08)', borderRadius: '50%', transform: 'translate(-50%,-50%)' }} />

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%', padding: '40px 48px' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <AppLogo size={36} />
            <span style={{ fontWeight: 800, fontSize: '1.25rem', color: '#ffffff', letterSpacing: '-0.02em' }}>BlogFlow</span>
          </div>

          {/* Main content */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {/* Badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '6px 14px', backgroundColor: 'rgba(255,255,255,0.15)',
              borderRadius: '9999px', color: 'rgba(255,255,255,0.85)',
              fontSize: '0.75rem', fontWeight: 600, marginBottom: '24px', width: 'fit-content',
            }}>
              <Sparkles size={12} />
              Join 128,000+ curious readers
            </div>

            {/* Headline */}
            <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, color: '#ffffff', lineHeight: 1.15, marginBottom: '16px', letterSpacing: '-0.03em' }}>
              Ideas worth<br />reading are<br />
              <span style={{ color: '#F59E0B' }}>waiting for you.</span>
            </h1>

            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', lineHeight: 1.65, maxWidth: '380px', marginBottom: '32px' }}>
              Discover long-form articles on technology, design, science, and culture — written by practitioners, not content farms.
            </p>

            {/* Stats */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
              {STATS.map(stat => (
                <div key={stat.id}>
                  <p style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', margin: 0, fontVariantNumeric: 'tabular-nums' }}>{stat.value}</p>
                  <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.6)', fontWeight: 500, margin: '2px 0 0' }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quote card */}
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.18)',
            borderRadius: '16px',
            padding: '20px',
          }}>
            <Quote size={18} style={{ color: '#F59E0B', marginBottom: '10px' }} />
            <p style={{ color: '#ffffff', fontSize: '0.875rem', lineHeight: 1.65, fontStyle: 'italic', marginBottom: '14px' }}>
              "{quote.text}"
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img src={quote.avatar} alt={quote.author} style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)' }} />
              <div>
                <p style={{ color: '#ffffff', fontWeight: 600, fontSize: '0.875rem', margin: 0 }}>{quote.author}</p>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.72rem', margin: 0 }}>{quote.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right panel ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#ffffff' }}>
        {/* Top bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 24px', borderBottom: '1px solid #F3F4F6',
        }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.875rem', color: '#6B7280', textDecoration: 'none', fontWeight: 500, transition: 'color 0.15s ease' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#111827'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#6B7280'; }}
          >
            <ArrowLeft size={15} /> Back to BlogFlow
          </Link>
          <Link to="/home-page" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.875rem', color: '#6B7280', textDecoration: 'none', fontWeight: 500, transition: 'color 0.15s ease' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#2563EB'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#6B7280'; }}
          >
            <BookOpen size={14} /> Browse articles
          </Link>
        </div>

        {/* Form area */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
          <div style={{ width: '100%', maxWidth: '400px' }}>
            {/* Heading */}
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827', marginBottom: '6px', letterSpacing: '-0.02em' }}>
                {activeTab === 'login' ? 'Welcome back' : 'Create your account'}
              </h2>
              <p style={{ fontSize: '0.875rem', color: '#6B7280', margin: 0 }}>
                {activeTab === 'login'
                  ? 'Sign in to access your saved articles and reading history.'
                  : 'Join thousands of readers and writers on BlogFlow.'}
              </p>
            </div>

            {/* Tab switcher */}
            <div style={{ display: 'flex', backgroundColor: '#F3F4F6', borderRadius: '12px', padding: '4px', marginBottom: '20px' }}>
              {(['login', 'register'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    flex: 1, padding: '8px', borderRadius: '8px', fontSize: '0.875rem', fontWeight: 700,
                    border: 'none', cursor: 'pointer', transition: 'all 0.15s ease', fontFamily: 'inherit',
                    backgroundColor: activeTab === tab ? '#ffffff' : 'transparent',
                    color: activeTab === tab ? '#111827' : '#6B7280',
                    boxShadow: activeTab === tab ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                  }}
                >
                  {tab === 'login' ? 'Sign In' : 'Create Account'}
                </button>
              ))}
            </div>

            {/* Social buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              {[
                {
                  label: 'Continue with Google',
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  ),
                },
                {
                  label: 'Continue with GitHub',
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                  ),
                },
              ].map(btn => (
                <button
                  key={btn.label}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                    padding: '10px 16px', backgroundColor: '#ffffff', border: '1.5px solid #E5E7EB',
                    borderRadius: '10px', fontSize: '0.875rem', fontWeight: 600, color: '#111827',
                    cursor: 'pointer', transition: 'all 0.15s ease', fontFamily: 'inherit',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#F9FAFB'; (e.currentTarget as HTMLElement).style.borderColor = '#D1D5DB'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#ffffff'; (e.currentTarget as HTMLElement).style.borderColor = '#E5E7EB'; }}
                >
                  {btn.icon}
                  {btn.label}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#E5E7EB' }} />
              <span style={{ fontSize: '0.75rem', color: '#9CA3AF', fontWeight: 500 }}>or continue with email</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#E5E7EB' }} />
            </div>

            {/* Form */}
            <div className="fade-in">
              {activeTab === 'login'
                ? <LoginForm onSwitchToRegister={() => setActiveTab('register')} />
                : <RegisterForm onSwitchToLogin={() => setActiveTab('login')} />
              }
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ padding: '14px 24px', textAlign: 'center', borderTop: '1px solid #F3F4F6' }}>
          <p style={{ fontSize: '0.72rem', color: '#9CA3AF', margin: 0 }}>
            By continuing, you agree to our{' '}
            <Link to="/home-page" style={{ color: '#2563EB', textDecoration: 'none' }}>Terms of Service</Link>
            {' '}and{' '}
            <Link to="/home-page" style={{ color: '#2563EB', textDecoration: 'none' }}>Privacy Policy</Link>.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 1023px) {
          .auth-left-panel { display: none !important; }
        }
      `}</style>
    </div>
  );
}
