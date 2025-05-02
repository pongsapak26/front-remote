"use client";
import Allea from "@/components/Allea";
import Button from "@/components/Button";
import EakeyCard, { ResEaKey } from "@/components/EakeyCard";
import Modal from "@/components/Modal";
import { aosall } from "@/lib/aos";
import { createEakey, getEakey } from "@/lib/api";
import { showAlert } from "@/lib/sweetAlert";
import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const [product, setproduct] = useState(false);
  const [eakey, seteakey] = useState<ResEaKey[]>([]); // Initialize eakey state
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchEakey = async () => {
      const res = await getEakey(); 
      try {
        seteakey(res.eakeys); // Set eakey data to state
      } catch (err) {
        console.log(err);
      }
    };
    fetchEakey();
    setLoading(true); // Set loading to true while fetching user profile
  }, [product]);

  const handlerCreateEakey = async (type: string) => {
    try {
      const response = await createEakey(type);
      if (response.message === "Key limit reached") {
        console.log(response.data);
        showAlert("Error", response.message, "error");
      }
      if (response.message === "EA Add successfully") {
        showAlert("Success", response.message, "success");
        setproduct(!product);
      }
    } catch (error) {
      console.error("Error creating EA key:", error);
    }
  };
  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        {/* <div className="md:w-1/2 md:mb-0 mb-4">
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
        </div> */}
        {/* <div>
          <h1 className="text-2xl font-bold mb-1">
            EXP {new Date().toLocaleString()}
          </h1>
        </div> */}
      </div>
      <div
        {...aosall}
        className="bgbox p-4 shadow-lg grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {eakey.length === 0 && (
          <div className="col-span-2 lg:col-span-4 text-center">
            <h1 className="text-2xl font-bold mb-1">No EA Key</h1>
            <p className="text-gray-500">Please add EA Key</p>
          </div>
        )}
        {eakey.map((item: ResEaKey, index) => (
          <div key={index} className="col-span-2 md:col-span-2 lg:col-span-1">
            <EakeyCard {...item} />
          </div>
        ))}
        <div className="col-span-4 text-center">
          <div className="w-fit mx-auto">
            <Button
              type="button"
              label="Add EA Key"
              loading={!loading}
              onClick={() => {
                setproduct(true);
              }}
            />
          </div>
        </div>
      </div>
      <Modal
        isOpen={product}
        onClose={() => {
          setproduct(!product);
        }}
      >
        <Allea handlerCreateEakey={handlerCreateEakey} />
      </Modal>
    </div>
  );
};

export default ProfilePage;
