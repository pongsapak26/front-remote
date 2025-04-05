"use client";

import { useState } from "react";
import { register } from "../../lib/api";
import { showAlert } from "../../lib/sweetAlert";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleRegister = async () => {
    try {
      const data = await register(email, password, username, setLoading);
      if (data) {
        showAlert("Success", "Registration successful!", "success");
        router.push("/profile"); // Redirect to login page after successful registration
      }
    } catch (error) {
      showAlert("Error", "Registration failed" + error, "error");
    }
  };

  return (
    <div className="w-1/4 mx-auto border-2 border-gray-700 p-4 bg-gray-800 shadow-lg">
      <h2 className="text-2xl mb-4 text-center">Register</h2>
      <div className="mb-1">
        <Input
          type="text"
          name="username"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
      <div className="mb-1">
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button type="button" loading={loading} label="Register" onClick={handleRegister} />
      <p className="text-center text-sm text-gray-400 mt-4">
        Already have an account?
        <Link
          href="/login"
          id="showLogin"
          className="text-white hover:underline pl-1"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
