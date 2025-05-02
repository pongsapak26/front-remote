"use client";

import { useUserContext } from "@/context/UserContext";
import { aosall } from "@/lib/aos";
import { imageToDiscord } from "@/lib/api";
import { showAlert } from "@/lib/sweetAlert";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const { user, cart } = useUserContext();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  // ใช้ useEffect สำหรับการตรวจสอบ cart.price
  useEffect(() => {
    if (cart.price === 0) {
      router.push("/profile");
    } else {
      setLoading(true);
    }
  }, [cart.price, router]);
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
        user.username,
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
    <div className="flex align-middle justify-center pt-30">
      <div className="container m-auto p-4">
        <h1 className="text-3xl font-bold mb-8 text-center">ชำระเงิน</h1>
        <div
          {...aosall}
          className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-4"
        >
          <div className="bg-slate-200 dark:bg-slate-600 p-4 flex flex-col justify-center align-middle w-fit mx-auto">
            <img
              src={`https://promptpay.io/${process.env.NEXT_PUBLIC_PHONE_PAYMENT}/${cart.price}`}
              className="w-60 h-60 mx-auto"
              alt=""
            />
            <div className="flex justify-between items-center mt-5">
              <p className="text-gray-400 mb-2">คำสั่งซื้อ:</p>
              <p className="text-gray-400 mb-2">{cart.product} Baht</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-400 mb-2">ราคา:</p>
              <p className="text-gray-400 mb-2">{cart.price} Baht</p>
            </div>
            <p className="text-gray-400 mb-2">Upload your payment proof</p>
            <div className="flex flex-col items-center">
              <label
                htmlFor="file-upload"
                className="cursor-pointer transition-all text-white bg-slate-800 hover:bg-slate-900 py-2 px-4 text-center"
              >
                เลือกสลิป
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
              className="w-full transition-all bg-yellow-800 hover:bg-yellow-900 text-white py-2 mt-2 cursor-pointer"
            >
              {!loading ? "Uploading..." : "ยืนยันการชำระเงิน"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
