import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import Router from "./Routes/Router.jsx";
import Aos from "aos";
import "aos/dist/aos.css";
import AuthProvider from "./Contexts/AuthProvider.jsx";

Aos.init({
  duration: 1000,
  easing: "ease-in-out",
  once: false,
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={Router} />
    </AuthProvider>
  </StrictMode>
);
