import Api from "./api";
import { clearCookie } from "./cookie";

export default async function Logout() {
  window.localStorage.removeItem("user");
  Api.init();
  await Api.post("logout");
  // clearCookie("access_token");
  // clearCookie("refresh_token");
}
