import React from "react";
import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";

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
    ],
  },
]);
export default Router;
