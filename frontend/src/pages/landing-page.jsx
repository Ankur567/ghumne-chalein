import React, { useEffect, useState } from "react";
import NavbarCustom from "../components/Navbar";
import { getAllTrips } from "../services/middle-ware";
import TripCard from "../components/TripCard";

const LandingPage = (props) => {
  const [trips, setTrips] = useState([]);
  useEffect(() => {
    async function fetchTrips() {
      try {
        const response = await getAllTrips();
        setTrips(response.data.trips);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch trips", error);
      }
    }
    fetchTrips();
  }, []);
  return (
    <>
      <NavbarCustom type="landing" login={props.login} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 p-5 min-h-screen [grid-auto-rows:300px]">
        {trips.map((trip) => (
          <TripCard key={trip._id} trip={trip} />
        ))}
      </div>
    </>
  );
};

export default LandingPage;
