"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUserContext } from "@/context/UserContext";
import { aosall } from "@/lib/aos";
import { imageToDiscord,  } from "@/lib/api"; // <- เพิ่ม
import { showAlert } from "@/lib/sweetAlert";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const { user, cart } = useUserContext();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState(""); // ✅ ใส่ code
  const [discountedPrice, setDiscountedPrice] = useState(cart.price); // ✅ ราคาหลังลด

  useEffect(() => {
    if (cart.price === 0) {
      router.push("/profile");
    } else {
      setLoading(true);
    }
  }, [cart.price, router]);

  const handleCoupon = async () => {
    try {
      const res = await fetch("/api/validate-coupon", {
        method: "POST",
        body: JSON.stringify({
          code: couponCode,
          userId: user.id,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Invalid code");

      const newPrice = cart.price - data.discount
      
      setDiscountedPrice(Math.max(0, Math.round(newPrice)));
      showAlert("สำเร็จ", `ใช้โค้ดสำเร็จ ลดราคาแล้ว`, "success");
    } catch (error: any) {
      showAlert("ผิดพลาด", error.message || "โค้ดไม่ถูกต้อง", "error");
    }
  };
  
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
      const response = await imageToDiscord(
        selectedFile,
        discountedPrice.toString(),
        user.username,
        cart.product
      );
      console.log(response);
      showAlert("Success", "Upload successful!", "success");
      router.push("/profile");
      setLoading(false);
    } catch (error) {
      showAlert("Error", "Upload failed: " + error, "error");
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
        <div {...aosall} className="grid grid-cols-1 gap-4">
          <div className="bg-slate-200 dark:bg-slate-600 p-4 w-fit mx-auto">
            <img
              src={`https://promptpay.io/1103000131521/${discountedPrice}`}
              className="w-60 h-60 mx-auto"
              alt=""
            />
            <div className="mt-5 space-y-1 text-gray-400">
              <p>คำสั่งซื้อ: {cart.product}</p>
              <p>ราคาเต็ม: {cart.price} Baht</p>
              {discountedPrice !== cart.price && (
                <p>ราคาหลังใช้โค้ด: <span className="text-green-500">{discountedPrice} Baht</span></p>
              )}
            </div>

            <div className="flex mt-4 gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="w-full px-2 py-1 border rounded text-black"
                placeholder="ใส่โค้ดคูปอง"
              />
              <button
                onClick={handleCoupon}
                className="px-3 py-1 bg-indigo-700 text-white rounded hover:bg-indigo-800"
              >
                ใช้โค้ด
              </button>
            </div>

            <p className="text-gray-400 mt-4">อัปโหลดสลิปโอนเงิน</p>
            <div className="flex flex-col items-center">
              <label
                htmlFor="file-upload"
                className="cursor-pointer bg-slate-800 hover:bg-slate-900 text-white py-2 px-4"
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
                <p className="text-gray-400 mt-2">Selected: {selectedFile.name}</p>
              )}
            </div>

            <button
              onClick={handleUpload}
              className="w-full bg-yellow-800 hover:bg-yellow-900 text-white py-2 mt-2"
            >
              {loading ? "ยืนยันการชำระเงิน" : "Uploading..."}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
