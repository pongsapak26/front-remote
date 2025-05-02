"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import Cookies from "js-cookie";

interface UserContextType {
  user: {
    id: string;
    username: string;
  };
  cart: {
    price: number;
    product: string;
  };
  setUser: React.Dispatch<
    React.SetStateAction<{
      id: string;
      username: string;
    }>
  >;
  setCart: React.Dispatch<
    React.SetStateAction<{
      price: number;
      product: string;
    }>
  >;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState({
    price: 0,
    product: "",
  });
  const [user, setUser] = useState({
    id: Cookies.get("userId") || "",
    username: Cookies.get("username") || "",
  });
  return (
    <UserContext.Provider value={{ cart, setCart, setUser, user }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
