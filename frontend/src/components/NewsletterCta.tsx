'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, CircleCheckBig, LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';

interface NewsletterForm {
  email: string;
}

export default function NewsletterCTA() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<NewsletterForm>();

  async function onSubmit(data: NewsletterForm) {
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitted(true);
    toast.success("You're subscribed! Welcome to the BlogFlow community.");
  }

  return (
    <div
      style={{
        marginTop: '56px',
        background: 'linear-gradient(135deg, #2563EB 0%, #1d4ed8 100%)',
        borderRadius: '20px',
        padding: '56px 32px',
        textAlign: 'center',
        color: '#ffffff',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Decorative circles */}
      <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '200px', height: '200px', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '50%' }} />
      <div style={{ position: 'absolute', bottom: '-32px', left: '-32px', width: '160px', height: '160px', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '50%' }} />
      <div style={{ position: 'absolute', top: '50%', right: '80px', transform: 'translateY(-50%)', width: '100px', height: '100px', backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: '50%' }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Mail icon */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: '48px', height: '48px',
          backgroundColor: 'rgba(255,255,255,0.15)',
          borderRadius: '12px',
          marginBottom: '20px',
        }}>
          <Mail size={22} style={{ color: '#ffffff' }} />
        </div>

        <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 10px', letterSpacing: '-0.02em' }}>
          Stay in the loop
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: '1rem', lineHeight: 1.6, margin: '0 auto 28px', maxWidth: '460px' }}>
          Get the week's best articles in your inbox every Sunday —{' '}
          curated by our editors, no noise.
        </p>

        {submitted ? (
          <div className="fade-in" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <CircleCheckBig size={20} />
            <p style={{ fontWeight: 600, margin: 0 }}>You're subscribed! Check your inbox for a welcome email.</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ display: 'flex', gap: '10px', maxWidth: '440px', margin: '0 auto' }}
            className="newsletter-form"
          >
            <div style={{ flex: 1 }}>
              <input
                type="email"
                placeholder="your@email.com"
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
                })}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  border: '1.5px solid rgba(255,255,255,0.25)',
                  borderRadius: '12px',
                  color: '#ffffff',
                  fontSize: '0.875rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.15s ease',
                }}
                onFocus={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.55)'; }}
                onBlur={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.25)'; }}
              />
              {errors.email && (
                <p style={{ color: '#FCA5A5', fontSize: '0.72rem', marginTop: '4px', textAlign: 'left' }}>
                  {errors.email.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                padding: '12px 20px',
                backgroundColor: '#ffffff',
                color: '#2563EB',
                fontWeight: 700,
                fontSize: '0.875rem',
                borderRadius: '12px',
                border: 'none',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                opacity: isSubmitting ? 0.7 : 1,
                flexShrink: 0,
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={e => {
                if (!isSubmitting) (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.92)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.backgroundColor = '#ffffff';
              }}
            >
              {isSubmitting ? (
                <><LoaderCircle size={15} style={{ animation: 'spin 1s linear infinite' }} /> Subscribing...</>
              ) : (
                'Subscribe Free'
              )}
            </button>
          </form>
        )}

        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', marginTop: '16px' }}>
          Join 12,400+ readers. Unsubscribe at any time.
        </p>
      </div>

      <style>{`
        .newsletter-form input::placeholder { color: rgba(255,255,255,0.5); }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (max-width: 540px) {
          .newsletter-form { flex-direction: column !important; }
        }
      `}</style>
    </div>
  );
}