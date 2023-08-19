"use client";

import Image from "next/image";
import openEye from "@/public/logos/open-eye.png";
import closeEye from "@/public/logos/close-eye.png";
import React, { useState, useEffect, useCallback } from "react";
import { errorToast, successToast, warningToast } from "@/pages/services/toast";
import { Modal, Button, Box, Typography } from "@mui/material";
import Api from "@/pages/services/api";

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

export default function Profile({ user }) {
  const [userName, setUserName] = useState();
  const [groups, setGroups] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [open, setOpen] = useState(false);
  const [passModal, setPassModal] = useState(false);
  const [currentPass, setCurrentPass] = useState("");
  const [firstNewPass, setFirstNewPass] = useState("");
  const [secondNewPass, setSecondNewPass] = useState("");
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    setUserName(user.username);
    setGroups(user.groups);
    setFirstName(user.first_name);
    setLastName(user.last_name);
    setEmail(user.email);
    setPhoneNumber(user.phone_number);
  }, [user]);

  const payload = {
    username: userName,
    first_name: firstName,
    last_name: lastName,
    email: email,
    phone_number: phoneNumber,
  };

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      Api.init();
      const response = await Api.put(`user-info`, `${userName}/`, payload);
      setOpen(false);
      return response.data;
    },
    [Api, payload]
  );

  const passPayload = {
    old_password: currentPass,
    new_password: firstNewPass,
    confirm_password: secondNewPass,
  };

  const onChangePass = useCallback(
    async (e) => {
      e.preventDefault();
      Api.init();
      if (firstNewPass !== secondNewPass) {
        return warningToast("رمز ها تطابق ندارند");
      }
      try {
        const response = await Api.post(
          `user-info/${userName}/change_password`,
          passPayload
        );
        if (response.data.message == "success") {
          successToast("رمز عبور با موفقیت تغییر کرد");
        } else errorToast("خطای سیستم");
        setShowPass(false);
        setPassModal(false);
        setCurrentPass("");
        setFirstNewPass("");
        setSecondNewPass("");
        return response.data;
      } catch (err) {
        const errorMsg = err.response.data["error"];
        if (errorMsg == "Invalid old pass") {
          warningToast("رمز عبور فعلی نادرست است");
        } else if (errorMsg == "not match") {
          warningToast("رمز ها تطابق ندارند");
        } else if (errorMsg == "wrong") {
          errorToast("رمز های عبور خود را بازبینی کنید");
        }
      }
    },
    [Api, passPayload]
  );

  return (
    <div>
      <div className="flex items-center h-screen w-full justify-center">
        <div className="max-w-xs">
          <div className="bg-white shadow-xl rounded-lg py-3">
            <div className="p-4">
              <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
                {userName}
              </h3>

              <div className="text-center text-gray-400 text-xs font-semibold">
                <p>
                  {firstName} {lastName}
                </p>
              </div>

              <table className="text-xs my-3">
                <tbody>
                  <tr>
                    <td className="px-2 py-2">{phoneNumber}</td>
                    <td className="px-2 py-2 text-gray-500 font-semibold digikala">
                      شماره تلفن
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2">{email}</td>
                    <td className="px-2 py-2 text-gray-500 font-semibold digikala">
                      آدرس ایمیل
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2 digikala">
                      {groups
                        ? groups.map((group) => group.name).join(", ")
                        : "شما به هیچ گروهی دسترسی ندارید"}
                    </td>
                    <td className="px-2 py-2 text-gray-500 font-semibold digikala">
                      سطح دسترسی
                    </td>
                  </tr>
                </tbody>
              </table>
              <Button onClick={() => setOpen(true)}>
                <p className="digikala">ویرایش اطلاعات</p>
              </Button>
              <br />
              <Button onClick={() => setPassModal(true)}>
                <p className="digikala"> تغییر رمز عبور</p>
              </Button>

              <Modal
                open={open}
                onClose={() => {
                  setOpen(false);
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <form
                    onSubmit={onSubmit}
                    className="border-0 sm:border-1 p-10 rounded border-gray-400"
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
                          type="text"
                          id="firstname"
                          onChange={(e) => setFirstName(e.target.value)}
                          value={firstName}
                          className="outline-0 rounded p-1 w-full border-2 border-gray-400"
                        />
                      </div>
                    </div>

                    <div className="w-full">
                      <label
                        htmlFor="lastname"
                        className="text-sm font-medium leading-6 text-gray-900 float-right digikala"
                      >
                        نام خانوادگی
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          id="lastname"
                          onChange={(e) => setLastName(e.target.value)}
                          value={lastName}
                          className="outline-0 rounded p-1 w-full border-2 border-gray-400"
                        />
                      </div>
                    </div>

                    <div className="w-full">
                      <label
                        htmlFor="email"
                        className="text-sm font-medium leading-6 text-gray-900 float-right digikala"
                      >
                        ایمیل
                      </label>
                      <div className="mt-2">
                        <input
                          type="email"
                          id="email"
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
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
                          type="number"
                          id="phonenumber"
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          value={phoneNumber}
                          className="outline-0 rounded p-1 w-full border-2 border-gray-400"
                        />
                      </div>
                    </div>

                    {/* <div className="w-full">
                      <label
                        htmlFor="password"
                        className="text-sm font-medium leading-6 text-gray-900 float-right digikala"
                      >
                        رمز عبور
                      </label>
                      <div className="mt-2">
                        <input
                          type="password"
                          id="password"
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                          className="outline-0 rounded p-1 w-full border-2 border-gray-400"
                        />
                      </div>
                    </div> */}

                    <div className="mt-5">
                      <button
                        className="w-full bg-gray-950 text-white w-100 rounded py-2 digikala"
                        type="submit"
                      >
                        بروزرسانی
                      </button>
                    </div>
                  </form>
                </Box>
              </Modal>
              <Modal
                open={passModal}
                onClose={() => {
                  setPassModal(false);
                }}
                aria-labelledby="pass-modal-title"
                aria-describedby="pass-modal-description"
              >
                <Box sx={style}>
                  <Image
                    src={showPass ? openEye : closeEye}
                    width={32}
                    height={32}
                    onClick={() => setShowPass(!showPass)}
                  />
                  <form
                    onSubmit={onChangePass}
                    className="border-0 sm:border-1 p-10 rounded border-gray-400"
                  >
                    <div className="w-full">
                      <label
                        htmlFor="current-pass"
                        className="text-sm font-medium leading-6 text-gray-900 float-right digikala"
                      >
                        رمز عبور فعلی
                      </label>
                      <div className="mt-2">
                        <input
                          type={showPass ? "text" : "password"}
                          id="current-pass"
                          onChange={(e) => setCurrentPass(e.target.value)}
                          value={currentPass}
                          className="outline-0 rounded p-1 w-full border-2 border-gray-400"
                        />
                      </div>
                    </div>

                    <div className="w-full">
                      <label
                        htmlFor="first-new-pass"
                        className="text-sm font-medium leading-6 text-gray-900 float-right digikala"
                      >
                        رمز عبور جدید
                      </label>
                      <div className="mt-2">
                        <input
                          type={showPass ? "text" : "password"}
                          id="first-new-pass"
                          onChange={(e) => setFirstNewPass(e.target.value)}
                          value={firstNewPass}
                          className="outline-0 rounded p-1 w-full border-2 border-gray-400"
                        />
                      </div>
                    </div>

                    <div className="w-full">
                      <label
                        htmlFor="second-new-pass"
                        className="text-sm font-medium leading-6 text-gray-900 float-right digikala"
                      >
                        تکرار رمز عبور جدید
                      </label>
                      <div className="mt-2">
                        <input
                          type={showPass ? "text" : "password"}
                          id="second-new-pass"
                          onChange={(e) => setSecondNewPass(e.target.value)}
                          value={secondNewPass}
                          className="outline-0 rounded p-1 w-full border-2 border-gray-400"
                        />
                      </div>
                    </div>

                    <div>
                      {firstNewPass === secondNewPass ? (
                        <br />
                      ) : (
                        <p className="digikala text-red-500 text-right">
                          رمز ها مشابهت ندارند
                        </p>
                      )}
                    </div>

                    <div className="mt-5">
                      <button
                        className="w-full bg-gray-950 text-white w-100 rounded py-2 digikala"
                        type="submit"
                      >
                        تغییر رمز
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
