import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authApi, type RegisterDto } from "../../lib/api/auth.api";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/UI/card";
import { Button } from "../UI/button";
import { Loader2, User, Mail, Lock } from "lucide-react";
import { toast } from "sonner";
import { registerSchema, type RegisterSchemaType } from "@/utils/rules";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
const RegisterPage: React.FC = () => {
  console.log("Render nè ku");
  const navigate = useNavigate();
  const {
    register, //thay thế cho onChange, value
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchemaType>({
    mode: "onTouched", //chế độ của form: onBlur, onChange, onSubmit, onTouched
    //resovler: kết nối zod với react hook form
    resolver: zodResolver(registerSchema),
    //defaultValues: giá trị mặc định của form
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      date_of_birth: new Date(),
    },
  });
  //hàm này gọi sau khi validate thành công
  const onSubmit = async (data: RegisterSchemaType) => {
    console.log(data);

    try {
      const response = await authApi.register(data);
      console.log("Registration success:", response);
      toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
      navigate("/login");
    } catch (err: any) {
      console.error("Registration error:", err);
      const errorMessage =
        err.response?.data?.message || "Đăng ký thất bại, vui lòng thử lại";
      toast.error(errorMessage);
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
            {/* hàm handleSubmit do RHF */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div className="space-y-2">
                <label
                  htmlFor="fullName"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <User className="w-4 h-4" />
                  HỌ VÀ TÊN
                </label>
                <input
                  type="text"
                  id="fullName"
                  placeholder="Nguyễn Văn A"
                  {...register("fullName")}
                  className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.fullName && (
                  <p className="text-destructive text-sm mt-1">
                    {errors.fullName.message}
                  </p>
                )}
              </div>
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
                  placeholder="nguyenvana@gmail.com"
                  // required -> validate form của trình duyệt
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
                  placeholder="**********"
                  {...register("password")}
                  className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.password && (
                  <p className="text-destructive text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <Lock className="w-4 h-4" />
                  Xác nhận mật khẩu
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="**********"
                  {...register("confirmPassword")}
                  className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.confirmPassword && (
                  <p className="text-destructive text-sm mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="date_of_birth"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <User className="w-4 h-4" />
                  Ngày sinh
                </label>
                <input
                  type="date"
                  id="date_of_birth"
                  {...register("date_of_birth")}
                  className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.date_of_birth && (
                  <p className="text-destructive text-sm mt-1">
                    {errors.date_of_birth.message}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                ) : (
                  "Đăng ký"
                )}
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
