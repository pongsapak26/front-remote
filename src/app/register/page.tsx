"use client";

import { useState } from "react";
import { register } from "../../lib/api";
import { showAlert } from "../../lib/sweetAlert";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { aosall } from "@/lib/aos";
import { Eye, EyeOff } from "lucide-react";
import { useUserContext } from "@/context/UserContext";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // จัดการสถานะการแสดงผลรหัสผ่าน
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user } = useUserContext();
  if (user.id !== "") {
    router.push("/profile"); // Redirect to profile page if user is already logged in
  }
  const handleRegister = async () => {
    try {
      const data = await register(email, password, username, setLoading);
      if (data) {
        showAlert("Success", "Registration successful!", "success");
        router.push("/profile"); // Redirect to login page after successful registration
      }
    } catch (error) {
      showAlert("Error", "" + error, "error");
    }
  };

  return (
    <div className="flex align-middle justify-center pt-10">
      <div
        {...aosall}
        className="lg:w-1/4 md:w-1/3 sm:w-1/2 w-3/4 m-auto bgbox p-4"
      >
        <div className="flex justify-between max-w-48 mx-auto">
          <Link href="/login" id="showLogin">
            <h2 className="text-2xl mb-4 text-center text-slate-400">Login</h2>
          </Link>
          <Link href="/register" id="showLogin">
            <h2 className="text-2xl mb-4 text-center font-bold underline text-slate-900">
              Register
            </h2>
          </Link>
        </div>
        <div className="mb-1">
          <Input
            required={true}
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-1">
          <Input
            required={true}
            type="email"
            name="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-1 relative">
          <Input
            required={true}
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
          loading={loading}
          label="Register"
          onClick={handleRegister}
        />
        <p className="text-center text-sm text-gray-400 mt-4">
          {/* <Link
            href="/login"
            id="showLogin"
            className="text-gray-900 dark:text-gray-100 hover:underline pl-1"
          >
            Login
          </Link> */}
        </p>
      </div>
    </div>
  );
};

export default Register;
