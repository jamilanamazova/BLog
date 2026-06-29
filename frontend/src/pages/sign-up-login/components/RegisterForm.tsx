import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, LoaderCircle, CircleCheckBig, Check, X } from 'lucide-react';
import { toast } from 'sonner';
import { registerUser } from '../../../api/auth';

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { id: 'len', label: 'At least 8 characters', pass: password.length >= 8 },
    { id: 'upper', label: 'One uppercase letter', pass: /[A-Z]/.test(password) },
    { id: 'num', label: 'One number', pass: /\d/.test(password) },
    { id: 'special', label: 'One special character', pass: /[^A-Za-z0-9]/.test(password) },
  ];
  const passCount = checks.filter(c => c.pass).length;
  const strength = passCount === 0 ? 0 : passCount <= 1 ? 1 : passCount <= 2 ? 2 : passCount <= 3 ? 3 : 4;
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength];
  const strengthColors = ['', '#F87171', '#FBBF24', '#FCD34D', '#22C55E'];
  const strengthTextColors = ['', '#EF4444', '#F59E0B', '#CA8A04', '#16A34A'];

  if (!password) return null;

  return (
    <div style={{ marginTop: '8px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <div style={{ flex: 1, display: 'flex', gap: '4px' }}>
          {[1, 2, 3, 4].map(i => (
            <div key={i} style={{ height: '4px', flex: 1, borderRadius: '9999px', backgroundColor: i <= strength ? strengthColors[strength] : '#E5E7EB', transition: 'all 0.3s ease' }} />
          ))}
        </div>
        <span style={{ fontSize: '0.72rem', fontWeight: 600, color: strengthTextColors[strength] }}>{strengthLabel}</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
        {checks.map(check => (
          <div key={check.id} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {check.pass
              ? <Check size={11} style={{ color: '#22C55E', flexShrink: 0 }} />
              : <X size={11} style={{ color: '#D1D5DB', flexShrink: 0 }} />
            }
            <span style={{ fontSize: '0.72rem', color: check.pass ? '#16A34A' : '#9CA3AF' }}>{check.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<RegisterFormData>();
  const passwordValue = watch('password', '');

  async function onSubmit(data: RegisterFormData) {
  try {
    await registerUser({ email: data.email, username: data.username, password: data.password });
    setSuccess(true);
    toast.success('Account created! Welcome to BlogFlow.');
  } catch (err: any) {
    console.error('Register error full:', err.response);
    toast.error(err.response?.data?.message || 'Registration failed');
  }
}

  if (success) {
    return (
      <div className="fade-in" style={{ textAlign: 'center', padding: '32px 0' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '56px', height: '56px', backgroundColor: '#DCFCE7', borderRadius: '50%', marginBottom: '16px' }}>
          <CircleCheckBig size={28} style={{ color: '#16A34A' }} />
        </div>
        <h3 style={{ fontWeight: 700, fontSize: '1.125rem', color: '#111827', marginBottom: '4px' }}>Account created!</h3>
        <p style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '20px' }}>Welcome to BlogFlow. Your reading journey starts now.</p>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', backgroundColor: '#2563EB', color: '#ffffff', fontSize: '0.875rem', fontWeight: 700, borderRadius: '12px', textDecoration: 'none' }}>
          Explore Articles
        </Link>
      </div>
    );
  }

  const inputStyle = (hasError: boolean): React.CSSProperties => ({
    width: '100%', padding: '10px 14px', fontSize: '0.875rem', color: '#111827',
    backgroundColor: '#ffffff', border: `1.5px solid ${hasError ? '#F87171' : '#E5E7EB'}`,
    borderRadius: '10px', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.15s ease',
    fontFamily: 'inherit',
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Username */}
      <div>
        <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>Username</label>
        <p style={{ fontSize: '0.72rem', color: '#9CA3AF', marginBottom: '6px' }}>This will appear on your profile and articles.</p>
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF', fontSize: '0.875rem', fontWeight: 500 }}>@</span>
          <input
            type="text"
            autoComplete="username"
            placeholder="sarahchen"
            {...register('username', {
              required: 'Username is required',
              minLength: { value: 3, message: 'At least 3 characters' },
              maxLength: { value: 30, message: 'Max 30 characters' },
              pattern: { value: /^[a-zA-Z0-9_]+$/, message: 'Letters, numbers, underscores only' },
            })}
            style={{ ...inputStyle(!!errors.username), paddingLeft: '28px' }}
            onFocus={e => { (e.currentTarget as HTMLElement).style.borderColor = errors.username ? '#F87171' : '#2563EB'; }}
            onBlur={e => { (e.currentTarget as HTMLElement).style.borderColor = errors.username ? '#F87171' : '#E5E7EB'; }}
          />
        </div>
        {errors.username && <p style={{ color: '#EF4444', fontSize: '0.72rem', marginTop: '4px' }}>{errors.username.message}</p>}
      </div>

      {/* Email */}
      <div>
        <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Email address</label>
        <input
          type="email"
          autoComplete="email"
          placeholder="sarah@example.com"
          {...register('email', {
            required: 'Email address is required',
            pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email address' },
          })}
          style={inputStyle(!!errors.email)}
          onFocus={e => { (e.currentTarget as HTMLElement).style.borderColor = errors.email ? '#F87171' : '#2563EB'; }}
          onBlur={e => { (e.currentTarget as HTMLElement).style.borderColor = errors.email ? '#F87171' : '#E5E7EB'; }}
        />
        {errors.email && <p style={{ color: '#EF4444', fontSize: '0.72rem', marginTop: '4px' }}>{errors.email.message}</p>}
      </div>

      {/* Password */}
      <div>
        <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Password</label>
        <div style={{ position: 'relative' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            placeholder="Create a strong password"
            {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'At least 8 characters' } })}
            style={{ ...inputStyle(!!errors.password), paddingRight: '40px' }}
            onFocus={e => { (e.currentTarget as HTMLElement).style.borderColor = errors.password ? '#F87171' : '#2563EB'; }}
            onBlur={e => { (e.currentTarget as HTMLElement).style.borderColor = errors.password ? '#F87171' : '#E5E7EB'; }}
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', display: 'flex' }}>
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors.password && <p style={{ color: '#EF4444', fontSize: '0.72rem', marginTop: '4px' }}>{errors.password.message}</p>}
        <PasswordStrength password={passwordValue} />
      </div>

      {/* Confirm password */}
      <div>
        <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Confirm password</label>
        <div style={{ position: 'relative' }}>
          <input
            type={showConfirm ? 'text' : 'password'}
            autoComplete="new-password"
            placeholder="Repeat your password"
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: val => val === passwordValue || 'Passwords do not match',
            })}
            style={{ ...inputStyle(!!errors.confirmPassword), paddingRight: '40px' }}
            onFocus={e => { (e.currentTarget as HTMLElement).style.borderColor = errors.confirmPassword ? '#F87171' : '#2563EB'; }}
            onBlur={e => { (e.currentTarget as HTMLElement).style.borderColor = errors.confirmPassword ? '#F87171' : '#E5E7EB'; }}
          />
          <button type="button" onClick={() => setShowConfirm(!showConfirm)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', display: 'flex' }}>
            {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors.confirmPassword && <p style={{ color: '#EF4444', fontSize: '0.72rem', marginTop: '4px' }}>{errors.confirmPassword.message}</p>}
      </div>

      {/* Terms */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
        <input
          id="reg-terms"
          type="checkbox"
          {...register('agreeTerms', { required: 'You must agree to the terms' })}
          style={{ width: '16px', height: '16px', marginTop: '2px', cursor: 'pointer', accentColor: '#2563EB', flexShrink: 0 }}
        />
        <div>
          <label htmlFor="reg-terms" style={{ fontSize: '0.8125rem', color: '#6B7280', cursor: 'pointer', userSelect: 'none', lineHeight: 1.5 }}>
            I agree to the{' '}
            <Link to="/home-page" style={{ color: '#2563EB', textDecoration: 'none', fontWeight: 500 }}>Terms of Service</Link>
            {' '}and{' '}
            <Link to="/home-page" style={{ color: '#2563EB', textDecoration: 'none', fontWeight: 500 }}>Privacy Policy</Link>
          </label>
          {errors.agreeTerms && <p style={{ color: '#EF4444', fontSize: '0.72rem', marginTop: '2px' }}>{errors.agreeTerms.message}</p>}
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          padding: '12px', backgroundColor: '#2563EB', color: '#ffffff',
          fontSize: '0.875rem', fontWeight: 700, borderRadius: '10px', border: 'none',
          cursor: isSubmitting ? 'not-allowed' : 'pointer', opacity: isSubmitting ? 0.7 : 1,
          transition: 'all 0.15s ease', fontFamily: 'inherit',
        }}
        onMouseEnter={e => { if (!isSubmitting) (e.currentTarget as HTMLElement).style.backgroundColor = '#1d4ed8'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#2563EB'; }}
      >
        {isSubmitting ? (<><LoaderCircle size={16} style={{ animation: 'spin 1s linear infinite' }} /> Creating account...</>) : 'Create Free Account'}
      </button>

      <p style={{ textAlign: 'center', fontSize: '0.875rem', color: '#6B7280', margin: 0 }}>
        Already have an account?{' '}
        <button type="button" onClick={onSwitchToLogin} style={{ color: '#2563EB', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem', fontFamily: 'inherit' }}>
          Sign in instead
        </button>
      </p>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </form>
  );
}
