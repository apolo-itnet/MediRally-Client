import React from "react";
import { createBrowserRouter } from "react-router";

//Layout
import MainLayout from "../Layouts/MainLayout";
import DashboardLayout from "../Layouts/DashboardLayout";

// Auth & Pages
import SignUp from "../Pages/Signup";
import SignIn from "../Pages/SignIn";
import Home from "../Pages/Home";
import AboutUs from "../Pages/AboutUs";
import ContactUs from "../Pages/ContactUs";

// Protected Routes (role checked)
import PrivateRoutes from "../Routes/PrivateRoutes";
import RoleRoutes from "../Routes/RoleRoutes";

// Dashboard
import DashboardHome from "../Pages/Dashboard/DashUI/DashboardHome";

// Organizer Dashboard
import AddCamp from "../Pages/Dashboard/Organizer/AddCamp";
import ManageCamps from "../Pages/Dashboard/Organizer/ManageCamps";
import ManageRegisteredCamps from "../Pages/Dashboard/Organizer/ManageRegisteredCamps";
import OrganizerProfile from "../Pages/Dashboard/Organizer/OrganizerProfile";

// Participant Dashboard
import ParticipantProfile from "../Pages/Dashboard/Participant/ParticipantProfile";
import Feedback from "../Pages/Dashboard/Participant/Feedback";
import Payment from "../Pages/Dashboard/Participant/Payment";
import RegisteredCamps from "../Pages/Dashboard/Participant/RegisteredCamps";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <h1>404</h1>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <AboutUs />,
      },
      {
        path: "contact",
        element: <ContactUs />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "signin",
        element: <SignIn />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoutes>
        <DashboardLayout />
      </PrivateRoutes>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />, 
      },
      // Organizer Routes
      {
        path: "organizer",
        children: [
          {
            path: "profile",
            element: (
              <RoleRoutes role="Organizer">
                <OrganizerProfile />
              </RoleRoutes>
            ),
          },
          {
            path: "add-camp",
            element: (
              <RoleRoutes role="Organizer">
                <AddCamp />
              </RoleRoutes>
            ),
          },
          {
            path: "manage-camps",
            element: (
              <RoleRoutes role="Organizer">
                <ManageCamps />
              </RoleRoutes>
            ),
          },
          {
            path: "registered-camps",
            element: (
              <RoleRoutes role="Organizer">
                <ManageRegisteredCamps />
              </RoleRoutes>
            ),
          },
        ],
      },
      // Participant Routes
      {
        path: "participant",
        children: [
          {
            path: "profile",
            element: (
              <RoleRoutes role="Participant">
                <ParticipantProfile />
              </RoleRoutes>
            ),
          },
          {
            path: "feedback",
            element: (
              <RoleRoutes role="Participant">
                <Feedback />
              </RoleRoutes>
            ),
          },
          {
            path: "registered-camps",
            element: (
              <RoleRoutes role="Participant">
                <RegisteredCamps />
              </RoleRoutes>
            ),
          },
          {
            path: "payment-history",
            element: (
              <RoleRoutes role="Participant">
                <Payment />
              </RoleRoutes>
            ),
          },
        ],
      },
    ],
  },
]);

export default Router;
