"use client";

// import "@/styles/globals.css";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import logo from "/public/logos/white-logo.png";
import React, { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Logout from "@/pages/services/logout";
import { useRouter } from "next/router";

export default function Header({ loggedin }) {
  // console.log("loggedin", loggedin);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // This will run whenever loggedIn changes
  }, [router.pathname]);

  return (
    <header className="bg-gray-400 sticky top-0 z-50">
      <nav className="flex items-center justify-between px-4 py-3">
        <Link href="/">
          <div className="text-white font-bold text-xl">
            <Image src={logo} alt="BOM" width={64} height={64} />
          </div>
        </Link>

        <button
          className="text-white focus:outline-none md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <FiX className="text-2xl" />
          ) : (
            <FiMenu className="text-2xl" />
          )}
        </button>

        <ul className={`md:flex ${isOpen ? "block" : "hidden"}`}>
          <li className="mt-3 md:mt-0 md:ml-4">
            {loggedin ? (
              <Link className="digikala" href="/user/profile">
                پروفایل
              </Link>
            ) : (
              <Link className="digikala" href="/user/login">
                ورود
              </Link>
            )}
          </li>

          <li className="mt-3 md:mt-0 md:ml-4">
            {loggedin ? (
              <Link onClick={Logout} className="digikala" href="/user/login">
                خروج
              </Link>
            ) : (
              <div></div>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
