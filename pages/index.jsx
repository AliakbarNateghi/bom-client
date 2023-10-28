import { userInfo } from "@/pages/redux/slices/userinfo";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";
import Box from "@mui/material/Box";

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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center", // center horizontally
          alignItems: "center", // center vertically
          height: "95vh",
        }}
      >
        <TypeAnimation
          sequence={[
            "BOM",
            1500,
            "Provide",
            1500,
            "Scope matrix",
            1500,
            "B P S",
            1500,
          ]}
          wrapper="span"
          speed={5}
          style={{
            fontSize: "5em",
            display: "inline-block",
            color: "white",
            fontFamily: "digikala",
          }}
          repeat={0}
        />
      </Box>

      <footer className="shadow bg-gray-900 fixed left-0 bottom-0 w-screen">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm sm:text-center text-gray-400">
            © 2023{" "}
            <Link
              href="https://mapnagroup.com/?lang=en"
              className="hover:underline"
            >
              MAPNA™
            </Link>
            . All Rights Reserved.
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-400 sm:mt-0">
            <li>
              <Link
                href="/contact"
                className="mr-4 hover:underline md:mr-6 digikala"
              >
                گزارش باگ
              </Link>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
