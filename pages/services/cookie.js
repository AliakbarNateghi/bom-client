// "use server";

import { cookies as nextCookies } from "next/headers";
// import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import { parseCookies } from "nookies";
import cookie from 'js-cookie';

export function getCookies(name) {
  // console.log("access_token :", cookie.get('access_token'));
  const cookies = parseCookies();
  // console.log("cookies :", cookies);
  if (name) {
    return cookies[name] || null;
  }
  return cookies;
}
// export const getCookie = async (name = null) => {
//   const cookies = await nextCookies();
//   return name ? cookies.get(name) : cookies.getAll();
// };

// export const setCookie = (name, value, options) => {
//   cookies().set(name, value, options);
// };

// export const clearCookie = (name) => {
//   cookies().set({
//     name: name,
//     expires: new Date("2016-10-05"),
//     path: "/", // For all paths
//   });
// };
