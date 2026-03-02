import React, { useMemo, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  FiBookOpen,
  FiGrid,
  FiLogOut,
  FiMenu,
  FiMessageSquare,
  FiSettings,
  FiShield,
  FiUser,
  FiX,
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

// Base URL for API – needed to build absolute avatar URLs
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const AdminLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user: adminUser, logout } = useAuth();

  const navItems = useMemo(
    () => [
      { label: 'Dashboard', path: '/admin', icon: FiGrid, end: true },
      { label: 'Courses', path: '/admin/courses', icon: FiBookOpen },
      { label: 'Enquiries', path: '/admin/enquiries', icon: FiMessageSquare },
      { label: 'Settings', path: '/admin/settings', icon: FiSettings },
    ],
    []
  );

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const pageTitle =
    navItems.find((item) =>
      item.end ? location.pathname === item.path : location.pathname.startsWith(item.path)
    )?.label || 'Admin Portal';

  // Helper to get the correct avatar URL (absolute if relative)
  const getAvatarUrl = (avatarPath) => {
    if (!avatarPath) return null;
    if (avatarPath.startsWith('http')) return avatarPath;
    return `${API_BASE_URL}${avatarPath}`;
  };

  const sidebarContent = (
    <>
      <div className="relative border-b border-slate-700/70 px-6 py-6">
        <div className="absolute right-6 top-5 rounded-lg bg-cyan-400/20 p-2 text-cyan-200">
          <FiShield />
        </div>
        <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Control Panel</p>
        <h1 className="mt-2 text-xl font-semibold text-white">Animex Admin</h1>
        <p className="mt-1 text-xs text-slate-400">Professional management workspace</p>
      </div>

      <nav className="px-4 py-6">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <NavLink
                  end={item.end}
                  onClick={closeMobileMenu}
                  to={item.path}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/10 text-cyan-200 ring-1 ring-cyan-400/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]'
                        : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                    }`
                  }
                >
                  <span className="rounded-lg bg-slate-800/70 p-1.5 text-slate-300 transition group-hover:text-white">
                    <Icon className="text-base" />
                  </span>
                  <span>{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-auto border-t border-slate-700/70 p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-400/40 bg-rose-500/10 px-4 py-2.5 text-sm font-semibold text-rose-300 transition hover:bg-rose-500/20"
        >
          <FiLogOut />
          <span>Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-sky-50/40 to-slate-100">
      <div className="fixed inset-y-0 left-0 z-40 hidden w-72 flex-col border-r border-slate-700/70 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 shadow-2xl lg:flex">
        {sidebarContent}
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <button
            aria-label="Close menu overlay"
            className="absolute inset-0 bg-slate-950/50"
            onClick={closeMobileMenu}
          />
          <aside className="relative z-10 flex h-full w-72 flex-col border-r border-slate-700/70 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-700/70 px-4 py-4">
              <span className="text-sm font-semibold text-slate-200">Menu</span>
              <button
                onClick={closeMobileMenu}
                className="rounded-md p-2 text-slate-300 transition hover:bg-slate-800 hover:text-white"
                aria-label="Close menu"
              >
                <FiX />
              </button>
            </div>
            {sidebarContent}
          </aside>
        </div>
      )}

      <div className="lg:ml-72">
        <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/80 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="rounded-lg border border-slate-300 p-2 text-slate-700 transition hover:bg-slate-50 lg:hidden"
                aria-label="Open menu"
              >
                <FiMenu />
              </button>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Admin Portal</p>
                <h2 className="text-xl font-semibold text-slate-900">{pageTitle}</h2>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold text-slate-800">{adminUser?.name || 'Admin'}</p>
                <p className="text-xs text-slate-500">{adminUser?.email || 'admin@animex.local'}</p>
              </div>
              {/* Avatar / User Icon */}
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-slate-900 to-cyan-700 text-sm font-semibold text-white">
                {adminUser?.avatar ? (
                  <img
                    src={getAvatarUrl(adminUser.avatar)}
                    alt={adminUser.name || 'User'}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  adminUser?.name ? adminUser.name.charAt(0).toUpperCase() : <FiUser />
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;