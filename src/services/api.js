import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add auth token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

// Todo APIs
export const getTodos = () => api.get('/todos');

export const addTodo = (text) => api.post('/todos', { text });

export const updateTodo = (id, updates) => api.put(`/todos/${id}`, updates);

export const deleteTodo = (id) => api.delete(`/todos/${id}`);

// Shorthand helpers
export const moveToTrash = (id) => updateTodo(id, { trash: true });

export const restoreTodo = (id) => updateTodo(id, { trash: false });

export const toggleTodoCompletion = (id, isChecked) => updateTodo(id, { isChecked: !isChecked });

// Authentication APIs
export const loginUser = (email, password) => api.post('/users/login', { email, password });

export const registerUser = (name, email, password) => api.post('/users', { name, email, password });

export const getUserProfile = () => api.get('/users/profile');

export const updateUserProfile = (userData) => api.put('/users/profile', userData);

export default api;