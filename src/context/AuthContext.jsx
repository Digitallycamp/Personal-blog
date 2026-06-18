import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { googleLogout } from '@react-oauth/google';

const AuthContext = createContext();

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api/v1';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  axios.defaults.withCredentials = true;

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/me`);
      if (response.data.success) {
        setUser(response.data.data);
      }
    } catch (error) {
      console.error('Not authenticated');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      
      if (response.data.success) {
        setUser(response.data.data);
        return { success: true, data: response.data.data };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      setError(message);
      return { success: false, message };
    }
  };

  const googleLogin = async (credentialResponse) => {
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/auth/google`, {
        token: credentialResponse.credential
      });
      if (response.data.success) {
        setUser(response.data.data);
        return { success: true };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Google login failed';
      setError(message);
      return { success: false, message };
    }
  };

  const register = async (username, email, password) => {
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        username,
        email,
        password,
      });
      
      if (response.data.success) {
        return { success: true, message: response.data.message };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      setError(message);
      return { success: false, message };
    }
  };

  const forgotPassword = async (email) => {
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/auth/forgot-password`, { email });
      return { success: true, message: response.data.message };
    } catch (error) {
      const message = error.response?.data?.message || 'Request failed';
      setError(message);
      return { success: false, message };
    }
  };

  const resetPassword = async (token, newPassword) => {
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/auth/reset-password`, { token, newPassword });
      return { success: true, message: response.data.message };
    } catch (error) {
      const message = error.response?.data?.message || 'Reset failed';
      setError(message);
      return { success: false, message };
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${API_URL}/auth/logout`);
      setUser(null);
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false };
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    googleLogin,
    register,
    forgotPassword,
    resetPassword,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};