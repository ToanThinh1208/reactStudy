import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router.tsx";
import Theme from "./lib/theme.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <>
      <Theme/>
     <RouterProvider router={router} />
    </>

  </StrictMode>
);
