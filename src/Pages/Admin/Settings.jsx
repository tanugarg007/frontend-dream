// Settings.jsx (complete updated code)

import React, { useState, useEffect } from 'react';
import { FiAlertCircle, FiCheckCircle, FiGlobe, FiKey, FiSave, FiTrash2, FiUpload, FiUser } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import { serverUrl } from '../../url/url';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || serverUrl; // fallback to serverUrl from url.js if env var is not set
const ADMIN_CHANGE_PASSWORD_ENDPOINT =
  process.env.REACT_APP_ADMIN_CHANGE_PASSWORD_ENDPOINT || '/users/forgot-password';

const joinUrl = (base, endpoint) => {
  if (!base) return endpoint;
  return `${base.replace(/\/+$/, '')}/${endpoint.replace(/^\/+/, '')}`;
};

const inputClasses =
  'w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-800 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-100';

const Settings = () => {
  const { token, updateUser } = useAuth();
  const authToken =
    token || localStorage.getItem('adminToken') || localStorage.getItem('token') || '';
  // Profile state
  const [profile, setProfile] = useState({ name: '', email: '' });
  const [profileErrors, setProfileErrors] = useState({});
  const [avatarPreview, setAvatarPreview] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [removeAvatar, setRemoveAvatar] = useState(false);
  const [profileStatus, setProfileStatus] = useState({ type: '', message: '' });
  // Password state
  const [password, setPassword] = useState({ current: '', new: '', confirm: '' });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState({ type: '', message: '' });

  // Site settings state
  const [siteSettings, setSiteSettings] = useState({ siteTitle: '', contactEmail: '' });
  const [isSiteSettingsLoading, setIsSiteSettingsLoading] = useState(false);
  const [siteSettingsStatus, setSiteSettingsStatus] = useState({ type: '', message: '' });
  const navigate = useNavigate();
  // Fetch profile
  useEffect(() => {
    if (!authToken) return;

    const fetchProfile = async () => {
      try {
        const res = await fetch(joinUrl(API_BASE_URL, '/users/profile'), {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        const data = await res.json().catch(() => ({}));
        if (!res.ok) return;

        const fetchedProfile = data?.profile || {};
        const avatarUrl = fetchedProfile.avatar
          ? fetchedProfile.avatar.startsWith('http')
            ? fetchedProfile.avatar
            : `${API_BASE_URL}${fetchedProfile.avatar}`
          : '';

        setProfile({
          name: fetchedProfile.name || '',
          email: fetchedProfile.email || '',
        });
        setAvatarPreview(avatarUrl);
        updateUser({ ...fetchedProfile, avatar: avatarUrl });
      } catch (error) {
        console.error('Profile fetch error:', error);
      }
    };

    fetchProfile();
  }, [authToken, updateUser]);

  // Fetch site settings
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/users/site-settings`);
        const data = await res.json();
        if (res.ok && data.settings) {
          setSiteSettings(data.settings);
        }
      } catch (error) {
        console.error('Fetch site settings error:', error);
      }
    };
    fetchSettings();
  }, []);

  // Clean up object URL
  useEffect(() => {
    return () => {
      if (avatarPreview && avatarPreview.startsWith('blob:')) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  useEffect(() => {
    if (!profileStatus.message) return undefined;
    const timer = setTimeout(() => {
      setProfileStatus({ type: '', message: '' });
    }, 1800);
    return () => clearTimeout(timer);
  }, [profileStatus.message]);

  useEffect(() => {
    if (!passwordStatus.message) return undefined;
    const timer = setTimeout(() => {
      setPasswordStatus({ type: '', message: '' });
    }, 1800);
    return () => clearTimeout(timer);
  }, [passwordStatus.message]);

  useEffect(() => {
    if (!siteSettingsStatus.message) return undefined;
    const timer = setTimeout(() => {
      setSiteSettingsStatus({ type: '', message: '' });
    }, 1800);
    return () => clearTimeout(timer);
  }, [siteSettingsStatus.message]);

  // Profile update handler
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setProfileStatus({ type: '', message: '' });
    const nextErrors = {};
    if (!profile.name?.trim()) nextErrors.name = 'Name is required.';
    if (!profile.email?.trim()) nextErrors.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(profile.email.trim()))
      nextErrors.email = 'Enter a valid email address.';
    if (Object.keys(nextErrors).length > 0) {
      setProfileErrors(nextErrors);
      return;
    }
    setProfileErrors({});
    setIsProfileLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', profile.name);
      formDataToSend.append('email', profile.email);
      if (avatarFile) formDataToSend.append('avatar', avatarFile);
      if (removeAvatar) {
  formDataToSend.append("removeAvatar", "true");
}
      const response = await fetch(`${API_BASE_URL}/users/profiles`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${authToken}` },
        body: formDataToSend,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.message || 'Failed to update profile');
      setProfile({
        name: data.profile.name,
        email: data.profile.email,
      });
      const updatedUser = {
        ...data.profile,
        avatar: data.profile.avatar ? `${API_BASE_URL}${data.profile.avatar}` : '',
      };
      setAvatarFile(null);
      setRemoveAvatar(false);
      setAvatarPreview(updatedUser.avatar);
      updateUser(updatedUser);
      setProfileStatus({
        type: 'success',
        message: 'Profile information has been updated successfully.',
      });
    } catch (err) {
      console.error(err);
      setProfileStatus({
        type: 'error',
        message: err?.message || 'Unable to update profile. Please try again.',
      });
    } finally {
      setIsProfileLoading(false);
    }
  };

  // Avatar upload handler (instant upload on file select)
  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !authToken) return;

    const previewUrl = URL.createObjectURL(file);
    if (avatarPreview && avatarPreview.startsWith('blob:')) {
      URL.revokeObjectURL(avatarPreview);
    }
    setAvatarFile(file);
    setAvatarPreview(previewUrl);
    setIsProfileLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', profile.name || '');
      formDataToSend.append('email', profile.email || '');
      formDataToSend.append('avatar', file);

      const response = await fetch(`${API_BASE_URL}/users/profiles`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${authToken}` },
        body: formDataToSend,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.message || 'Failed to upload avatar');

      setProfile({
        name: data.profile.name,
        email: data.profile.email,
      });
      const updatedUser = {
        ...data.profile,
        avatar: data.profile.avatar ? `${API_BASE_URL}${data.profile.avatar}` : '',
      };
      setAvatarFile(null);
      setRemoveAvatar(false);
      setAvatarPreview(updatedUser.avatar);
      updateUser(updatedUser);
      URL.revokeObjectURL(previewUrl);
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setIsProfileLoading(false);
      e.target.value = '';
    }
  };

  const handleRemoveAvatar = async () => {
    if (!authToken) return;
    const previousAvatar = avatarPreview;
    setAvatarPreview('');
    setAvatarFile(null);
    setRemoveAvatar(true);
    setIsProfileLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', profile.name || '');
      formDataToSend.append('email', profile.email || '');
      formDataToSend.append('removeAvatar', 'true');

      const response = await fetch(`${API_BASE_URL}/users/profiles`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${authToken}` },
        body: formDataToSend,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data?.message || 'Failed to remove avatar');

      setProfile({
        name: data.profile.name,
        email: data.profile.email,
      });
      const updatedUser = {
        ...data.profile,
        avatar: data.profile.avatar ? `${API_BASE_URL}${data.profile.avatar}` : '',
      };
      setAvatarFile(null);
      setRemoveAvatar(false);
      setAvatarPreview(updatedUser.avatar);
      updateUser(updatedUser);
    } catch (err) {
      console.error(err);
      setAvatarPreview(previousAvatar);
      alert(err.message);
    } finally {
      setIsProfileLoading(false);
    }
  };

  // ---------- FIXED PASSWORD UPDATE HANDLER ----------
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setPasswordStatus({ type: '', message: '' });

    // Client-side validation
    const nextErrors = {};
    if (!password.current.trim()) nextErrors.current = 'Current password is required.';
    if (!password.new.trim()) nextErrors.new = 'New password is required.';
    if (!password.confirm.trim()) nextErrors.confirm = 'Confirm password is required.';
    if (password.new && password.new.length < 6) {
      nextErrors.new = 'New password must be at least 6 characters.';
    }
    if (password.new && password.confirm && password.new !== password.confirm) {
      nextErrors.confirm = 'Passwords do not match.';
    }
    if (Object.keys(nextErrors).length > 0) {
      setPasswordErrors(nextErrors);
      return;
    }
    setPasswordErrors({});

    if (!authToken) {
      setPasswordStatus({ type: 'error', message: 'Please login again. Token not found.' });
      return;
    }

    // Get email from profile state (must be available)
    if (!profile.email) {
      setPasswordStatus({ type: 'error', message: 'Profile email not loaded. Please refresh.' });
      return;
    }

    setIsPasswordLoading(true);
    try {
      // Include email in the request because endpoint is /forgot-password
      const response = await fetch(joinUrl(API_BASE_URL, ADMIN_CHANGE_PASSWORD_ENDPOINT), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          email: profile.email,           // 👈 ADDED
          currentPassword: password.current,
          newPassword: password.new,
        }),
      });

      const responseBody = await response.json().catch(() => ({}));
      console.log('Password change response:', response.status, responseBody);

      if (!response.ok) {
        // If 401, token might be expired – show message but don't redirect automatically
        if (response.status === 401) {
          setPasswordStatus({ type: 'error', message: 'Session expired. Please login again.' });
        } else {
          setPasswordStatus({ type: 'error', message: responseBody?.message || 'Password update failed' });
        }
        return;
      }

      // Success
      setPasswordStatus({ type: 'success', message: responseBody?.message || 'Password has been changed successfully.' });
      setPassword({ current: '', new: '', confirm: '' });
    } catch (error) {
      console.error('Password update error:', error);
      setPasswordStatus({ type: 'error', message: 'Unable to connect to server. Please try again.' });
    } finally {
      setIsPasswordLoading(false);
    }
  };

  // Site settings save handler
  // ---------- Site settings save handler (improved) ----------
