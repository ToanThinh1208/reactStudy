import { z } from "zod";

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(1, { message: "Fullname là bắt buộc" })
      .min(3, { message: "Fullname tối thiểu 3 ký tự" }),
    email: z
      .email("Email không hợp lệ")
      .min(1, { message: "Email là bắt buộc" }),
    password: z
      .string()
      .min(1, { message: "Mật khẩu là bắt buộc" })
      .min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" }),
    confirmPassword: z.string(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Mật khẩu không khớp",
        path: ["confirmPassword"],
      });
    }
  });

//infer là để giúp import type từ registerSchema
export type RegisterSchemaType = z.infer<typeof registerSchema>;
