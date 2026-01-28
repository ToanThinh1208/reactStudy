import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../../lib/api/auth.api";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/UI/card";
import { Button } from "../UI/button";
import { Loader2 } from "lucide-react";
const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await authApi.register(formData);
      console.log("Registration success:", response);
      navigate("/login");
    } catch (err: any) {
      console.error("Registration error:", err);
      setError("Đăng ký thất bại, vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen from-stone-50 to-slate-100">
        <Card className=" w-full max-w-md shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Đăng ký tài khoản</CardTitle>
            <CardDescription>Học Axios Interceptor</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  HỌ VÀ TÊN
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
              {/* {loading ? "Đang xử lý" : "Đăng ký"} */}
              {loading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : "Đăng nhập"}
              </Button>

              <div className="text-center text-sm">
                <span>Đã có tài khoản? </span>
                <Link to="/login" className="text-blue-500 hover:underline">
                  Đăng nhập ngay
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default RegisterPage;
