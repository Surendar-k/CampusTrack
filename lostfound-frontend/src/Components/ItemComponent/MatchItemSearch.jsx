import React, { useEffect, useState } from "react";
import Fuse from "fuse.js";
import { getAllFoundItems } from "../../Services/FoundItemService";
import { saveMatchItem } from "../../Services/MatchItemService";
import {
  CheckCircle,
  X,
  User,
  Tag,
  MapPin,
  Laptop,
  PackageSearch,
} from "lucide-react";

const MatchItemSearch = ({ lostItem, onClose }) => {
  const [foundItems, setFoundItems] = useState([]);
  const [matches, setMatches] = useState([]);
const [showSuccess, setShowSuccess] = useState(false);
const [claimedItemName, setClaimedItemName] = useState("");

  useEffect(() => {
    getAllFoundItems().then((res) => setFoundItems(res.data));
  }, []);

useEffect(() => {
  if (!lostItem || foundItems.length === 0) return;

  // ❌ Remove items posted by the same user
  const filteredFoundItems = foundItems.filter(
    (item) => item.username !== lostItem.username
  );

  const fuse = new Fuse(filteredFoundItems, {
    keys: ["foundItemName", "category", "color", "brand"],
    threshold: 10, // better matching (optional improvement)
  });

  setMatches(
    fuse.search(lostItem.lostItemName).map((r) => r.item)
  );
}, [lostItem, foundItems]);

const confirmMatch = (foundItem) => {
  const matchDTO = {
    lostItemId: lostItem.lostItemId,
    foundItemId: foundItem.foundItemId,
    itemName: lostItem.lostItemName,
    category: lostItem.category,
    lostUsername: lostItem.username,
    foundUsername: foundItem.username,
  };

  saveMatchItem(matchDTO).then(() => {
    setClaimedItemName(foundItem.foundItemName);
    setShowSuccess(true);

    // Auto close popup + modal
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 2000);
  });
};


  if (!lostItem) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-[2px] flex items-center justify-center">
      <div className="bg-slate-100 w-full max-w-6xl rounded-2xl shadow-xl
                      max-h-[90vh] flex flex-col overflow-hidden">

        {/* HEADER */}
        <div className="flex items-center justify-between px-8 py-6 bg-white border-b">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-indigo-600">
              <PackageSearch className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-slate-800">
                Match Found Items
              </h2>
              <p className="text-base text-slate-500">
                Smart similarity-based item comparison
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 transition"
          >
            <X size={22} />
          </button>
        </div>

        {/* LOST ITEM CARD */}
     <div className="bg-white rounded-xl shadow-sm p-6">
  <div className="flex items-center gap-4 mb-4">
    <div className="p-3 rounded-xl bg-indigo-100">
      <Laptop className="text-indigo-600" />
    </div>
    <div>
      <p className="text-sm text-slate-500 font-medium uppercase">
        Lost Item
      </p>
      <h3 className="text-xl font-semibold text-slate-800">
        {lostItem.lostItemName}
      </h3>
    </div>
  </div>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-base">
    <div className="flex items-center gap-2 text-slate-700">
      <Tag size={18} className="text-indigo-500" />
      <span className="font-medium">Category:</span>
      {lostItem.category}
    </div>

    <div className="flex items-center gap-2 text-slate-700">
      🎨 <span className="font-medium">Color:</span>
      {lostItem.color || "N/A"}
    </div>

    <div className="flex items-center gap-2 text-slate-700">
      🏷 <span className="font-medium">Brand:</span>
      {lostItem.brand || "N/A"}
    </div>

    <div className="flex items-center gap-2 text-slate-700">
      <MapPin size={18} className="text-indigo-500" />
      <span className="font-medium">Location:</span>
      {lostItem.location || "N/A"}
    </div>
  </div>
</div>

<br />
        {/* FOUND ITEMS */}
        <div className="flex-1 overflow-y-auto px-8 pb-8">
          {matches.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-500">
              <PackageSearch size={48} className="mb-4 opacity-40" />
              <p className="text-lg">No matching found items</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {matches.map((found) => (
                <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
  <h4 className="text-xl font-semibold text-slate-800 mb-4">
    {found.foundItemName}
  </h4>

  <div className="grid grid-cols-2 gap-y-8 text-base text-slate-700">
    <div className="col-span-2 flex items-center gap-2">
      <User size={18} className="text-indigo-500" />
      <span className="font-medium">Found By:</span>
      {found.username}
    </div>

    <div className="flex items-center gap-2">
      <Tag size={18} className="text-indigo-500" />
      <span className="font-medium">Category:</span>
      {found.category}
    </div>

    <div className="flex items-center gap-2">
      🎨 <span className="font-medium">Color:</span>
      {found.color}
    </div>

    <div className="flex items-center gap-2">
      🏷 <span className="font-medium">Brand:</span>
      {found.brand}
    </div>

    <div className=" flex items-center gap-2">
      <MapPin size={18} className="text-indigo-500" />
      <span className="font-medium">Location:</span>
      {found.location}
    </div>
  </div>

  <button
    onClick={() => confirmMatch(found)}
    className="mt-6 w-full flex items-center justify-center gap-2
               bg-indigo-600 hover:bg-indigo-700
               text-white text-base font-semibold py-3
               rounded-lg transition"
  >
    <CheckCircle size={18} />
    Claim Item
  </button>
</div>

              ))}
            </div>
          )}
        </div>

      </div>
      {/* ✅ Success Popup */}
{showSuccess && (
  <div className="fixed inset-0 z-[60] bg-black/40 flex items-center justify-center">
    <div className="bg-white rounded-2xl p-8 shadow-2xl text-center w-96 animate-scale-in">
      <CheckCircle size={50} className="text-green-600 mx-auto mb-4" />
      <h3 className="text-2xl font-bold text-green-700 mb-2">
        Item Claimed!
      </h3>
      <p className="text-slate-600">
        <strong>{claimedItemName}</strong> has been successfully claimed.
      </p>
    </div>
  </div>
)}

    </div>
  );
};

export default MatchItemSearch;
