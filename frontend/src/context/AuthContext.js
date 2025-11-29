import React, { createContext, useState, useCallback } from 'react';
import { adminAPI } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = useCallback(async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await adminAPI.login(username, password);
      const { token, admin: adminData } = response.data;

      localStorage.setItem('token', token);
      setAdmin(adminData);
      setIsAuthenticated(true);

      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      setIsAuthenticated(false);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setAdmin(null);
    setIsAuthenticated(false);
    setError(null);
  }, []);

  const value = {
    admin,
    isAuthenticated,
    loading,
    error,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
