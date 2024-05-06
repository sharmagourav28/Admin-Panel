import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signin = ({ handleAuthentication }) => {
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
    const url = process.env.REACT_APP_BASE_URL;
		console.log(url);
		e.preventDefault();
		axios
			.post(
				"https://adminbackend-l3ov8xuex-atharvasharma12s-projects.vercel.app/api/v1/auth/login",
				formData
			)
			.then((response) => {
				console.log("Signin successful:", response);
				handleAuthentication();
				const userRole = response.data.user.role;

				// Redirect to the appropriate page based on the user role
				if (userRole === "admin") {
					history("/admindashboard");
				} else if (userRole === "user") {
					history("/home");
				} else {
					alert("Unexpected user role");
				}
			})
			.catch((error) => {
				console.error("Error signing in:", error);
			});
  };

  return (
    <div className="max-w-md mx-auto mt-10 px-4 py-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Sign In</h2>
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
          Sign In
        </button>
      </form>
      <div className="flex justify-center items-center mt-4">
        <p>Don't have an account! </p>
        <Link to="/">
          <span className="ml-2 text-blue-500 font-bold cursor-pointer">
            Signup
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Signin;
