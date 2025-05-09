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
  }[];
  eatype: string;
  seteatype: React.Dispatch<React.SetStateAction<string>>;
  setUser: React.Dispatch<
    React.SetStateAction<{
      id: string;
      username: string;
    }>
  >;
  setCart: React.Dispatch<
    React.SetStateAction<
      {
        price: number;
        product: string;
      }[]
    >
  >;
  checkout: {
    price: number;
    product: string;
  };
  setcheckout: React.Dispatch<
    React.SetStateAction<{ price: number; product: string }>
  >;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<{ price: number; product: string }[]>([]);
  const [checkout, setcheckout] = useState({
    price: 0,
    product: "",
  });
  const [eatype, seteatype] = useState("");
  const [user, setUser] = useState({
    id: Cookies.get("userId") || "",
    username: Cookies.get("username") || "",
  });
  return (
    <UserContext.Provider
      value={{
        cart,
        setCart,
        setUser,
        user,
        eatype,
        seteatype,
        setcheckout,
        checkout,
      }}
    >
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
