import React, { useState } from 'react';
import { useAuth } from '../context/Authcontext';
import { updateProfile } from '../api/auth';
import { User, Mail, FileText, Save, Camera } from 'lucide-react';

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [username, setUsername] = useState(user?.username || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [avatar_url, setAvatarUrl] = useState(user?.avatar_url || '');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await updateProfile({ username, bio, avatar_url });
      updateUser(res.data.user);
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Xəta baş verdi');
    } finally {
      setLoading(false);
    }
  };
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;
  setAvatarLoading(true);
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'dmvihiyo');        // ← bura
    
    const res = await fetch('https://api.cloudinary.com/v1_1/akckl2oc/image/upload', {  // ← bura
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    setAvatarUrl(data.secure_url);
  } catch {
    setError('Şəkil yüklənərkən xəta baş verdi');
  } finally {
    setAvatarLoading (false);
  }
};
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '32px 16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
        <User size={20} style={{ color: '#2563EB' }} />
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', margin: 0 }}>
          Profilim
        </h1>
      </div>

      {/* Avatar */}
<div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
  <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => document.getElementById('avatar-input')?.click()}>
    {!avatar_url && (
        <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            backgroundColor: '#2563EB',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            fontWeight: 700,
            border: '2px solid #E5E7EB',
        }}>
            {username.charAt(0).toUpperCase()}
        </div>
        )}
    <img
      src={avatar_url}
      alt="avatar"
      style={{ width: '72px', height: '72px', borderRadius: '50%', border: '2px solid #E5E7EB', objectFit: 'cover' }}
    />
    <div style={{
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: '24px',
      height: '24px',
      backgroundColor: '#2563EB',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '2px solid #ffffff',
    }}>
      {avatarLoading
        ? <span style={{ width: '10px', height: '10px', border: '2px solid #fff', borderTopColor: 'transparent', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.6s linear infinite' }} />
        : <Camera size={12} style={{ color: '#ffffff' }} />
      }
    </div>
    <input
      id="avatar-input"
      type="file"
      accept="image/*"
      style={{ display: 'none' }}
      onChange={handleAvatarChange}
    />
  </div>
  <div>
    <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#111827', margin: 0 }}>{user?.username}</p>
    <p style={{ fontSize: '0.75rem', color: '#6B7280', margin: 0 }}>{user?.email}</p>
  </div>
</div>

      {/* Fields */}
      {[
        { label: 'Username', value: username, setter: setUsername, icon: User, placeholder: 'username' },
        { label: 'Email', value: user?.email || '', setter: () => {}, icon: Mail, placeholder: '', disabled: true },
      ].map((field) => (
        <div key={field.label} style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '6px', display: 'block' }}>
            {field.label}
          </label>
          <div style={{ position: 'relative' }}>
            <field.icon size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
            <input
              value={field.value}
              onChange={(e) => field.setter(e.target.value)}
              placeholder={field.placeholder}
              disabled={field.disabled}
              style={{
                width: '100%',
                padding: '10px 12px 10px 36px',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                fontSize: '0.875rem',
                outline: 'none',
                boxSizing: 'border-box',
                backgroundColor: field.disabled ? '#F9FAFB' : '#ffffff',
                color: field.disabled ? '#9CA3AF' : '#111827',
              }}
            />
          </div>
        </div>
      ))}

      {/* Bio */}
      <div style={{ marginBottom: '24px' }}>
        <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '6px', display: 'block' }}>
          Bio
        </label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Özün haqqında qısa məlumat..."
          rows={4}
          style={{
            width: '100%',
            padding: '10px 12px',
            border: '1px solid #E5E7EB',
            borderRadius: '8px',
            fontSize: '0.875rem',
            outline: 'none',
            resize: 'vertical',
            boxSizing: 'border-box',
            fontFamily: 'inherit',
          }}
        />
      </div>

      {error && (
        <div style={{ padding: '10px 12px', backgroundColor: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px', color: '#DC2626', fontSize: '0.875rem', marginBottom: '16px' }}>
          {error}
        </div>
      )}

      {success && (
        <div style={{ padding: '10px 12px', backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '8px', color: '#16A34A', fontSize: '0.875rem', marginBottom: '16px' }}>
          Profil uğurla yeniləndi!
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '10px 20px',
          backgroundColor: loading ? '#93C5FD' : '#2563EB',
          color: '#ffffff',
          border: 'none',
          borderRadius: '8px',
          fontSize: '0.875rem',
          fontWeight: 600,
          cursor: loading ? 'wait' : 'pointer',
        }}
      >
        <Save size={15} />
        {loading ? 'Saxlanır...' : 'Yadda saxla'}
      </button>
    </div>
  );
}