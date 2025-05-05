"use client";

import { useUserContext } from "@/context/UserContext";
import { logout } from "@/lib/api";
import { showAlert } from "@/lib/sweetAlert";
import { Moon, Sun, User, UserPen } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function UserMenu() {
  const { user } = useUserContext();
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null); // ใช้สำหรับอ้างอิง UserMenu
  const [username, setUsername] = useState("");
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false); // ปิด UserMenu หากคลิกนอกเมนู
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const data = await logout();
      if (data) {
        window.location.reload(); // Redirect to login page after successful logout
      }
      showAlert("Success", "Registration successful!", "success");
      // Do something with the data (e.g., redirect or show success message)
    } catch (error) {
      showAlert("Error", "Registration failed" + error, "error");
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };
  useEffect(() => {
    const storedName = user.username || localStorage.getItem("username");
    setUsername(storedName || ""); // Set the username from user context or local storage
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* User Icon Button */}
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition flex "
      >
        {(user.username || username) ?? (
          <div className="mr-2">
            <span>{user.username || username}</span>
          </div>
        )}
        <User className="w-6 h-6" />
      </button>
      {/* Modal Menu */}
      <div
        className={`${
          open ? "top-14 " : "-top-80"
        } transition-all absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg overflow-hidden z-20`}
      >
        {user.username != "" ? (
          <>
            <Link
              href="/profile"
              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Profile
            </Link>
            <Link
              href="/transaction"
              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Transaction
            </Link>

            <div
              onClick={() => {
                handleLogout();
              }}
              className="cursor-pointer block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Logout
            </div>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setOpen(!open)}
            >
              <div className="flex">
                <User className="w-4 h-4 my-auto" />
                <div className="ml-2">Login</div>
              </div>
            </Link>
            <Link
              href="/register"
              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setOpen(!open)}
            >
              <div className="flex">
                <UserPen className="w-4 h-4 my-auto" />
                <div className="ml-2">Register</div>
              </div>
            </Link>
          </>
        )}
        <Link
          href="/product"
          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Product
        </Link>
        <Link
          href="/terms-and-conditions"
          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Terms And Conditions
        </Link>
        <Link
          href="/privacy-policy"
          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Privacy Policy
        </Link>
        <div
          onClick={() => {
            toggleDarkMode();
          }}
          className="cursor-pointer block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {darkMode ? (
            <div className="flex">
              <Sun className="w-4 h-4 my-auto" />
              <div className="ml-2">Light Mode</div>
            </div>
          ) : (
            <div className="flex items-center">
              <Moon className="w-4 h-4 my-auto" />
              <div className="ml-2">Dark Mode</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
