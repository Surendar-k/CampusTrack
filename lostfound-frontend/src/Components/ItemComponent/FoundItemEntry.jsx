import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBoxOpen, FaEdit, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import {getUserId } from '../../Services/LoginService';
import { generateId } from '../../Services/FoundItemService';
import { saveFoundItem } from '../../Services/FoundItemService';
import '../../DisplayView.css';


const FoundItemEntry=() => {
     let navigate=useNavigate();
    const [errors, setErrors] = useState({});
     const [foundItem,setFoundItem] = useState({
        foundItemId:"",
        foundItemName:"",
        color: "",
        brand:"",
        category:"",
        location:"",
        username:"",
        foundDate:new Date(),
        status:false,
    });

    const[newId,setNewId]=useState('');
    const[Fdate,setFdate]=useState(new Date());
    const[userId,setUserId]=useState('');
 const  onChangeHandler = (event) =>{
    event.persist();
    const name = event.target.name;
        const value = event.target.value;
       setFoundItem(values =>({...values, [name]: value }));
     };
const setFoundItemId=()=>{
    generateId().then(response=>{
      setNewId(response.data);  
    });
  };
const setUsername=()=>{
    getUserId().then(response=>{
     setUserId(response.data);
    });
   }
   useEffect(() => {
    setFoundItemId();
    setUsername();
  }, []);
  const foundItemSubmit = (event) => {
    event.preventDefault();
    foundItem.foundItemId=newId;
    foundItem.username=userId;
    foundItem.foundDate=Fdate;
      saveFoundItem(foundItem).then(response=>{
          alert("Found Item Form Submitted Successfully....");
          navigate('/StudentMenu');    
        });      
  }
const handleValidation = (event) => {
    event.preventDefault();
    let tempErrors = {};
    let isValid = true;
 
    if (!foundItem.foundItemName.trim()) {
      tempErrors.foundItemName = "Item Name is required";
      isValid = false;
    }
 
    if (!foundItem.color.trim()) {
      tempErrors.color = "Item color is required";
      isValid = false;
    }
    if (!foundItem.brand.trim()) {
        tempErrors.brand = "Item brand is required";
        isValid = false;
    }
    if (!foundItem.category.trim()) {
        tempErrors.category = "Item category is required";
        isValid = false;
    }
 
    if (!foundItem.location.trim()) {
        tempErrors.location = "Found Location is required";
        isValid = false;
      }
   setErrors(tempErrors);
    if (isValid) {
      foundItemSubmit(event);
    }
  };
 const returnBack=()=>{
    navigate("/StudentMenu");  
   }

 return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 via-purple-500 to-pink-400 flex flex-col items-center p-4">
      
      {/* Heading outside the card */}
      <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-8 drop-shadow-lg">
        Found Item Form Submission
      </h2>

      {/* Form Card */}
      <div className="w-full max-w-3xl bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8">
        <form className="space-y-4">

          {/* Item Id */}
          <div className="flex flex-col md:flex-row items-center md:gap-4">
            <label className="md:w-1/3 font-semibold text-gray-700 flex items-center gap-2">
              <FaBoxOpen /> Item Id:
            </label>
            <input
              name="itemId"
              value={newId}
              readOnly
              className="md:w-2/3 p-3 rounded-lg border border-gray-300 bg-gray-100 focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          {/* Found Item Name */}
          <div className="flex flex-col md:flex-row items-center md:gap-4">
            <label className="md:w-1/3 font-semibold text-gray-700 flex items-center gap-2">
              <FaEdit /> Found Item Name:
            </label>
            <input
              name="foundItemName"
              value={foundItem.foundItemName}
              onChange={onChangeHandler}
              className="md:w-2/3 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
              placeholder="Enter item name"
            />
          </div>
          {errors.foundItemName && <p className="text-red-500 text-sm text-right">{errors.foundItemName}</p>}

          {/* Category */}
          <div className="flex flex-col md:flex-row items-center md:gap-4">
            <label className="md:w-1/3 font-semibold text-gray-700 flex items-center gap-2">
              Category:
            </label>
            <input
              name="category"
              value={foundItem.category}
              onChange={onChangeHandler}
              className="md:w-2/3 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
              placeholder="Enter item category"
            />
          </div>
          {errors.category && <p className="text-red-500 text-sm text-right">{errors.category}</p>}

          {/* Color */}
          <div className="flex flex-col md:flex-row items-center md:gap-4">
            <label className="md:w-1/3 font-semibold text-gray-700 flex items-center gap-2">
              Color:
            </label>
            <input
              name="color"
              value={foundItem.color}
              onChange={onChangeHandler}
              className="md:w-2/3 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
              placeholder="Enter item color"
            />
          </div>
          {errors.color && <p className="text-red-500 text-sm text-right">{errors.color}</p>}

          {/* Brand */}
          <div className="flex flex-col md:flex-row items-center md:gap-4">
            <label className="md:w-1/3 font-semibold text-gray-700 flex items-center gap-2">
              Brand Name:
            </label>
            <input
              name="brand"
              value={foundItem.brand}
              onChange={onChangeHandler}
              className="md:w-2/3 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
              placeholder="Enter brand name"
            />
          </div>
          {errors.brand && <p className="text-red-500 text-sm text-right">{errors.brand}</p>}

          {/* Location */}
          <div className="flex flex-col md:flex-row items-center md:gap-4">
            <label className="md:w-1/3 font-semibold text-gray-700 flex items-center gap-2">
              <FaMapMarkerAlt /> Location:
            </label>
            <input
              name="location"
              value={foundItem.location}
              onChange={onChangeHandler}
              className="md:w-2/3 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
              placeholder="Enter location"
            />
          </div>
          {errors.location && <p className="text-red-500 text-sm text-right">{errors.location}</p>}

          {/* Found Date */}
          <div className="flex flex-col md:flex-row items-center md:gap-4">
            <label className="md:w-1/3 font-semibold text-gray-700 flex items-center gap-2">
              <FaCalendarAlt /> Found Date:
            </label>
            <input
              type="date"
              value={Fdate}
              onChange={(e) => setFdate(e.target.value)}
              className="md:w-2/3 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-6 mt-6">
            <button
              onClick={handleValidation}
              className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition"
            >
              Submit
            </button>
            <button
              onClick={returnBack}
              className="bg-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition"
            >
              Return
            </button>
          </div>
        </form>
      </div>
    </div>
  );


}
export default FoundItemEntry;