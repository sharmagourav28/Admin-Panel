import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = ({ handleAuthentication }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const history = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
			.post(
				`https://adminbackend-l3ov8xuex-atharvasharma12s-projects.vercel.app/api/v1/user/signup`,
				formData
			)
			.then((response) => {
				console.log("Signup successful:", response.data);
				handleAuthentication();
				history("/signin"); // Redirect to home page after successful signup
			})
			.catch((error) => {
				console.error("Error signing up:", error);
			});
  };

  return (
    <div className="max-w-md mx-auto mt-10 px-6 py-8 bg-gray-100 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-400"
          />
        </div>
        <div>
          <label className="block mb-1">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-400"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Sign Up
        </button>
      </form>
      <div className="flex justify-center items-center mt-4">
        <p>Already have an account?</p>
        <Link to="signin">
          <span className="ml-2 text-blue-500 font-bold cursor-pointer">
            Sign in
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
