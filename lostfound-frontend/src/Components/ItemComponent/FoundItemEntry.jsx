import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaBoxOpen, FaEdit, FaCalendarAlt, FaMapMarkerAlt, 
  FaTag, FaPalette, FaTrademark, FaSignOutAlt 
} from "react-icons/fa";
import { getUserId, logoutUser } from '../../Services/LoginService';
import { generateId, saveFoundItem } from '../../Services/FoundItemService';
import '../../DisplayView.css';

const FoundItemEntry = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");   

  const [foundItem, setFoundItem] = useState({
    foundItemId: "",
    foundItemName: "",
    color: "",
    brand: "",
    category: "",
    location: "",
    username: "",
    foundDate: new Date(),
    status: false,
  });

  const [newId, setNewId] = useState('');
  const [Fdate, setFdate] = useState(new Date());
  const [userId, setUserId] = useState('');

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFoundItem(values => ({ ...values, [name]: value }));
  };

  const setFoundItemId = () => generateId().then(response => setNewId(response.data));
  const setUsername = () => getUserId().then(response => setUserId(response.data));

  useEffect(() => {
    setFoundItemId();
    setUsername();
  }, []);

  const foundItemSubmit = (event) => {
    event.preventDefault();
    foundItem.foundItemId = newId;
    foundItem.username = userId;
    foundItem.foundDate = Fdate;

    saveFoundItem(foundItem).then(() => {
      setSuccessMsg("Found Item Form Submitted Successfully!"); 

      setFoundItem({
        foundItemId: "",
        foundItemName: "",
        color: "",
        brand: "",
        category: "",
        location: "",
        username: userId,
        foundDate: new Date(),
        status: false,
      });

      setTimeout(() => navigate('/StudentMenu'), 2000);
    });
  };

  const handleValidation = (event) => {
    event.preventDefault();
    let tempErrors = {};
    let isValid = true;

    if (!foundItem.foundItemName.trim()) { tempErrors.foundItemName = "Item Name is required"; isValid = false; }
    if (!foundItem.color.trim()) { tempErrors.color = "Item color is required"; isValid = false; }
    if (!foundItem.brand.trim()) { tempErrors.brand = "Item brand is required"; isValid = false; }
    if (!foundItem.category.trim()) { tempErrors.category = "Item category is required"; isValid = false; }
    if (!foundItem.location.trim()) { tempErrors.location = "Found Location is required"; isValid = false; }

    setErrors(tempErrors);
    if (isValid) foundItemSubmit(event);
  };

  const returnBack = () => navigate("/StudentMenu");

  const handleLogout = () => {
    logoutUser().then(() => navigate("/"));
  };

  return (
    <div className="min-h-screen font-sans bg-gradient-to-br from-gray-100 to-blue-100" >

      {/* Navbar */}
      <header
        className="flex items-center justify-between px-6 py-4 text-white shadow-lg mb-6"
        style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
      >
        <h1 className="text-2xl font-bold">🎓 CampusTrack</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-full shadow-md transition"
        >
          <FaSignOutAlt /> Logout
        </button>
      </header>

      {/* Form Container */}
      <div className="flex items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-10">

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-purple-800 mb-6 drop-shadow-md">
            Found Item Form Submission
          </h2>

          {/* Success Message */}
          {successMsg && (
            <div className="bg-green-100 text-green-700 p-4 rounded-xl text-center font-semibold shadow-md mb-6">
              {successMsg}
            </div>
          )}

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Item Id */}
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

            {/* Found Date */}
            <div>
              <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
                <FaCalendarAlt /> Found Date
              </label>
              <input
                type="date"
                value={Fdate}
                onChange={(e) => setFdate(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 outline-none text-black"
              />
            </div>

            {/* Found Item Name */}
            <div className="col-span-1 md:col-span-2">
              <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
                <FaEdit /> Found Item Name
              </label>
              <input
                name="foundItemName"
                value={foundItem.foundItemName}
                onChange={onChangeHandler}
                placeholder="Enter item name"
                className="w-full p-3 rounded-lg border border-gray-300 outline-none text-black"
              />
              {errors.foundItemName && <p className="text-red-500 text-sm mt-1">{errors.foundItemName}</p>}
            </div>

            {/* Category */}
            <div>
              <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
                <FaTag /> Category
              </label>
              <input
                name="category"
                value={foundItem.category}
                onChange={onChangeHandler}
                placeholder="Enter item category"
                className="w-full p-3 rounded-lg border border-gray-300 outline-none text-black"
              />
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
            </div>

            {/* Color */}
            <div>
              <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
                <FaPalette /> Color
              </label>
              <input
                name="color"
                value={foundItem.color}
                onChange={onChangeHandler}
                placeholder="Enter item color"
                className="w-full p-3 rounded-lg border border-gray-300 outline-none text-black"
              />
              {errors.color && <p className="text-red-500 text-sm mt-1">{errors.color}</p>}
            </div>

            {/* Brand */}
            <div>
              <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
                <FaTrademark /> Brand
              </label>
              <input
                name="brand"
                value={foundItem.brand}
                onChange={onChangeHandler}
                placeholder="Enter brand name"
                className="w-full p-3 rounded-lg border border-gray-300 outline-none text-black"
              />
              {errors.brand && <p className="text-red-500 text-sm mt-1">{errors.brand}</p>}
            </div>

            {/* Location */}
            <div>
              <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
                <FaMapMarkerAlt /> Location
              </label>
              <input
                name="location"
                value={foundItem.location}
                onChange={onChangeHandler}
                placeholder="Enter location"
                className="w-full p-3 rounded-lg border border-gray-300 outline-none text-black"
              />
              {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
            </div>

            {/* Buttons */}
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

export default FoundItemEntry;