const handleSaveSettings = async () => {
  setSiteSettingsStatus({ type: '', message: '' });
  setIsSiteSettingsLoading(true);

if (!authToken) {
  setSiteSettingsStatus({ type: 'error', message: 'No authentication token. Please login again.' });
  setIsSiteSettingsLoading(false);
  return;
}

  const url = `${API_BASE_URL}/users/site-settings`; // same as GET
  const methods = ['PATCH']; // try common update methods
  const payloads = [
    { settings: siteSettings }, // wrapped as GET returns data.settings
    siteSettings,               // unwrapped
  ];

  let success = false;
  let lastErrorMessage = '';
  for (const method of methods) {
    for (const payload of payloads) {
      try {
        console.log(`🔁 Trying ${method} ${url}`);
        console.log('📦 Payload:', payload);

        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(payload),
        });

        const data = await response.json().catch(() => ({}));
        console.log(`📥 Response (${method}):`, response.status, data);

        if (response.ok) {
          setSiteSettingsStatus({
            type: 'success',
            message: 'Site settings have been saved successfully.',
          });
          success = true;
          break;
        } else {
          // Agar 401/403 aave, token expired ho sakda hai
         if (response.status === 401 || response.status === 403) {
  setSiteSettingsStatus({ type: 'error', message: 'Session expired. Please login again.' });
  // Optionally redirect to login after a few seconds
  setTimeout(() => navigate('/login'), 2000);
} else {
            // Pehla attempt fail, continue
            lastErrorMessage = data?.message || 'Unable to save site settings. Please try again.';
          }
        }
      } catch (error) {
        console.error(`Network error with ${method}:`, error);
        lastErrorMessage = 'Unable to connect to server. Please try again.';
      }
    }
    if (success) break;
  }

  if (!success) {
    setSiteSettingsStatus((prev) =>
      prev.message
        ? prev
        : {
            type: 'error',
            message: lastErrorMessage || 'All save attempts failed. Please try again.',
          }
    );
  }

  setIsSiteSettingsLoading(false);
};

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="rounded-2xl border border-slate-200/80 bg-white/95 p-5 shadow-sm sm:p-6">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Settings</h1>
        <p className="mt-1 text-sm text-slate-500">Manage your profile, security and site configuration.</p>
      </section>

      {/* Profile & Password */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Profile Information */}
        <div className="rounded-2xl border border-slate-200/80 bg-white/95 p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center gap-2">
            <span className="rounded-lg bg-cyan-100 p-2 text-cyan-700">
              <FiUser />
            </span>
            <h2 className="text-lg font-semibold text-slate-900">Profile Information</h2>
          </div>

          <form onSubmit={handleProfileUpdate} noValidate className="space-y-4">
            {/* Name field */}
           <div>
  <label className="mb-1.5 block text-sm font-medium text-slate-700">
    Name
  </label>

  <input
    type="text"
    value={profile.name || ""}
    onChange={(e) =>
      setProfile((prev) => ({
        ...prev,
        name: e.target.value
      }))
    }
    className={inputClasses}
  />

  {profileErrors.name && (
    <p className="mt-1 text-xs text-red-600">
      {profileErrors.name}
    </p>
  )}
