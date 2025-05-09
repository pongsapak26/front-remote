"use client";
import { useUserContext } from "@/context/UserContext";
import { aosall } from "@/lib/aos";
import { allProduct, getUserProfile } from "@/lib/api";
import { ShoppingCart } from "lucide-react";
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
  const [products, setproducts] = useState<Product[]>([]);
  const { setCart, seteatype } = useUserContext();
  const handleBuy = (product: Product) => {
    // Handle the buy action here
    setCart((prev) => [
      ...prev,
      { price: product.priceStart, product: product.eaName },
    ]);
    seteatype(product.sku);
    router.push("/order");
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      const res = await getUserProfile(); // Replace with your actual function to get user profile
      if (res.status === 400) {
        router.push("/login"); // Redirect to login page if user is not authenticated
      }
    };
    fetchUserProfile();
    const fetchProducts = async () => {
      const res = await allProduct(); // Replace with your actual function to get user profile
      console.log(res);

      setproducts(res);
    };
    fetchUserProfile();
    fetchProducts();
    setLoading(true); // Set loading to true while fetching user profile
  }, []);

  if (!loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="loader"></div> {/* Add your loading spinner here */}
      </div>
    );
  }
  console.log(products);

  return (
    <div className="h-full flex align-middle justify-center px-4 md:px-0">
      <div className="container m-auto py-8">
        <div {...aosall} className="flex justify-start gap-2 items-center mb-8">
          <ShoppingCart className="w-10 h-10" />
          <h1 className="text-3xl font-bold text-start">EA ทั้งหมด</h1>
        </div>
        <div
          {...aosall}
          className="bgbox p-4 shadow-lg grid grid-cols-1 lg:grid-cols-3 gap-4"
        >
          {products.map((product, index) => (
            <div
              key={index}
              className="shadow-lg p-6 text-center dark:bg-slate-900"
            >
              <div className="flex justify-between">
                <p className="mb-4 text-slate-400">สินค้า</p>
                <p className="mb-4 ">{product.eaName}</p>
              </div>
              <div className="flex justify-between">
                <p className="mb-4 text-slate-400">ราคา</p>
                <p className="mb-4">
                  {product.priceStart.toLocaleString()} บาท
                </p>
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
      </div>
    </div>
  );
}
