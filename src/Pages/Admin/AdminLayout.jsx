import React, { useMemo, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  FiBookOpen,
  FiGrid,
  FiLogOut,
  FiMenu,
  FiMessageSquare,
  FiSettings,
  FiUser,
  FiX,
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

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

  const sidebarContent = (
    <>
      <div className="border-b border-slate-800 px-6 py-6">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Control Panel</p>
        <h1 className="mt-2 text-xl font-semibold text-white">Animex Admin</h1>
      </div>

      <nav className="px-4 py-6">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <NavLink
                  end={item.end}
                  onClick={closeMobileMenu}
                  to={item.path}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? 'bg-cyan-500/15 text-cyan-300 ring-1 ring-cyan-400/40'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`
                  }
                >
                  <Icon className="text-base" />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-auto border-t border-slate-800 p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-rose-400/40 bg-rose-500/10 px-4 py-2.5 text-sm font-semibold text-rose-300 transition hover:bg-rose-500/20"
        >
          <FiLogOut />
          <span>Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="fixed inset-y-0 left-0 z-40 hidden w-72 flex-col bg-slate-900 shadow-xl lg:flex">
        {sidebarContent}
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <button
            aria-label="Close menu overlay"
            className="absolute inset-0 bg-slate-950/50"
            onClick={closeMobileMenu}
          />
          <aside className="relative z-10 flex h-full w-72 flex-col bg-slate-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 px-4 py-4">
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
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="rounded-md border border-slate-300 p-2 text-slate-700 transition hover:bg-slate-50 lg:hidden"
                aria-label="Open menu"
              >
                <FiMenu />
              </button>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Admin Portal</p>
                <h2 className="text-lg font-semibold text-slate-900">{pageTitle}</h2>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold text-slate-800">{adminUser?.name || 'Admin'}</p>
                <p className="text-xs text-slate-500">{adminUser?.email || 'admin@animex.local'}</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                {adminUser?.name ? adminUser.name.charAt(0).toUpperCase() : <FiUser />}
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
