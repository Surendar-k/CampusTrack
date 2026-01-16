import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllLostItems,
  getLostItemsByUsername,
  deleteLostItemById,
} from "../../Services/LostItemService";
import { getRole } from "../../Services/LoginService";
import MatchItemSearch from "./MatchItemSearch";
import {
  FaBox,
  FaCalendarAlt,
  FaUser,
  FaMapMarkerAlt,
  FaPalette,
  FaTrash,
} from "react-icons/fa";

/* ================= DELETE CONFIRM POPUP ================= */
const ConfirmDeletePopup = ({ open, onCancel, onConfirm }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg text-center">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Delete Lost Item
        </h2>
        <p className="text-sm text-gray-600 mb-5">
          Are you sure you want to delete this lost item?
          <span className="block text-red-500 mt-1">
            This action cannot be undone.
          </span>
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm rounded bg-gray-100 hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm rounded bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const LostItemReport = () => {
  const navigate = useNavigate();
  const [itemList, setItemList] = useState([]);
  const [selectedLostItem, setSelectedLostItem] = useState(null);
  const [role, setRole] = useState("");

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [toast, setToast] = useState({ message: "", type: "" });

  // Fetch Data
  useEffect(() => {
    getRole().then((res) => {
      setRole(res.data);
      if (res.data === "Admin") {
        getAllLostItems().then((res) => setItemList(res.data));
      } else {
        getLostItemsByUsername().then((res) => setItemList(res.data));
      }
    });
  }, []);

  const confirmDelete = () => {
    deleteLostItemById(deleteId)
      .then(() => {
        setItemList((prev) => prev.filter((item) => item.lostItemId !== deleteId));
        setToast({ message: "Lost item deleted successfully", type: "success" });
      })
      .catch(() =>
        setToast({ message: "Failed to delete lost item", type: "error" })
      )
      .finally(() => {
        setShowDeletePopup(false);
        setDeleteId(null);
        setTimeout(() => setToast({ message: "", type: "" }), 3000);
      });
  };

  const returnBack = () => {
    navigate(role === "Admin" ? "/AdminMenu" : "/StudentMenu");
  };

  return (
    <div className="min-h-screen p-6 relative">
      {/* TOAST */}
      {toast.message && (
        <div
          className={`fixed top-6 right-6 px-6 py-3 rounded-xl shadow-lg text-white z-50
          ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}
        >
          {toast.message}
        </div>
      )}

      {/* HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-purple-800 drop-shadow-md">
          {role === "Admin" ? "List of Lost Items" : "My Lost Items"}
        </h1>
        <p className="text-purple-800/80 italic mt-2 md:mt-4 text-lg md:text-xl">
          Track lost items and manage their status efficiently
        </p>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {itemList.length === 0 ? (
          <p className="text-purple-800 text-center col-span-full">No items found</p>
        ) : (
          itemList.map((item) => (
            <div
              key={item.lostItemId}
             className="bg-white rounded-3xl shadow-lg border
           hover:shadow-2xl transition"

            >
              {/* HEADER */}
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 text-white rounded-t-3xl">
                <h2 className="text-xl font-bold">{item.lostItemName}</h2>
                <span
                  className={`text-sm px-3 py-1 rounded-full ${
                    item.status ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {item.status ? "Found" : "Not Found"}
                </span>
              </div>

              {/* BODY */}
              <div className="p-4 grid grid-cols-2 gap-2 text-sm">
                <span><FaBox /> Category</span><b>{item.category}</b>
                <span><FaPalette /> Color</span><b>{item.color}</b>
                <span><FaBox /> Brand</span><b>{item.brand}</b>
                <span><FaMapMarkerAlt /> Location</span><b>{item.location}</b>
              </div>

              {/* FOOTER */}
              <div className="p-4 border-t flex justify-between text-sm">
                <span><FaUser /> {item.username}</span>
                <span><FaCalendarAlt /> {item.lostDate}</span>
              </div>

              {/* ACTIONS */}
              <div className="flex">
                {!item.status && (
                  <button
                    onClick={() => setSelectedLostItem(item)}
                    className="w-1/2 bg-purple-600 text-white py-2 hover:bg-purple-700 rounded-bl-3xl"
                  >
                    🔍 Find Match
                  </button>
                )}
                <button
                  onClick={() => {
                    setDeleteId(item.lostItemId);
                    setShowDeletePopup(true);
                  }}
                  className={`${
                    item.status ? "w-full rounded-b-3xl" : "w-1/2 rounded-br-3xl"
                  } bg-red-600 text-white py-2 hover:bg-red-700`}
                >
                  <FaTrash className="inline mr-1" /> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* MATCH SEARCH COMPONENT */}
    {selectedLostItem && (
  <MatchItemSearch
    lostItem={selectedLostItem}
    onClose={() => setSelectedLostItem(null)}
    onMatched={(lostItemId) => {
      setItemList((prev) =>
        prev.map((item) =>
          item.lostItemId === lostItemId
            ? { ...item, status: true }   
            : item
        )
      );
    }}
  />
)}


      {/* RETURN */}
      <div className="mt-10 text-center">
        <button
          onClick={returnBack}
          className="px-8 py-3 font-bold text-white bg-purple-600 rounded-full hover:bg-purple-700"
        >
          Return
        </button>
      </div>

      {/* CONFIRM DELETE */}
      <ConfirmDeletePopup
        open={showDeletePopup}
        onCancel={() => setShowDeletePopup(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default LostItemReport;
