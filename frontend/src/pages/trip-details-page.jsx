import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getOwnerDetails,
  getTripById,
  sendrequestToOwner,
} from "../services/middle-ware";
import {
  Play,
  Plus,
  Clock,
  Users,
  MapPin,
  Calendar,
  Home,
  IndianRupee,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Image } from "@imagekit/react";
import { useLocation } from "react-router-dom";
import { Button } from "@heroui/button";

const TripDetailsPage = () => {
  const { tripId } = useParams();
  const location = useLocation();
  const user = location.state?.user;
  console.log(user)
  const navigate = useNavigate();
  const [trip, setTrip] = useState({});
  const [hasRequested, setHasRequested] = useState(false);
  useEffect(() => {
    async function fetchTripAndDetails() {
      try {
        const response = await getTripById(tripId);
        const tripData = response.data.trip;
        setTrip(tripData);
        if (tripData?.user_id) {
          const ownerResponse = await getOwnerDetails({
            user_id: tripData.user_id,
            trip_id: tripId,
          });
          console.log("Owner details:", ownerResponse.data);
        }
      } catch (error) {
        console.error("Failed to fetch trip or owner details", error);
      }
    }
    fetchTripAndDetails();
  }, [tripId]);
  const [selectedTab, setSelectedTab] = useState("overview");
  const sendRequest = async () => {
    try {
      const response = await sendrequestToOwner({
        tripId: tripId,
        userId: trip.user_id,
      });
      setHasRequested(true);
      console.log(response.data.message);
    } catch (error) {
      console.log("send request error");
    }
  };
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 h-screen">
        {trip?.destination ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster={`https://ik.imagekit.io/ivrbdctlq/${trip.destination}.jpg`}
          >
            <source
              src={`https://ik.imagekit.io/ivrbdctlq/${trip.destination}Vid.mp4`}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        ) : (
          <Image
            urlEndpoint="https://ik.imagekit.io/ivrbdctlq/"
            src={trip.imageName}
            alt="Trip image"
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Close Button */}
        <button
          className="absolute top-6 right-6 w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all z-20"
          onClick={() => {
            navigate("/");
          }}
        >
          <span className="text-white text-xl">X</span>
        </button>

        {/* Hero Section with Image */}
        <div className="h-screen flex items-end p-8">
          <div className="max-w-6xl mx-auto w-full">
            {/* Main Content Area */}
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Side - Trip Info */}
              <div className="flex-1 space-y-6">
                <div>
                  <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    <span className="font-pacifico text-pink-600 drop-shadow-md">
                      {trip.prefix}
                    </span>{" "}
                    {trip.destination}
                  </h1>
                  <div className="text-lg text-gray-300 mb-6">
                    to discover the wonders of {trip.destination}
                  </div>
                </div>

                <div className="flex gap-4 mb-8">
                  <Button
                    className="bg-white text-black px-8 py-3 rounded-md font-semibold flex items-center gap-2 hover:bg-gray-200 transition-all transform hover:scale-105"
                    onPress={sendRequest}
                    isDisabled={hasRequested}
                  >
                    Request Owner
                  </Button>
                  <button className="bg-gray-700 bg-opacity-80 text-white px-6 py-3 rounded-full hover:bg-opacity-100 transition-all">
                    <Plus size={20} />
                  </button>
                  <button className="bg-gray-700 bg-opacity-80 text-white px-6 py-3 rounded-full hover:bg-opacity-100 transition-all">
                    <Clock size={20} />
                  </button>
                </div>

                {/* Trip Metadata */}
                <div className="flex flex-wrap gap-6 text-sm text-gray-300 mb-6">
                  <span className="border border-gray-600 px-3 py-1 rounded">
                    {/* {trip.trip_start_date.year} */}
                  </span>
                  <span className="border border-gray-600 px-3 py-1 rounded">
                    {trip.days} Days
                  </span>
                  <span className="border border-gray-600 px-3 py-1 rounded">
                    HD
                  </span>
                  <span className="text-orange-400">
                    Adventure, Cultural, Exploration
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
                  Embark on an unforgettable journey from {trip.home_location}{" "}
                  to {trip.destination}. Experience the perfect blend of
                  tradition and modernity in this {trip.days}-day adventure
                  designed for {trip.number_of_people} travelers with a
                  carefully planned itinerary.
                </p>
              </div>

              {/* Right Side - Trip Details */}
              <div className="lg:w-96 space-y-6">
                {/* Cast equivalent - Trip Stats */}
                <div>
                  <h3 className="text-gray-400 text-sm mb-3">Trip Details:</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-blue-400" />
                      <span className="text-white">{trip.destination}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Home size={16} className="text-green-400" />
                      <span className="text-white">{trip.home_location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-purple-400" />
                      <span className="text-white">
                        {trip.number_of_people} travelers
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <IndianRupee size={16} className="text-yellow-400" />
                      <span className="text-white">{trip.budget}</span>
                    </div>
                  </div>
                </div>

                {/* Genres equivalent - Trip Categories */}
                <div>
                  <h3 className="text-gray-400 text-sm mb-3">Categories:</h3>
                  <div className="text-white text-sm">
                    Cultural Tours, Adventure Travel, City Exploration
                  </div>
                </div>

                {/* This Show Is equivalent */}
                <div>
                  <h3 className="text-gray-400 text-sm mb-3">This Trip Is:</h3>
                  <div className="text-white text-sm">
                    Immersive, Cultural, Adventurous
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section with Background */}
        <div className="bg-black">
          <div className="max-w-6xl mx-auto p-8">
            {/* Episodes equivalent - Places to Visit */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Places to Visit</h2>
                <div className="flex bg-gray-800 rounded-md overflow-hidden">
                  <button
                    onClick={() => setSelectedTab("overview")}
                    className={`px-6 py-2 text-sm font-medium transition-all ${
                      selectedTab === "overview"
                        ? "bg-white text-black"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setSelectedTab("itinerary")}
                    className={`px-6 py-2 text-sm font-medium transition-all ${
                      selectedTab === "itinerary"
                        ? "bg-white text-black"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    Day by Day
                  </button>
                </div>
              </div>

              {selectedTab === "overview" &&
                trip?.places_to_visit?.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {trip.places_to_visit.map((place, index) => (
                      <div
                        key={index}
                        className="bg-gray-900 bg-opacity-60 rounded-lg p-4 hover:bg-opacity-80 transition-all cursor-pointer group"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <h3 className="font-semibold text-white group-hover:text-blue-300 transition-colors">
                            {place}
                          </h3>
                        </div>
                        <p className="text-gray-400 text-sm">
                          Explore this amazing destination and create
                          unforgettable memories
                        </p>
                        <div className="mt-3 text-xs text-gray-500">
                          Day{" "}
                          {Math.ceil(
                            ((index + 1) * trip.days) /
                              trip.places_to_visit.length
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              {selectedTab === "itinerary" && (
                <div className="space-y-4">
                  <div className="text-gray-400 text-sm">
                    Trip Duration: {trip.days} days
                  </div>
                  <div className="bg-gray-900 bg-opacity-60 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Calendar size={20} className="text-blue-400" />
                      <h3 className="font-semibold text-white">
                        Trip Schedule
                      </h3>
                    </div>
                    <div className="space-y-3 text-gray-300">
                      <div className="flex justify-between">
                        <span>Departure:</span>
                        <span className="text-white">
                          {new Date(trip.trip_start_date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Return:</span>
                        <span className="text-white">
                          {new Date(
                            new Date(trip.trip_start_date).getTime() +
                              trip.days * 24 * 60 * 60 * 1000
                          ).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Days:</span>
                        <span className="text-white">{trip.days} days</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDetailsPage;
