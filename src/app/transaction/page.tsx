"use client";
import { aosall } from "@/lib/aos";
import { getTransactionId } from "@/lib/api";
import { CalendarArrowUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Transaction = {
  _id: string;
  product: string;
  status: string;
  price: number;
};

export default function Page() {
  const [data, setdata] = useState<Transaction[]>();
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      // Simulate an API call
      const response = await getTransactionId();
      if (response.status === 400) {
        router.push("/profile");
        return;
      }
      setdata(response); // Set the fetched data to state
    };
    fetchData();
  }, []);
  return (
    <div className="h-full flex align-middle justify-center">
      <div {...aosall} className="container m-auto py-8">
        <div className="flex justify-start gap-2 items-center mb-8">
          <CalendarArrowUp className="w-10 h-10" />
          <h1 className="text-3xl font-bold text-start">Orders placed</h1>
        </div>
        <div className="bgbox p-4 shadow-lg grid grid-cols-2 lg:grid-cols-4 gap-4">
          {data?.map((item: Transaction,index) => (
            <div
              key={index}
              className={`bgallbox ${
                item.status === "pending"
                  ? "border-orange-200"
                  : "border-green-200"
              } border-2 p-5`}
            >
              <h2 className="text-xl font-semibold mb-2 text-slate-900">
                Package: <span className="text-slate-900">{item.product}</span>
              </h2>
              <p className="text-slate-400">
                Order ID: <span className="text-slate-600">{item._id}</span>
              </p>
              <p className="text-slate-400">
                Status: <span className="text-slate-600">{item.status}</span>
              </p>
              <p className="text-slate-400">
                Product: <span className="text-slate-600">{item.product}</span>
              </p>
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            router.push(`/profile`);
            // Handle save logic here
          }}
          className="w-1/4 btn-bgred text-white py-2 mt-8 cursor-pointer mx-auto block text-center"
        >
          Back
        </button>
      </div>
    </div>
  );
}
