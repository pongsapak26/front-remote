/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResEaKey } from "@/components/EakeyCard";
import axios from "axios";
import Cookies from "js-cookie";
import { showAlert } from "./sweetAlert";
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
    if(email == '' || password == ''){
      throw new Error("กรอกข้อมูลไม่ครบ");
    }
    setloading(true);
    const response: LoginResponse = await axios.post(`/api/user/login`, {
      email,
      password,
    });
    if (response.data) {
      localStorage.setItem("token", response.data.token); // เก็บ token ใน localStorage
      localStorage.setItem("userId", response.data.user.id); // เก็บ userId ใน localStorage
      localStorage.setItem("username", response.data.user.username); // เก็บ userId ใน localStorage
      Cookies.set("token", response.data.token, { expires: 7 });
      Cookies.set("userId", response.data.user.id, { expires: 7 });
      Cookies.set("username", response.data.user.username, { expires: 7 });
      return { res: response.data, status: true };
    }
  } catch (error) {
    console.log(error);
    throw new Error((error as Error).message);
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
    if(email == '' || password == '' || username == ''){
      throw new Error("กรอกข้อมูลไม่ครบ");
    }
    setloading(true);
    const response: RegisterResponse = await axios.post(`/api/user/register`, {
      email,
      password,
      username,
    });

    if (response.data) {
      Cookies.set("token", response.data.token, { expires: 7 });
      Cookies.set("userId", response.data.user.id, { expires: 7 });
      Cookies.set("username", response.data.user.username, { expires: 7 });
      return true; // ส่งค่ากลับไปยัง component ที่เรียกใช้
    }
  } catch (error) {
    throw new Error( (error as Error).message);
  } finally {
    setloading(false); // หยุดโหลด
  }
};

export const getUserProfile = async () => {
  try {
    const response = await axios.get(`/api/user/profile`);
    return response.data;
  } catch (error: any) {
    const status = error?.status;
    const message = error?.message;

    if (status === 401 || message === "Token expired") {
      // ลบ token และ username แล้ว redirect
      localStorage.removeItem("username");
      Cookies.remove("token");
      window.location.href = "/login";
      return { status: 401, message: "Unexpected error" };
    }

    console.error("Unexpected error:", message);
    return { status: 400, message: "Unexpected error" }; // ส่งค่ากลับเป็น status 400
  }
};
export const getUser = async () => {
  try {
    const response = await axios.get(`/api/user`, {
      withCredentials: true,
    });
    console.log(response.data);

    return response.data; // ควรมีฟิลด์ username
  } catch (error: any) {
    console.error("Error fetching user:", error);
    return null; // คืนค่า null หากเกิดข้อผิดพลาด
  }
};
export const createEakey = async (type: string) => {
  try {
    const response = await axios.post(`/api/eakey/add`, {
      eaName: `${type == "sl" ? "SL Guard" : "RSI"}`,
      type: type,
    });

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
    const response = await axios.put(`/api/eakey/${id}`, data);
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
    localStorage.removeItem("username"); // Remove userId from localStorage
    Cookies.remove("token"); // Remove token from cookies
    Cookies.remove("username"); // Remove token from cookies
    Cookies.remove("userId"); // Remove token from cookies
    return true;
  } catch (error) {
    throw new Error("Logout failed" + (error as Error).message);
  }
};

export const getEakey = async () => {
  try {
    const response = await axios.get(`/api/eakey`);
    return response.data; // ส่งค่ากลับเป็นข้อมูล Eakey
  } catch (error) {
    throw new Error("Failed to get Eakey" + (error as Error).message);
  }
};

export const getEaKeyById = async (id: string) => {
  try {
    const response = await axios.get(`/api/eakey/${id}`);
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
  product: string,
  userId: string,
  couponId: string,
  eatype: string
) => {
  try {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("price", price);
    formData.append("username", username);
    formData.append("product", "SKU " + eatype + " - " + product);
    formData.append("couponId", couponId);
    formData.append("userId", userId);
    formData.append("description", eatype);
    const response = await axios.post(`/api/discord`, formData);
    return response.data;
  } catch (error) {
    throw new Error("Failed to upload image" + (error as Error).message);
  }
};

export const getTransactionId = async () => {
  try {
    const response = await axios.get(`/api/transaction`);
    console.log(response);

    return response.data; // ส่งค่ากลับเป็นข้อมูล Eakey
  } catch (error) {
    throw new Error("Failed to get Eakey" + (error as Error).message);
  } finally {
  }
};

export async function validateCoupon(code: string, userId: number) {
  const res = await fetch("/api/validate-coupon", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code, userId }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "เกิดข้อผิดพลาด");

  return data as {
    success: true;
    discount: number;
    type: "percent" | "flat";
    message: string;
  };
}

export const allProduct = async () => {
  try {
    const response = await axios.get(`/api/products`);
    return response.data; // ส่งค่ากลับเป็นข้อมูล Eakey
  } catch (error) {
    throw new Error("Failed to get Eakey" + (error as Error).message);
  } finally {
  }
};

export const createAdminEakey = async (type: string, id:number) => {
  try {
    const response = await axios.post(`/api/admin/add/key`, {
      eaName: `${type == "sl" ? "SL Guard" : "RSI"}`,
      id:id,
      type: type,
    });
    showAlert("สำเร็จ", `แอด Key สำเร็จ`, "success");
    return response.data; // ส่งค่ากลับเป็นข้อมูล Eakey
  } catch (error) {
    showAlert("ผิดพลาด", (error as Error).message || "โค้ดไม่ถูกต้อง", "error");
    throw new Error("Failed to create Eakey" + (error as Error).message);
  }
};
export const createAdminEaDay = async (type: string, id:number) => {
  try {
    const response = await axios.post(`/api/admin/add/day`, {
      id:id,
      type: type,
    });
    showAlert("สำเร็จ", `แอด Day สำเร็จ`, "success");
    return response.data; // ส่งค่ากลับเป็นข้อมูล Eakey
  } catch (error) {
    showAlert("ผิดพลาด", (error as Error).message || "โค้ดไม่ถูกต้อง", "error");
    throw new Error("Failed to create Eakey" + (error as Error).message);
  }
};