"use client";

import Herobanner from "@/components/Herobanner";
import PriceCard from "@/components/PriceCard";

export default function Home() {
  return (
    <div className="">
      <div>
        <Herobanner />
      </div>
      <div className="py-10 from-blue-400 to-blue-800 bg-gradient-to-t">
        <PriceCard />
      </div>
      <div className="py-20 from-gray-700 to-gray-950 bg-gradient-to-t ">
        <div className="container mx-auto">
          <div className="mt-20 relative">
            <img
              data-aos="fade-up-left"
              data-aos-duration="1000"
              src="/images/home1.webp"
              className="xl:rounded-md xl:w-1/2"
              alt="Trader"
            />
            <div
              data-aos="fade-down-right"
              data-aos-duration="500"
              className="xl:absolute -top-20 right-10 xl:w-1/2"
            >
              <div className="bg-gray-50 hover:bg-gray-200 transition-all cursor-pointer text-black xl:rounded-md text-lg p-8">
                <div className="text-3xl mb-5">
                  ระบบจัดการคีย์ EA สำหรับเทรดเดอร์มืออาชีพ
                </div>
                <div className="mb-5">
                  EA Key คือระบบจัดการการเข้าถึง Expert Advisor (EA) สำหรับ
                  MetaTrader 4/5 ที่ช่วยให้คุณสามารถกำหนดสิทธิ์การใช้งาน,
                  ตรวจสอบผู้ใช้,
                  และป้องกันการใช้งานโดยไม่ได้รับอนุญาตได้อย่างมีประสิทธิภาพ
                </div>
                <div className="mb-5">
                  👤 เหมาะสำหรับใคร?
                  <br />
                  ผู้พัฒนา EA ที่ต้องการแจกจ่ายหรือขาย EA
                  <br />
                  พร้อมระบบควบคุม เทรดเดอร์ที่ต้องการความปลอดภัยในการใช้งาน EA
                  <br />
                  เจ้าของระบบเทรดที่ต้องการดูแลลูกค้าและควบคุมการเข้าถึง
                </div>
                <a
                  href="/register"
                  className="py-2.5 px-5 bg-blue-600 shadow-sm transition-all duration-500 text-base text-white font-semibold text-center w-fit mx-auto hover:bg-blue-700"
                >
                  Register
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-20 from-blue-400 to-blue-800 bg-gradient-to-t">
        <div className="container mx-auto">
          <div className="my-10 relative">
            <img
              data-aos="fade-up-left"
              data-aos-duration="1000"
              src="/images/home2.jpg"
              className="xl:rounded-md xl:w-1/2  ml-auto"
              alt="Trader"
            />
            <div
              data-aos="fade-down-right"
              data-aos-duration="500"
              className="xl:absolute top-20 left-20 xl:w-1/2"
            >
              <div className="bg-gray-800 hover:bg-gray-950 transition-all cursor-pointer text-white xl:rounded-md text-lg p-8">
                <div className="text-3xl mb-5">🛠 คุณสมบัติเด่น</div>
                <div className="mb-5">
                  ✅ ตั้งวันหมดอายุของคีย์ได้
                  <br />
                  ✅ จำกัดจำนวนบัญชีที่ใช้งานได้ <br />
                  ✅ ตรวจสอบการใช้งานคีย์ย้อนหลังได้ <br />
                  ✅ ป้องกันการใช้งานคีย์ซ้ำหรือแชร์กัน <br />
                  ✅ ใช้งานง่าย รองรับ MetaTrader 4 และ 5 <br />✅ มี API
                  สำหรับเชื่อมต่อกับระบบอื่น
                </div>
                <a
                  href="/register"
                  className="py-2.5 px-5 bg-blue-600 shadow-sm transition-all duration-500 text-base text-white font-semibold text-center w-fit mx-auto hover:bg-blue-700"
                >
                  Register
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    //   <main className="flex flex-col items-center justify-center">
    //     <h1 className="text-4xl font-bold text-white">Welcome to Eakey</h1>
    //     <p className="mt-4 text-lg text-gray-400">
    //       Your one-stop solution for all your needs.
    //     </p>
    //   </main>
    //   <footer className="text-gray-500">
    //     &copy; 2023 Eakey. All rights reserved.
    //   </footer>
    // </div>
  );
}
