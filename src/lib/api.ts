import { ResEaKey } from "@/components/EakeyCard";
import axios from "axios";
import Cookies from 'js-cookie';

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
      Cookies.set('token', response.data.token, { expires: 7 });
      return true;
    }
  } catch (error) {
    console.log(error);
    
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

export const createEakey = async () => {
  try {
    const response = await axios.post(
      `${apiUrl}/forex/addeakey`,
      {
        userId: localStorage.getItem("userId"),
        eaName: "Eakey Name",
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    return response.data; // ส่งค่ากลับเป็นข้อมูล Eakey
  } catch (error) {
    throw new Error("Failed to create Eakey" + (error as Error).message);
  }
};

export const editEakey = async (
  data: ResEaKey,
  setloading: React.Dispatch<React.SetStateAction<boolean>>,
  id: string
) => {
  try {
    setloading(true);
    const response = await axios.put(`${apiUrl}/forex/editkey/${id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // ส่ง token ใน header
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to edit Eakey: " + (error as Error).message);
  } finally {
    setloading(false);
  }
};

export const logout = async () => {
  try {
    localStorage.removeItem("token"); // Remove token from localStorage
    localStorage.removeItem("userId"); // Remove userId from localStorage
    Cookies.remove('token'); // Remove token from cookies
    return true;
  } catch (error) {
    throw new Error("Logout failed" + (error as Error).message);
  }
};

export const getEakey = async () => {
  try {
    const userId = localStorage.getItem("userId"); // ดึง userId จาก localStorage
    if (!userId) {
      throw new Error("not found Fucking Hacker"); // ถ้าไม่มี userId ให้แสดง error
    }
    const response = await axios.get(`${apiUrl}/forex/geteakey`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // ส่ง token ใน header
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response.data; // ส่งค่ากลับเป็นข้อมูล Eakey
  } catch (error) {
    throw new Error("Failed to get Eakey" + (error as Error).message);
  } finally {
  }
};

export const getEaKeyById = async (id: string) => {
  try {
    const response = await axios.get(`${apiUrl}/forex/geteakeyById/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // ส่ง token ใน header
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response.data; // ส่งค่ากลับเป็นข้อมูล Eakey
  } catch (error) {
    throw new Error("Failed to get Eakey" + (error as Error).message);
  } finally {
  }
};

export const imageToDiscord = async (
  image: File,
  price: string,
  username: string,
  product: string
) => {
  try {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("price", price);
    formData.append("username", username);
    formData.append("product", product);
    const response = await axios.post(`${apiUrl}/front/imgdiscord`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // ส่ง token ใน header
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to upload image" + (error as Error).message);
  }
};

export const geTransactionId = async () => {
  try {
    const userId = localStorage.getItem("userId"); // ดึง userId จาก localStorage
    const response = await axios.get(`${apiUrl}/front/getTransaction/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // ส่ง token ใน header
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response.data; // ส่งค่ากลับเป็นข้อมูล Eakey
  } catch (error) {
    throw new Error("Failed to get Eakey" + (error as Error).message);
  } finally {
  }
};