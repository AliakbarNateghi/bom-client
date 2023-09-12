import React, { useState, useEffect, useCallback } from "react";
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

  const sidebarClick = useCallback(async (e) => {
    e.preventDefault();
    await setSidebar(!sidebar);
    userGroups.includes("god") ? setIsAdmin(true) : null;
  });

  let links = [
    { label: "خانه", link: "/", onClick: () => {} },
    { label: "پروفایل", link: "/user/profile", onClick: () => {} },
    {
      label: "اسکوپ ماتریکس",
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
      link: "/table/permission/provide?page=1&group=1",
      onClick: () => {},
    },
    {
      label: "دسترسی اسکوپ ماتریکس",
      link: "/table/permission/bom?page=1&group=1",
      onClick: () => {},
    },
  ];

  isAdmin ? adminLinks.map((adminLink) => links.splice(4, 0, adminLink)) : "";

  return (
    <div className="fixed z-[2]">
      {loggedin ? (
        <div>
          <div
            id="sidebar"
            onClick={sidebarClick}
            // onBlur={() => setSidebar(false)}
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
                  </Box>
                </Paper>
              </ThemeProvider>
            </Box>
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
