"use client";
import Cookies from "js-cookie";


export function removeUser() {
  localStorage.removeItem("token"); // Remove token from localStorage
  localStorage.removeItem("userId"); // Remove userId from localStorage
  localStorage.removeItem("username"); // Remove userId from localStorage
  Cookies.remove("token"); // Remove token from cookies
  Cookies.remove("username"); // Remove token from cookies
  Cookies.remove("userId"); // Remove token from cookies
  window.location.href = "/login";
}


