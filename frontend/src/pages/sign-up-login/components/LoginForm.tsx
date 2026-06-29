'use client';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, LoaderCircle, CircleCheckBig } from 'lucide-react';
import { toast } from 'sonner';
import { login as loginService } from '../../../api/auth';
import axios from 'axios';
import { useAuth } from '../../../context/Authcontext';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

export default function LoginForm({ onSwitchToRegister }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const {login} = useAuth();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
    defaultValues: { rememberMe: false },
  });

  const navigate = useNavigate();
  async function onSubmit(data: LoginFormData) {
  try {
    const res = await loginService({
      email: data.email,
      password: data.password,
    });

    login(res.data.user,res.data.token)

    toast.success("Welcome back!");

    navigate("/");

    } catch (err: any) {
      toast.error(
        err.response?.data?.message ||
        "Invalid email or password"
      );
    }
  }



  const inputStyle = (hasError: boolean): React.CSSProperties => ({
    width: '100%', padding: '10px 14px', fontSize: '0.875rem', color: '#111827',
    backgroundColor: '#ffffff', border: `1.5px solid ${hasError ? '#F87171' : '#E5E7EB'}`,
    borderRadius: '10px', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.15s ease',
    fontFamily: 'inherit',
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Email */}
      <div>
        <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
          Email address
        </label>
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
          <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#374151' }}>Password</label>
          <Link to="/home-page" style={{ fontSize: '0.75rem', color: '#2563EB', textDecoration: 'none', fontWeight: 500 }}>
            Forgot password?
          </Link>
        </div>
        <div style={{ position: 'relative' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="Enter your password"
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' },
            })}
            style={{ ...inputStyle(!!errors.password), paddingRight: '40px' }}
            onFocus={e => { (e.currentTarget as HTMLElement).style.borderColor = errors.password ? '#F87171' : '#2563EB'; }}
            onBlur={e => { (e.currentTarget as HTMLElement).style.borderColor = errors.password ? '#F87171' : '#E5E7EB'; }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', display: 'flex', alignItems: 'center' }}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors.password && <p style={{ color: '#EF4444', fontSize: '0.72rem', marginTop: '4px' }}>{errors.password.message}</p>}
      </div>

      {/* Remember me */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <input
          id="login-remember"
          type="checkbox"
          {...register('rememberMe')}
          style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: '#2563EB' }}
        />
        <label htmlFor="login-remember" style={{ fontSize: '0.8125rem', color: '#6B7280', cursor: 'pointer', userSelect: 'none' }}>
          Keep me signed in for 30 days
        </label>
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
        {isSubmitting ? (<><LoaderCircle size={16} style={{ animation: 'spin 1s linear infinite' }} /> Signing in...</>) : 'Sign In'}
      </button>

      {/* Switch */}
      <p style={{ textAlign: 'center', fontSize: '0.875rem', color: '#6B7280', margin: 0 }}>
        Don't have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToRegister}
          style={{ color: '#2563EB', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem', fontFamily: 'inherit' }}
        >
          Create one free
        </button>
      </p>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </form>
  );
}
