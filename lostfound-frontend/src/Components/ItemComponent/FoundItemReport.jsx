import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { getAllFoundItems } from "../../Services/FoundItemService";
import '../../DisplayView.css';
import {getRole } from "../../Services/LoginService";
import { getFoundItemsByUsername } from "../../Services/FoundItemService";

const FoundItemReport=()=> {
    let navigate=useNavigate();
    const [itemList,setItemList]=useState([]);
    const[role,setRole]=useState("");
    
  const showFoundItems=()=>{
      getRole().then((response)=>{
          setRole(response.data);
          if(response.data==='Admin'){
            getAllFoundItems().then((res1)=>{
              setItemList(res1.data);
           });
          }
          else if (response.data==='Student'){
            getFoundItemsByUsername().then((res2)=>{
              setItemList(res2.data);
           });
          }
        });
    }
    useEffect(()=>{
      showFoundItems();
    },[]);
 
    const showAllFoundItems=()=>{
        getAllFoundItems().then((response)=>{
            setItemList(response.data);
        });
    }
    useEffect(() => {
        showAllFoundItems();
    }, []);

    const returnBack=()=>{
      if(role==='Admin'){
        navigate('/AdminMenu');
    }
    else if(role==='Student'){
        navigate('/StudentMenu');
    }
  }
    
 return (
  <div className="min-h-screen bg-gradient-to-br from-purple-800 via-purple-700 to-indigo-600 font-sans p-6">

    {/* Page Header */}
    <div className="text-center mb-8">
      <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">
        {role === 'Admin' ? 'Admin Found Item List' : 'Student Found Item List'}
      </h1>
      <p className="text-white/90 italic mt-2 text-lg drop-shadow-sm">
        Track found items and manage their status efficiently
      </p>
    </div>

    {/* Table */}
    <div className="overflow-x-auto bg-white/10 backdrop-blur-md rounded-2xl shadow-lg">
      <table className="min-w-full text-left border-collapse">
        <thead className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white text-sm md:text-base">
          <tr>
            <th className="px-4 py-3">ID</th>
            <th className="px-4 py-3">Item Name</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Color</th>
            <th className="px-4 py-3">Brand</th>
            <th className="px-4 py-3">Location</th>
            <th className="px-4 py-3">Found Date</th>
            <th className="px-4 py-3">User</th>
            <th className="px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody className="text-white/90 text-sm md:text-base">
          {itemList.map((item) => (
            <tr
              key={item.foundItemId}
              className="border-b border-white/20 hover:bg-white/10 transition-colors"
            >
              <td className="px-4 py-3">{item.foundItemId}</td>
              <td className="px-4 py-3 font-semibold">{item.foundItemName}</td>
              <td className="px-4 py-3">{item.category}</td>
              <td className="px-4 py-3">{item.color}</td>
              <td className="px-4 py-3">{item.brand}</td>
              <td className="px-4 py-3">{item.location}</td>
              <td className="px-4 py-3">{item.foundDate}</td>
              <td className="px-4 py-3">{item.username}</td>
              <td className="px-4 py-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    item.status
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                  }`}
                >
                  {item.status ? 'Claimed' : 'Not Claimed'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Return Button */}
    <div className="mt-6 text-center">
      <button
        onClick={() => returnBack()}
        className="px-8 py-3 font-bold text-white bg-gradient-to-r from-green-400 to-green-600 rounded-3xl shadow-xl hover:scale-105 transform transition-all duration-300"
      >
        Return
      </button>
    </div>
  </div>
);

}
export default FoundItemReport;