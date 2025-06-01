// src/components/AppRouter.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import SignupPage from "../pages/signup-page";
import Dashboard from "../pages/dashboard";
import { checkToken } from "../services/middle-ware";
import AddTripPage from "../pages/add-trip";
import LandingPage from "../pages/landing-page";
import ThankYouPage from "../pages/thankyou-page";
import PaymentCancelPage from "../pages/payment-cancel-page";
import TripDetailsPage from "../pages/trip-details-page";
import MapView from "./Mapbox";

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
      <Route path="/success" element={<ThankYouPage />} />
      <Route path="/canceled" element={<PaymentCancelPage />} />
      <Route path="/tripDetails/:tripId" element={<TripDetailsPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/addtrip" element={<AddTripPage />} />
      <Route path="/mapview" element={<MapView />} />
    </Routes>
  );
};

export default AppRouter;
