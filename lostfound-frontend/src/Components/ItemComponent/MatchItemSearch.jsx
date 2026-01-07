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
  Smartphone,
} from "lucide-react";

const MatchItemSearch = ({ lostItem, onClose }) => {
  const [foundItems, setFoundItems] = useState([]);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    getAllFoundItems().then((res) => setFoundItems(res.data));
  }, []);

  useEffect(() => {
    if (!lostItem || foundItems.length === 0) return;

    const fuse = new Fuse(foundItems, {
      keys: ["foundItemName", "category", "color", "brand"],
      threshold: 0.4,
    });

    setMatches(fuse.search(lostItem.lostItemName).map(r => r.item));
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
      alert("Match saved successfully");
      onClose();
    });
  };

  if (!lostItem) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl w-full max-w-3xl shadow-xl overflow-hidden font-sans">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold tracking-wide text-white">
              Match Results
            </h2>
            <p className="text-sm text-indigo-100">
              Lost item: "{lostItem.lostItemName}"
            </p>
          </div>

          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6">
          {matches.length === 0 ? (
            <div className="text-center py-10 text-slate-500 text-sm">
              No matching found items available.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {matches.map((found) => (
                <div
                  key={found.foundItemId}
                  className="border border-slate-200 rounded-xl p-4
                             hover:border-indigo-300 transition"
                >
                  {/* Item Title */}
                  <div className="flex items-center gap-2 mb-3">
                    <Smartphone size={18} className="text-indigo-600" />
                    <h3 className="text-base font-medium text-slate-800">
                      {found.foundItemName}
                    </h3>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-y-3 text-sm">
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-slate-400">
                        Found By
                      </p>
                      <p className="flex items-center gap-1 text-slate-700">
                        <User size={14} /> {found.username}
                      </p>
                    </div>

                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-slate-400">
                        Category
                      </p>
                      <p className="flex items-center gap-1 text-slate-700">
                        <Tag size={14} /> {found.category}
                      </p>
                    </div>

                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-slate-400">
                        Color
                      </p>
                      <p className="text-slate-700">{found.color}</p>
                    </div>

                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-slate-400">
                        Brand
                      </p>
                      <p className="text-slate-700">{found.brand}</p>
                    </div>

                    <div className="col-span-2">
                      <p className="text-[11px] uppercase tracking-wider text-slate-400">
                        Location
                      </p>
                      <p className="flex items-center gap-1 text-slate-700">
                        <MapPin size={14} /> {found.location}
                      </p>
                    </div>
                  </div>

                  {/* Confirm Button */}
                  <button
                    onClick={() => confirmMatch(found)}
                    className="mt-4 w-full flex items-center justify-center gap-2
                               bg-indigo-600 hover:bg-green-600
                               text-white text-sm font-medium py-2 rounded-lg transition"
                  >
                    <CheckCircle size={16} />
                    Confirm Match
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="px-6 py-3 border-t flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-medium rounded-lg
                       bg-red-500 hover:bg-red-600
                       text-white transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchItemSearch;
