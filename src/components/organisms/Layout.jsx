import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "@/components/organisms/Sidebar";
import Header from "@/components/organisms/Header";

const Layout = () => {
  const location = useLocation();
  
const getPageTitle = () => {
    switch (location.pathname) {
      case "/":
      case "/universities":
        return "Universities";
      case "/rankings":
        return "Rankings";
      case "/admin":
        return "Admin";
      default:
        if (location.pathname.startsWith("/university/")) {
          return "University Details";
        }
        return "EduRank Egypt";
    }
  };
  
const getBreadcrumbs = () => {
    switch (location.pathname) {
      case "/":
      case "/universities":
        return ["Home", "Universities"];  
      case "/rankings":
        return ["Home", "Rankings"];
      case "/admin":
        return ["Home", "Admin"];
      default:
        if (location.pathname.startsWith("/university/")) {
          return ["Home", "Universities", "University Details"];
        }
        return ["Home"];
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <div className="lg:ml-64">
        <Header 
          title={getPageTitle()} 
          breadcrumbs={getBreadcrumbs()} 
        />
        
        <main className="flex-1">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;