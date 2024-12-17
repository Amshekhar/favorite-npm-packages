import React from 'react';

const Button = ({ text, onClick, type = 'button', variant = 'primary' }) => {
  const variants = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    secondary: 'bg-gray-500 hover:bg-gray-600 text-white',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
  };

  return (
    <button
      type={type}
      className={`px-4 py-2 rounded ${variants[variant]}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
