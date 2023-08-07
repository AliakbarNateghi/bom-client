"use client";

import { useState, useEffect } from "react";
import { useDispatch, Provider } from "react-redux";
import { login } from "@/pages/redux/slices/user";
// import { redirect, useRouter } from "next/navigation";
import { useRouter } from "next/router";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { errorToast } from "@/pages/services/toast";
import { store } from "@/pages/redux/store/clientStore";
// import { getCookie } from "@/pages/services/cookie";

export default function Login() {
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    const user = localStorage.getItem("user");
    user ? router.push("/") : "";
  }, [loginForm]);
  
  // useEffect(() => {}, [loginForm]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(login(loginForm));
      unwrapResult(res);
      router.push("/");
    } catch (err) {
      errorToast("نام کاربری یا رمز عبور نادرست");
      throw err;
    }
  };

  return (
    <div className="bg-white ">
      <div className="max-w-sm mx-auto mt-28 sm:mt-52">
        <h2 className="text-center mb-5 text-xl digikala">ورود</h2>
        <hr className="w-6/12 mx-auto" />
        <form
          onSubmit={onSubmit}
          className=" border-0  sm:border-1 p-10 rounded border-gray-400"
        >
          <div className="w-full">
            <label
              htmlFor="username"
              className="text-sm font-medium leading-6 text-gray-900 float-right digikala"
            >
              نام کاربری
            </label>
            <div className="mt-2">
              <input
                type="username"
                required
                value={loginForm.username}
                onChange={(e) =>
                  setLoginForm((v) => {
                    return { ...loginForm, username: e.target.value };
                  })
                }
                className="outline-0 rounded p-1.5 w-full border-2 border-gray-400"
              />
            </div>
          </div>
          <div className="">
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900 float-right digikala"
            >
              رمز عبور
            </label>
            <div className="mt-2">
              <input
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm((v) => {
                    return { ...loginForm, password: e.target.value };
                  })
                }
                type="password"
                required
                className="outline-0 rounded p-1.5 w-full  border-2 border-gray-400"
              />
            </div>
            <div className="mt-5">
              <button className="w-full bg-gray-950 text-white w-100 rounded py-2 digikala">
                ورود
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
