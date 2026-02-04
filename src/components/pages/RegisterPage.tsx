import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authApi, type RegisterDto } from "../../lib/api/auth.api";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/UI/card";
import { Button } from "../UI/button";
import { Loader2, User, Mail, Lock } from "lucide-react";
import { toast } from "sonner";
const RegisterPage: React.FC = () => {
  console.log("Render nè ku");
  
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<RegisterDto>({
    fullName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidaionErrors] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
  }>({});

  const validateForm = (): boolean => {
    const errors: typeof validationErrors = {};
    // Tạo ra object dùng để lưu lỗi tránh việc react re-render component lại nhiều lần
    if (!formData.fullName.trim()) {
      errors.fullName = "Họ và tên không được để trống";
    } else if (formData.fullName.length < 3) {
      errors.fullName = "Họ và tên phải có ít nhất 3 ký tự";
    }
    if (!formData.email.trim()) {
      errors.email = "Email không được để trống";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Email không hợp lệ";
    }
    if (!formData.password.trim()) {
      errors.password = "Mật khẩu không được để trống";
    } else if (formData.password.length < 6) {
      errors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }
    setValidaionErrors(errors);
    //mảng Error gồm key và value -> ví dụ [{fullName: "Họ và tên không được để trống"},...]
    return Object.keys(errors).length === 0; // Return true if no errors
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //Nếu validateForm() trả về false -> có lỗi
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const response = await authApi.register(formData);
      console.log("Registration success:", response);
      toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
      navigate("/login");
    } catch (err: any) {
      console.error("Registration error:", err);
      const errorMessage = err.response?.data?.message || "Đăng ký thất bại, vui lòng thử lại";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

// Hàm dùng để update state -> phân rã thg ban đầu và dán đè dữ liệu mới lên
 const handleChange = (field: keyof RegisterDto, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    //xóa lỗi khi re render
    if (validationErrors[field]) {
      setValidaionErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-stone-50 to-slate-100 dark:bg-none">
        <Card className=" w-full max-w-md shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Đăng ký tài khoản</CardTitle>
            <CardDescription>Học Axios Interceptor</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="space-y-2">
                <label htmlFor="fullName" className="flex items-center gap-2 text-sm font-medium">
                  <User className="w-4 h-4" />
                  HỌ VÀ TÊN
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  placeholder="Nguyễn Văn A"
                  // e là event
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  // required -> tự động validate khi chưa submit
                  className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {validationErrors.fullName && (
                  <p className="text-destructive text-sm mt-1">
                    {validationErrors.fullName}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium">
                  <Mail className="w-4 h-4" />
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  placeholder="nguyenvana@gmail.com"
                  onChange={(e) => handleChange("email", e.target.value)}
                  // required
                  className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {validationErrors.email && (
                  <p className="text-destructive text-sm mt-1">
                    {validationErrors.email}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="flex items-center gap-2 text-sm font-medium">
                  <Lock className="w-4 h-4" />
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  placeholder="**********"
                  onChange={(e) => handleChange("password", e.target.value)}
                  // required
                  className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {validationErrors.password && (
                  <p className="text-destructive text-sm mt-1">
                    {validationErrors.password}
                  </p>
                )}  
              </div>
              
              {error && <div className="text-destructive text-sm text-center">{error}</div>}

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
