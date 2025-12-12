import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LostItemReport from "./LostItemReport";
import FoundItemReport from "./FoundItemReport";

const ManagePosts = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("lost");

  const returnBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      
      {/* Navbar */}
      <nav
        className="text-white px-6 py-4 flex justify-between items-center shadow-lg"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        {/* Left: App Name */}
        <div className="text-2xl font-bold">CampusTrack</div>

        {/* Right: Tabs */}
        <div className="flex gap-4">
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
      </nav>

      {/* Page Content */}
     <div
  className="p-6 rounded-2xl"
  style={{
    background: "linear-gradient(135deg, #d3d7e6ff 0%, #c6b8d4ff 100%)",
  }}
>
  {activeTab === "lost" ? <LostItemReport /> : <FoundItemReport />}
</div>

    </div>
  );
};

export default ManagePosts;
