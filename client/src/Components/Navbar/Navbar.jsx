import logo from "./logo-nobg.png";
import Menuitems from "./Components/Menuitems";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useRef, useState } from "react";
import LoginSignup from "./Components/LoginSignup";
import { authState } from "../../GlobalState/authState";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { role } = authState();
  const menuRef = useRef(null);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    }

    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);

    handleResize(); // Run once on mount

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleClick() {
    setIsOpen((prev) => !prev);
  }

  return (
    <div className="w-full flex px-4 justify-between items-center bg-[#fdf8e1] text-sm md:text-lg fixed z-100">
      <Link to={role === "admin" ? "/admin/dashboard" : "/"}>
        <img src={logo} alt="logo" className="size-28 rounded-full" />
      </Link>

      <div className="hidden lg:inline-block">
        <Menuitems />
      </div>

      <div className="hidden lg:inline-block">
        <LoginSignup />
      </div>

      <GiHamburgerMenu
        className="absolute right-5 self-center size-6 text-[var(--darksage)] cursor-pointer z-10 lg:hidden"
        onClick={handleClick}
      />

      {isOpen && (
        <div
          ref={menuRef}
          className="absolute h-screen bg-[var(--cream)] right-0 top-0 flex flex-col p-15 text-lg justify-around z-50"
        >
          <div className="h-max">
            <Menuitems />
          </div>
          <div>
            <LoginSignup />
          </div>
        </div>
      )}
    </div>
  );
}
