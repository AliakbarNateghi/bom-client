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
    userGroups.includes("god") ? setIsAdmin(true) : null;
  }, [userGroups]);

  const sidebarClick = useCallback(async (e) => {
    e.preventDefault();
    await setSidebar(!sidebar);
    userGroups.includes("god") ? setIsAdmin(true) : null;
  });

  let links = [
    { label: "خانه", link: "/", onClick: () => {} },
    { label: "پروفایل", link: "/user/profile", onClick: () => {} },
    {
      label: "BOM",
      link: "/table/main/bom?page=1",
      onClick: () => {},
    },
    { label: "تامین", link: "/table/main/provide?page=1", onClick: () => {} },
    { label: "خروج", link: "/user/login", onClick: Logout },
  ];

  let adminLinks = [
    { label: "کاربران", link: "/user/list", onClick: () => {} },
    {
      label: "دسترسی تامین",
      link: "/table/permissiondata/provide?page=1&group=1",
      onClick: () => {},
    },
    {
      label: "‌‌BOM دسترسی",
      link: "/table/permissiondata/bom?page=1&group=1",
      onClick: () => {},
    },
  ];

  isAdmin ? adminLinks.map((adminLink) => links.splice(4, 0, adminLink)) : "";
  console.log("links : ", isAdmin);

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
                            <ListItemButton
                              onClick={item.onClick}
                              href={item.link}
                              key={item.label}
                              background="red"
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
              <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700 fixed top-0 left-0 w-screen">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                  <a href="/" className="flex items-center">
                    <Image
                      src={Mapna}
                      height={45}
                      alt="MAPNA"
                      className="p-0 m-0"
                      loading="lazy"
                    />
                  </a>

                  <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    {links.map((item) => (
                      <li className="text-white text-xl hover:text-blue-700 digikala">
                        <a onClick={item.onClick} href={item.link}>
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
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
