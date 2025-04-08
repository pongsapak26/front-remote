"use client";

import { useUserContext } from "@/context/UserContext";
import { imageToDiscord } from "@/lib/api";
import { showAlert } from "@/lib/sweetAlert";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const router = useRouter();
  const { cart } = useUserContext();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  if (cart.price === 0) {
    router.push("/profile");
  }else {
    setLoading(true);
  }
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // ดึงไฟล์แรกที่ผู้ใช้เลือก
    if (file) {
      setSelectedFile(file);
      console.log("Selected file:", file.name); // แสดงชื่อไฟล์ใน console
    }
  };
  
  const handleUpload = async () => {
    setLoading(true);
    if (!selectedFile) {
      alert("Please select a file before uploading.");
      return;
    }
    try {
      // เรียกใช้ฟังก์ชัน imageToDiscord
      const response = await imageToDiscord(
        selectedFile,
        cart.price.toString(),
        cart.username,
        cart.product
      );
      console.log(response);
      showAlert("Success", "Upload successful!", "success");
      router.push("/profile");
      setLoading(false);
    } catch (error) {
      showAlert("Error", "Login failed" + error, "error");
      setLoading(false);
    }
  };

  if (!loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Extend subscription
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-4">
        <div className=" p-4 flex flex-col justify-center align-middle w-fit mx-auto bg-gray-800">
          <img
            src={`https://promptpay.io/${process.env.NEXT_PUBLIC_PHONE_PAYMENT}/${cart.price}`}
            className="w-60 h-60 mx-auto"
            alt=""
          />
          <h2 className="text-xl text-center font-bold my-2">{cart.product}</h2>
          <p className="text-gray-400 mb-2">Price: {cart.price} Baht</p>
          <p className="text-gray-400 mb-2">Duration: 30 Days</p>
          <p className="text-gray-400 mb-2">Upload your payment proof</p>
          <div className="flex flex-col items-center">
            <label
              htmlFor="file-upload"
              className="cursor-pointer bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 text-center"
            >
              Choose File
            </label>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
            {selectedFile && (
              <p className="text-gray-400 mt-2">
                Selected file: {selectedFile.name}
              </p>
            )}
          </div>
          <button
            onClick={handleUpload}
            className="w-full bg-yellow-800 hover:bg-yellow-900 text-white py-2 mt-2 cursor-pointer"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
    
        </div>
      </div>

      <button
        onClick={() => {
          router.push(`/profile`);
          // Handle save logic here
        }}
        className="w-1/4 bg-red-600 hover:bg-red-700 text-white py-2 mt-4 cursor-pointer mx-auto block text-center"
      >
        Back
      </button>
    </div>
  );
}
