import React, { useEffect } from "react";
import { authApi, type User } from "../../lib/api/auth.api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/UI/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/avatar";
import { Badge } from "@/components/UI/badge";
import { Separator } from "@/components/UI/separator";
import { Mail, ShieldCheck, Fingerprint } from "lucide-react";

const ProfilePage: React.FC = () => {
    const [loading, setLoading] = React.useState(false);
    const [user, setUser] = React.useState<User | null>(null);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await authApi.getMe();
        console.log("User profile:", profile);
        setUser(profile);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      {/* Card container với độ rộng tối đa md và shadow lớn */}
      <Card className="w-full max-w-md shadow-lg">
        {/* Header của Card, căn giữa các phần tử theo cột */}
        <CardHeader className="flex flex-col items-center gap-4">
          {/* Avatar component, kích thước h-20 w-20 (80px) */}
          <Avatar className="h-20 w-20">
            {/* Ảnh Avatar được sinh ngẫu nhiên từ dicebear dựa trên email */}
            <AvatarImage src={`https://api.dicebear.com/9.x/bottts/svg`} alt="@shadcn" />
            {/* Fallback hiển thị chữ cái đầu tiên của tên nếu ảnh lỗi */}
            <AvatarFallback>{user?.fullName?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          {/* Container cho Tên và Badge */}
          <div className="flex flex-col items-center gap-1">
            {/* Tên người dùng, font đậm, size lớn */}
            <CardTitle className="text-2xl font-bold">{user?.fullName}</CardTitle>
            {/* Badge "Verified Account" màu xanh lá, style custom cho dark/light mode */}
            <Badge variant="secondary" className="gap-1 bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400">
              {/* Icon ShieldCheck kích thước nhỏ */}
              <ShieldCheck className="h-3 w-3" />
              Verified Account
            </Badge>
          </div>
        </CardHeader>
        {/* Phần nội dung chính của Card, các phần tử cách nhau không gian y-4 */}
        <CardContent className="space-y-4">
          {/* Section: Email Address */}
          <div className="flex items-center gap-3 p-3 rounded-lg border bg-card text-card-foreground shadow-sm">
            {/* Icon Mail nằm trong vòng tròn background mờ */}
            <div className="p-2 bg-primary/10 rounded-full">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            {/* Thông tin Email */}
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground uppercase font-semibold">Email Address</span>
              <span className="text-sm font-medium">{user?.email}</span>
            </div>
          </div>

          {/* Đường kẻ ngang phân cách */}
          <Separator className="my-4" />

          {/* Section: User ID */}
          <div className="flex items-center gap-3 p-3 rounded-lg border bg-card text-card-foreground shadow-sm">
            {/* Icon Fingerprint */}
            <div className="p-2 bg-primary/10 rounded-full">
              <Fingerprint className="h-5 w-5 text-primary" />
            </div>
            {/* Thông tin ID người dùng */}
            <div className="flex flex-col w-full">
              <span className="text-xs text-muted-foreground uppercase font-semibold">User ID</span>
              {/* Hiển thị ID dạng code block với background màu muted */}
              <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold mt-1 block w-fit">
                {user?.id}
              </code>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
export default ProfilePage;
