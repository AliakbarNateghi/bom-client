// import { redirect, useRouter } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
// import { getCookie } from "./cookie";
import { redirect } from "next/navigation";

const useAuth = () => {
  useEffect(() => {
    const user = localStorage.getItem("user");
    // console.log("user-test:", JSON.parse(user));
    return JSON.parse(user);
  }, []);
};
export default useAuth;
