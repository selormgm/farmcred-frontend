// services/authService.js
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;



export const loginAndStoreToken = async (email: any, password:any) => {
  try {
    const response = await axios.post(`${API_URL}/api/api/token/`, {
      email,
      password,
    });

    const { access, refresh } = response.data;

    // Store in localStorage
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);

    console.log('Logged in! Token stored.');
    return true;
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
    return false;
  }
};
