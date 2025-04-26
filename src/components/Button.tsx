import React from 'react';

interface ButtonProps {
  type: "button" | "submit";
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  label: string;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ type, onClick, label, loading }) => {
  if (loading) {
    return (
      <button
        type={type}
        disabled
        className="w-full bg-gray-600 text-white py-2 mt-4 cursor-not-allowed"
      >
        Loading...
      </button>
    );
  }
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full transition-all rounded-md bg-gray-600 hover:bg-gray-700 text-white p-2 mt-4 cursor-pointer"
    >
      {label}
    </button>
  );
};

export default Button;
