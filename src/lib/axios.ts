import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default apiClient;



// apiClient.interceptors.request.use(
//   (config) => {
//     // get the token from localStorage 
//     if (typeof window !== 'undefined') {
//       const token = process.env.NEXT_PUBLIC_TOKEN;
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {

//         if (typeof window !== 'undefined') {
//         localStorage.removeItem('access_token');
//         window.location.href = '/login';
//       }
//     }
//     return Promise.reject(error);
//   }
// );