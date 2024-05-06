import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const CreateStudent = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "",
  });

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
			.post(`${process.env.BACKENDURL}/api/v1/auth/signup`, formData)
			.then((response) => {
				console.log("Created successful:", response.data);
				alert("succesfully created!");
			})
			.catch((error) => {
				console.error("Error creating:", error);
				alert("Error username already existed ");
			});
  };

  return (
    <>
    <Navbar/>
    <div className="max-w-md mx-auto mt-10 px-4 py-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create Student</h2>
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
        <div>
          <label className="block mb-1">Role:</label>
          <input
            type="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-400"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Create User
        </button>
      </form>
    </div>
    </>
  );
};

export default CreateStudent;
