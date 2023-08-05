import Api from "./api";

export default function Logout() {
  window.localStorage.removeItem("user");
  Api.init();
  Api.post("logout");
}
