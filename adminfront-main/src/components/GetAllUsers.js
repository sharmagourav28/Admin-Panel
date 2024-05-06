import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

const GetAllUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/auth/getusers");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleDelete = async (_id) => {
    try {
      await axios.delete(
				`https://adminbackend-l3ov8xuex-atharvasharma12s-projects.vercel.app/api/v1/auth/users/${_id}`
			);
      fetchUsers(); // Refresh user data after delete
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEdit = async (_id) => {
    console.log("Editing user with id:", _id);
  };

  return (
    <>
      <Navbar />
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 uppercase font-semibold text-sm">Username</th>
              <th className="py-3 px-4 uppercase font-semibold text-sm">Role</th>
              <th className="py-3 px-4 uppercase font-semibold text-sm">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="py-3 px-4">{user.username}</td>
                <td className="py-3 px-4">{user.role}</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleEdit(user._id)}
                    className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default GetAllUser;
