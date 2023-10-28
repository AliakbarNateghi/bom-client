import { userInfo } from "@/pages/redux/slices/userinfo";
import { useSelector, useDispatch } from "react-redux";
import background from "@/public/logos/background.jpg";
import back1 from "@/public/logos/back1.jpg";
import back2 from "@/public/logos/back2.jpg";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { SocialIcon } from "react-social-icons";
import mapna from "@/public/logos/mapnalogo.png";
import Mapna from "@/public/logos/LogoMapna1.png";

export default function Home({}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.userInfo);
  const [user, setUser] = useState(data);
  const [telegramHover, setTelegramHover] = useState(false);
  const [whatsappHover, setWhatsappHover] = useState(false);

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
      <div className="back2"></div>
      {/* <div className="flex flex-col float-right w-1/6 m-5">
        <p className="digikala text-2xl text-center">:لیست جداول</p>
        <ul className="">
          <li className="text-center">
            <Link
              href="/table/main/bom?page=1"
              className="digikala text-blue-500 hover:text-red-600 text-xl hover:text-2xl"
            >
              اسکوپ ماتریکس
            </Link>
          </li>
          <li className="text-center">
            <Link
              href="/table/main/provide?page=1"
              className="digikala text-blue-500 hover:text-red-600 text-xl hover:text-2xl"
            >
              تامین
            </Link>
          </li>
        </ul>
        <br />
        {userGroups.map((group) => {
          return group == "god" ? (
            <div>
              <p className="digikala text-2xl text-center">
                :لیست جداول دسترسی
              </p>
              <ul>
                <li className="text-center">
                  <Link
                    href="/table/permissiondata/bom?page=1&group=1"
                    className="digikala text-blue-500 hover:text-red-600 text-xl hover:text-2xl"
                  >
                    اسکوپ ماتریکس
                  </Link>
                </li>
                <li className="text-center">
                  <Link
                    href="/table/permissiondata/provide?page=1&group=1"
                    className="digikala text-blue-500 hover:text-red-600 text-xl hover:text-2xl"
                  >
                    تامین
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <div></div>
          );
        })}
        <br />
        <br />
        <br />
        <br />
        <div className="flex flex-col">
          <p className="digikala text-2xl text-center">
            برای گزارش باگ ب شماره واتساپ زیر باگ خود را بفرستید یا به اکانت
            تلگرام زیر پیام دهید
          </p>
          <br />
          <div className="flex justify-between m-5">
            <SocialIcon
              url="https://wa.link/p5mhw8"
              fallback="whatsapp"
              bgColor={whatsappHover ? "#25D366" : "black"}
              style={{ width: 25, height: 25 }}
              onMouseOver={() => setWhatsappHover(true)}
              onMouseLeave={() => setWhatsappHover(false)}
            />
            <Link
              href="https://wa.link/p5mhw8"
              className="digikala text-xl"
              id="whatsapp-icon"
            >
              09309096215
            </Link>
          </div>
          <div className="flex justify-between m-5">
            <SocialIcon
              url="https://telegram.me/aliakbar_nateghi"
              bgColor={telegramHover ? "#229ED9" : "black"}
              style={{ width: 25, height: 25 }}
              onMouseOver={() => setTelegramHover(true)}
              onMouseLeave={() => setTelegramHover(false)}
            />
            <Link
              href="https://telegram.me/aliakbar_nateghi"
              className="digikala text-xl"
              id="telegram-icon"
            >
              @aliakbar_nateghi
            </Link>
          </div>
        </div>
      </div> */}

      {/* <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700 fixed top-0 left-0 w-screen">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center">
            <Image src={Mapna} height={45} alt="MAPNA" className="p-0 m-0" />
          </a>
          <button
            data-collapse-toggle="navbar-dropdown"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-dropdown"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className="hidden w-full md:block md:w-auto"
            id="navbar-dropdown"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <button
                  id="dropdownNavbarLink"
                  data-dropdown-toggle="dropdownNavbar"
                  className="flex items-center justify-between w-full py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                >
                  Dropdown{" "}
                  <svg
                    className="w-2.5 h-2.5 ml-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                <div
                  id="dropdownNavbar"
                  className="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                >
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-400"
                    aria-labelledby="dropdownLargeButton"
                  >
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Settings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Earnings
                      </a>
                    </li>
                  </ul>
                  <div className="py-1">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                    >
                      Sign out
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  پروفایل
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  خروج
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav> */}

      <footer className="bg-white shadow dark:bg-gray-800 fixed left-0 bottom-0 w-screen">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023{" "}
            <a href="https://flowbite.com/" className="hover:underline">
              MAPNA™
            </a>
            . All Rights Reserved.
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">
                About
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
