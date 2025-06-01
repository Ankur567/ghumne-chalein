import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { XCircleIcon } from "lucide-react";

const PaymentCancelPage = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/");
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-50 text-red-700 px-4">
      <XCircleIcon className="w-16 h-16 mb-4 text-red-500" />
      <h1 className="text-3xl font-bold mb-2">Payment Cancelled</h1>
      <p className="text-lg text-center">
        Looks like you cancelled the payment process.
      </p>
      <p className="mt-2 text-sm text-gray-600">
        Redirecting in{" "}
        <span className="font-bold text-red-600">{countdown}</span> seconds...
      </p>
    </div>
  );
};

export default PaymentCancelPage;
