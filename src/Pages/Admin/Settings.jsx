// Settings.jsx (complete updated code)

import React, { useState, useEffect } from 'react';
import { FiGlobe, FiKey, FiSave, FiUpload, FiUser } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
const ADMIN_CHANGE_PASSWORD_ENDPOINT =
  process.env.REACT_APP_ADMIN_CHANGE_PASSWORD_ENDPOINT || '/users/forgot-password';

const joinUrl = (base, endpoint) => {
  if (!base) return endpoint;
  return `${base.replace(/\/+$/, '')}/${endpoint.replace(/^\/+/, '')}`;
};

const inputClasses =
  'w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-800 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-100';

const Settings = () => {
  const { token } = useAuth();
   console.log('Token from localStorage:', localStorage.getItem('token'));
  // Profile state
  const [profile, setProfile] = useState({ name: '', email: '' });
  const [profileErrors, setProfileErrors] = useState({});
  const [avatarPreview, setAvatarPreview] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [isProfileLoading, setIsProfileLoading] = useState(false);

  // Password state
  const [password, setPassword] = useState({ current: '', new: '', confirm: '' });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);
  const [passwordApiError, setPasswordApiError] = useState(''); // API error message

  // Site settings state
  const [siteSettings, setSiteSettings] = useState({ siteTitle: '', contactEmail: '' });
  const [isSiteSettingsLoading, setIsSiteSettingsLoading] = useState(false);
  const [siteSettingsError, setSiteSettingsError] = useState('');
  const navigate = useNavigate();
  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setProfile({
            name: data.profile.name,
            email: data.profile.email,
          });
          if (data.profile.avatar) {
            setAvatarPreview(`${API_BASE_URL}${data.profile.avatar}`);
          }
        }
      } catch (error) {
        console.error('Profile fetch error:', error);
      }
    };
    if (token) fetchProfile();
  }, [token]);

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

  // Profile update handler
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
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

      const response = await fetch(`${API_BASE_URL}/users/profiles`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
        body: formDataToSend,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.message || 'Failed to update profile');
      setProfile({
        name: data.profile.name,
        email: data.profile.email,
      });
      setAvatarPreview(data.profile.avatar ? `${API_BASE_URL}${data.profile.avatar}` : '');
      alert(data.message || 'Profile updated successfully ✅');
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setIsProfileLoading(false);
    }
  };

  // Avatar change handler
  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (avatarPreview && avatarPreview.startsWith('blob:')) {
      URL.revokeObjectURL(avatarPreview);
    }
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  // ---------- FIXED PASSWORD UPDATE HANDLER ----------
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setPasswordApiError(''); // clear previous error

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

    if (!token) {
      setPasswordApiError('Please login again. Token not found.');
      return;
    }

    // Get email from profile state (must be available)
    if (!profile.email) {
      setPasswordApiError('Profile email not loaded. Please refresh.');
      return;
    }

    setIsPasswordLoading(true);
    try {
      // Include email in the request because endpoint is /forgot-password
      const response = await fetch(joinUrl(API_BASE_URL, ADMIN_CHANGE_PASSWORD_ENDPOINT), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
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
          setPasswordApiError('Session expired. Please login again.');
        } else {
          setPasswordApiError(responseBody?.message || 'Password update failed');
        }
        return;
      }

      // Success
      alert(responseBody?.message || 'Password changed successfully!');
      setPassword({ current: '', new: '', confirm: '' });
    } catch (error) {
      console.error('Password update error:', error);
      setPasswordApiError('Unable to connect to server. Please try again.');
    } finally {
      setIsPasswordLoading(false);
    }
  };

  // Site settings save handler
  // ---------- Site settings save handler (improved) ----------
const handleSaveSettings = async () => {
  setSiteSettingsError('');
  setIsSiteSettingsLoading(true);

  if (!token) {
  setSiteSettingsError('No authentication token. Please login again.');
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
  for (const method of methods) {
    for (const payload of payloads) {
      try {
        console.log(`🔁 Trying ${method} ${url}`);
        console.log('📦 Payload:', payload);

        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });

        const data = await response.json().catch(() => ({}));
        console.log(`📥 Response (${method}):`, response.status, data);

        if (response.ok) {
          alert(`✅ Settings saved successfully using ${method}`);
          success = true;
          break;
        } else {
          // Agar 401/403 aave, token expired ho sakda hai
         if (response.status === 401 || response.status === 403) {
  setSiteSettingsError('Session expired. Please login again.');
  // Optionally redirect to login after a few seconds
  setTimeout(() => navigate('/login'), 2000);
} else {
            // Pehla attempt fail, continue
          }
        }
      } catch (error) {
        console.error(`❌ Network error with ${method}:`, error);
      }
    }
    if (success) break;
  }

  if (!success) {
    setSiteSettingsError('All save attempts failed. Check browser console for details.');
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
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => {
                  setProfile({ ...profile, name: e.target.value });
                  if (profileErrors.name) setProfileErrors((prev) => ({ ...prev, name: '' }));
                }}
                className={inputClasses}
                required
              />
              {profileErrors.name && <p className="mt-1 text-xs text-red-600">{profileErrors.name}</p>}
            </div>

            {/* Email field */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => {
                  setProfile({ ...profile, email: e.target.value });
                  if (profileErrors.email) setProfileErrors((prev) => ({ ...prev, email: '' }));
                }}
                className={inputClasses}
                required
              />
              {profileErrors.email && <p className="mt-1 text-xs text-red-600">{profileErrors.email}</p>}
            </div>

            {/* Avatar upload */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Avatar</label>
              <div className="flex items-center gap-4">
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
                <div>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                  <label
                    htmlFor="avatar-upload"
                    className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                  >
                    <FiUpload />
                    Upload Avatar
                  </label>
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
                  setPasswordApiError('');
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
                  setPasswordApiError('');
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
                  setPasswordApiError('');
                }}
                className={inputClasses}
              />
              {passwordErrors.confirm && <p className="mt-1 text-xs text-red-600">{passwordErrors.confirm}</p>}
            </div>

            {/* API error message */}
            {passwordApiError && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-2 text-sm text-red-600">
                {passwordApiError}
              </div>
            )}

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

        {siteSettingsError && <p className="mt-2 text-sm text-red-600">{siteSettingsError}</p>}

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