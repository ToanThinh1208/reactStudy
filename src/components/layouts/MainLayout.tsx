import React from "react";
import { NavLink, Outlet, replace, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/Auth.store";

function MainLayout() {
  const navigate = useNavigate();
  const { accessToken, clearTokens } = useAuthStore();
  const isLoggedIn = !!accessToken;

  const handleLogout = () => {
    clearTokens();
    navigate("/", { replace: true });
  };
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4 sticky top-0 z-50">
        <nav className="max-w-4xl mx-auto flex justify-between">
          <NavLink to="/" className="text-x1 font-bold">
            ShopApp
          </NavLink>
          <div className="flex gap-4">
            <NavLink to="/" className="hover:text-blue-200">
              Home
            </NavLink>

            {isLoggedIn ? (
              <>
                <NavLink
                  to="profile"
                  className={({ isActive }) =>
                    isActive
                      ? "text-yellow-300 font-bold underline"
                      : "text-blue-200 font-bold"
                  }
                >
                  Profile
                </NavLink>

                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <NavLink
                  to="login"
                  className={({ isActive }) =>
                    isActive
                      ? "text-yellow-300 font-bold underline"
                      : "text-blue-200 font-bold"
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="register"
                  className={({ isActive }) =>
                    isActive
                      ? "text-yellow-300 font-bold underline"
                      : "text-blue-200 font-bold"
                  }
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </nav>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
