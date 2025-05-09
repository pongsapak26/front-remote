"use client";

import { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { showAlert } from "@/lib/sweetAlert";
import Link from "next/link";
import { aosall } from "@/lib/aos";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/user/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await res.json();
      if (res.ok && result.status) {
        showAlert("Success", result.message, "success");
      } else {
        showAlert("Error", result.message || "Something went wrong", "error");
      }
    } catch (err) {
      showAlert("Error", "" + err, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex align-middle justify-center pt-10">
      <div {...aosall} className="container m-auto">
        <div className="lg:w-1/4 md:w-1/3 sm:w-1/2 w-3/4 mx-auto bgbox p-4">
          <h2 className="text-2xl mb-4 text-center font-bold text-slate-900">
            ลืมรหัสผ่าน
          </h2>
          <Input
            type="email"
            name="email"
            required
            placeholder="กรอก Email ของคุณ"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            type="button"
            label="ส่งลิงก์รีเซ็ตรหัสผ่าน"
            loading={loading}
            onClick={handleSubmit}
          />
          <p className="text-center text-sm text-gray-600 mt-4">
            <Link href="/login" className="text-blue-900 hover:underline">
              กลับไปหน้า Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
