import React, { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import AppLogo from './ui/AppLogo';
import { useAuth } from '../context/Authcontext';


import {
  Search, SquarePen, Bell, Menu, X, LogIn,
  BookmarkCheck, ChevronDown, User, LogOut, Flame,
  Heart,
} from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Articles', href: '/articles' },
  { label: 'Post Details', href: '/post-details-page' },
];

const CATEGORIES = [
  { label: 'Technology', href: '/home-page' },
  { label: 'Design', href: '/home-page' },
  { label: 'Culture', href: '/home-page' },
  { label: 'Science', href: '/home-page' },
  { label: 'Career', href: '/home-page' },
];

const MOCK_USER = {
  name: 'Sarah Chen',
  handle: '@sarahchen',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
};

export default function Navbar() {
  const location = useLocation();
  const {user, isAuthenticated,logout} = useAuth()
  const navigate = useNavigate();
  const pathname = location.pathname;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #E5E7EB',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 1rem',
        }}
      >
        {/* Main row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '64px',
            gap: '1rem',
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              textDecoration: 'none',
              flexShrink: 0,
            }}
          >
            <AppLogo size={36} />
            <span
              style={{
                fontWeight: 800,
                fontSize: '1.2rem',
                letterSpacing: '-0.02em',
                color: '#111827',
              }}
            >
              BlogFlow
            </span>
          </Link>

          {/* Desktop nav — center */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
              flex: 1,
              justifyContent: 'center',
            }}
            className="navbar-desktop-nav"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                style={{
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  fontWeight: pathname === link.href ? 700 : 600,
                  textDecoration: 'none',
                  color: pathname === link.href ? '#2563EB' : '#6B7280',
                  backgroundColor: pathname === link.href ? 'rgba(37,99,235,0.08)' : 'transparent',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={e => {
                  if (pathname !== link.href) {
                    (e.currentTarget as HTMLElement).style.color = '#111827';
                    (e.currentTarget as HTMLElement).style.backgroundColor = '#F3F4F6';
                  }
                }}
                onMouseLeave={e => {
                  if (pathname !== link.href) {
                    (e.currentTarget as HTMLElement).style.color = '#6B7280';
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                  }
                }}
              >
                {link.label}
              </Link>
            ))}

            {/* Topics dropdown */}
            <div style={{ position: 'relative' }} className="topics-dropdown-wrapper">
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: '#6B7280',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                className="topics-btn"
              >
                Topics
                <ChevronDown size={14} className="topics-chevron" />
              </button>
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 4px)',
                  left: 0,
                  width: '176px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #E5E7EB',
                  borderRadius: '12px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
                  padding: '4px',
                  zIndex: 50,
                }}
                className="topics-dropdown"
              >
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.label}
                    to={cat.href}
                    style={{
                      display: 'block',
                      padding: '8px 12px',
                      fontSize: '0.875rem',
                      color: '#111827',
                      textDecoration: 'none',
                      borderRadius: '8px',
                      transition: 'background 0.12s ease',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = '#F3F4F6';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                    }}
                  >
                    {cat.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* Right side actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            {/* Search icon */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Toggle search"
              style={{
                padding: '8px',
                borderRadius: '8px',
                color: '#6B7280',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.backgroundColor = '#F3F4F6';
                (e.currentTarget as HTMLElement).style.color = '#111827';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                (e.currentTarget as HTMLElement).style.color = '#6B7280';
              }}
            >
              <Search size={18} />
            </button>

            {isAuthenticated ? (
              <>
                {/* Bell */}
                <button
                  style={{
                    position: 'relative',
                    padding: '8px',
                    borderRadius: '8px',
                    color: '#6B7280',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <Bell size={18} />
                  <span
                    style={{
                      position: 'absolute',
                      top: '4px',
                      right: '4px',
                      width: '8px',
                      height: '8px',
                      backgroundColor: '#F59E0B',
                      borderRadius: '50%',
                      border: '2px solid #ffffff',
                    }}
                  />
                </button>

                {/* Write */}

                {/*Create New Post*/}
                <Link
                  to="/create-post"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    backgroundColor: '#2563EB',
                    color: '#ffffff',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    borderRadius: '8px',
                    textDecoration: 'none',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <SquarePen size={15} />
                  Write
                </Link>

                {/* User profile */}{}
                <div style={{ position: 'relative' }}>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '4px',
                      borderRadius: '8px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <img
                      src={MOCK_USER.avatar}
                      alt={`${MOCK_USER.name} avatar`}
                      style={{ width: '32px', height: '32px', borderRadius: '50%' }}
                    />
                    <ChevronDown size={14} style={{ color: '#6B7280' }} />
                  </button>

                  {userMenuOpen && (
                    <div
                      className="fade-in"
                      style={{
                        position: 'absolute',
                        top: 'calc(100% + 4px)',
                        right: 0,
                        width: '208px',
                        backgroundColor: '#ffffff',
                        border: '1px solid #E5E7EB',
                        borderRadius: '12px',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
                        zIndex: 50,
                      }}
                    >
                      <div
                        style={{
                          padding: '12px 16px',
                          borderBottom: '1px solid #E5E7EB',
                        }}
                      >
                        <p style={{ fontWeight: 600, fontSize: '0.875rem', color: '#111827', margin: 0 }}>
                          {MOCK_USER.name}
                        </p>
                        <p style={{ fontSize: '0.75rem', color: '#6B7280', margin: 0 }}>
                          {MOCK_USER.handle}
                        </p>
                      </div>
                      <div style={{ padding: '4px' }}>
                        {[
                            { icon: User, label: 'My Profile', href: '/profile' },
                            { icon: BookmarkCheck, label: 'My Favorites', href: '/my-favorites' },
                            { icon: Heart, label: 'My Likes', href: '/my-likes' },
                            { icon: Flame, label: 'My Posts', href: '/my-posts' },    
                          ].map((item) => (
                          <Link
                            key={item.label}
                            to={item.href}
                            onClick={() => setUserMenuOpen(false)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              padding: '8px 12px',
                              fontSize: '0.875rem',
                              color: '#111827',
                              textDecoration: 'none',
                              borderRadius: '8px',
                              transition: 'background 0.12s ease',
                            }}
                            onMouseEnter={e => {
                              (e.currentTarget as HTMLElement).style.backgroundColor = '#F3F4F6';
                            }}
                            onMouseLeave={e => {
                              (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                            }}
                          >
                            <item.icon size={15} style={{ color: '#6B7280' }} />
                            {item.label}
                          </Link>
                        ))}
                        <hr style={{ margin: '4px 0', border: 'none', borderTop: '1px solid #E5E7EB' }} />
                        <button
                          onClick={() => {
                            setUserMenuOpen(false);
                            logout();
                          }}
                          style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '8px 12px',
                            fontSize: '0.875rem',
                            color: '#DC2626',
                            background: 'none',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            transition: 'background 0.12s ease',
                          }}
                          onMouseEnter={e => {
                            (e.currentTarget as HTMLElement).style.backgroundColor = '#FEF2F2';
                          }}
                          onMouseLeave={e => {
                            (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                          }}
                        >
                          <LogOut size={15} />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Sign In */}
                <button
                 onClick={() => {
                    setUserMenuOpen(false);
                    navigate('/login');   
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: '#6B7280',
                    background: 'none',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                  className="signin-link"
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.color = '#111827';
                    (e.currentTarget as HTMLElement).style.backgroundColor = '#F3F4F6';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.color = '#6B7280';
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; 
                  }}
                >
                  <LogIn size={15} />
                  Sign In
                </button>
                

              </>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              style={{
                padding: '8px',
                borderRadius: '8px',
                color: '#6B7280',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'none',
              }}
              className="mobile-menu-btn"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="fade-in" style={{ paddingBottom: '12px' }}>
            <div style={{ position: 'relative' }}>
              <Search
                size={16}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#6B7280',
                }}
              />
              <input
                type="search"
                placeholder="Search articles, authors, topics..."
                autoFocus
                style={{
                  width: '100%',
                  paddingLeft: '36px',
                  paddingRight: '16px',
                  paddingTop: '10px',
                  paddingBottom: '10px',
                  backgroundColor: '#F3F4F6',
                  border: '1px solid #E5E7EB',
                  borderRadius: '12px',
                  fontSize: '0.875rem',
                  color: '#111827',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
              <kbd
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '0.7rem',
                  color: '#6B7280',
                  backgroundColor: '#ffffff',
                  border: '1px solid #E5E7EB',
                  borderRadius: '4px',
                  padding: '2px 6px',
                }}
              >
                ESC
              </kbd>
            </div>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="fade-in"
          style={{
            borderTop: '1px solid #E5E7EB',
            backgroundColor: '#ffffff',
          }}
        >
          <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: 'block',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  color: pathname === link.href ? '#2563EB' : '#111827',
                  backgroundColor: pathname === link.href ? 'rgba(37,99,235,0.08)' : 'transparent',
                }}
              >
                {link.label}
              </Link>
            ))}
            <hr style={{ margin: '8px 0', border: 'none', borderTop: '1px solid #E5E7EB' }} />
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.label}
                to={cat.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: 'block',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  textDecoration: 'none',
                  color: '#6B7280',
                }}
              >
                {cat.label}
              </Link>
            ))}
            <hr style={{ margin: '8px 0', border: 'none', borderTop: '1px solid #E5E7EB' }} />
            <button
              onClick={() => {
                
                setMobileOpen(false);
              }}
              style={{
                display: 'block',
                padding: '8px 12px',
                borderRadius: '8px',
                fontSize: '0.875rem',
                fontWeight: 600,
                textDecoration: 'none',
                color: '#2563EB',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              Sign In / Register
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 767px) {
          .navbar-desktop-nav { display: none !important; }
          .signin-link { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        .topics-dropdown { display: none; }
        .topics-dropdown-wrapper:hover .topics-dropdown { display: block; }
        .topics-dropdown-wrapper:hover .topics-btn { color: #111827; background-color: #F3F4F6; }
        .topics-dropdown-wrapper:hover .topics-chevron { transform: rotate(180deg); }
        .topics-chevron { transition: transform 0.2s ease; }
        .signin-link:hover { color: #111827 !important; background-color: #F3F4F6 !important; }
      `}</style>
    </header>
  );
}


