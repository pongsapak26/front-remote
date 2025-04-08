"use client";

import { geTransactionId } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Transaction = {
	_id: string;
	product: string;
	status: string;
	price: number;}


export default function Page() {
	const [data, setdata] = useState<Transaction[]>();
	const router = useRouter();
	useEffect(() => {
		const fetchData = async () => {
			// Simulate an API call
			const response = await geTransactionId();
			console.log(response);
			if (response.status === 400) {
				router.push("/profile");
				return;
			}
			setdata(response); // Set the fetched data to state
		}
		fetchData();
	}, []);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Extend subscription
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-gray-700">
		{data?.map((item: Transaction) => (
		  <div key={item._id} className="bg-gray-900 p-4 m-4">
			<h2 className="text-xl font-semibold mb-2">{item.product}</h2>
			<p className="">Order ID: {item._id}</p>
			<p className="">Status: {item.status}</p>
			<p className="">Product: {item.product}</p>
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
