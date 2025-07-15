import React from "react";
import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import About from "../Pages/About";
import Signup from "../Pages/Signup";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    errorElement: <h1>404</h1>,
    children: [
      {
        index: true,
        element: <Home/>
      },
      {
        path: "/about",
        element: <About/>,
      },
      {
        path: "/signup",
        element: <Signup/>
      },
      {
        path: "/signin",
        element: <h1>Signin</h1>
      }
    ],
  },

]);
export default Router;
