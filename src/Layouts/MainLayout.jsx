import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";

const MainLayout = () => {
  return (
    <div className="w-full  flex flex-col min-h-screen ">
      <header className="sticky top-0 z-50 transition-all duration-300">
        <Navbar/>
      </header>
      <main className="flex-grow">
        <Outlet/>
      </main>
      <footer className="w-full mt-auto">
        <Footer/>
      </footer>
    </div>
  );
};

export default MainLayout;
