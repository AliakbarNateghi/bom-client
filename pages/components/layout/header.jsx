"use client";

// import "@/styles/globals.css";
import Link from "next/link";
import Image from "next/image";
import { userInfo } from "@/pages/redux/slices/userinfo";
import { useSelector, useDispatch } from "react-redux";
import logo from "@/public/logos/white-logo.png";
import React, { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Logout from "@/pages/services/logout";
import { useRouter } from "next/router";

export default function Header({ loggedin }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.userInfo);
  const [user, setUser] = useState(data);

  const userGroups = [];
  for (let i = 0; i < data?.groups?.length; i++) {
    userGroups.push(data.groups[i].name);
  }

  useEffect(() => {
    const localstorage = JSON.parse(localStorage.getItem("user"));
    dispatch(userInfo(localstorage ? localstorage.username : ""));
  }, [router.pathname !== "user/login", dispatch]);

  return (
    <div>
      {loggedin ? (
        <header className="bg-gray-400 sticky top-0 z-50">
          <nav className="flex items-center justify-between px-4 py-3">
            <Link href="/?page=1">
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
                {userGroups.map((group) => {
                  return group == "god" ? (
                    <Link
                      className="digikala"
                      href="/permission?page=1&group=1"
                    >
                      دسترسی
                    </Link>
                  ) : (
                    <div></div>
                  );
                })}
              </li>

              <li className="mt-3 md:mt-0 md:ml-4">
                {userGroups.map((group) => {
                  return group == "god" ? (
                    <Link
                      className="digikala"
                      href="/users"
                    >
                      کاربران
                    </Link>
                  ) : (
                    <div></div>
                  );
                })}
              </li>

              <li className="mt-3 md:mt-0 md:ml-4">
                <Link className="digikala" href="/user/profile">
                  پروفایل
                </Link>
              </li>

              <li className="mt-3 md:mt-0 md:ml-4">
                <Link onClick={Logout} className="digikala" href="/user/login">
                  خروج
                </Link>
              </li>
            </ul>
          </nav>
        </header>
      ) : (
        <div></div>
      )}
    </div>
  );
}
