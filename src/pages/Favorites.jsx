import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaEye, FaPlus } from "react-icons/fa";
import Modal from "../components/Modal";
import {
  getFavorites,
  removeFavorite,
  updateFavorite,
} from "../utils/localStorageUtils";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [deletePackage, setDeletePackage] = useState("");
  const [editPackage, setEditPackage] = useState({ packageName: "", reason: "" });
  const [viewPackage, setViewPackage] = useState({ packageName: "", reason: "" });
  const [newReason, setNewReason] = useState("");

  const navigate = useNavigate();

  // Fetch favorites from localStorage
  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  // Handle deletion of a favorite package
  const handleDelete = () => {
    removeFavorite(deletePackage);
    setFavorites(getFavorites());
    setShowDeleteModal(false);
  };

  // Handle editing of a favorite package
  const handleEdit = () => {
    updateFavorite(editPackage.packageName, newReason);
    setFavorites(getFavorites());
    setShowEditModal(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">NPM Favorite Packages</h1>

      {/* Button to navigate to Add Favorite page */}
      <div className="mb-4 flex justify-end">
        <button
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => navigate("/")}
        >
          <FaPlus className="mr-2" />
          Add Favorite
        </button>
      </div>

      {/* Display message if no favorites exist */}
      {favorites.length === 0 && (
        <p className="text-gray-500">No favorites added yet. Add some!</p>
      )}

      {/* Render list of favorite packages */}
      {favorites.map((fav) => (
        <div
          key={fav.packageName}
          className="border p-4 mb-2 flex justify-between items-center rounded"
        >
          <div>
            <h2 className="font-bold text-lg">{fav.packageName}</h2>
            <p className="text-gray-700">{fav.reason}</p>
          </div>

          {/* Action buttons for View, Edit, and Delete */}
          <div className="flex items-center space-x-2">
            <button
              className="p-2 text-blue-500 hover:text-blue-600"
              onClick={() => {
                setViewPackage(fav);
                setShowViewModal(true);
              }}
            >
              <FaEye size={20} />
            </button>
            <button
              className="p-2 text-green-500 hover:text-green-600"
              onClick={() => {
                setEditPackage(fav);
                setNewReason(fav.reason);
                setShowEditModal(true);
              }}
            >
              <FaEdit size={20} />
            </button>
            <button
              className="p-2 text-red-500 hover:text-red-600"
              onClick={() => {
                setDeletePackage(fav.packageName);
                setShowDeleteModal(true);
              }}
            >
              <FaTrash size={20} />
            </button>
          </div>
        </div>
      ))}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        title="Confirm Deletion"
        onClose={() => setShowDeleteModal(false)}
      >
        <p>Are you sure you want to delete this favorite?</p>
        <div className="flex justify-end mt-4">
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 mr-2"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={handleDelete}
          >
            Yes, Delete
          </button>
        </div>
      </Modal>

      {/* View Reason Modal */}
      <Modal
        isOpen={showViewModal}
        title={`Details for ${viewPackage.packageName}`}
        onClose={() => setShowViewModal(false)}
      >
        <p className="text-gray-700">{viewPackage.reason}</p>
        <div className="flex justify-end mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => setShowViewModal(false)}
          >
            Close
          </button>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={showEditModal}
        title={`Edit Reason for ${editPackage.packageName}`}
        onClose={() => setShowEditModal(false)}
      >
        <textarea
          value={newReason}
          onChange={(e) => setNewReason(e.target.value)}
          className="w-full p-2 mt-2 border rounded"
          rows="4"
        />
        <div className="flex justify-end mt-4">
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 mr-2"
            onClick={() => setShowEditModal(false)}
          >
            Cancel
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={handleEdit}
          >
            Save Changes
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Favorites;
