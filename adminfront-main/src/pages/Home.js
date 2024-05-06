import React from "react";

function Home({ userRole }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Welcome to the Home Page</h2>
      <p className="text-lg">Welcome! You are logged in as: {userRole}</p>
    </div>
  );
}

export default Home;
