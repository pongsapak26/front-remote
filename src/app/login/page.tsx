"use client";

import { useEffect, useState } from "react";
import { showAlert } from "../../lib/sweetAlert";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { login } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { aosall } from "@/lib/aos";
import { useUserContext } from "@/context/UserContext";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // จัดการสถานะการแสดงผลรหัสผ่าน
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user, setUser } = useUserContext();
  // ใช้ useEffect เพื่อตรวจสอบสถานะผู้ใช้และเปลี่ยนเส้นทาง
  useEffect(() => {
    if (user.id !== "") {
      router.push("/profile"); // Redirect to profile page if user is already logged in
    }
  }, [user, router]);
  const handleLogin = async () => {
    try {
      const data = await login(email, password, setLoading);
      if (data?.status) {
        setUser({
          id: data.res.user.id,
          username: data.res.user.username,
        });
        showAlert("Success", "Login successful!", "success");
        router.push("/profile"); // Redirect to profile page after successful login
      }
    } catch (error) {
      showAlert("Error", "Login failed" + error, "error");
    }
  };

  return (
    <div className="flex align-middle justify-center pt-10">
      <div {...aosall} className="container m-auto">
        <div className="lg:w-1/4 md:w-1/3 sm:w-1/2 w-3/4 mx-auto bgbox p-4">
          <div className="flex justify-between max-w-48 mx-auto">
            <Link href="/login" id="showLogin">
              <h2 className="text-2xl mb-4 text-center font-bold underline text-slate-900">
                Login
              </h2>
            </Link>
            <Link href="/register" id="showLogin">
              <h2 className="text-2xl mb-4 text-center text-slate-400">
                Register
              </h2>
            </Link>
          </div>
          <div className="mb-1">
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-1 relative">
            <Input
              type={showPassword ? "text" : "password"} // เปลี่ยน type ระหว่าง text และ password
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)} // สลับสถานะ showPassword
              className="absolute right-3 bottom-0 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          <Button
            type="button"
            label="Login"
            loading={loading}
            onClick={handleLogin}
          />
          <p className="text-center text-sm dark:text-gray-100 text-gray-900 mt-4">
            <Link
              href="/register"
              id="showRegister"
              className="dark:text-gray-400 text-blue-900 hover:underline pl-1"
            >
              I forget my password
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
