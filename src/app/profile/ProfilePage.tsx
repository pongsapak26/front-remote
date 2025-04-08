"use client";
import EakeyCard, { ResEaKey } from "@/components/EakeyCard";
import { useUserContext } from "@/context/UserContext";
import { createEakey, getEakey, getUserProfile, logout } from "@/lib/api";
import { showAlert } from "@/lib/sweetAlert";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const router = useRouter();
  const [user, setuser] = useState({
    username: "",
    email: "",
    keylimit: "",
    _id: "",
  });
  const [eakey, seteakey] = useState<ResEaKey[]>([]); // Initialize eakey state
  const [loading, setLoading] = useState(false);
  const { setCart } = useUserContext(); // Use context to get cart and setCart
  useEffect(() => {
    const fetchUserProfile = async () => {
      const res = await getUserProfile(); // Replace with your actual function to get user profile
      if (res.status === 400) {
        router.push("/login"); // Redirect to login page if user is not authenticated
      }
      setuser(res); // Set user data to state
    };
    const fetchEakey = async () => {
      const res = await getEakey(); // Replace with your actual function to get eakey
      if (res.status === 400) {
        router.push("/login"); // Redirect to login page if user is not authenticated
      }
      seteakey(res.eakeys); // Set eakey data to state
    };
    fetchEakey();
    fetchUserProfile();
    setCart({ userId: "", username: "", price: 0, product: "" });
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

  const handleCreateEakey = async () => {
    try {
      setLoading(false);
      const data = await createEakey(); // Replace with your actual function to create eakey
      if (data.message === "Key limit reached") {
        showAlert("Error", "Key limit reached", "error");
      } else {
        showAlert("Success", data.message, "success");
      }
    } catch (error) {
      showAlert("Error", "failed" + error, "error");
    } finally {
      setLoading(true); // Stop loading
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
        <div className="w-1/2 ">
          <h1 className="text-2xl font-bold">
            Wellcom {user.username} Keylimit : {user.keylimit}
          </h1>
          <div className="flex flex-row gap-2 mt-4">
            <button
              onClick={() => {
                handleCreateEakey();
              }}
              className="w-full bg-green-800 hover:bg-green-900 text-white py-2 cursor-pointer"
            >
              Add Key
            </button>
            <button
              onClick={() => {
                router.push(`/order`); // Redirect to order page
                // Handle save logic here
              }}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 cursor-pointer"
            >
              Buy Key
            </button>
            <button
              onClick={() => {
                router.push(`/transaction`); // Redirect to order page
                // Handle save logic here
              }}
              className="w-full bg-blue-800 hover:bg-blue-900 text-white py-2 cursor-pointer"
            >
              Order Status
            </button>
          </div>
        </div>
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
        {eakey.map((item: ResEaKey, index) => (
          <div key={index} className="col-span-2 md:col-span-2 lg:col-span-1">
            <EakeyCard {...item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
