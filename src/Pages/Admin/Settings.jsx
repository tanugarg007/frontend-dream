import React, { useState } from 'react';

const Settings = () => {
  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@animex.com',
    avatar: '/avatar.png',
  });

  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // API call to update profile
    alert('Profile updated successfully!');
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (password.new !== password.confirm) {
      alert('Passwords do not match!');
      return;
    }
    // API call to change password
    alert('Password changed successfully!');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-dark mb-6">Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile Settings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
          <form onSubmit={handleProfileUpdate}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Avatar</label>
              <input type="file" accept="image/*" className="w-full" />
            </div>
            <button type="submit" className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90">
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
                onChange={(e) => setPassword({ ...password, current: e.target.value })}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">New Password</label>
              <input
                type="password"
                value={password.new}
                onChange={(e) => setPassword({ ...password, new: e.target.value })}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Confirm New Password</label>
              <input
                type="password"
                value={password.confirm}
                onChange={(e) => setPassword({ ...password, confirm: e.target.value })}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <button type="submit" className="bg-secondary text-white px-4 py-2 rounded hover:bg-secondary/90">
              Change Password
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