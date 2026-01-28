import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../../stores/Auth.store";
import { authApi } from "../../lib/api/auth.api";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/UI/card";
import { Button } from "../UI/button";
import { Loader2 } from "lucide-react";

function LoginPage() {
  const [email, setEmail] = React.useState("thichcungkiengg@gmail.com");
  const [password, setPassword] = React.useState("password123");
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const setTokens = useAuthStore((state: any) => state.setTokens);

  const handleLogin = async (e: React.FormEvent) => {
      setLoading(true);

    try {
      e.preventDefault();
      const tokens = await authApi.login({ email, password });
      // Lưu tokens vào Zustand store
      setTokens(tokens.accessToken, tokens.refreshToken);
      // console.log("Login thành công");
      navigate(from, { replace: true });
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.message || "Login failed. Please try again.");
      }finally {
        setLoading(false);
      };
  };
  // console.log(loading);
  
  return (
    <>
      <div className="flex items-center justify-center min-h-screen from-stone-50 to-slate-100">
        <Card className=" w-full max-w-md shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>Học Axios Interceptor</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
              {/* {loading ? "Đang xử lý" : "Đăng ký"} */}
              {loading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : "Đăng nhập"}
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
