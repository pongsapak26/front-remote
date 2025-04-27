import { Save } from 'lucide-react';
import React from 'react';

interface ButtonProps {
  type: "button" | "submit";
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  label: string;
  loading?: boolean;
  addicon?: string;
}

const Button: React.FC<ButtonProps> = ({ type, onClick, label, loading,addicon }) => {
  if (loading) {
    return (
      <button
        type={type}
        disabled
        className="w-full bg-sky-500 py-2 mt-4 cursor-not-allowed text-white"
      >
        Loading...
      </button>
    );
  }
  const propicon = addicon == 'save' ? <Save className='w-5 h-5' /> : "";
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full flex justify-center items-center transition-all rounded-md bg-sky-500 hover:bg-sky-600 p-2 mt-4 cursor-pointer text-white"
    >
     <span className='mr-2'>{propicon}</span>
     <span>{label}</span>
    </button>
  );
};

export default Button;
