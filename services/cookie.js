// "use server";

import { cookies } from "next/headers";
// import { getCookie, setCookie, deleteCookie } from 'cookies-next';
// import { parseCookies } from "nookies";
import cookie from "js-cookie";

// export function getCookies(name) {
//   const cookies = parseCookies();
//   if (name) {
//     return cookies[name] || null;
//   }
//   return cookies;
// }
const getCookie = async (name = null) => {
  const cookies = await nextCookies();
  return name ? cookies.get(name) : cookies.getAll();
};

const setCookie = (name, value, options) => {
  cookies().set(name, value, options);
};

const clearCookie = async (name) => {
  await cookies().set({
    name: name,
    expires: new Date("2016-10-05"),
    path: "/", // For all paths
  });
};

export default { getCookie, setCookie, clearCookie };