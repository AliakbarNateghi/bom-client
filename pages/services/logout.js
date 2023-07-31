import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { clearCookies } from "next-cookies";
import { clearCookie } from "./cookie";
import { destroyCookie } from "nookies";

export default function Logout() {
  window.localStorage.removeItem("user");

  // clearCookies("access_token");
  // clearCookies("refresh_token");

  // clearCookie("access_token");
  // clearCookie("refresh_token");

  // destroyCookie(null, "access_token");
  // destroyCookie(null, "refresh_token");

  redirect("/user/login/");

  // const router = useRouter();
  // useEffect(() => {
  //   window.localStorage.removeItem("user");

  //   router.push("/user/login/");
  // }, [router]);
}
