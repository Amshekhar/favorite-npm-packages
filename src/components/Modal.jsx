import React from 'react';
import Button from './Button';

const Modal = ({ isOpen, title, children, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4  rounded w-96">
        <h2 className="text-xl mb-4">{title}</h2>
        {children}
        <div className="flex justify-end mt-4">
          <Button text="Close" onClick={onClose} variant="secondary" />
        </div>
      </div>
    </div>
  );
};

export default Modal;
