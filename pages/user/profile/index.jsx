"use client";

import { useDispatch, useSelector, Provider } from "react-redux";
import { userInfo } from "@/pages/redux/slices/userinfo";
import userupdate from "@/pages/redux/slices/userupdate";
import { unwrapResult } from "@reduxjs/toolkit";
import { redirect, useRouter } from "next/navigation";
import Loggedin from "@/pages/services/loggedin";
import React, { useState, useEffect } from "react";
import { errorToast } from "@/pages/services/toast";
import { Modal, Button, Box, Typography } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Profile() {
  const dispatch = useDispatch();
  const push = useRouter();
  const { data, loading, error } = useSelector((state) => state.userInfo);

  if (typeof window === "undefined") {
    useRouter("/user/login");
  }

  const fields = [
    { label: "نام", name: "first_name" },
    { label: "نام خانوادگی", name: "last_name" },
    { label: "آدرس ایمیل", name: "email" },
    { label: "شماره تلفن", name: "phone_number" },
  ];

  const [user, setUser] = useState({
    first_name: data?.first_name || "",
    last_name: data?.last_name || "",
    email: data?.email || "",
    phone_number: data?.phone_number || "",
  });

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setUser({
      first_name: data?.first_name || "",
      last_name: data?.last_name || "",
      email: data?.email || "",
      phone_number: data?.phone_number || "",
    });
  };

  useEffect(() => {
    const localstorage = JSON.parse(localStorage.getItem("user"));
    dispatch(userInfo(localstorage ? localstorage.username : ""));
    setUser({
      first_name:
        data?.first_name || localstorage ? localstorage.first_name : "",
      last_name: data?.last_name || localstorage ? localstorage.last_name : "",
      email: data?.email || localstorage ? localstorage.email : "",
      phone_number:
        data?.phone_number || localstorage ? localstorage.phone_number : "",
    });
  }, [dispatch]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(userupdate(user));
      unwrapResult(res);
      push("/user/profile");
    } catch (err) {
      errorToast("خطای سامانه");
    }
  };

  if (loading === "loading") {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleChange = (e, fieldName) => {
    setUser((prevUser) => ({
      ...prevUser,
      [fieldName]: e.target.value,
    }));
  };

  return (
    <div>
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
                    <td className="px-2 py-2">{data && data.phone_number}</td>
                    <td className="px-2 py-2 text-gray-500 font-semibold digikala">
                      شماره تلفن
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2">{data && data.email}</td>
                    <td className="px-2 py-2 text-gray-500 font-semibold digikala">
                      آدرس ایمیل
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2 digikala">
                      {data
                        ? data.groups.map((group) => group.name).join(", ")
                        : "شما به هیچ گروهی دسترسی ندارید"}
                    </td>
                    <td className="px-2 py-2 text-gray-500 font-semibold digikala">
                      سطح دسترسی
                    </td>
                  </tr>
                </tbody>
              </table>
              <Button onClick={handleOpen}>
                <p className="digikala">ویرایش اطلاعات</p>
              </Button>

              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <form
                    onSubmit={onSubmit}
                    className="border-0 sm:border-1 p-10 rounded border-gray-400"
                  >
                    {fields.map((field) => (
                      <div className="w-full" key={field.name}>
                        <label
                          htmlFor={field.name}
                          className="text-sm font-medium leading-6 text-gray-900 float-right digikala"
                        >
                          {field.label}
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            id={field.name}
                            onChange={(e) => handleChange(e, field.name)}
                            value={user ? user[field.name] : ""}
                            className="outline-0 rounded p-1 w-full border-2 border-gray-400"
                          />
                        </div>
                      </div>
                    ))}

                    <div className="mt-5">
                      <button className="w-full bg-gray-950 text-white w-100 rounded py-2 digikala">
                        بروزرسانی
                      </button>
                    </div>
                  </form>
                </Box>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
