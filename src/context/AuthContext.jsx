import React, { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem('adminUser') || 'null');
  } catch (error) {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const readStoredToken = () => {
    const stored = localStorage.getItem('adminToken') || localStorage.getItem('token') || '';
    // Treat literal "undefined"/"null" strings as empty.
    if (stored === 'undefined' || stored === 'null') return '';
    return stored;
  };

  const [token, setToken] = useState(readStoredToken);
  const [user, setUser] = useState(() => getStoredUser());

  const login = (nextToken, nextUser) => {
    if (!nextToken || nextToken === 'undefined' || nextToken === 'null') {
      return;
    }
    localStorage.setItem('adminToken', nextToken);
    localStorage.setItem('token', nextToken);
    localStorage.setItem('adminUser', JSON.stringify(nextUser || null));
    if (nextUser?.email) {
      localStorage.setItem('adminLastEmail', String(nextUser.email).trim().toLowerCase());
    }
    setToken(nextToken);
    setUser(nextUser || null);
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('token');
    localStorage.removeItem('adminUser');
    setToken('');
    setUser(null);
  };

  // 🔥 NEW FUNCTION
  const updateUser = (updatedUser) => {
    localStorage.setItem('adminUser', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token),
      login,
      logout,
      updateUser,   // 🔥 add here
    }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }
  return context;
};
