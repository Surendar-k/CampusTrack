import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllFoundItems, getFoundItemsByUsername } from "../../Services/FoundItemService";
import { getRole } from "../../Services/LoginService";
import "../../DisplayView.css";
import { FaBox, FaCalendarAlt, FaUser, FaMapMarkerAlt, FaPalette } from "react-icons/fa";

const FoundItemReport = () => {
  const navigate = useNavigate();
  const [itemList, setItemList] = useState([]);
  const [role, setRole] = useState("");

  useEffect(() => {
    getRole()
      .then((response) => {
        const userRole = response.data;
        setRole(userRole);

        if (userRole === "Admin") {
          getAllFoundItems()
            .then((res) => setItemList(res.data))
            .catch((err) => console.error(err));
        } else {
          getFoundItemsByUsername()
            .then((res) => setItemList(res.data))
            .catch((err) => console.error(err));
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const returnBack = () => {
    navigate(role === "Admin" ? "/AdminMenu" : "/StudentMenu");
  };

  return (
    <div
      className="min-h-screen font-sans p-6"
     // light blue background
    >
      {/* Page Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 drop-shadow-md">
          {role === "Admin" ? "Admin Found Items" : "My Found Items"}
        </h1>
        <p className="text-blue-800/80 italic mt-2 md:mt-4 text-lg md:text-xl">
          Track found items and manage their status efficiently
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {itemList.length === 0 ? (
          <p className="text-blue-900 text-center col-span-full">No items found</p>
        ) : (
          itemList.map((item) => (
            <div
              key={item.foundItemId}
              className="bg-white rounded-3xl shadow-lg border border-blue-200 overflow-hidden hover:scale-105 transform transition-all duration-300"
            >
              {/* Card Header with gradient */}
              <div
                className="p-4 border-b border-blue-300"
                style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
              >
                <h2 className="text-xl font-bold text-white truncate">{item.foundItemName}</h2>
                <span
                  className={`mt-2 inline-block text-sm font-semibold px-3 py-1 rounded-full ${
                    item.status ? "bg-green-500 text-white" : "bg-red-500 text-white"
                  }`}
                >
                  {item.status ? "Claimed" : "Not Claimed"}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-5 grid grid-cols-2 gap-y-3 gap-x-4">
                <div className="flex items-center text-blue-800">
                  <FaBox className="mr-2" /> <span className="font-medium">Category:</span>
                </div>
                <span className="font-semibold text-blue-900">{item.category}</span>

                <div className="flex items-center text-blue-800">
                  <FaPalette className="mr-2" /> <span className="font-medium">Color:</span>
                </div>
                <span className="font-semibold text-blue-900">{item.color}</span>

                <div className="flex items-center text-blue-800">
                  <FaBox className="mr-2" /> <span className="font-medium">Brand:</span>
                </div>
                <span className="font-semibold text-blue-900">{item.brand}</span>

                <div className="flex items-center text-blue-800">
                  <FaMapMarkerAlt className="mr-2" /> <span className="font-medium">Location:</span>
                </div>
                <span className="font-semibold text-blue-900">{item.location}</span>
              </div>

              {/* Card Footer */}
              <div className="bg-blue-50/50 p-4 flex justify-between items-center border-t border-blue-200">
                <p className="text-blue-900/80 text-sm flex items-center">
                  <FaUser className="mr-2" /> {item.username || "N/A"}
                </p>
                <p className="text-blue-900/80 text-sm flex items-center">
                  <FaCalendarAlt className="mr-2" /> {item.foundDate}
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

export default FoundItemReport;
