"use client";

import { useState } from "react";
import { showAlert } from "../../lib/sweetAlert";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { login } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { aosall } from "@/lib/aos";
import { useUserContext } from "@/context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setCart } = useUserContext();

  const handleLogin = async () => {
    try {
      const data = await login(email, password, setLoading);

      console.log(data?.res.user.username);
      if (data?.status) {
        setCart({ userId: data.res.user.id, username: data.res.user.username, price: 0, product: "" });
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
          <p className="text-center text-sm dark:text-gray-100 text-gray-900 mt-4">
            No account ?
            <Link
              href="/register"
              id="showRegister"
              className="dark:text-gray-400 text-gray-900 hover:underline pl-1"
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
