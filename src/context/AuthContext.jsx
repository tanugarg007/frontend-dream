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
  const [token, setToken] = useState(() => localStorage.getItem('adminToken') || '');
  const [user, setUser] = useState(() => getStoredUser());

  const login = (nextToken, nextUser) => {
    localStorage.setItem('adminToken', nextToken);
    localStorage.setItem('adminUser', JSON.stringify(nextUser));
    setToken(nextToken);
    setUser(nextUser);
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
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