import { authApi } from "@/lib/api/auth.api";
import { useAuthStore } from "@/stores/Auth.store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useRegisterMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (userData: {
      fullName: string;
      email: string;
      password: string;
    }) => authApi.register(userData),

    onSuccess: () => {
      toast.success("Đăng kí thành công", {
        description: "Vui lòng Đăng nhập để tiếp tục",
      });
      navigate("/login");
    },

    onError: (err: any) => {
      toast.error(
        err.response?.data?.message || "Đăng kí thất bại. Vui lòng thử lại.",
      );
    },

    onSettled: () => {
      // Có thể dùng để reset form hoặc các thao tác cleanup khác
    },
  });
};

export const useLoginMutation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/profile";
  const setTokens = useAuthStore((state: any) => state.setTokens);
  return useMutation({
    mutationFn: (userData: { email: string; password: string }) =>
      authApi.login(userData),

    onSuccess: (tokens: { accessToken: string; refreshToken: string }) => {
      toast.success("Login thành công");
      setTokens(tokens.accessToken, tokens.refreshToken);
      navigate(from, { replace: true });
    },

    onError: (err: any) => {
      toast.error(
        err.response?.data?.message || "Login failed. Please try again.",
      );
    },

    onSettled: () => {
      // Có thể dùng để reset form hoặc các thao tác cleanup khác
    },
  });
};

export const useLogoutMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const clearTokens = useAuthStore((state: any) => state.clearTokens);
  return useMutation({
    mutationFn: () => authApi.logout(),

    onSuccess: () => {
      // xóa token trong store
      clearTokens();
      // xóa các query trong cache
      queryClient.removeQueries();
      navigate("/login");
      toast.success("Logout thành công");
    },

    onError: (err: any) => {
      clearTokens();
      // xóa các query trong cache
      queryClient.removeQueries();
      navigate("/login");
    },

    // onSettled: () => {
    //   // Có thể dùng để reset form hoặc các thao tác cleanup khác
    // },
  });
};
