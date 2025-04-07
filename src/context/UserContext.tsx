"use client"
import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserContextType {
    cart: {
        userId: string;
        username: string;
        price: number;
        product: string;
    };
    setCart: React.Dispatch<React.SetStateAction<{
        userId: string;
        username: string;
        price: number;
        product: string;
    }>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState({
    userId: "",
    username: "",
    price: 0,
    product: "",
  });

  return (
    <UserContext.Provider value={{ cart, setCart }}>
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