import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('petmily_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('petmily_token');
      localStorage.removeItem('petmily_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    address?: string;
  }) => api.post('/auth/register', userData),
  
  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),
  
  getUser: (id: number) => api.get(`/auth/user/${id}`),
};

// Pet API
export const petAPI = {
  createPet: (petData: {
    name: string;
    species: string;
    breed?: string;
    age: number;
    gender: string;
    personality?: string;
    imageUrl?: string;
    userId: number;
  }) => api.post('/pets', petData),
  
  getPetsByUser: (userId: number) => api.get(`/pets/user/${userId}`),
  
  getPet: (id: number) => api.get(`/pets/${id}`),
  
  updatePet: (id: number, petData: any) => api.put(`/pets/${id}`, petData),
  
  deletePet: (id: number) => api.delete(`/pets/${id}`),
};

// Product API
export const productAPI = {
  getAllProducts: () => api.get('/products'),
  
  getProduct: (id: number) => api.get(`/products/${id}`),
  
  getProductsByCategory: (categoryId: number) => api.get(`/products/category/${categoryId}`),
  
  searchProducts: (keyword: string) => api.get(`/products/search?keyword=${keyword}`),
  
  getAvailableProducts: () => api.get('/products/available'),
  
  getAiRecommendations: (limit: number = 6) => api.get(`/products/ai-recommendations?limit=${limit}`),
  
  createProduct: (productData: any) => api.post('/products', productData),
  
  updateProduct: (id: number, productData: any) => api.put(`/products/${id}`, productData),
  
  deleteProduct: (id: number) => api.delete(`/products/${id}`),
};

// Walker API
export const walkerAPI = {
  getAvailableWalkers: () => api.get('/walkers'),
  
  getWalker: (id: number) => api.get(`/walkers/${id}`),
  
  getWalkersByLocation: (location: string) => api.get(`/walkers/location/${location}`),
  
  getWalkersByMaxRate: (maxRate: number) => api.get(`/walkers/rate/${maxRate}`),
  
  createWalkerProfile: (profileData: any) => api.post('/walkers', profileData),
  
  createBooking: (bookingData: {
    userId: number;
    walkerId: number;
    petId: number;
    date: string;
    duration: number;
    totalPrice: number;
    notes?: string;
  }) => api.post('/walkers/bookings', bookingData),
  
  getUserBookings: (userId: number) => api.get(`/walkers/bookings/user/${userId}`),
  
  getWalkerBookings: (walkerId: number) => api.get(`/walkers/bookings/walker/${walkerId}`),
  
  updateBookingStatus: (bookingId: number, status: string) =>
    api.put(`/walkers/bookings/${bookingId}/status`, { status }),
  
  createReview: (reviewData: {
    walkerId: number;
    userId: number;
    rating: number;
    comment?: string;
  }) => api.post('/walkers/reviews', reviewData),
  
  getWalkerReviews: (walkerId: number) => api.get(`/walkers/reviews/${walkerId}`),
};

export default api;


