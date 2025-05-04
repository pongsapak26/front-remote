/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";

export default function CouponFormModal({
  open,
  onClose,
  initialData,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  initialData?: any;
  onSuccess: (data: any) => void;
}) {
  const [form, setForm] = useState({
    name: "",
    code: "",
    discount: 0,
    type: "percent",
    count: 1,
    onlyOnce: true,
    exp: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        exp: initialData.exp.slice(0, 10),
      });
    }
  }, [initialData]);

  const handleSubmit = async () => {
    const payload = initialData ? { ...form, id: initialData.id } : form;
    const res = await fetch("/api/coupons", {
      method: initialData ? "PUT" : "POST",
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    onSuccess(data);
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-[400px] space-y-4">
        <h2 className="text-lg font-semibold">
          {initialData ? "แก้ไขคูปอง" : "เพิ่มคูปอง"}
        </h2>
        {["name", "code", "discount", "type", "count"].map((key) => (
          <div key={key}>
            <label className="" htmlFor={key}>
              {key}
            </label>
            <input
              key={key}
              type={key === "discount" || key === "count" ? "number" : "text"}
              placeholder={key}
              className="w-full border p-2 rounded"
              value={(form as any)[key]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            />
          </div>
        ))}
        <div>
        <label className="font-thin" htmlFor="date">วันหมดอายุ</label>
        <input
          type="date"
          className="w-full border p-2 rounded"
          value={form.exp}
          onChange={(e) => setForm({ ...form, exp: e.target.value })}
        />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.onlyOnce}
            onChange={() => setForm({ ...form, onlyOnce: !form.onlyOnce })}
          />
          ใช้ได้ครั้งเดียว/ผู้ใช้
        </label>
        <div className="flex justify-end gap-2">
          <button className="border px-3 py-1 rounded" onClick={onClose}>
            ยกเลิก
          </button>
          <button
            className="bg-blue-600 text-white px-3 py-1 rounded"
            onClick={handleSubmit}
          >
            บันทึก
          </button>
        </div>
      </div>
    </div>
  );
}
