import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllLostItems, getLostItemsByUsername } from "../../Services/LostItemService";
import { getRole } from "../../Services/LoginService";
import "../../DisplayView.css";
import { FaBox, FaCalendarAlt, FaUser, FaMapMarkerAlt, FaPalette } from "react-icons/fa";

const LostItemReport = () => {
  const navigate = useNavigate();
  const [itemList, setItemList] = useState([]);
  const [role, setRole] = useState("");

  useEffect(() => {
    getRole()
      .then((res) => {
        const userRole = res.data;
        setRole(userRole);

        if (userRole === "Admin") {
          getAllLostItems()
            .then((res1) => setItemList(res1.data))
            .catch((err) => console.error("Error fetching all lost items:", err));
        } else {
          getLostItemsByUsername()
            .then((res2) => setItemList(res2.data))
            .catch((err) => console.error("Error fetching user lost items:", err));
        }
      })
      .catch((err) => console.error("Error fetching role:", err));
  }, []);

  const returnBack = () => {
    navigate(role === "Admin" ? "/AdminMenu" : "/StudentMenu");
  };

  return (
    <div className="min-h-screen  font-sans p-6">
      
      {/* Page Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-purple-900 drop-shadow-md">
          {role === "Admin" ? "Admin Lost Items" : "My Lost Items"}
        </h1>
        <p className="text-purple-800/80 italic mt-2 md:mt-4 text-lg md:text-xl">
          Track lost items and manage their status efficiently
        </p>
      </div>

      {/* Cards Grid — identical to FoundItemReport */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">

        {itemList.length === 0 ? (
          <p className="text-purple-900 text-center col-span-full">No items found</p>
        ) : (
          itemList.map((item) => (
            <div
              key={item.lostItemId}
              className="bg-white rounded-3xl shadow-lg border border-purple-200 overflow-hidden hover:scale-105 transform transition-all duration-300"
            >
              
              {/* Card Header — SAME AS FOUND REPORT */}
              <div className="bg-purple-300/60 p-4 border-b"
              style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }} >
                <h2 className="text-xl font-bold text-white truncate">
                  {item.lostItemName}
                </h2>
                <span
                  className={`mt-2 inline-block text-sm font-semibold px-3 py-1 rounded-full ${
                    item.status ? "bg-green-500 text-white" : "bg-red-500 text-white"
                  }`}
                >
                  {item.status ? "Found" : "Not Found"}
                </span>
              </div>

              {/* Card Body — EXACT SAME GRID & ALIGNMENT */}
              <div className="p-5 grid grid-cols-2 gap-y-3 gap-x-4">
                
                <div className="flex items-center">
                  <FaBox className="mr-2 text-purple-700" />
                  <span className="text-purple-900/90 font-medium">Category:</span>
                </div>
                <span className="font-semibold text-purple-900">{item.category}</span>

                <div className="flex items-center">
                  <FaPalette className="mr-2 text-purple-700" />
                  <span className="text-purple-900/90 font-medium">Color:</span>
                </div>
                <span className="font-semibold text-purple-900">{item.color}</span>

                <div className="flex items-center">
                  <FaBox className="mr-2 text-purple-700" />
                  <span className="text-purple-900/90 font-medium">Brand:</span>
                </div>
                <span className="font-semibold text-purple-900">{item.brand}</span>

                <div className="flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-purple-700" />
                  <span className="text-purple-900/90 font-medium">Location:</span>
                </div>
                <span className="font-semibold text-purple-900">{item.location}</span>
              </div>

              {/* Card Footer — SAME AS FOUND REPORT */}
              <div className="bg-purple-50 p-4 flex justify-between items-center border-t border-purple-200">
                <p className="text-purple-900/80 text-sm flex items-center">
                  <FaUser className="mr-2" /> {item.username || "N/A"}
                </p>
                <p className="text-purple-900/80 text-sm flex items-center">
                  <FaCalendarAlt className="mr-2" /> {item.lostDate}
                </p>
              </div>

            </div>
          ))
        )}

      </div>

      {/* Return Button */}
      <div className="mt-10 text-center">
        <button
          onClick={returnBack}
          className="px-8 py-3 font-bold text-white bg-purple-600 rounded-full shadow-md hover:bg-purple-700 hover:scale-105 transform transition-all duration-300"
        >
          Return
        </button>
      </div>

    </div>
  );
};

export default LostItemReport;
