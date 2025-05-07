import React from "react";

interface InputProps {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  addclass?: string;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  addclass,
  required
}) => {
  return (
    <>
      <label
        htmlFor={name}
        className="text-sm text-gray-900 dark:text-gray-100"
      >
        {placeholder}
      </label>
      <input
        required={required}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2 text-gray-900 bg-gray-200 dark:bg-gray-800 dark:text-gray-100  rounded-md  ${addclass}`}
      />
    </>
  );
};

export default Input;
