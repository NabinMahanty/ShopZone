import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  // Initialize auth state from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedAuth = localStorage.getItem('shopzone-auth');
    return savedAuth === 'true';
  });

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('shopzone-user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Sync auth state with localStorage
  useEffect(() => {
    localStorage.setItem('shopzone-auth', isAuthenticated.toString());
    if (user) {
      localStorage.setItem('shopzone-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('shopzone-user');
    }
  }, [isAuthenticated, user]);

  const login = (username = 'Guest') => {
    setIsAuthenticated(true);
    setUser({ username, loginTime: new Date().toISOString() });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
