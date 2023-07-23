import { redirect } from "next/navigation";

export default function Logout() {
  localStorage.removeItem("user");
  redirect("/user/login/");
}
