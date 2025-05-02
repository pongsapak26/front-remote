"use client";
import { useUserContext } from "@/context/UserContext";
import { aosall } from "@/lib/aos";
import { getUserProfile } from "@/lib/api";
import { CalendarArrowUp, KeyRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Product {
  name: string;
  price: number;
  description: string;
  duration: number; // สามารถเป็น 3, 7, หรือ 30 วัน
}

const products: Product[] = [
  {
    name: "3 วัน",
    price: 290,
    description: "Buy 3 Day",
    duration: 3,
  },
  {
    name: "7 วัน",
    price: 590,
    description: "Buy 7 Day",
    duration: 7,
  },
  {
    name: "30 วัน",
    price: 1690,
    description: "Buy 30 Day",
    duration: 30,
  },
];
const products2: Product[] = [
  {
    name: "1 Key",
    price: 500,
    description: "Buy 1 Key",
    duration: 3,
  },
  {
    name: "3 Key",
    price: 1500,
    description: "Buy 3 Key",
    duration: 7,
  },
  {
    name: "10 Key",
    price: 4990,
    description: "Buy 10 Key",
    duration: 30,
  },
];
export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { setCart } = useUserContext();

  const handleBuy = (product: Product) => {
    // Handle the buy action here
    setCart({
      price: product.price,
      product: product.name,
    });
    router.push("/checkout");
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      const res = await getUserProfile(); // Replace with your actual function to get user profile
      if (res.status === 400) {
        router.push("/login"); // Redirect to login page if user is not authenticated
      }
    };
    fetchUserProfile();
    setLoading(true); // Set loading to true while fetching user profile
  }, []);

  if (!loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="loader"></div> {/* Add your loading spinner here */}
      </div>
    );
  }

  return (
    <div className="h-full flex align-middle justify-center">
      <div className="container m-auto py-8">
        <div {...aosall} className="flex justify-start gap-2 items-center mb-8">
          <CalendarArrowUp className="w-10 h-10" />
          <h1 className="text-3xl font-bold text-start">ต่ออายุการใช้งาน</h1>
        </div>
        <div {...aosall} className="bgbox p-4 shadow-lg grid grid-cols-1 lg:grid-cols-3 gap-4">
          {products.map((product, index) => (
            <div key={index} className="shadow-lg p-6 text-center dark:bg-slate-900">
              <div className="flex justify-between">
                <p className="mb-4 text-slate-400">ระยะเวลา</p>
                <p className="mb-4 ">{product.name}</p>
              </div>
              <div className="flex justify-between">
                <p className="mb-4 text-slate-400">ราคา</p>
                <p className="mb-4">{product.price.toLocaleString()} บาท</p>
              </div>
              <div className="mb-4 justify-end flex">
                <button
                  onClick={() => handleBuy(product)}
                  className="p-4 transition-all btn-bggreen text-white py-2 cursor-pointer"
                >
                  สั่งซื้อ
                </button>
              </div>
            </div>
          ))}
        </div>
        <div {...aosall} className="flex justify-start gap-2 items-center my-8">
          <KeyRound className="w-10 h-10" />
          <h1 className="text-3xl font-bold text-start">ซื้อรหัสใช้งาน EA</h1>
        </div>
        <div {...aosall} className="bgbox p-4 shadow-lg grid grid-cols-1 lg:grid-cols-3 gap-4">
          {products2.map((product, index) => (
            <div key={index} className="shadow-lg p-6 text-center dark:bg-slate-900">
              <div className="flex justify-between">
                <p className="mb-4 text-slate-400">จำนวน Key</p>
                <p className="mb-4 ">{product.name}</p>
              </div>
              <div className="flex justify-between">
                <p className="mb-4 text-slate-400">ราคา</p>
                <p className="mb-4">{product.price.toLocaleString()} บาท</p>
              </div>
              <div className="mb-4 justify-end flex">
                <button
                  onClick={() => handleBuy(product)}
                  className="p-4 transition-all btn-bggreen text-white py-2 cursor-pointer"
                >
                  สั่งซื้อ
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* <button
          onClick={() => {
            router.push(`/profile`);
            // Handle save logic here
          }}
          className="w-1/4 transition-all btn-bgred text-white py-2 mt-4 cursor-pointer mx-auto block text-center"
        >
          Back
        </button> */}
      </div>
    </div>
  );
}
