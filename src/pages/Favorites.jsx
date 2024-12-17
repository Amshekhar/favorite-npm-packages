import React, { useState, useEffect } from 'react';
import { FaTrash, FaEdit, FaEye, FaPlus } from 'react-icons/fa'; 
import Modal from '../components/Modal';
import { getFavorites, removeFavorite } from '../utils/localStorageUtils';
import { useNavigate } from 'react-router-dom';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deletePackage, setDeletePackage] = useState('');
  const navigate = useNavigate()

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const handleDelete = () => {
    removeFavorite(deletePackage);
    setFavorites(getFavorites());
    setShowModal(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">NPM Favorite Packages</h1>

      {/* Add Favorite Button */}
      <div className="mb-4 flex justify-end">
        <button
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => navigate('/')}
        >
          <FaPlus className="mr-2" />
          Add Favorite
        </button>
      </div>

      {favorites.length === 0 && (
        <p className="text-gray-500">No favorites added yet. Add some!</p>
      )}

      {favorites.map((fav) => (
        <div
          key={fav.packageName}
          className="border p-4 mb-2 flex justify-between items-center rounded"
        >
          <div>
            <h2 className="font-bold text-lg">{fav.packageName}</h2>
            <p className="text-gray-700">{fav.reason}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <button
              className="p-2 text-blue-500 hover:text-blue-600"
              onClick={() => alert(`Viewing details of ${fav.packageName}`)}
            >
              <FaEye size={20} />
            </button>
            <button
              className="p-2 text-green-500 hover:text-green-600"
              onClick={() => alert(`Editing ${fav.packageName}`)}
            >
              <FaEdit size={20} />
            </button>
            <button
              className="p-2 text-red-500 hover:text-red-600"
              onClick={() => {
                setDeletePackage(fav.packageName);
                setShowModal(true);
              }}
            >
              <FaTrash size={20} />
            </button>
          </div>
        </div>
      ))}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showModal}
        title="Confirm Deletion"
        onClose={() => setShowModal(false)}
      >
        <p>Are you sure you want to delete this favorite?</p>
        <div className="flex justify-end mt-4">
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 mr-2"
            onClick={() => setShowModal(false)}
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
    </div>
  );
};

export default Favorites;
