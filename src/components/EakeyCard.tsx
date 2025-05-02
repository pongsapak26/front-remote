import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarCheck,
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  EllipsisVertical,
} from "lucide-react";
import TopRightAlert from "./TopRightAlert";

export type ResEaKey = {
  trailingfibo: string;
  trailingrang: string;
  breakeventrigger: string;
  breakevenrang: string;
  buyStart: string;
  buyEnd: string;
  sellStart: string;
  sellEnd: string;
  buylot: string;
  selllot: string;
  buylotlimit: string;
  selllotlimit: string;
  exp: Date;
  account: string;
  eaName: string;
  eaapiKey: string;
  id: string;
  type: string;
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
  id,
  account,
  eaName,
  type,
  buyStart,
  buyEnd,
  sellStart,
  sellEnd,
  buylot,
  selllot,
  buylotlimit,
  selllotlimit,
}: ResEaKey) => {
  const router = useRouter();
  const [detail, setdetail] = useState(false);
  const [showalert, setshowalert] = useState(false);

  const handleNavigate = (slug: string) => {
    router.push(`/profile/${slug}`); // นำทางไปยังหน้า /profile/test
  };

  // ฟังก์ชันสำหรับคัดลอกข้อมูลไปยังคลิปบอร์ด
  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setshowalert(true);
        setTimeout(() => {
          setshowalert(false);
        }, 2000);
      },
      (err) => {
        console.error("Failed to copy: ", err);
      }
    );
  };

  const afterExp = calculateDaysRemaining(exp);
  return (
    <div
      className={`bgallbox ${
        afterExp === "Expired" ? "border-slate-400" : "border-slate-400"
      } border-2`}
    >
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">{eaName}</h1>
          <div>
            <div
              className={`${
                detail ? "bg-slate-200 dark:bg-slate-600" : "bg-slate-200 dark:bg-slate-600"
              } w-8 h-8 rounded-full flex flex-col shadow-sm hover:shadow-lg justify-center items-center cursor-pointer transition-colors hover:bg-slate-200`}
              onClick={() => setdetail(!detail)}
            >
              {detail ? (
                <ChevronUp className="w-6 h-6" />
              ) : (
                <ChevronDown className="w-6 h-6" />
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-lg text-slate-400">Expiry Date </p>
          <p>{afterExp}</p> {/* ใช้ฟังก์ชันที่แยกออกมา */}
        </div>
        <div
          className={`${
            detail ? "block" : "hidden"
          } transition-all mb-2 bg-slate-1t00 p-4 rounded-lg`}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-lg text-slate-400">EA Key </p>
            <div className="flex items-center gap-2">
              <p>{eaapiKey.slice(0, 4)}****</p>
              <div>
                <div
                  className="w-7 h-7 p-2 shadow-lg rounded-full flex flex-col justify-center items-center cursor-pointer transition-colors hover:bg-slate-200"
                  onClick={() => handleCopyToClipboard(eaapiKey)}
                >
                  <Copy className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-lg text-slate-400">Account </p>
            <p>{account}</p>
          </div>
          {type === "rsi" && (
            <>
              <div className="flex items-center justify-between mb-2">
                <p className="text-lg text-slate-400">Buy Start </p>
                <p>{buyStart}</p>
              </div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-lg text-slate-400">Buy End </p>
                <p>{buyEnd}</p>
              </div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-lg text-slate-400">Sell Start </p>
                <p>{sellStart}</p>
              </div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-lg text-slate-400">Sell End </p>
                <p>{sellEnd}</p>
              </div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-lg text-slate-400">Buy lot </p>
                <p>{buylot}</p>
              </div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-lg text-slate-400">Sell lot </p>
                <p>{selllot}</p>
              </div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-lg text-slate-400">Buy lot limit </p>
                <p>{buylotlimit}</p>
              </div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-lg text-slate-400">Sell lot limit </p>
                <p>{selllotlimit}</p>
              </div>
            </>
          )}
          {type === "sl" && (
            <>
              <div className="flex items-center justify-between mb-2">
                <p className="text-lg text-slate-400">Trailing Trigger : </p>
                <p>{trailingfibo}</p>
              </div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-lg text-slate-400">Trailing Range : </p>
                <p>{trailingrang}</p>
              </div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-lg text-slate-400">Breakeven Trigger : </p>
                <p>{breakeventrigger}</p>
              </div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-lg text-slate-400">Breakeven Range : </p>
                <p>{breakevenrang}</p>
              </div>
            </>
          )}
        </div>
        <div className="flex items-center justify-between mt-5 ">
          <div className="flex gap-2 w-full justify-around">
            <div>
              <div
                className="w-9 h-9 p-2 shadow-lg rounded-full flex flex-col justify-center items-center cursor-pointer transition-colors hover:bg-slate-200 dark:bg-slate-600 hover:dark:bg-slate-700"
                onClick={() => {
                  router.push(`/order`); // Redirect to order page
                  // Handle save logic here
                }}
              >
                <CalendarCheck className="w-7 h-7" />
              </div>
              <h3 className="mt-3">Sub</h3>
            </div>
            <div>
              <div
                className="w-9 h-9 p-2 shadow-lg rounded-full flex flex-col justify-center items-center cursor-pointer transition-colors hover:bg-slate-200 dark:bg-slate-600  hover:dark:bg-slate-700"
                onClick={() => handleNavigate(id)}
              >
                <EllipsisVertical className="w-7 h-7" />
              </div>
              <h3 className="mt-3">Edit</h3>
            </div>
          </div>
        </div>
      </div>
      {showalert && <TopRightAlert message="Copy EA Key" icon={<Check />} />}
    </div>
  );
};

export default EakeyCard;
