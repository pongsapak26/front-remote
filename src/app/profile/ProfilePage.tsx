"use client";
import EakeyCard from "@/components/EakeyCard";
import { getUserProfile, logout } from "@/lib/api";
import { showAlert } from "@/lib/sweetAlert";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const router = useRouter();
  const [user, setuser] = useState({
    username: "",
    email: "",
    _id: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const res = await getUserProfile(); // Replace with your actual function to get user profile
      if (res.status === 400) {
        router.push("/login"); // Redirect to login page if user is not authenticated
      }
      setuser(res); // Set user data to state
    };
    fetchUserProfile();
    setLoading(true); // Set loading to true while fetching user profile
  }, []);

  const handleLogout = async () => {
    try {
      setLoading(true);
      const data = await logout();
      if (data) {
        router.push("/login"); // Redirect to login page after successful logout
      }
      showAlert("Success", "Registration successful!", "success");
      // Do something with the data (e.g., redirect or show success message)
    } catch (error) {
      showAlert("Error", "Registration failed" + error, "error");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  if (!loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="loader"></div> {/* Add your loading spinner here */}
      </div>
    );
  }
  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Wellcom {user.username}</h1>
        <div>
          <h1 className="text-2xl font-bold mb-1">
            EXP {new Date().toLocaleString()}
          </h1>
          <button
            onClick={() => {
              handleLogout();
            }}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2  cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="bg-gray-800 p-4 shadow-lg grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="col-span-4 md:col-span-2 lg:col-span-1">
          <EakeyCard data="Eakey Card" />
        </div>
        <div className="col-span-4 md:col-span-2 lg:col-span-1">
          <EakeyCard data="Eakey Card" />
        </div>
        <div className="col-span-4 md:col-span-2 lg:col-span-1">
          <EakeyCard data="Eakey Card" />
        </div>
        <div className="col-span-4 md:col-span-2 lg:col-span-1">
          <EakeyCard data="Eakey Card" />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
