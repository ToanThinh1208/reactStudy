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

export interface RegisterDto {
  fullName: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  _id: string;
  fullName: string;
  email: string;
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

  async register(data: RegisterDto): Promise<RegisterResponse> {
    const response = await apiClient.post("/auth/register", data);
    return response as unknown as RegisterResponse;
  },
};
