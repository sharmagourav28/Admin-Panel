import React from "react";
import Navbar from "../components/Navbar";

function AdminDashboard({ handleLogout }) {
  return (
    <div>
      <Navbar handleLogout={handleLogout} />
    </div>
  );
}

export default AdminDashboard;
