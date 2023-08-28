import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Logout from "@/pages/services/logout";
import Image from "next/image";
import { userInfo } from "@/pages/redux/slices/userinfo";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
// import grouplogo from "@/public/logos/group.png";

export default function Sidebar({ loggedin }) {
  const router = useRouter();
  const [sidebar, setSidebar] = useState(false);
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.userInfo);

  const userGroups = [];
  for (let i = 0; i < data?.groups?.length; i++) {
    userGroups.push(data.groups[i].name);
  }

  useEffect(() => {
    const localstorage = JSON.parse(localStorage.getItem("user"));
    dispatch(userInfo(localstorage ? localstorage.username : ""));
  }, [router.pathname !== "user/login", dispatch]);

  useEffect(() => {
    setSidebar(false);
  }, [router.pathname]);

  const sidebarClick = useCallback(async (e) => {
    e.preventDefault();
    await setSidebar(!sidebar);
  });

  return (
    <div>
      {loggedin ? (
        <div>
          <div
            id="sidebar"
            onClick={sidebarClick}
            className={sidebar ? "open" : ""}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          {sidebar ? (
            <div className="flex">
              <div className="flex flex-col h-screen p-3 bg-white shadow w-60">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <h2 className="text-xl font-bold digikala">داشبورد</h2>
                  </div>
                  <div className="flex-1">
                    <ul className="pt-2 pb-4 space-y-1 text-sm">
                      <li className="rounded-sm">
                        <Link
                          href="/"
                          className="flex items-center p-2 space-x-3 rounded-md"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                          </svg>
                          <span className="digikala">صفحه اصلی</span>
                        </Link>
                      </li>
                      <li className="rounded-sm">
                        <Link
                          href="/user/profile"
                          className="flex items-center p-3 space-x-4 rounded-md"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            id="profile"
                          >
                            <path
                              fill="#000"
                              fill-rule="evenodd"
                              d="M374 2009c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4m3.758.673A5.983 5.983 0 0 0 380 2005a6 6 0 1 0-9.758 4.673c-3.659 1.375-6.242 4.772-6.242 9.327h2c0-5 3.589-8 8-8s8 3 8 8h2c0-4.555-2.583-7.952-6.242-9.327"
                              transform="translate(-364 -1999)"
                            ></path>
                          </svg>
                          <span>پروفایل</span>
                        </Link>
                      </li>
                      <li className="rounded-sm">
                        {userGroups.map((group) => {
                          return group == "god" ? (
                            <Link
                              className="digikala flex items-center p-2 space-x-4 rounded-md"
                              href="/user/list"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 24"
                                width="30"
                                height="30"
                                id="group"
                              >
                                <path
                                  d="M7 10a4.61 4.61 0 0 1 .2-1 4.55 4.55 0 0 1 .41-1h0A1.55 1.55 0 1 1 9.13 6.4a5.15 5.15 0 0 1 .92-.51A5.82 5.82 0 0 1 11 5.6 3.54 3.54 0 1 0 7 10zM7.6 14a3.77 3.77 0 0 1 .83.11A5.27 5.27 0 0 1 7.62 13a5.36 5.36 0 0 1-.42-1A5.59 5.59 0 0 0 2 17.58a1 1 0 0 0 1 1H5.21a7.09 7.09 0 0 1 .38-1 7.59 7.59 0 0 1 .57-1h-2A3.58 3.58 0 0 1 7.6 14zM14.89 6.42a1.54 1.54 0 1 1 1.53 1.67h0a4.55 4.55 0 0 1 .41 1 4.61 4.61 0 0 1 .2 1A3.54 3.54 0 1 0 13 5.6a5.24 5.24 0 0 1 1 .3A5.57 5.57 0 0 1 14.89 6.42zM16.8 12a5.36 5.36 0 0 1-.42 1 5 5 0 0 1-.82 1.12 3.5 3.5 0 0 1 .86-.12 3.59 3.59 0 0 1 3.44 2.58h-2a7.59 7.59 0 0 1 .57 1 7.09 7.09 0 0 1 .38 1H21a1 1 0 0 0 1-1A5.58 5.58 0 0 0 16.8 12zM9 8.67A3.38 3.38 0 0 0 8.51 10a3.68 3.68 0 0 0-.06.59 3.64 3.64 0 0 0 .4 1.6 3.55 3.55 0 0 0 1.55 1.54 3.49 3.49 0 0 0 1.54.4.27.27 0 0 1 .07.08l.07-.09a3.39 3.39 0 0 0 1.52-.39 3.53 3.53 0 0 0 1.54-1.54 3.46 3.46 0 0 0 .41-1.6 3.81 3.81 0 0 0-.06-.6A3.68 3.68 0 0 0 15 8.65a3.43 3.43 0 0 0-.76-.85A3.71 3.71 0 0 0 12 7a3.84 3.84 0 0 0-.91.13 3.62 3.62 0 0 0-1.27.64A3.32 3.32 0 0 0 9 8.67zM12 9a1.55 1.55 0 1 1-1.55 1.55A1.55 1.55 0 0 1 12 9zM16.7 17.58a6 6 0 0 0-.81-1 5.64 5.64 0 0 0-2.18-1.31h0A4.91 4.91 0 0 0 12.61 15h0A5.25 5.25 0 0 0 12 15l-.54 0h-.05a5.65 5.65 0 0 0-1.1.23h0a5.64 5.64 0 0 0-2.18 1.31 6 6 0 0 0-.81 1 6.27 6.27 0 0 0-.51 1 5.55 5.55 0 0 0-.37 2 1 1 0 0 0 1 1h9.16a1 1 0 0 0 1-1 5.55 5.55 0 0 0-.37-2A6.27 6.27 0 0 0 16.7 17.58zM9 18.58a3.67 3.67 0 0 1 1-1 3.06 3.06 0 0 1 .79-.39 3.48 3.48 0 0 1 1-.18h.23a3.49 3.49 0 0 1 1 .18 4 4 0 0 1 .77.39 3.5 3.5 0 0 1 1.51 2H8.56A3.66 3.66 0 0 1 9 18.58z"
                                  data-name="27"
                                ></path>
                              </svg>
                              <span>کاربران</span>
                            </Link>
                          ) : (
                            <div></div>
                          );
                        })}
                      </li>
                      <li className="rounded-sm">
                        <Link
                          onClick={Logout}
                          href="/user/login"
                          className="flex items-center p-3 space-x-3 rounded-md"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                            />
                          </svg>
                          <span>خروج</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
