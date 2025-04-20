"use client";

import { useState } from "react";
import { showAlert } from "../../lib/sweetAlert";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { login } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { aosall } from "@/lib/aos";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const status = await login(email, password, setLoading);
      console.log(status);
      if (status) {
        showAlert("Success", "Login successful!", "success");
        router.push("/profile"); // Redirect to profile page after successful login
      }
    } catch (error) {
      showAlert("Error", "Login failed" + error, "error");
    }
  };

  return (
    <div className="h-full flex align-middle justify-center">
      <div {...aosall} className="container m-auto">
        <div
          className="w-full md:w-1/4 mx-auto border-2 bgbox p-4 shadow-lg"
        >
          <h2 className="text-2xl mb-4 text-center">Login</h2>
          <div className="mb-1">
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-1">
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            type="button"
            label="Login"
            loading={loading}
            onClick={handleLogin}
          />
          <p className="text-center text-sm text-gray-400 mt-4">
            No account ?
            <Link
              href="/register"
              id="showRegister"
              className="text-white hover:underline pl-1"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
