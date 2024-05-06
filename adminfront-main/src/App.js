import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import AdminDashboard from "./pages/AdminDashboard";
import CreateStudent from "./components/CreateStudent";
import GetAllUsers from "./components/GetAllUsers";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthentication = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    // Perform logout actions, such as clearing tokens or user data
    setIsAuthenticated(false);
  };

  return (
    <div>
      <Routes>
        {/* Public routes */}
        <Route
          path="/"
          element={<Signup handleAuthentication={handleAuthentication} />}
        />
        <Route
          path="/signin"
          element={<Signin handleAuthentication={handleAuthentication} />}
        />

        {/* Private routes, accessible only after authentication */}
        {isAuthenticated && (
          <>
            <Route
              path="/admindashboard"
              element={<AdminDashboard handleLogout={handleLogout} />}
            />
            <Route path="/createstudent" element={<CreateStudent />} />
            <Route path="/getallusers" element={<GetAllUsers />} />
            <Route path="/home" element={<Home />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
