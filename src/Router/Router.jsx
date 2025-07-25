import React from "react";
import { createBrowserRouter } from "react-router";

//Layout
import MainLayout from "../Layouts/MainLayout";
import DashboardLayout from "../Layouts/DashboardLayout";

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
import Payment from "../Pages/Dashboard/Participant/Payment";
import RegisteredCamps from "../Pages/Dashboard/Participant/RegisteredCamps";

// Auth & Pages
import SignUp from "../Pages/Signup";
import SignIn from "../Pages/SignIn";
import Home from "../Pages/Home";
import AvailableCamps from "../Pages/AvailableCamps";
import CampDetailsPage from "../Pages/CampDetailsPage";
import AboutUs from "../Pages/AboutUs";
import ContactUs from "../Pages/ContactUs";
import Feedback from "../Pages/Dashboard/Participant/Feedback";
import UpdateCamps from "../Pages/Dashboard/Organizer/UpdateCamps";




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
        path: "all-camps",
        element: <AvailableCamps />,
      },
      {
        path: "available-camps/:id",
        element: <CampDetailsPage />,
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
            path: "update-camp/:id",
            element: (
              <RoleRoutes role="Organizer">
                <UpdateCamps/>
              </RoleRoutes>
            ),
          },
          {
            path: "manage-registered-camps",
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
                <Feedback/>
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
