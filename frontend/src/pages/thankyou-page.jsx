import React, { useEffect, useRef } from "react";
import { changeSubscribeStatus } from "../services/middle-ware";
import { useNavigate } from "react-router-dom";

const ThankYouPage = () => {
  const hasUpdated = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    const changeStatus = async () => {
      if (hasUpdated.current) return;
      hasUpdated.current = true;
      try {
        const response = await changeSubscribeStatus();
        console.log(response.data);
      } catch (error) {
        console.log("Could not update status");
      }
      setTimeout(() => {
        navigate("/");
      }, 5000);
    };
    changeStatus();
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-100 text-green-900">
      <div className="text-center p-8 bg-white rounded-xl shadow-md">
        <h1 className="text-4xl font-bold mb-4">🎉 Thank You!</h1>
        <p className="text-lg">Your subscription is now active.</p>
        <p className="text-sm mt-2">Redirecting you to the homepage...</p>
      </div>
    </div>
  );
};

export default ThankYouPage;
