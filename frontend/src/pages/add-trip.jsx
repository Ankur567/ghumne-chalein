import React, { useState } from "react";
import { Form, Button } from "@heroui/react";
import { Autocomplete, AutocompleteItem } from "@heroui/react";
import { indianCities } from "../assets/indian_cities";
import { DatePicker } from "@heroui/react";
import { addTrip } from "../services/middle-ware";
import { Select, SelectItem } from "@heroui/react";
import { Slider } from "@heroui/react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { travelDestinations } from "../assets/travel_destinations";
import { prefixes } from "../assets/prefixes";

const AddTripPage = () => {
  const [places, setPlaces] = useState(new Set());
  const [formData, setFormData] = useState({
    homeLocation: "",
    fromDate: null,
    prefix: "",
    destination: "",
    tripStartDate: null,
    placesToVisit: [],
    numberOfDays: 0,
    budget: 0,
    imageName: "",
  });
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      formData.placesToVisit = Array.from(places);
      formData.prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      formData.imageName = `/${formData.destination}.jpg`;
      const response = await addTrip(formData);
      if (response.status === 200) {
        toast.success("Trip added successfully", {
          position: "bottom-right",
        });
      } else {
        toast.error("Failed to add trip", {
          position: "bottom-right",
        });
      }
      navigate("/");
    } catch (error) {
      console.log("Error adding trip", error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Form
        className="w-full max-w-xs"
        validationBehavior="aria"
        onSubmit={onSubmit}
      >
        <p>Home Location</p>
        <Autocomplete
          className="max-w-xs"
          label="Select City"
          selectedKey={formData.homeLocation}
          onSelectionChange={(value) =>
            setFormData({ ...formData, homeLocation: value })
          }
        >
          {indianCities.map((city) => (
            <AutocompleteItem key={city.key}>{city.label}</AutocompleteItem>
          ))}
        </Autocomplete>
        <p>When are you leaving ?</p>
        <DatePicker
          label="Select Date"
          value={formData.fromDate}
          onChange={(value) => setFormData({ ...formData, fromDate: value })}
        />
        <p>Destination</p>
        <Autocomplete
          className="max-w-xs"
          label="Select City"
          selectedKey={formData.destination}
          onSelectionChange={(value) =>
            setFormData({ ...formData, destination: value })
          }
        >
          {travelDestinations.map((city) => (
            <AutocompleteItem key={city.key}>{city.label}</AutocompleteItem>
          ))}
        </Autocomplete>
        <p>Trip Start Date</p>
        <DatePicker
          label="Select Date"
          value={formData.tripStartDate}
          onChange={(value) =>
            setFormData({ ...formData, tripStartDate: value })
          }
        />
        <p>Places to Visit</p>
        <Select
          className="max-w-xs"
          label="Select Places"
          selectionMode="multiple"
          selectedKeys={places}
          onSelectionChange={(value) => {
            setPlaces(new Set(value));
          }}
        >
          {travelDestinations.map((city) => (
            <SelectItem key={city.key}>{city.label}</SelectItem>
          ))}
        </Select>
        <p>Number of Days</p>
        <Slider
          className="max-w-md"
          getValue={(days) => `${days} days of trip`}
          label="Days"
          maxValue={30}
          size="sm"
          value={formData.numberOfDays}
          onChange={(value) =>
            setFormData({ ...formData, numberOfDays: value })
          }
        />
        <p>Budget per person</p>
        <Slider
          className="max-w-md"
          getValue={(budget) => `₹${budget} per person`}
          label="Budget"
          maxValue={100000}
          showSteps={true}
          step={5000}
          size="sm"
          value={formData.budget}
          onChange={(value) => setFormData({ ...formData, budget: value })}
        />
        <Button type="submit" variant="bordered">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddTripPage;
