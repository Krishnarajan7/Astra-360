import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 422) {
      // Laravel validation errors
      return Promise.reject(error.response.data);
    }

    if (error.response?.status === 500) {
      return Promise.reject(
        new Error('Server error. Please try again later.')
      );
    }

    if (error.code === 'ECONNABORTED') {
      return Promise.reject(
        new Error('Request timeout. Please try again.')
      );
    }

    if (!error.response) {
      return Promise.reject(
        new Error('Network error. Please check your connection.')
      );
    }

    return Promise.reject(error);
  }
);

// Contact API functions
export const contactApi = {
  submitForm: (data: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    message: string;
  }) => api.post('/contact/submit', data),
};

export default api;
