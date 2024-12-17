import React from 'react';
import { FaTimes } from 'react-icons/fa';

const Modal = ({ isOpen, title, children, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded w-96 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <FaTimes size={20} />
        </button>
        <h2 className="text-xl mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default Modal;
