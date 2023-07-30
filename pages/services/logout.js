import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Logout() {
  window.localStorage.removeItem("user");
  redirect("/user/login/");

  // const router = useRouter();
  // useEffect(() => {
  //   window.localStorage.removeItem("user");

  //   router.push("/user/login/");
  // }, [router]);
}
