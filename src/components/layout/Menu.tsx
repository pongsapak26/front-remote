"use client";

import { UserPen } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Menu({
  menuItems,
}: {
  menuItems: { label: string; path: string }[];
}) {
  const [openmenu, setOpenmenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenmenu(false); // ปิด UserMenu หากคลิกนอกเมนู
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative md:hidden">
      {/* User Icon Button */}
      <button
        onClick={() => setOpenmenu(!openmenu)}
        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
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
        ref={menuRef}
        className={`${
          openmenu ? "top-14" : "-top-40"
        } transition-all absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg overflow-hidden z-20`}
      >
        {menuItems.map((item) => {
          return (
            <Link
              key={item.path}
              href={item.path}
              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <div className="flex">
                <UserPen className="w-4 h-4 my-auto" />
                <div className="ml-2">{item.label}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
