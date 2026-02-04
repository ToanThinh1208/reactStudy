import { createBrowserRouter } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import App from "./App";
import RequireAuth from "./components/guards/RequireAuth";
import ProfilePage from "./components/pages/ProfilePage";
import GuestGuard from "./components/guards/GuestGuard";
import RegisterPage from "./components/pages/RegisterPageRHF";
import RitualPage from "./components/pages/RitualPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },

      {
        element: <GuestGuard />,
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "register",
            element: <RegisterPage />,
          },
        ],
      },
      {
        element: <RequireAuth />,
        children: [
          {
            path: "profile",
            element: <ProfilePage />,
          },
          {
            path: "rituals",
            element: <RitualPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
