import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Navbar = ({ handleLogout }) => {
  const navigate = useNavigate();
  const handleClick = () => {

    navigate("/Signin"); // Redirect to signin page after logout
    window.location.reload();
    // handleLogout();
  };
  return (
    <nav className="bg-green-800 p-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <Link to="/" className="text-white hover:text-gray-300">
              Home
            </Link>
            <Link
              to="/createstudent"
              className="text-white hover:text-gray-300"
            >
              Create Student
            </Link>
            <Link to="/getallusers" className="text-white hover:text-gray-300">
              Get All Users
            </Link>
          </div>
          <div className="bg-black rounded-lg p-2">
            <button
              onClick={handleClick}
              className="text-white hover:text-gray-300"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
