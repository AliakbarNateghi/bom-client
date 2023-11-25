"use client";
import React, { useEffect } from "react";
const USER = "user";

export const setUser = (user) => {
  window.localStorage.setItem("user", JSON.stringify(user));
};

export const purgeLocalStorage = () => {
  window.localStorage.removeItem(USER);
};

export default { setUser, purgeLocalStorage };
