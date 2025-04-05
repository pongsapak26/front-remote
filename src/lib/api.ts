import { EaKey } from "@/app/profile/[eakey]/page";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
interface LoginResponse {
  data: {
    token: string;
    user: {
      id: string;
      username: string;
      email: string;
    };
  };
}
interface RegisterResponse {
  data: {
    token: string;
    user: {
      id: string;
      username: string;
      email: string;
    };
  };
}
export const login = async (
  email: string,
  password: string,
  setloading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    setloading(true);
    const response: LoginResponse = await axios.post(`${apiUrl}/auth/login`, {
      email,
      password,
    });
    if (response.data) {
      localStorage.setItem("token", response.data.token); // เก็บ token ใน localStorage
      localStorage.setItem("userId", response.data.user.id); // เก็บ userId ใน localStorage
      return true;
    }
  } catch (error) {
    throw new Error("Login failed" + (error as Error).message);
  } finally {
    setloading(false); // หยุดโหลด
  }
};

export const register = async (
  email: string,
  password: string,
  username: string,
  setloading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    setloading(true);
    const response: RegisterResponse = await axios.post(
      `${apiUrl}/auth/register`,
      { email, password, username }
    );
    if (response.data) {
      localStorage.setItem("token", response.data.token); // เก็บ token ใน localStorage
      localStorage.setItem("userId", response.data.user.id); // เก็บ userId ใน localStorage
      return true; // ส่งค่ากลับไปยัง component ที่เรียกใช้
    }
  } catch (error) {
    throw new Error("Registration failed" + (error as Error).message);
  } finally {
    setloading(false); // หยุดโหลด
  }
};

export const getUserProfile = async () => {
  try {
    const response = await axios.get(`${apiUrl}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // ส่ง token ใน header
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    return error; // ถ้าเกิด error ให้ส่งค่ากลับเป็น null
  }
};

export const editEakey = async (
  data: EaKey,
  setloading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    setloading(true);
    const userId = localStorage.getItem("userId"); // ดึง userId จาก localStorage
    if (!userId) {
      throw new Error("not found Fucking Hacker"); // ถ้าไม่มี userId ให้แสดง error
    }
    const response = await axios.put(`${apiUrl}/profile/${userId}`, data);
    return response.data;
  } catch (error) {
    throw new Error("Failed to edit Eakey" + (error as Error).message);
  } finally {
    setloading(false); // หยุดโหลด
  }
};

export const logout = async () => {
  try {
    localStorage.removeItem("token"); // Remove token from localStorage
    localStorage.removeItem("userId"); // Remove userId from localStorage
    return true;
  } catch (error) {
    throw new Error("Logout failed" + (error as Error).message);
  }
};
