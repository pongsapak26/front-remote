"use client";

import { MenuIcon, UserPen } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Menu({
  menuItems,
}: {
  menuItems: { label: string; path: string }[];
}) {
  const [openmenu, setOpenmenu] = useState(false);
  const menuAllRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuAllRef.current &&
        !menuAllRef.current.contains(event.target as Node)
      ) {
        console.log("Clicked outside, closing menu"); // Debugging
        setOpenmenu(false); // ปิดเมนูเมื่อคลิกนอกเมนู
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative md:hidden" ref={menuAllRef}>
      {/* User Icon Button */}
      <button
        onClick={() => {
          setOpenmenu(!openmenu);
        }}
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition flex"
      >
        <MenuIcon className="w-6 h-6" />
      </button>
      {/* Modal Menu */}
      <div
        className={`${
          openmenu ? "top-14" : "-top-48"
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
