import axios from "axios";
import { useAuthStore } from "../../stores/Auth.store";

//create instance of axios
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // nhớ config trong .env
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
  withCredentials: true, // send cookies when cross-domain requests
});

apiClient.interceptors.request.use((config) => {
  // Cần thằng nawof thì lấy thằng đó từ zustand store
  // useAuthStore.getState() => lấy state hiện tại của store - không cần hook -> không hay đổi giữa các render
  //không sử dụng hook trong non-react function
  const accessToken = useAuthStore.getState().accessToken;
  // console.log(accessToken);

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    return response.data; //do ở đây chúng ta đã chấm tới data nên ở auth.api chỉ cần chấm data không cần .data.data nữa
  },

  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    if (status === 401 && !originalRequest._retry) { //kiểm tra đã retry chưa
      originalRequest._retry = true; // đánh dấu đã retry
      try {
        const refreshToken = useAuthStore.getState().refreshToken;
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }
        // Gọi API refresh token
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}auth/refresh`,
          {
            withCredentials: true, // gửi kèm cookies -> accept cookies từ backend
          },
        );
        const { accessToken } = response.data;
        // lưu accesstoken mới vào zustand store
        useAuthStore.getState().setTokens(accessToken, refreshToken);
        // Thực hiện lại request ban đầu với accessToken mới
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return apiClient(originalRequest);
      } catch (error) {
        // Nếu refresh token cũng lỗi, logout user
        useAuthStore.getState().clearTokens();
        window.location.href = "/login"; // redirect cứng to login
        return Promise.reject(error);
      }
    }
  },
);

export default apiClient;
