// src/components/AppRouter.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import SignupPage from "../pages/signup-page";
import Dashboard from "../pages/dashboard";
import { checkToken } from "../services/middle-ware";
import AddTripPage from "../pages/add-trip";
import LandingPage from "../pages/landing-page";

const AppRouter = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate("/");
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("chatHistory");
    navigate("/");
  };

  useEffect(() => {
    if (isLoggedIn) {
      async function tokenCheck() {
        try {
          const response = await checkToken();
        } catch (err) {
          console.warn("Token check failed", err);
          localStorage.removeItem("token");
          setIsLoggedIn(false);
          navigate("/");
        }
      }
      tokenCheck();
    }
  }, [isLoggedIn]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoggedIn ? (
            <Dashboard logout={handleLogout} />
          ) : (
            <LandingPage login={handleLogin} />
          )
        }
      />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/addtrip" element={<AddTripPage />} />
    </Routes>
  );
};

export default AppRouter;
