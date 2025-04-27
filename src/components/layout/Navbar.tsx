"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import UserMenu from "./UserMenu";
import Menu from "./Menu";
import Footer from "./Footer";

const menuItems = [
  { label: "Home", path: "/" },
  { label: "EA", path: "/ea" },
  { label: "Contact", path: "/contact" },
];

const Navbar = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (window.scrollY > lastScrollY) {
      setShow(false);
    } else {
      setShow(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  return (
    <div className="min-h-screen flex flex-col ">
      <nav
        className={`relative bg-white transition-all dark:bg-gray-900 text-black dark:text-white shadow p-4 z-50 duration-300 ${
          show ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center">
          <Menu menuItems={menuItems} />
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="cursor-pointer text-3xl font-semibold ml-7 md:ml-0"
            >
              AFK
            </Link>
            <div
              className="hidden w-full md:block md:w-auto"
              id="navbar-dropdown"
            >
              <ul className="flex space-x-4 items-center">
                {menuItems.map((item) => (
                  <li key={item.path}>
                    <Link href={item.path} className="hover:underline">
                      {item.label}
                    </Link>
                  </li>
                ))}

                {/* <li className="">
            <div className="switch  w-10">
              <input
                type="checkbox"
                className="switch__input w-10"
                id="Switch"
                checked={!darkMode}
                onClick={toggleDarkMode}
              />
              <label className="switch__label  scale-50" htmlFor="Switch">
                <span className="switch__indicator"></span>
                <span className="switch__decoration"></span>
              </label>
            </div>
          </li> */}
              </ul>
            </div>
          </div>

          <UserMenu />
        </div>
      </nav>
      {children}
      <Footer />
    </div>
  );
};

export default Navbar;
