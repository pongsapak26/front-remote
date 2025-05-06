"use client";
import { useUserContext } from "@/context/UserContext";
import { aosall } from "@/lib/aos";
import { getUserProfile } from "@/lib/api";
import axios from "axios";
import { CalendarArrowUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  eaName: string;
  priceStart: number;
  priceSub: number;
  priceKey: number;
  sku: string;
}

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { eatype, setCart } = useUserContext();
  const [product, setproduct] = useState<Product[]>([]);
  const handleBuy = ({ price, name }: { price: number; name: string }) => {
    // Handle the buy action here
    setCart({
      price: price,
      product: name,
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
  });
  useEffect(() => {
    const fetchProductById = async () => {
      try {
        if (eatype != "") {
          const res = await axios.get(`/api/products/${eatype}`); // Replace with your actual function to get user profile
          setproduct([res.data]);
        } else {
          router.push("/profile");
        }
      } catch (error) {
        console.log(error);
        router.push("/profile");
      }
    };
    fetchProductById();
  }, [eatype]);

  if (!loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="loader"></div> {/* Add your loading spinner here */}
      </div>
    );
  }

  return (
    <div className="h-full flex align-middle justify-center px-4 md:px-0">
      <div className="container m-auto py-8">
        <div {...aosall} className="flex justify-start gap-2 items-center mb-8">
          <CalendarArrowUp className="w-10 h-10" />
          <h1 className="text-3xl font-bold text-start">ต่ออายุการใช้งาน</h1>
        </div>
        <div
          {...aosall}
          className="bgbox p-4 shadow-lg grid grid-cols-1 lg:grid-cols-3 gap-4"
        >
          {product.length != 0
            ? product.map((product, index) => (
                <div
                  key={index}
                  className="shadow-lg p-6 text-center dark:bg-slate-900"
                >
                  <div className="flex justify-between">
                    <p className="mb-4 text-slate-400">ระยะเวลา</p>
                    <p className="mb-4 ">30 Day</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="mb-4 text-slate-400">ราคา</p>
                    <p className="mb-4">
                      {product.priceSub.toLocaleString()} บาท
                    </p>
                  </div>
                  <div className="mb-4 justify-end flex">
                    <button
                      onClick={() =>
                        handleBuy({
                          price: product.priceSub,
                          name: "ระยะเวลา 30 วัน",
                        })
                      }
                      className="p-4 transition-all btn-bggreen text-white py-2 cursor-pointer"
                    >
                      สั่งซื้อ
                    </button>
                  </div>
                </div>
              ))
            : ""}
          {product.length != 0
            ? product.map((product, index) => (
                <div
                  key={index}
                  className="shadow-lg p-6 text-center dark:bg-slate-900"
                >
                  <div className="flex justify-between">
                    <p className="mb-4 text-slate-400">EA Key</p>
                    <p className="mb-4 ">1 Key</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="mb-4 text-slate-400">ราคา</p>
                    <p className="mb-4">
                      {product.priceKey.toLocaleString()} บาท
                    </p>
                  </div>
                  <div className="mb-4 justify-end flex">
                    <button
                      onClick={() =>
                        handleBuy({
                          price: product.priceKey,
                          name: "EA Key",
                        })
                      }
                      className="p-4 transition-all btn-bggreen text-white py-2 cursor-pointer"
                    >
                      สั่งซื้อ
                    </button>
                  </div>
                </div>
              ))
            : ""}
        </div>
      </div>
    </div>
  );
}
