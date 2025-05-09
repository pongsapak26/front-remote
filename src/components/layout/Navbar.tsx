"use client";
import Link from "next/link";
import UserMenu from "./UserMenu";
import Footer from "./Footer";

const Navbar = ({
  children,
  admin
}: Readonly<{
  children: React.ReactNode;
  admin:boolean
}>) => {
  // const [show, setShow] = useState(true);
  
  // const [lastScrollY, setLastScrollY] = useState(0);
  // const controlNavbar = () => {
  //   if (window.scrollY > lastScrollY) {
  //     setShow(false);
  //   } else {
  //     setShow(true);
  //   }
  //   setLastScrollY(window.scrollY);
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", controlNavbar);
  //   return () => window.removeEventListener("scroll", controlNavbar);
  // }, [lastScrollY]);

  return (
    <div className="min-h-screen flex flex-col ">
      <nav
        className={`relative bg-white transition-all dark:bg-gray-900 text-black dark:text-white shadow p-4 z-50 duration-300`}
      >
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="cursor-pointer text-3xl font-semibold ml-0"
            >
              AFK {admin ?? 'ADMIN'}
            </Link>
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
