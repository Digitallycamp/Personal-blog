import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


export const articleAPI = {
  
  getAll: () => api.get('/article'),
  
  getBySlug: (slug) => api.get(`/article/slug/${slug}`),
  
  getByCategory: (categoryId) => api.get(`/article/category/${categoryId}`),
  
  getById: (id) => api.get(`/article/${id}`),
  
  create: (articleData) => api.post('/article', articleData),
  
  update: (id, articleData) => api.patch(`/article/${id}`, articleData),
  
  delete: (id) => api.delete(`/article/${id}`),
};

export default api;