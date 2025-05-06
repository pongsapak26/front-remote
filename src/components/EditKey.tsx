import React, { useState } from "react";

type Props = {
  item: {
    price: number;
    product: string;
    description: string;
    status: string;
    user: {
      username: string;
      id: number;
    };
  } | null;
};

function EditKey({ item }: Props) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    alert(`ส่งข้อมูล: ${inputValue}`);
    // TODO: ส่งไป backend หรืออัปเดต state
  };
  console.log();

  return (
    <div className="p-4 space-y-6">
      {/* ✍️ Section 2: แก้ไขหรือส่งข้อมูล */}
      {item?.product.slice(-3) === "Key" ? (
        <section className="bg-white p-4 rounded shadow border">
          <h2 className="font-semibold text-lg mb-2">แก้ไขคีย์ / ส่งข้อมูล</h2>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="ใส่ข้อมูลใหม่"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="border rounded px-3 py-2 flex-1"
            />
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              บันทึก
            </button>
          </div>
        </section>
      ) : (
        ""
      )}
      {item?.product.slice(-3) === "Day" ? (
        <section className="bg-white p-4 rounded shadow border">
          <h2 className="font-semibold text-lg mb-2">แก้ไขวันของ Main Key</h2>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="ใส่ข้อมูลใหม่"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="border rounded px-3 py-2 flex-1"
            />
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              บันทึก
            </button>
          </div>
        </section>
      ) : (
        ""
      )}
    </div>
  );
}

export default EditKey;
