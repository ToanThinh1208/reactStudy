import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../../stores/Auth.store";
import { authApi } from "../../lib/api/auth.api";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/UI/card";
import { Button } from "../UI/button";
import { Loader2, Mail, Lock } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchemaType } from "@/utils/rules";

function LoginPage() {
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const setTokens = useAuthStore((state: any) => state.setTokens);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "thichcungkiengg@gmail.com",
      password: "password123",
    },
  });

  const onSubmit = async (data: LoginSchemaType) => {
    setLoading(true);
    try {
      // Giả sử API login nhận { email, password }
      const tokens = await authApi.login({
        email: data.email,
        password: data.password,
      });
      setTokens(tokens.accessToken, tokens.refreshToken);
      toast.success("Login thành công");
      navigate(from, { replace: true });
    } catch (err: any) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-stone-50 to-slate-100 dark:bg-none">
        <Card className=" w-full max-w-md shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>Basic Form</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <Mail className="w-4 h-4" />
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.email && (
                  <p className="text-destructive text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <Lock className="w-4 h-4" />
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  {...register("password")}
                  className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.password && (
                  <p className="text-destructive text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="rememberMe" className="w-4 h-4" />
                <label htmlFor="rememberMe" className="text-sm font-medium">
                  Remember me
                </label>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {/* {loading ? "Đang xử lý" : "Đăng ký"} */}
                {loading ? (
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                ) : (
                  "Đăng nhập"
                )}
              </Button>

              <div className="text-center text-sm">
                <span>Chưa có tài khoản? </span>
                <Link to="/register" className="text-blue-500 hover:underline">
                  Đăng kí ngay
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default LoginPage;
