import React, { useEffect } from "react";
import { authApi, type User } from "../../lib/api/auth.api";

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
    <div>
      <h1>Profile Page</h1>
      <p>{user?.email}</p>
      <p>{user?.fullName}</p>
    </div>
  );
}
export default ProfilePage;
