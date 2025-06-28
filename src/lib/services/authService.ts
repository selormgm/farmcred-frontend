import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getStorageItem = (key: string) => {
  if (typeof window !== "undefined") {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error(`Error accessing localStorage for key ${key}:`, error);
      return null;
    }
  }
  return null;
};

const setStorageItem = (key: string, value: string) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error(`Error setting localStorage for key ${key}:`, error);
    }
  }
};

const removeStorageItem = (key: string) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing localStorage for key ${key}:`, error);
    }
  }
};

const apiClient = axios.create({
  baseURL: API_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isTokenError =
      error.response?.status === 401 ||
      error.response?.data?.detail?.includes("token not valid") ||
      error.response?.data?.detail?.includes("Token is invalid") ||
      error.response?.data?.code === "token_not_valid";

    if (isTokenError && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = getRefreshToken();
      if (refreshToken) {
        try {
          const response = await axios.post(
            `${API_URL}/api/account/token/refresh/`,
            {
              refresh: refreshToken,
            }
          );

          const { access } = response.data;
          setStorageItem("access_token", access);

          originalRequest.headers.Authorization = `Bearer ${access}`;
          return apiClient(originalRequest);
        } catch (refreshError: any) {
          console.error("Token refresh failed:", refreshError);

          const isRefreshTokenInvalid =
            refreshError.response?.data?.detail?.includes("token not valid") ||
            refreshError.response?.data?.code === "token_not_valid";

          if (isRefreshTokenInvalid) {
            console.log("Refresh token is invalid, forcing logout");
            forceLogout();
          }

          return Promise.reject(refreshError);
        }
      } else {
        console.log("No refresh token available, forcing logout");
        forceLogout();
      }
    }

    if (isTokenError && originalRequest._retry) {
      console.log("Token still invalid after refresh attempt, forcing logout");
      forceLogout();
    }

    return Promise.reject(error);
  }
);

const forceLogout = () => {
  console.log("Forcing logout due to invalid token");
  logout();

  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
};

export const loginAndStoreToken = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/api/account/login/`, {
      email,
      password,
    });

    const { access, refresh, user } = response.data;

    setStorageItem("access_token", access);
    setStorageItem("refresh_token", refresh);

    if (user) {
      setStorageItem("user_info", JSON.stringify(user));
    }

    console.log("Logged in! Token stored.");
    return {
      success: true,
      data: response.data,
      userRole: user?.role,
    };
  } catch (error: any) {
    console.error("Login failed:", error.response?.data || error.message);
    return { success: false, error: error.response?.data || error.message };
  }
};

export const registerUser = async (
  email: string,
  password: string,
  fullName: string,
  role: string = "farmer"
) => {
  try {
    const response = await axios.post(`${API_URL}/api/account/register/`, {
      email,
      password,
      full_name: fullName,
      role: role,
    });

    console.log("Registration successful!");
    return { success: true, data: response.data };
  } catch (error: any) {
    console.error(
      "Registration failed:",
      error.response?.data || error.message
    );
    return { success: false, error: error.response?.data || error.message };
  }
};

export const logout = () => {
  removeStorageItem("access_token");
  removeStorageItem("refresh_token");
  removeStorageItem("user_info");
  console.log("Logged out successfully");
};

export const getAccessToken = () => {
  return getStorageItem("access_token");
};

export const getRefreshToken = () => {
  return getStorageItem("refresh_token");
};

export const getUserInfo = () => {
  const userInfo = getStorageItem("user_info");
  return userInfo ? JSON.parse(userInfo) : null;
};

export const getUserRole = () => {
  const userInfo = getUserInfo();
  return userInfo?.role || null;
};

export const isAuthenticated = () => {
  const token = getAccessToken();
  const userInfo = getUserInfo();
  return !!(token && userInfo);
};

export { apiClient, forceLogout };
