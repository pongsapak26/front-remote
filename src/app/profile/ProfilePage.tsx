"use client";
import Button from "@/components/Button";
import EakeyCard, { ResEaKey } from "@/components/EakeyCard";
import { useUserContext } from "@/context/UserContext";
import { aosall } from "@/lib/aos";
import { createEakey, getEakey, getUserProfile } from "@/lib/api";
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
  const { cart, setCart } = useUserContext(); // Use context to get cart and setCart
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
    setCart({ ...cart, price: 0, product: "" });
    setLoading(true); // Set loading to true while fetching user profile
  }, []);

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
        <div className="md:w-1/2 md:mb-0 mb-4">
          <h1 className="text-2xl font-bold">
            Wellcom {user.username} Keylimit : {user.keylimit}
          </h1>
          <div className="flex flex-row gap-2 my-4">
            {user.keylimit !== "0" ? (
              <button
                onClick={() => {
                  router.push(`/order`); // Redirect to order page
                  // Handle save logic here
                }}
                className="w-full transition-all btn-bggreen text-white mt-4 cursor-pointer"
              >
                Buy Key
              </button>
            ) : (
              <button
                onClick={() => {
                  handleCreateEakey();
                }}
                className="w-full transition-all btn-bggreen text-white mt-4 cursor-pointer"
              >
                Add Key
              </button>
            )}
            <Button
              type="button"
              label="Order Status"
              onClick={() => {
                router.push(`/transaction`); // Redirect to order page
                // Handle save logic here
              }}
            />
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-1">
            EXP {new Date().toLocaleString()}
          </h1>
        </div>
      </div>
      <div
        {...aosall}
        className="bgbox p-4 shadow-lg grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
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
