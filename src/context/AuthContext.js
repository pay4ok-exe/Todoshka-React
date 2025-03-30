import React, { createContext, useState, useContext, useEffect } from 'react';
import { 
  loginUser as loginApi, 
  registerUser as registerApi, 
  getUserProfile 
} from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Check if user data is stored in localStorage
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : { isLoggedIn: false };
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        // Check if we have a token
        const token = localStorage.getItem('token');
        
        if (token) {
          // Token exists, try to get user profile
          const userData = await getUserProfile();
          setUser({
            ...userData,
            isLoggedIn: true
          });
          setError(null);
        }
      } catch (err) {
        // If there's an error, clear the token
        console.error('Authentication error:', err.message);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser({ isLoggedIn: false });
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    if (user.isLoggedIn) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await loginApi(email, password);
      
      // Store token in localStorage
      localStorage.setItem('token', response.token);
      
      // Set user data
      setUser({
        _id: response._id,
        name: response.name,
        email: response.email,
        isLoggedIn: true
      });
      
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await registerApi(name, email, password);
      
      // Store token in localStorage
      localStorage.setItem('token', response.token);
      
      // Set user data
      setUser({
        _id: response._id,
        name: response.name,
        email: response.email,
        isLoggedIn: true
      });
      
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser({ isLoggedIn: false });
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;