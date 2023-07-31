"use server";

import { cookies } from "next/headers";

export const setCookie = (name, value, options) => {
  cookies().set(name, value, options);
};

export const getCookie = (name) => {
  return cookies().get(name).value;
};

export const clearCookie = (name) => {
  cookies().set({
    name: name,
    expires: new Date("2016-10-05"),
    path: "/", // For all paths
  });
};
