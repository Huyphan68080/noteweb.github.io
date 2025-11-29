import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Trash from './pages/Trash';
import './App.css';

function App() {
  useEffect(() => {
    // Handle GitHub Pages redirect
    const q = sessionStorage.getItem('redirect');
    if (q) {
      sessionStorage.removeItem('redirect');
      window.history.replaceState(null, null, q);
    }
  }, []);

  // Get basename from window location
  const getBasename = () => {
    const pathname = window.location.pathname;
    if (pathname.includes('/noteweb.github.io')) {
      return '/noteweb.github.io';
    }
    return '/';
  };

  return (
    <Router basename={getBasename()}>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/trash"
              element={
                <ProtectedRoute>
                  <Trash />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
