import React from 'react';

const TextArea = ({ value, onChange, placeholder }) => (
  <textarea
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="border p-2 rounded w-full"
    placeholder={placeholder}
  />
);

export default TextArea;

