import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaBoxOpen, FaEdit, FaCalendarAlt, FaMapMarkerAlt, 
  FaTags, FaPalette, FaTrademark 
} from "react-icons/fa";
import { getUserId } from '../../Services/LoginService';
import { generateId, saveLostItem } from '../../Services/LostItemService';
import Navbar from '../Layout/Navbar';
import '../../DisplayView.css';

const LostItemEntry = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const [lostItem, setLostItem] = useState({
    lostItemId: "",
    lostItemName: "",
    color: "",
    brand: "",
    category: "",
    location: "",
    username: "",
    lostDate: new Date(),
    status: false,
  });

  const [newId, setNewId] = useState('');
  const [Ldate, setLdate] = useState(new Date());
  const [userId, setUserId] = useState('');

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setLostItem(values => ({ ...values, [name]: value }));
  };

  const setLostItemId = () => generateId().then(res => setNewId(res.data));
  const setUsername = () => getUserId().then(res => setUserId(res.data));

  useEffect(() => {
    setLostItemId();
    setUsername();
  }, []);

  const lostItemSubmit = (event) => {
    event.preventDefault();
    lostItem.lostItemId = newId;
    lostItem.username = userId;
    lostItem.lostDate = Ldate;

    saveLostItem(lostItem).then(() => {
      setSuccessMessage("Lost item submitted successfully!");
      setErrors({});

      // Reset form after success
      setLostItem({
        lostItemId: "",
        lostItemName: "",
        color: "",
        brand: "",
        category: "",
        location: "",
        username: "",
        lostDate: new Date(),
        status: false
      });

      setLdate(new Date());
      setLostItemId();
    });
  };

  const handleValidation = (event) => {
    event.preventDefault();
    let tempErrors = {};
    let isValid = true;

    if (!lostItem.lostItemName.trim()) { tempErrors.lostItemName = "Item Name is required"; isValid = false; }
    if (!lostItem.color.trim()) { tempErrors.color = "Item color is required"; isValid = false; }
    if (!lostItem.brand.trim()) { tempErrors.brand = "Item brand is required"; isValid = false; }
    if (!lostItem.category.trim()) { tempErrors.category = "Item category is required"; isValid = false; }
    if (!lostItem.location.trim()) { tempErrors.location = "Lost Location is required"; isValid = false; }

    setErrors(tempErrors);
    if (isValid) lostItemSubmit(event);
  };

  const returnBack = () => navigate("/StudentMenu");

  return (
    <div className="min-h-screen font-sans bg-gradient-to-br from-gray-100 to-blue-100">
      {/* REUSABLE NAVBAR */}
      <Navbar />

      {/* Form Container */}
      <div className="flex items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-10">

          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-purple-800 mb-6 drop-shadow-md">
            Lost Item Form Submission
          </h2>

          {/* Success Message */}
          {successMessage && (
            <div className="mb-8 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg text-center font-semibold shadow">
              {successMessage}
            </div>
          )}

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
                <FaBoxOpen /> Item Id
              </label>
              <input
                name="itemId"
                value={newId}
                readOnly
                className="w-full p-3 rounded-lg border border-gray-300 bg-gray-100 outline-none text-black"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
                <FaCalendarAlt /> Lost Date
              </label>
              <input
                type="date"
                value={Ldate}
                onChange={(e) => setLdate(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 outline-none text-black"
              />
            </div>

            <div className="col-span-1 md:col-span-2">
              <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
                <FaEdit /> Lost Item Name
              </label>
              <input
                name="lostItemName"
                value={lostItem.lostItemName}
                onChange={onChangeHandler}
                placeholder="Enter item name"
                className="w-full p-3 rounded-lg border border-gray-300 outline-none text-black"
              />
              {errors.lostItemName && <p className="text-red-500 text-sm mt-1">{errors.lostItemName}</p>}
            </div>

            <div>
              <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
                <FaTags /> Category
              </label>
              <input
                name="category"
                value={lostItem.category}
                onChange={onChangeHandler}
                placeholder="Enter item category"
                className="w-full p-3 rounded-lg border border-gray-300 outline-none text-black"
              />
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
            </div>

            <div>
              <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
                <FaPalette /> Color
              </label>
              <input
                name="color"
                value={lostItem.color}
                onChange={onChangeHandler}
                placeholder="Enter item color"
                className="w-full p-3 rounded-lg border border-gray-300 outline-none text-black"
              />
              {errors.color && <p className="text-red-500 text-sm mt-1">{errors.color}</p>}
            </div>

            <div>
              <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
                <FaTrademark /> Brand
              </label>
              <input
                name="brand"
                value={lostItem.brand}
                onChange={onChangeHandler}
                placeholder="Enter brand name"
                className="w-full p-3 rounded-lg border border-gray-300 outline-none text-black"
              />
              {errors.brand && <p className="text-red-500 text-sm mt-1">{errors.brand}</p>}
            </div>

            <div>
              <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
                <FaMapMarkerAlt /> Location
              </label>
              <input
                name="location"
                value={lostItem.location}
                onChange={onChangeHandler}
                placeholder="Enter location"
                className="w-full p-3 rounded-lg border border-gray-300 outline-none text-black"
              />
              {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
            </div>

            <div className="col-span-1 md:col-span-2 flex justify-center gap-6 mt-6">
              <button
                onClick={handleValidation}
                className="bg-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-purple-700 transition"
              >
                Submit
              </button>
              <button
                onClick={returnBack}
                className="bg-green-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-600 transition"
              >
                Return
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default LostItemEntry;
