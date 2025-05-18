import React, { useState } from "react";
import { signUp } from "../services/middle-ware";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    homeLocation: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signUp(formData);
      console.log(response.data);
    } catch (error) {
      console.error("Signup failed", error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center">Hello signup!</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          className="mb-2 p-2 border border-gray-300 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="mb-2 p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="homeLocation"
          placeholder="Home Location"
          onChange={handleChange}
          className="mb-2 p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="mb-2 p-2 border border-gray-300 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
