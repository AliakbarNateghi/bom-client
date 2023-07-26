"use client";

import { useDispatch, useSelector } from "react-redux";
// import { userinfo } from "@/app/redux/slices/userinfo";
import { userInfo } from "@/app/redux/slices/userinfo";
import userupdate from "@/app/redux/slices/userupdate";
import { unwrapResult } from "@reduxjs/toolkit";
import { redirect, useRouter } from "next/navigation";
import Loggedin from "@/app/services/loggedin";
import React, { useState, useEffect } from "react";
import { errorToast } from "@/app/services/toast";
import "@/app/globals.css";
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
  const { data, loading, error } = useSelector((state) => state.userInfo);
  console.log("data :", data);
  const [user, setUser] = useState({
    first_name: data && data.first_name,
    last_name: data && data.last_name,
    email: data && data.email,
    phone_number: data && data.phone_number,
  });
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const username = JSON.parse(localStorage.getItem("user")).username;
    dispatch(userInfo(username));
  }, [dispatch]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(userupdate(user));
      unwrapResult(res);
      push("/");
    } catch (err) {
      console.log(err);
      errorToast("خطای سامانه");
    }
  };

  // if (data) {
  //   console.log("data :", data.groups[0].name);
  // }

  if (loading === "loading") {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const fields = [
    { label: 'نام', name: 'first_name' },
    { label: 'نام خانوادگی', name: 'last_name' },
    { label: 'آدرس ایمیل', name: 'email' },
    { label: 'شماره تلفن', name: 'phone_number' },
  ];

  const ModalContent = ({ user, setUser, onSubmit }) => {
    const handleChange = (e, fieldName) => {
      setUser((prevUser) => ({
        ...prevUser,
        [fieldName]: e.target.value,
      }));
    };
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
                <form onSubmit={onSubmit} className="border-0 sm:border-1 p-10 rounded border-gray-400">
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
                          value={user[field.name]}
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
                  {/* <form
                    onSubmit={onSubmit}
                    className=" border-0  sm:border-1 p-10 rounded border-gray-400"
                  >
                    <div className="w-full">
                      <label
                        htmlFor="firstname"
                        className="text-sm font-medium leading-6 text-gray-900 float-right digikala"
                      >
                        نام
                      </label>
                      <div className="mt-2">
                        <input
                          type="firstname"
                          onChange={(e) =>
                            setUser((v) => {
                              return { ...user, first_name: e.target.value };
                            })
                          }
                          value={user.first_name}
                          className="outline-0 rounded p-1 w-full border-2 border-gray-400"
                        />
                      </div>
                    </div>

                    <div className="w-full">
                      <label
                        htmlFor="lastname"
                        className="text-sm font-medium leading-6 text-gray-900 float-right digikala"
                      >
                        نام خانوداگی
                      </label>
                      <div className="mt-2">
                        <input
                          type="lastname"
                          onChange={(e) =>
                            setUser((v) => {
                              return { ...user, last_name: e.target.value };
                            })
                          }
                          value={user.last_name}
                          className="outline-0 rounded p-1 w-full border-2 border-gray-400"
                        />
                      </div>
                    </div>

                    <div className="w-full">
                      <label
                        htmlFor="email"
                        className="text-sm font-medium leading-6 text-gray-900 float-right digikala"
                      >
                        آدرس ایمیل
                      </label>
                      <div className="mt-2">
                        <input
                          type="email"
                          onChange={(e) =>
                            setUser((v) => {
                              return { ...user, email: e.target.value };
                            })
                          }
                          value={user.email}
                          className="outline-0 rounded p-1 w-full border-2 border-gray-400"
                        />
                      </div>
                    </div>

                    <div className="w-full">
                      <label
                        htmlFor="phonenumber"
                        className="text-sm font-medium leading-6 text-gray-900 float-right digikala"
                      >
                        شماره تلفن
                      </label>
                      <div className="mt-2">
                        <input
                          type="phonenumber"
                          onChange={(e) =>
                            setUser((v) => {
                              return { ...user, phone_number: e.target.value };
                            })
                          }
                          value={user.phone_number}
                          className="outline-0 rounded p-1 w-full border-2 border-gray-400"
                        />
                      </div>
                    </div>

                    <div className="mt-5">
                      <button className="w-full bg-gray-950 text-white w-100 rounded py-2 digikala">
                        بروزرسانی
                      </button>
                    </div>
                  </form> */}
                </Box>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