</div>

            {/* Email field */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
            <input
  type="email"
  value={profile.email || ""}
  onChange={(e) =>
    setProfile((prev) => ({
      ...prev,
      email: e.target.value
    }))
  }
  className={inputClasses}
/>
              {profileErrors.email && <p className="mt-1 text-xs text-red-600">{profileErrors.email}</p>}
            </div>

            {/* Avatar upload */}
         <div>
  <label className="mb-1.5 block text-sm font-medium text-slate-700">
    Avatar
  </label>

  <div className="flex items-center gap-4">
    {/* Avatar Preview */}
    {avatarPreview ? (
      <img
        src={avatarPreview}
        alt="Avatar preview"
        className="h-16 w-16 rounded-full border border-slate-200 object-cover"
      />
    ) : (
      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-slate-500">
        <FiUser />
      </div>
    )}

    {/* Upload / Remove Actions */}
    <div className="flex flex-wrap items-center gap-3">
      <input
        id="avatar-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          setRemoveAvatar(false); // 👈 important
          handleAvatarChange(e);
        }}
      />
      <label
        htmlFor="avatar-upload"
        className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-800"
      >
        <FiUpload />
        Upload Avatar
      </label>
      {avatarPreview && (
        <button
          type="button"
          onClick={handleRemoveAvatar}
          disabled={isProfileLoading}
          className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold shadow-sm transition ${
            isProfileLoading
              ? 'cursor-not-allowed border-rose-200 bg-rose-50 text-rose-400'
              : 'border-rose-200 bg-white text-rose-700 hover:-translate-y-0.5 hover:border-rose-300 hover:bg-rose-50'
          }`}
        >
          <FiTrash2 size={14} />
          {isProfileLoading ? 'Removing...' : 'Remove Current Avatar'}
        </button>
      )}
    </div>
  </div>
</div>

            <button
              type="submit"
              disabled={isProfileLoading}
              className={`inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition ${
                isProfileLoading ? 'cursor-not-allowed opacity-70' : 'hover:bg-slate-800'
              }`}
            >
              <FiSave />
              {isProfileLoading ? 'Updating...' : 'Update Profile'}
            </button>
            {profileStatus.message && (
              <div
                className={`relative overflow-hidden rounded-2xl border px-4 py-3 text-sm shadow-lg backdrop-blur-sm transition-all duration-500 animate-[fadeIn_.35s_ease-out] ${
                  profileStatus.type === 'success'
                    ? 'border-emerald-200/80 bg-gradient-to-r from-emerald-50 via-white to-teal-50 text-emerald-900'
                    : 'border-rose-200/80 bg-gradient-to-r from-rose-50 via-white to-red-50 text-rose-900'
                }`}
              >
                <span
                  className={`absolute left-0 top-0 h-full w-1.5 ${
                    profileStatus.type === 'success' ? 'bg-emerald-500' : 'bg-rose-500'
                  }`}
                />
                <div className="ml-2 flex items-start gap-3">
                  <span
                    className={`mt-0.5 rounded-full p-1.5 shadow-sm ${
                      profileStatus.type === 'success'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-rose-100 text-rose-700'
                    }`}
                  >
                    {profileStatus.type === 'success' ? <FiCheckCircle size={14} /> : <FiAlertCircle size={14} />}
                  </span>
                  <div>
                    <p className="font-semibold tracking-wide">
                      {profileStatus.type === 'success' ? 'Profile Updated' : 'Update Failed'}
                    </p>
                    <p className="mt-0.5 text-[13px] leading-relaxed">{profileStatus.message}</p>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Change Password */}
        <div className="rounded-2xl border border-slate-200/80 bg-white/95 p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center gap-2">
            <span className="rounded-lg bg-amber-100 p-2 text-amber-700">
              <FiKey />
            </span>
            <h2 className="text-lg font-semibold text-slate-900">Change Password</h2>
          </div>

          <form onSubmit={handlePasswordUpdate} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Current Password</label>
              <input
                type="password"
                value={password.current}
                onChange={(e) => {
                  setPassword({ ...password, current: e.target.value });
                  if (passwordErrors.current) setPasswordErrors((prev) => ({ ...prev, current: '' }));
                  setPasswordStatus({ type: '', message: '' });
                }}
                className={inputClasses}
              />
              {passwordErrors.current && <p className="mt-1 text-xs text-red-600">{passwordErrors.current}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">New Password</label>
              <input
                type="password"
                value={password.new}
                onChange={(e) => {
                  setPassword({ ...password, new: e.target.value });
                  if (passwordErrors.new) setPasswordErrors((prev) => ({ ...prev, new: '' }));
                  setPasswordStatus({ type: '', message: '' });
                }}
                className={inputClasses}
              />
              {passwordErrors.new && <p className="mt-1 text-xs text-red-600">{passwordErrors.new}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Confirm New Password</label>
              <input
                type="password"
                value={password.confirm}
                onChange={(e) => {
                  setPassword({ ...password, confirm: e.target.value });
                  if (passwordErrors.confirm) setPasswordErrors((prev) => ({ ...prev, confirm: '' }));
                  setPasswordStatus({ type: '', message: '' });
                }}
                className={inputClasses}
              />
              {passwordErrors.confirm && <p className="mt-1 text-xs text-red-600">{passwordErrors.confirm}</p>}
            </div>

            <button
              type="submit"
              disabled={isPasswordLoading}
              className={`inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition ${
                isPasswordLoading ? 'cursor-not-allowed opacity-70' : 'hover:bg-slate-800'
              }`}
            >
              <FiKey />
              {isPasswordLoading ? 'Updating...' : 'Change Password'}
            </button>
            {passwordStatus.message && (
              <div
                className={`relative overflow-hidden rounded-2xl border px-4 py-3 text-sm shadow-lg backdrop-blur-sm transition-all duration-500 animate-[fadeIn_.35s_ease-out] ${
                  passwordStatus.type === 'success'
                    ? 'border-emerald-200/80 bg-gradient-to-r from-emerald-50 via-white to-teal-50 text-emerald-900'
                    : 'border-rose-200/80 bg-gradient-to-r from-rose-50 via-white to-red-50 text-rose-900'
                }`}
              >
                <span
                  className={`absolute left-0 top-0 h-full w-1.5 ${
                    passwordStatus.type === 'success' ? 'bg-emerald-500' : 'bg-rose-500'
                  }`}
                />
                <div className="ml-2 flex items-start gap-3">
                  <span
                    className={`mt-0.5 rounded-full p-1.5 shadow-sm ${
                      passwordStatus.type === 'success'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-rose-100 text-rose-700'
                    }`}
                  >
                    {passwordStatus.type === 'success' ? <FiCheckCircle size={14} /> : <FiAlertCircle size={14} />}
                  </span>
                  <div>
                    <p className="font-semibold tracking-wide">
                      {passwordStatus.type === 'success' ? 'Password Updated' : 'Update Failed'}
                    </p>
                    <p className="mt-0.5 text-[13px] leading-relaxed">{passwordStatus.message}</p>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </section>

      {/* Site Settings */}
      <section className="rounded-2xl border border-slate-200/80 bg-white/95 p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex items-center gap-2">
          <span className="rounded-lg bg-indigo-100 p-2 text-indigo-700">
            <FiGlobe />
          </span>
          <h2 className="text-lg font-semibold text-slate-900">Site Settings</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Site Title</label>
            <input
              type="text"
              value={siteSettings.siteTitle}
              onChange={(e) => setSiteSettings({ ...siteSettings, siteTitle: e.target.value })}
              className={inputClasses}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Contact Email</label>
            <input
              type="email"
              value={siteSettings.contactEmail}
              onChange={(e) => setSiteSettings({ ...siteSettings, contactEmail: e.target.value })}
              className={inputClasses}
            />
          </div>
        </div>

        {siteSettingsStatus.message && (
          <div
            className={`mt-4 relative overflow-hidden rounded-2xl border px-4 py-3 text-sm shadow-lg backdrop-blur-sm transition-all duration-500 animate-[fadeIn_.35s_ease-out] ${
              siteSettingsStatus.type === 'success'
                ? 'border-emerald-200/80 bg-gradient-to-r from-emerald-50 via-white to-teal-50 text-emerald-900'
                : 'border-rose-200/80 bg-gradient-to-r from-rose-50 via-white to-red-50 text-rose-900'
            }`}
          >
            <span
              className={`absolute left-0 top-0 h-full w-1.5 ${
                siteSettingsStatus.type === 'success' ? 'bg-emerald-500' : 'bg-rose-500'
              }`}
            />
            <div className="ml-2 flex items-start gap-3">
              <span
                className={`mt-0.5 rounded-full p-1.5 shadow-sm ${
                  siteSettingsStatus.type === 'success'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-rose-100 text-rose-700'
                }`}
              >
                {siteSettingsStatus.type === 'success' ? <FiCheckCircle size={14} /> : <FiAlertCircle size={14} />}
              </span>
              <div>
                <p className="font-semibold tracking-wide">
                  {siteSettingsStatus.type === 'success' ? 'Settings Saved' : 'Save Failed'}
                </p>
                <p className="mt-0.5 text-[13px] leading-relaxed">{siteSettingsStatus.message}</p>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={handleSaveSettings}
          disabled={isSiteSettingsLoading}
          className={`mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition ${
            isSiteSettingsLoading ? 'cursor-not-allowed opacity-70' : 'hover:bg-slate-800'
          }`}
        >
          <FiSave />
          {isSiteSettingsLoading ? 'Saving...' : 'Save Settings'}
        </button>
      </section>
    </div>
  );
};

export default Settings;




