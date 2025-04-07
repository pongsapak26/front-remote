import React from 'react';

interface InputProps {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  addclass?: string;
}

const Input: React.FC<InputProps> = ({ type, name, placeholder, value, onChange, addclass }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-2 bg-black text-gray-100 ${addclass}`}
    />
  );
};

export default Input;