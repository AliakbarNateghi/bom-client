import React, { useState, useEffect, useCallback, Suspense } from "react";
import Link from "next/link";
import Logout from "@/pages/services/logout";
import Image from "next/image";
import { userInfo } from "@/pages/redux/slices/userinfo";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import CircularIndeterminate from "./loading";
import Mapna from "@/public/logos/LogoMapna1.png";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function Sidebar({ loggedin }) {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [permissionDropDown, setPermissionDropDown] = useState(false);
  const [dataDropDown, setDataDropDown] = useState(false);
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

  useEffect(() => {
    setIsAdmin(false);
    userGroups.includes("god") ? setIsAdmin(true) : null;
  }, [userGroups]);

  const sidebarClick = useCallback(async (e) => {
    e.preventDefault();
    await setSidebar(!sidebar);
    userGroups.includes("god") ? setIsAdmin(true) : null;
  });

  let links = [
    {
      label: "خانه",
      link: "/",
      onClick: () => {},
      title: "صفحه اصلی",
      dropdown: false,
    },
    {
      label: "پروفایل",
      link: "/user/profile",
      onClick: () => {},
      title: "ادیت مشخصات",
      dropdown: false,
    },
    {
      label: "جداول",
      link: "",
      onClick: () => {
        setDataDropDown(!dataDropDown);
      },
      onMouseOver: () => {
        setDataDropDown(true);
      },
      onMouseLeave: () => {
        setDataDropDown(false);
      },
      useStateName: dataDropDown,
      title: "جداول",
      dropdown: true,
      items: [
        {
          label: "تامین",
          link: "/table/main/provide?page=1",
          title: "جدول تامین",
        },
        {
          label: "‌‌BOM",
          link: "/table/main/bom?page=1",
          title: "BOM جدول",
        },
        {
          label: "گزارش اصلی",
          link: "/table/main/core?page=1",
          title: "جدول گزارش اصلی",
        },
        {
          label: "طراحی",
          link: "/table/main/design?page=1",
          title: "جدول طراحی",
        },
        {
          label: "جانبی",
          link: "/table/main/lateral?page=1",
          title: "جدول جانبی",
        },
        {
          label: "ساخت",
          link: "/table/main/manufacturing?page=1",
          title: "جدول ساخت",
        },
        {
          label: "جانبی دو دستگاه",
          link: "/table/main/2-devices-side?page=1",
          title: "جدول جانبی دو دستگاه",
        },
        {
          label: "جانبی ۲۸ دستگاه",
          link: "/table/main/28-devices-side?page=1",
          title: "جدول جانبی ۲۸ دستگاه",
        },
        {
          label: "ساخت دو دستگاه",
          link: "/table/main/2-devices-manufacturing?page=1",
          title: "جدول ساخت دو دستگاه",
        },
        {
          label: "ساخت ۲۸ دستگاه",
          link: "/table/main/28-devices-manufacturing?page=1",
          title: "جدول ساخت ۲۸ دستگاه",
        },
        {
          label: "کیفیت دو دستگاه",
          link: "/table/main/2-devices-quality?page=1",
          title: "جدول کیفیت دو دستگاه",
        },
        {
          label: "کیفیت ۲۸ دستگاه",
          link: "/table/main/28-devices-quality?page=1",
          title: "جدول کیفیت ۲۸ دستگاه",
        },
      ],
    },
    {
      label: "خروج",
      link: "/user/login",
      onClick: Logout,
      title: "",
      dropdown: false,
    },
  ];

  let adminLinks = [
    {
      label: "کاربران",
      link: "/user/list",
      onClick: () => {},
      title: "کاربران سامانه",
      dropdown: false,
    },
    {
      label: "دسترسی",
      link: "",
      onClick: () => {
        setPermissionDropDown(!permissionDropDown);
      },
      onMouseOver: () => {
        setPermissionDropDown(true);
      },
      onMouseLeave: () => {
        setPermissionDropDown(false);
      },
      title: "تغییر دسترسی",
      dropdown: true,
      useStateName: permissionDropDown,
      items: [
        {
          label: "تامین",
          link: "/table/permission/provide?page=1&group=1",
          title: "جدول تغییر دسترسی تامین",
        },
        {
          label: "‌‌BOM",
          link: "/table/permission/bom?page=1&group=1",
          title: "BOM جدول تغییر دسترسی",
        },
        {
          label: "Scope matrix",
          link: "/table/permission/scope?page=1&group=1",
          title: "Scope matrix جدول تغییر دسترسی",
        },
      ],
    },
  ];

  // isAdmin ? adminLinks.map((adminLink) => links.splice(4, 0, adminLink)) : "";
  isAdmin ? (links = adminLinks.concat(links)) : "";

  return (
    <div className="fixed z-[5]">
      {loggedin ? (
        <div>
          {router.pathname != "/" ? (
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
                <Box className="absolute z-[1] pl-1 flex w-64">
                  <ThemeProvider
                    theme={createTheme({
                      components: {
                        MuiListItemButton: {
                          defaultProps: {
                            disableTouchRipple: true,
                          },
                        },
                      },
                      palette: {
                        mode: "dark",
                      },
                    })}
                  >
                    <Paper elevation={0} sx={{ maxWidth: 256 }}>
                      <Box sx={{}}>
                        <Suspense fallback={<CircularIndeterminate />}>
                          {links.map((item) => (
                            <div>
                              <ListItemButton
                                onClick={item.onClick}
                                href={item.link}
                                key={item.label}
                                background="red"
                                title={item.title}
                                sx={
                                  item.label == "خروج"
                                    ? {
                                        background: "#ff1744",
                                      }
                                    : {}
                                }
                              >
                                <ListItemText
                                  primary={item.label}
                                  primaryTypographyProps={{
                                    fontSize: 14,
                                    fontWeight: "bold",
                                  }}
                                />
                              </ListItemButton>
                            </div>
                          ))}
                        </Suspense>
                      </Box>
                    </Paper>
                  </ThemeProvider>
                </Box>
              ) : (
                <div></div>
              )}
            </div>
          ) : (
            <div>
              <nav className="bg-gray-900 fixed top-0 left-0 w-screen h-16 flex flex-row space-x-[180px] justify-center">
                <Link href="/" className="p-2">
                  <Image
                    src={Mapna}
                    height={45}
                    alt="mapna logo"
                    loading="lazy"
                  />
                </Link>
                {/* <div className=" flex items-center justify-between mx-auto"> */}
                <ul className="flex flex-row font-medium space-x-5 p-5">
                  {links.map((item) => (
                    <li
                      title={item.title}
                      className="text-gray-500 text-xl digikala w-32 text-center"
                    >
                      {item.dropdown ? (
                        <div
                          className=""
                          onMouseOver={item.onMouseOver}
                          onMouseLeave={item.onMouseLeave}
                        >
                          <div
                            onClick={item.onClick}
                            onMouseOver={item.onMouseOver}
                            onMouseLeave={item.onMouseLeave}
                            href={item.link}
                            className={`cursor-pointer hover:underline hover:text-gray-300 ${
                              item.useStateName ? "text-gray-300" : ""
                            }`}
                          >
                            {item.label}
                          </div>
                          {item.useStateName ? (
                            <div className="">
                              {item.items.map((link) => (
                                <div className="flex flex-col text-center">
                                  <Link
                                    href={link.link}
                                    title={link.title}
                                    className="hover:underline text-gray-300 hover:text-white"
                                  >
                                    {link.label}
                                  </Link>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      ) : (
                        <Link
                          onClick={item.onClick}
                          href={item.link}
                          className={`hover:underline  ${
                            item.link != "/user/login"
                              ? "hover:text-gray-300"
                              : "hover:text-red-500"
                          }`}
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
                {/* </div> */}
              </nav>
            </div>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
