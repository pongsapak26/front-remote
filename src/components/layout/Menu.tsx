"use client";

import { useState } from "react";

export default function Menu({menuItems}: { menuItems: { label: string; path: string }[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative md:hidden">
      {/* User Icon Button */}
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open main menu</span>
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>
      {/* Modal Menu */}
      <div
        className={`${
          open ? "top-14 left-0" : "-top-40 -left-40"
        } transition-all absolute  mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg overflow-hidden z-20`}
      >
        {
            menuItems.map((item) => 
            {
                return (
                    <a
                        key={item.path}
                        href={item.path}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        {item.label}
                    </a>
                )
            }
            )
        }
      </div>
    </div>
  );
}
