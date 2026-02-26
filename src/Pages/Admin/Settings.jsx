import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
const ADMIN_CHANGE_PASSWORD_ENDPOINT =
  process.env.REACT_APP_ADMIN_CHANGE_PASSWORD_ENDPOINT || '/users/forgot-password';

const joinUrl = (base, endpoint) => {
  if (!base) return endpoint;
  return `${base.replace(/\/+$/, '')}/${endpoint.replace(/^\/+/, '')}`;
};

const Settings = () => {
  const { token } = useAuth();
  const [profile, setProfile] = useState({
    name: '',
    email: '',
  });
  const [profileErrors, setProfileErrors] = useState({});
  const [avatarPreview, setAvatarPreview] = useState('');

  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: '',
  });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    const nextErrors = {};

    if (!profile.name?.trim()) nextErrors.name = 'Name is required.';
    if (!profile.email?.trim()) {
      nextErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(profile.email.trim())) {
      nextErrors.email = 'Enter a valid email address.';
    }

    if (Object.keys(nextErrors).length > 0) {
      setProfileErrors(nextErrors);
      return;
    }

    setProfileErrors({});
    // API call to update profile
    alert('Profile updated successfully!');
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert('Please select JPG, PNG or WEBP image.');
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setAvatarPreview(previewUrl);
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
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
      alert('Please login again. Token not found.');
      return;
    }

    setIsPasswordLoading(true);
    try {
      const response = await fetch(joinUrl(API_BASE_URL, ADMIN_CHANGE_PASSWORD_ENDPOINT), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: password.current,
          newPassword: password.new,
        }),
      });

      const responseBody = await response.json().catch(() => ({}));
      if (!response.ok) {
        alert(responseBody?.error || responseBody?.message || 'Password update failed');
        return;
      }

      alert(responseBody?.message || 'Password changed successfully!');
      setPassword({ current: '', new: '', confirm: '' });
    } catch (error) {
      alert('Unable to connect to server. Please try again.');
    } finally {
      setIsPasswordLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-dark mb-6">Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile Settings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
          <form onSubmit={handleProfileUpdate} noValidate>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => {
                  setProfile({ ...profile, name: e.target.value });
                  if (profileErrors.name) {
                    setProfileErrors((prev) => ({ ...prev, name: '' }));
                  }
                }}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              {profileErrors.name && <p className="mt-1 text-sm text-red-600">{profileErrors.name}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => {
                  setProfile({ ...profile, email: e.target.value });
                  if (profileErrors.email) {
                    setProfileErrors((prev) => ({ ...prev, email: '' }));
                  }
                }}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              {profileErrors.email && <p className="mt-1 text-sm text-red-600">{profileErrors.email}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Avatar</label>
              {avatarPreview && (
                <img
                  src={avatarPreview}
                  alt="Avatar preview"
                  className="mb-3 h-20 w-20 rounded-full border border-gray-200 object-cover"
                />
              )}
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
              <label
                htmlFor="avatar-upload"
                className="inline-flex cursor-pointer items-center rounded-md bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
              >
                Choose Avatar
              </label>
            </div>
            <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Update Profile
            </button>
          </form>
        </div>

        {/* Change Password */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Change Password</h2>
          <form onSubmit={handlePasswordUpdate}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Current Password</label>
              <input
                type="password"
                value={password.current}
                onChange={(e) => {
                  setPassword({ ...password, current: e.target.value });
                  if (passwordErrors.current) {
                    setPasswordErrors((prev) => ({ ...prev, current: '' }));
                  }
                }}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {passwordErrors.current && (
                <p className="mt-1 text-sm text-red-600">{passwordErrors.current}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">New Password</label>
              <input
                type="password"
                value={password.new}
                onChange={(e) => {
                  setPassword({ ...password, new: e.target.value });
                  if (passwordErrors.new) {
                    setPasswordErrors((prev) => ({ ...prev, new: '' }));
                  }
                }}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {passwordErrors.new && (
                <p className="mt-1 text-sm text-red-600">{passwordErrors.new}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Confirm New Password</label>
              <input
                type="password"
                value={password.confirm}
                onChange={(e) => {
                  setPassword({ ...password, confirm: e.target.value });
                  if (passwordErrors.confirm) {
                    setPasswordErrors((prev) => ({ ...prev, confirm: '' }));
                  }
                }}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {passwordErrors.confirm && (
                <p className="mt-1 text-sm text-red-600">{passwordErrors.confirm}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={isPasswordLoading}
              className={`w-full sm:w-auto bg-red-600 text-white px-5 py-2.5 rounded-lg font-semibold shadow-md transition ${
                isPasswordLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-red-700'
              }`}
            >
              {isPasswordLoading ? 'Updating...' : 'Change Password'}
            </button>
          </form>
        </div>
      </div>

      {/* Site Settings (Optional) */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Site Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Site Title</label>
            <input type="text" defaultValue="ANIMEX" className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Contact Email</label>
            <input type="email" defaultValue="info@animex.com" className="w-full border rounded px-3 py-2" />
          </div>
        </div>
        <button className="mt-4 bg-dark text-white px-4 py-2 rounded hover:bg-dark/90">Save Settings</button>
      </div>
    </div>
  );
};

export default Settings;
