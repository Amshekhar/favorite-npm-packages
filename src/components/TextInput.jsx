import React from 'react';

const TextInput = ({ value, onChange, placeholder }) => (
  <input
    type="text"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="border p-2 rounded w-full"
    placeholder={placeholder}
  />
);

export default TextInput;

