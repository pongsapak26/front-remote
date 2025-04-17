"use client";
import { useUserContext } from "@/context/UserContext";
import { getUserProfile } from "@/lib/api";
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
    name: "3 Day",
    price: 100,
    description: "Buy 3 Day",
    duration: 3,
  },
  {
    name: "7 Day",
    price: 200,
    description: "Buy 7 Day",
    duration: 7,
  },
  {
    name: "30 Day",
    price: 300,
    description: "Buy 30 Day",
    duration: 30,
  },
];
const products2: Product[] = [
  {
    name: "1 Key",
    price: 100,
    description: "Buy 1 Key",
    duration: 3,
  },
  {
    name: "3 Key",
    price: 200,
    description: "Buy 3 Key",
    duration: 7,
  },
  {
    name: "10 Key",
    price: 300,
    description: "Buy 10 Key",
    duration: 30,
  },
];
export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setuser] = useState({
    username: "",
    email: "",
    keylimit: "",
    _id: "",
  });
  const { setCart } = useUserContext();

  const handleBuy = (product: Product) => {
    // Handle the buy action here
    setCart({
      userId: user._id,
      username: user.username,
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
      setuser(res); // Set user data to state
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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">
      Extend Subscription
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product, index) => (
          <div key={index} className="bg-gray-800 shadow-lg p-6 text-center">
            <h2 className="text-2xl font-semibold mb-4">{product.name}</h2>
            <p className="mb-4">{product.description}</p>
            <div className="text-xl font-bold mb-4">{product.price} USD</div>
            <div className="mb-4">
              <button
                onClick={() => handleBuy(product)}
                className="w-full bg-green-800 text-white py-2 cursor-pointer hover:bg-green-900"
              >
                Buy {product.price} THB
              </button>
            </div>
          </div>
        ))}
      </div>
      <h1 className="text-3xl font-bold my-8 text-center">Buy Key EA</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products2.map((product, index) => (
          <div key={index} className="bg-gray-800 shadow-lg p-6 text-center">
            <h2 className="text-2xl font-semibold mb-4">{product.name}</h2>
            <p className="mb-4">{product.description}</p>
            <div className="text-xl font-bold mb-4">{product.price} USD</div>
            <div className="mb-4">
              <button
                onClick={() => handleBuy(product)}
                className="w-full bg-green-800 text-white py-2 cursor-pointer hover:bg-green-900"
              >
                Buy {product.price} THB
              </button>
            </div>
          </div>
        ))}
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
