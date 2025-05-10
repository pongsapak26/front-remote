"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUserContext } from "@/context/UserContext";
import { aosall } from "@/lib/aos";
import { imageToDiscord } from "@/lib/api"; // <- เพิ่ม
import { showAlert } from "@/lib/sweetAlert";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const { user, checkout, eatype } = useUserContext();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState(""); // ✅ ใส่ code
  const [couponCodeId, setCouponCodId] = useState("0"); // ✅ ใส่ code
  const [discountedPrice, setDiscountedPrice] = useState(checkout.price); // ✅ ราคาหลังลด

  useEffect(() => {
    if (checkout.price === 0) {
      router.push("/profile");
    } else {
      setLoading(true);
    }
  }, [checkout.price, router]);

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

      const newPrice = checkout.price - data.discount;

      setDiscountedPrice(Math.max(0, Math.round(newPrice)));
      setCouponCodId(data.id);
      showAlert("สำเร็จ", `ใช้โค้ดสำเร็จ ลดราคาแล้ว`, "success");
    } catch (error: any) {
      setCouponCodId("0");
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
    // setLoading(true);
    const file = new File(["mock content"], "mock-file.txt", {
      type: "text/plain",
    });
    
    if (!selectedFile && discountedPrice > 0) {
      alert("Please select a file before uploading.");
      return;
    }
    try {
      const response = await imageToDiscord(
        selectedFile || file,
        discountedPrice.toString(),
        user.username,
        checkout.product,
        user.id,
        couponCodeId,
        eatype
      );
      console.log(response);
      showAlert("Success", "Upload successful!", "success");
      router.push("/profile");
      // setLoading(false);
    } catch (error) {
      showAlert("Error", "Upload failed: " + error, "error");
      // setLoading(false);
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
            <div className="bg-white p-5">
              <img
                src={`/images/thaiQR_logo.jpg`}
                className="w-72 h-auto mx-auto mb-1"
              />
              <img
                src={`/images/promptPay_logo.jpg`}
                className="w-32 h-auto mx-auto mb-1"
              />
              <img
                src={`https://promptpay.io/1103000131521/${discountedPrice}`}
                className="w-60 h-60 mx-auto"
                alt=""
              />
            </div>
            <div className="mt-5 space-y-1 text-gray-400">
              <p>คำสั่งซื้อ: {checkout.product}</p>
              <p>ราคาเต็ม: {checkout.price} Baht</p>
              {discountedPrice !== checkout.price && (
                <p>
                  ราคาหลังใช้โค้ด:{" "}
                  <span className="text-green-500">{discountedPrice} Baht</span>
                </p>
              )}
            </div>

            <div className="flex my-2 gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="w-3/4 border rounded text-black p-3"
                placeholder="ใส่โค้ดคูปอง"
              />
              <button
                onClick={handleCoupon}
                className="p-3 bg-slate-700 text-white rounded hover:bg-slate-800"
              >
                ใช้โค้ด
              </button>
            </div>

            {discountedPrice <= 0 ? (
              ""
            ) : (
              <>
                <p className="text-gray-400 mt-4">อัปโหลดสลิปโอนเงิน</p>
                <div className="flex flex-col items-center">
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer bg-slate-700 hover:bg-slate-800 text-white py-2 px-4 mt-4"
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
                    <p className="text-gray-400 mt-4">
                      Selected: {selectedFile.name}
                    </p>
                  )}
                </div>
              </>
            )}

            <button
              onClick={handleUpload}
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 mt-4"
            >
              {loading ? "ยืนยันการชำระเงิน" : "Uploading..."}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
