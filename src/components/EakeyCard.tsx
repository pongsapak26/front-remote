import React from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";

export type ResEaKey = {
  trailingfibo: string;
  trailingrang: string;
  breakeventrigger: string;
  breakevenrang: string;
  exp: Date;
  account: string;
  eaName: string;
  eaapiKey: string;
  _id: string;
};
// ฟังก์ชันสำหรับคำนวณจำนวนวันที่เหลือ
const calculateDaysRemaining = (exp: Date | string): string => {
  const today = new Date();
  const expirationDate = new Date(exp); // แปลง exp ให้เป็น Date object
  const diffTime = expirationDate.getTime() - today.getTime(); // คำนวณความต่างของเวลา (มิลลิวินาที)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // แปลงเป็นจำนวนวัน
  return diffDays > 0 ? `${diffDays} days remaining` : "Expired"; // แสดงข้อความตามเงื่อนไข
};

const EakeyCard = ({
  trailingfibo,
  trailingrang,
  breakeventrigger,
  breakevenrang,
  exp,
  eaapiKey,
  _id,
  account,
}: ResEaKey) => {
  const router = useRouter();
  const handleNavigate = (slug: string) => {
    router.push(`/profile/${slug}`); // นำทางไปยังหน้า /profile/test
  };
  return (
    <div className="bg-gray-900 text-white">
      <div className="p-5">
        <h1 className="text-2xl font-bold mb-4">Eakey Name</h1>
        <div className="flex items-center justify-between mb-2">
          <p className="text-lg">EA Key </p>
          <p>{eaapiKey}</p>
        </div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-lg">Account </p>
          <p>{account}</p>
        </div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-lg">trailing fibo </p>
          <p>{trailingfibo}</p>
        </div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-lg">trailing rang </p>
          <p>{trailingrang}</p>
        </div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-lg">breakeven trigge </p>
          <p>{breakeventrigger}</p>
        </div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-lg">breakeven rang </p>
          <p>{breakevenrang}</p>
        </div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-lg">EXP </p>
          <p>{calculateDaysRemaining(exp)}</p> {/* ใช้ฟังก์ชันที่แยกออกมา */}
        </div>
        <Button
          type="button"
          label="Edit Eakey"
          onClick={() => handleNavigate(_id)} // Navigate to /profile/test
        />
        <button
          onClick={() => {
            router.push(`/order`); // Redirect to order page
            // Handle save logic here
          }}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 mt-2  cursor-pointer"
        >
          Extend subscription
        </button>
      </div>
    </div>
  );
};

export default EakeyCard;
