"use client";

import { aosall } from "@/lib/aos";
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
	<div className="h-full flex align-middle justify-center">

    <div  {...aosall} className="container m-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">
	  Extend Subscription
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bgallbox">
		{data?.map((item: Transaction) => (
		  <div key={item._id}  className={`bgallbox ${item.status === "pending" ?"border-orange-200":"border-green-200"} border-2 m-5 p-5`}>
			<h2 className="text-xl font-semibold mb-2">Package: {item.product}</h2>
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
        className="w-1/4 btn-bgred text-white py-2 mt-8 cursor-pointer mx-auto block text-center"
      >
        Back
      </button>
    </div>
	</div>
  );
}
