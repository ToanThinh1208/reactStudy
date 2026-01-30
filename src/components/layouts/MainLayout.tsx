import React from "react";
import { NavLink, Outlet, replace, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/Auth.store";
import Header from "./Header";
import { Toaster } from "../UI/sonner";

function MainLayout() {
  return (
    <>
    <Header/>
    <main className="flex-grow container mx-auto px-4 py-6">
        <Outlet />
    </main>
    <Toaster />
    </>

  );
}

export default MainLayout;
