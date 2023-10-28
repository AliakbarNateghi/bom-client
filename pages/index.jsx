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

      <footer className="bg-white shadow dark:bg-gray-800 fixed left-0 bottom-0 w-screen">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023{" "}
            <a
              href="https://mapnagroup.com/?lang=en"
              className="hover:underline"
            >
              MAPNA™
            </a>
            . All Rights Reserved.
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <a
                href="/contact"
                className="mr-4 hover:underline md:mr-6 digikala"
              >
                گزارش باگ
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
