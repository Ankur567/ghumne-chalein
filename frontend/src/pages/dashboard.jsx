import React, { use, useCallback, useEffect, useState } from "react";
import { dashboard, getTripByHomeLocation } from "../services/middle-ware";
import NavbarCustom from "../components/Navbar";
import { toast } from "react-toastify";
import { Button } from "@heroui/button";
import TripCard from "../components/TripCard";

const Dashboard = (props) => {
  const [user, setUser] = useState(null);
  const [trips, setTrips] = useState([]);
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
      try {
        const response = await getTripByHomeLocation(user.homeLocation);
        setTrips(response.data.trips);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch trips", error);
      }
    }
    fetchTrips();
  }, [user, setUser, setTrips]);
  return (
    <>
      <NavbarCustom
        name={user ? user.username : ""}
        email={user ? user.email : ""}
        logout={props.logout}
        type="dashboard"
      />
      <div className="p-5">
        <h1 className="text-3xl text-left mt-5">
          Trips starrting from your home location{" "}
          <span className="text-secondary">
            {user ? user.homeLocation : ""}
          </span>
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 p-5 min-h-screen">
        {trips.map((trip) => (
          <TripCard key={trip._id} trip={trip} />
        ))}
      </div>
    </>
  );
};

export default Dashboard;
