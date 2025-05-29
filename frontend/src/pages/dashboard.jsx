import React, { useEffect, useState } from "react";
import { dashboard, getTripByHomeLocation } from "../services/middle-ware";
import NavbarCustom from "../components/Navbar";
import TripCard from "../components/TripCard";
import config from "../bot/config.jsx";
import MessageParser from "../bot/MessageParser.jsx";
import ActionProvider from "../bot/ActionProvider.jsx";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import "../bot/chatbot.css";

const Dashboard = (props) => {
  const [user, setUser] = useState(null);
  const [trips, setTrips] = useState([]);
  const [showChatbot, setShowChatbot] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await dashboard();
        setUser(response.data.user_data);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    }
    fetchUser();
  }, []);

  useEffect(() => {
    async function fetchTrips() {
      if (user && user.homeLocation) {
        try {
          const response = await getTripByHomeLocation(user.homeLocation);
          setTrips(response.data.trips);
        } catch (error) {
          console.error("Failed to fetch trips", error);
        }
      }
    }
    fetchTrips();
  }, [user]);

  return (
    <>
      <NavbarCustom
        name={user?.username || ""}
        email={user?.email || ""}
        logout={props.logout}
        type="dashboard"
      />

      <div className="p-5">
        <h1 className="text-3xl text-left mt-5">
          Trips starting from your home location{" "}
          <span className="text-secondary">{user?.homeLocation || ""}</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 p-5 min-h-screen">
        {trips.map((trip) => (
          <TripCard key={trip._id} trip={trip} />
        ))}
      </div>
      <button
        onClick={() => setShowChatbot((prev) => !prev)}
        className="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-full shadow-lg z-50"
      >
        {showChatbot ? "Close Chatbot" : "Open Chatbot"}
      </button>
      {showChatbot && (
        <div className="fixed bottom-20 right-6 z-40 shadow-lg">
          <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
            messageHistory={JSON.parse(localStorage.getItem("chatHistory"))}
          />
        </div>
      )}
    </>
  );
};

export default Dashboard;
