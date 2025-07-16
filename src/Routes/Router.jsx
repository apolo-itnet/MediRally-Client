import React from "react";
import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import AboutUs from "../Pages/AboutUs";
import SignUp from "../Pages/Signup";
import SignIn from "../Pages/SignIn";
import ContactUs from "../Pages/ContactUs";

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
        element: <AboutUs/>,
      },
      {
        path: "/contact",
        element: <ContactUs/>
      },
      {
        path: "/signup",
        element: <SignUp/>
      },
      {
        path: "/signin",
        element: <SignIn/>
      }
    ],
  },

]);
export default Router;
