import { Card, CardHeader, CardFooter, Button } from "@heroui/react";
import { Image } from "@imagekit/react";
import { months } from "../assets/months";
import { createCheckoutSession } from "../services/middle-ware";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function TripCard({ trip, user }) {
  const navigate = useNavigate();
  const makePayment = async () => {
    if (localStorage.getItem("token") === null) {
      toast.info("Please login to know more", {
        position: "bottom-right",
      });
      return;
    }
    if (user.isSubscribed) {
      navigate(`/tripDetails/${trip._id}`);
      return;
    }

    try {
      const response = await createCheckoutSession();
      console.log(response.data);
      if (response.data.url) {
        window.location.href = response.data.url;
      } else {
        console.error("Stripe URL not received:");
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  return (
    <Card isFooterBlurred className="w-full h-[300px]">
      <CardHeader className="absolute z-10 top-1 flex-col items-start">
        <p className="text-medium text-white/60 font-bold">
          {trip.home_location}
        </p>
        <h4 className="text-white/90 text-xl">
          <span className="font-pacifico text-pink-600 drop-shadow-md">
            {trip.prefix}
          </span>{" "}
          <span className="uppercase font-bold">{trip.destination} </span>
        </h4>
      </CardHeader>
      <Image
        urlEndpoint="https://ik.imagekit.io/ivrbdctlq/"
        src={trip.imageName}
        alt="Trip image"
        className="w-full h-full object-cover"
      />

      <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
        <div className="flex flex-grow gap-2 items-center">
          <div className="flex flex-col">
            <p className="text-tiny text-white/60">{trip.days} days of masti</p>
            <p className="text-tiny text-white/60">
              Trip starts from {trip.trip_start_date.day} th{" "}
              {months[trip.trip_start_date.month - 1]}{" "}
              {trip.trip_start_date.year}
            </p>
          </div>
        </div>
        <Button radius="full" size="sm" onPress={makePayment}>
          Know More
        </Button>
      </CardFooter>
    </Card>
  );
}
