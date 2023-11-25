import Api from "./api";
import { clearCookie } from "./cookie";
import cookie from "js-cookie";

export default async function Logout() {
  window.localStorage.removeItem("user");
  // await clearCookie("access_token");
  // await clearCookie("refresh_token");
  // await cookie.remove("access_token");
  // await cookie.remove("refresh_token");
  Api.init();
  const res = await Api.post("logout");
  return res;
}
