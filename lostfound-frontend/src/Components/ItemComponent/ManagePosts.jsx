// src/Components/ItemComponent/ManagePosts.jsx
import React, { useState } from "react";
import LostItemReport from "./LostItemReport";
import FoundItemReport from "./FoundItemReport";
import Navbar from "../Layout/Navbar";

const ManagePosts = () => {
  const [activeTab, setActiveTab] = useState("lost");

  // Common style for zoomed-out view
  const zoomStyle = {
    transform: "scale(0.85)", // Reduce size to 85%
    transformOrigin: "top center", // Scale from top center
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      <div
        className="p-6 rounded-2xl mt-6 mx-6"
        style={{
          background: "linear-gradient(135deg, #d3d7e6ff 0%, #c6b8d4ff 100%)",
        }}
      >
        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            className={`px-6 py-2 rounded-2xl font-semibold transition ${
              activeTab === "lost"
                ? "bg-white text-purple-700 shadow-lg"
                : "bg-white/40 text-purple-900 hover:bg-white/60 hover:text-purple-700"
            }`}
            onClick={() => setActiveTab("lost")}
          >
            Lost Items
          </button>

          <button
            className={`px-6 py-2 rounded-2xl font-semibold transition ${
              activeTab === "found"
                ? "bg-white text-purple-700 shadow-lg"
                : "bg-white/40 text-purple-900 hover:bg-white/60 hover:text-purple-700"
            }`}
            onClick={() => setActiveTab("found")}
          >
            Found Items
          </button>
        </div>

        {/* Zoomed-out Report */}
        <div style={zoomStyle}>
          {activeTab === "lost" ? <LostItemReport /> : <FoundItemReport />}
        </div>
      </div>
    </div>
  );
};

export default ManagePosts;
