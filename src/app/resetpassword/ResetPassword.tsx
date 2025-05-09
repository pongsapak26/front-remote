"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { showAlert } from "@/lib/sweetAlert";
import { aosall } from "@/lib/aos";
import Link from "next/link";

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");
  const userId = searchParams.get("id");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      return showAlert("Error", "รหัสผ่านไม่ตรงกัน", "error");
    }

    try {
      setLoading(true);
      const res = await fetch("/api/user/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, token, userId }),
      });

      const result = await res.json();
      if (res.ok && result.status) {
        showAlert("Success", "เปลี่ยนรหัสผ่านสำเร็จ", "success");
        router.push("/login");
      } else {
        showAlert("Error", result.message || "เกิดข้อผิดพลาด", "error");
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
            เปลี่ยนรหัสผ่านใหม่
          </h2>
          <Input
            type="password"
            name="password"
            required
            placeholder="รหัสผ่านใหม่"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="password"
            name="confirmPassword"
            required
            placeholder="ยืนยันรหัสผ่าน"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            type="button"
            label="เปลี่ยนรหัสผ่าน"
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
