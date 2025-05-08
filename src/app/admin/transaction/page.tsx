// /app/admin/products/page.tsx
"use client";

import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { createAdminEaDay, createAdminEakey } from "@/lib/api";

type Transaction = {
  price: number;
  product: string;
  status: string;
  description:string;
  user: {
    username: string;
    id: number;
  };
};

export default function ProductPage() {
  const [transaction, settransaction] = useState<Transaction[]>([]);
  useEffect(() => {
    fetch("/api/admin/transaction")
      .then((res) => res.json())
      .then((data) => settransaction(data));
  }, []);

  const columns = [
    { name: "ID ลูกค้า",  width:"10%",selector: (row: Transaction) => row.user.id },
    { name: "ชื่อลูกค้า",  width:"20%",selector: (row: Transaction) => row.user.username },
    { name: "สินค้าที่ซื้อ",  width:"10%",selector: (row: Transaction) => row.product },
    { name: "Type", width:"10%", selector: (row: Transaction) => row.description },
    { name: "ราคา", width:"20%", selector: (row: Transaction) => row.price },
    {
      name: "จัดการ",
      minWidth: '30%', 
      cell: (row: Transaction) => (
        <div className="space-x-2">
          <button
            className="p-1 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white transition-colors"
            onClick={() => {
              createAdminEakey(row.description,Number(row.user.id));
            }}
          >
            + Key
          </button>
          <button
            className="p-1 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white transition-colors"
            onClick={() => {
              createAdminEaDay(row.description,Number(row.user.id));
            }}
          >
            + Day
          </button>
          <button
            className={`text-white p-1 rounded-lg transition-colors  ${
              row.status != "padding"
                ? "bg-green-500 hover:bg-green-700"
                : "bg-red-500 hover:bg-red-700 "
            }`}
          >
            {row.status != "padding" ? "Approve" : "Reject"}
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">จัดการสินค้า EA</h1>
      </div>
      <DataTable columns={columns} data={transaction} pagination />
    </div>
  );
}