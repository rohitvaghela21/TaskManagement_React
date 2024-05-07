import React, { useEffect } from "react";
import { useAuth } from "./AuthProvider";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Router, Routes } from "react-router-dom";
import Site_Management from "./dashboard/Site_Management";

const Dashboard = () => {
  const { loginAction, fetchSitePanel } = useAuth();

  useEffect(() => {
    loginAction();
    fetchSitePanel();
  }, []);

  return (
    <>
      <Navbar />
      <Sidebar />
      <Site_Management />
    </>
  );
};

export default Dashboard;
