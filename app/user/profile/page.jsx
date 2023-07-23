"use client";

import { useDispatch, useSelector } from "react-redux";
// import { userinfo } from "@/app/redux/slices/userinfo";
import { userInfo } from "@/app/redux/slices/userinfo";
import { unwrapResult } from "@reduxjs/toolkit";
import { redirect, useRouter } from "next/navigation";
import Loggedin from "@/app/services/loggedin";
import React, { useState, useEffect } from "react";
import { errorToast } from "@/app/services/toast";
import "@/app/globals.css";

export default function Profile() {
  //   console.log("id :", id);
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.userInfo);
  useEffect(() => {
    const username = JSON.parse(localStorage.getItem("user")).username;
    dispatch(userInfo(username));
  }, [dispatch]);

  if (data) {
    console.log("data :", data.groups[0].name);
  }

  if (loading === "loading") {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2 className="text-center text-l digikala">
        در قسمت زیر میتوانید اطلاعات ناقص پروفایل خود را تکمیل نمایید
      </h2>
      <hr className="w-6/12 mx-auto" />
      <div className="flex items-center h-screen w-full justify-center">
        <div className="max-w-xs">
          <div className="bg-white shadow-xl rounded-lg py-3">
            <div className="p-4">
              <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
                {data && data.username}
              </h3>

              <div className="text-center text-gray-400 text-xs font-semibold">
                <p>
                  {data && data.first_name} {data && data.last_name}
                </p>
              </div>

              <table className="text-xs my-3">
                <tbody>
                  <tr>
                    {/* {userInfo.phone_number ? (
                      <td className="px-2 py-2">{userInfo.phone_number}</td>
                    ) : (
                      <td>
                        <input
                          name="phone_number"
                          type="text"
                          value={phoneNumber}
                          onChange={handleEmailChange}
                          className="outline-0 rounded p-1 w-full border-2 border-gray-400"
                        />
                      </td>
                    )} */}
                    <td className="px-2 py-2">{data && data.phone_number}</td>
                    <td className="px-2 py-2 text-gray-500 font-semibold digikala">
                      شماره تلفن
                    </td>
                  </tr>
                  <tr>
                    {/* {userInfo.email ? (
                      <td className="px-2 py-2">{userInfo.email}</td>
                    ) : (
                      <td>
                        <input
                          name="email"
                          type="email"
                          value={email}
                          onChange={handlePhoneNumberChange}
                          className="outline-0 rounded p-1 w-full border-2 border-gray-400"
                        />
                      </td>
                    )} */}
                    <td className="px-2 py-2">{data && data.email}</td>
                    <td className="px-2 py-2 text-gray-500 font-semibold digikala">
                      آدرس ایمیل
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2 digikala">
                      {data && data.groups.length > 0
                        ? data.groups.map((group) => group.name).join(", ")
                        : "شما به هیچ گروهی دسترسی ندارید"}
                    </td>
                    <td className="px-2 py-2 text-gray-500 font-semibold digikala">
                      سطح دسترسی
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
