import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../../stores/Auth.store";
import { authApi } from "../../lib/api/auth.api";

function LoginPage() {
  const [email, setEmail] = React.useState("thichcungkienggg@gmail.com");
  const [password, setPassword] = React.useState("password123");
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const setTokens = useAuthStore((state: any) => state.setTokens);

  const handleLogin = async (e: React.FormEvent) => {
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
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Login to Your Account
      </h1>

      <form onSubmit={handleLogin} className="space-y-4">
        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block mb-1 font-medium text-gray-700"
          >
            Email:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
            placeholder="you@example.com"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password Field (Added this for you) */}
        <div>
          <label
            htmlFor="password"
            className="block mb-1 font-medium text-gray-700"
          >
            Password:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200 font-semibold"
        >
          Sign In
        </button>
      </form>
      <div className="mt-4 text-center">
        <span className="text-gray-600">Chưa có tài khoản? </span>
        <Link to="/register" className="text-blue-500 hover:underline">
          Đăng ký ngay
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
