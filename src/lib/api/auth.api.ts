import apiClient from "../http/apiClient";

//1. Define API functions for authentication
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  //... other user fields
}

export const authApi = {
  // Login function
  async login(credentials: {
    email: string;
    password: string;
  }): Promise<AuthTokens> {
    const { data } = await apiClient.post("/auth/login", credentials);
    // Backend trả { message, data: {accessToken, refreshToken}}
    // Frontend nhận {accessToken, refreshToken}
    console.log(data);
    return {
      accessToken: data.accessToken, // Lấy accessToken từ data.data
      refreshToken: data.refreshToken,
    };
  },

  async getMe(): Promise<User> {
    const responseBody = await apiClient.get("/user/me");
    console.log(responseBody);
    return responseBody.data; // Giả sử backend trả về user trong data.data
  },
};
