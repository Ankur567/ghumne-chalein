import React, { useState, useRef } from "react";
import { signUp } from "../services/middle-ware";
import {
  User,
  Mail,
  MapPin,
  Lock,
  Plane,
  Globe,
  Users,
  Eye,
  EyeOff,
  ChevronDown,
} from "lucide-react";
import { Autocomplete, AutocompleteItem, Input } from "@heroui/react";
import { indianCities } from "../assets/indian_cities";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    homeLocation: "",
    phone: "",
    password: "",
  });
  const navigate = useNavigate();
  const cityInputRef = useRef(null);
  const dropdownRef = useRef(null);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await signUp(formData);
      if (response.status == 201) {
        toast.success("Signed up successfully", {
          position: "bottom-right",
        });
      }
      navigate("/");
    } catch (error) {
      toast.error("Signup failed", {
        position: "bottom-right",
      });
      console.error("Signup failed", error);
    }
    setIsLoading(false);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 dark:bg-gradient-to-br dark:from-blue-950 dark:via-indigo-900 dark:to-purple-900">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-indigo-200 rounded-full opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="w-full max-w-md relative">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
            <Plane className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2 dark:text-gray-400">
            Join{" "}
            <span className="font-pacifico text-3xl text-pink-600">
              Ghumne Chalein
            </span>
          </h1>
          <p className="text-gray-600 flex items-center justify-center gap-2">
            <Users size={16} />
            Connect with fellow travelers
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-8">
          <div className="space-y-6">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Choose a unique username"
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
                  required
                />
              </div>
            </div>

            {/* Home Location Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Home Location{" "}
              </label>
              <div className="relative">
                {" "}
                <Autocomplete
                  isRequired
                  label="Select City"
                  // startContent={<MapPin className="text-gray-400"/>}
                  variant="bordered"
                  selectedKey={formData.homeLocation}
                  onSelectionChange={(value) =>
                    setFormData({ ...formData, homeLocation: value })
                  }
                >
                  {indianCities.map((city) => (
                    <AutocompleteItem key={city.key}>
                      {city.label}
                    </AutocompleteItem>
                  ))}
                </Autocomplete>
              </div>{" "}
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Input
                  isRequired
                  name="phone"
                  placeholder="Enter your Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  validate={(value) => {
                    if (value.length < 10) {
                      return "Phone Number must be 10 characters long";
                    }
                    if (value.length > 10) {
                      return "Phone Number must be 10 characters long";
                    }
                    return value === "admin" ? "Nice try!" : null;
                  }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating Account...
                </>
              ) : (
                <>
                  <Globe size={20} />
                  Join the Community
                </>
              )}
            </div>

            {/* Additional Info */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
