import React from 'react';
import { Link } from 'react-router-dom';
import AppLogo from './ui/AppLogo';
import { Share2, Code2, Rss, Mail } from 'lucide-react';

const FOOTER_LINKS = {
  Platform: [
    { label: 'Home', href: '/' },
    { label: 'Articles', href: '/home-page' },
    { label: 'Write', href: '/sign-up-login-screen' },
    { label: 'Topics', href: '/home-page' },
  ],
  Company: [
    { label: 'About', href: '/home-page' },
    { label: 'Blog', href: '/home-page' },
    { label: 'Careers', href: '/home-page' },
    { label: 'Press', href: '/home-page' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/home-page' },
    { label: 'Terms of Service', href: '/home-page' },
    { label: 'Cookie Policy', href: '/home-page' },
  ],
};

const SOCIAL = [
  { icon: Share2, label: 'Twitter' },
  { icon: Code2, label: 'GitHub' },
  { icon: Rss, label: 'RSS Feed' },
  { icon: Mail, label: 'Newsletter' },
];

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#ffffff',
        borderTop: '1px solid #E5E7EB',
        marginTop: '64px',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '48px 24px 0',
        }}
      >
        {/* Main grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            gap: '32px',
            paddingBottom: '40px',
          }}
          className="footer-grid"
        >
          {/* Brand column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <AppLogo size={32} />
              <span
                style={{
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  letterSpacing: '-0.02em',
                  color: '#111827',
                }}
              >
                BlogFlow
              </span>
            </div>

            <p
              style={{
                fontSize: '0.875rem',
                color: '#6B7280',
                lineHeight: 1.6,
                maxWidth: '260px',
                margin: '0 0 16px',
              }}
            >
              A modern reading platform where curious minds discover, engage with, and share ideas that matter.
            </p>

            {/* Social icons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {SOCIAL.map((s) => (
                <button
                  key={s.label}
                  aria-label={s.label}
                  style={{
                    padding: '8px',
                    borderRadius: '8px',
                    color: '#9CA3AF',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.color = '#111827';
                    (e.currentTarget as HTMLElement).style.backgroundColor = '#F3F4F6';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.color = '#9CA3AF';
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                  }}
                >
                  <s.icon size={16} />
                </button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h4
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: '#9CA3AF',
                  margin: '0 0 14px',
                }}
              >
                {section}
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      style={{
                        fontSize: '0.875rem',
                        color: '#6B7280',
                        textDecoration: 'none',
                        transition: 'color 0.15s ease',
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.color = '#111827';
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.color = '#6B7280';
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid #E5E7EB',
            padding: '20px 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
          }}
          className="footer-bottom"
        >
          <p style={{ fontSize: '0.75rem', color: '#9CA3AF', margin: 0 }}>
            © 2026 BlogFlow. All rights reserved.
          </p>
          <p style={{ fontSize: '0.75rem', color: '#9CA3AF', margin: 0 }}>
            Built for readers who think deeply.
          </p>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 1023px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 639px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
          .footer-bottom {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </footer>
  );
}