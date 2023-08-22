"use client";

import Image from "next/image";
import openEye from "@/public/logos/open-eye.png";
import closeEye from "@/public/logos/close-eye.png";
import React, { useState, useEffect, useCallback } from "react";
import { errorToast, successToast, warningToast } from "@/pages/services/toast";
import { Modal, Button, Box, Typography } from "@mui/material";
import Api from "@/pages/services/api";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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

export default function Users({ users, groups }) {
  const [groupID, setGroupID] = useState("");
  const [open, setOpen] = useState(false);
  const [group, setGroup] = useState([]);
  const [userName, setUserName] = useState("");
  const [userGroups, setUserGroups] = useState([]);
  console.log("group :", group);

  const openModal = (e) => {
    e.preventDefault();
    setOpen(true);
    
  };
  const handleChangeMultiple = (e) => {
    console.log("e :", e);
    const { options } = e.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setGroup(value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setOpen(false);
  };
  return (
    <div className="flex items-center h-screen w-full justify-center">
      {users.map((user) => (
        <div className="max-w-xs m-5" key={user.username}>
          <div className="bg-white shadow-xl rounded-lg py-3">
            <div className="p-4">
              <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
                {user.username}
              </h3>

              <div className="text-center text-gray-400 text-xs font-semibold">
                <p>
                  {user.first_name} {user.last_name}
                </p>
              </div>
              <table className="text-xs my-3">
                <tbody>
                  <tr>
                    <td className="px-2 py-2">{user.phone_number}</td>
                    <td className="px-2 py-2 text-gray-500 font-semibold digikala">
                      شماره تلفن
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2">{user.email}</td>
                    <td className="px-2 py-2 text-gray-500 font-semibold digikala">
                      آدرس ایمیل
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2">
                      {user.groups.map((group) => group.name).join(", ")}
                    </td>
                    <td className="px-2 py-2 text-gray-500 font-semibold digikala">
                      سطح دسترسی
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="w-full mt-2">
                <Button onClick={() => setOpen(true)}>
                  <p className="digikala"> تغییر گروه کاربر</p>
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
                      <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
                        {user.username}
                      </h3>
                      {/* <label
                        htmlFor="editable"
                        className="text-sm font-medium leading-6 text-gray-900 float-right digikala"
                      >
                        انتخاب گروه
                      </label>
                      <select
                        className="form-multiselect block w-full mt-1"
                        multiple
                      ></select> */}
                      <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 300 }}>
                        <InputLabel shrink htmlFor="select-multiple-native">
                          Native
                        </InputLabel>
                        <Select
                          multiple
                          native
                          value={group}
                          onChange={handleChangeMultiple}
                          label="Groups"
                          inputProps={{
                            id: "select-multiple-native",
                          }}
                        >
                          {groups.map((group) => (
                            <option key={group.id} value={group.id}>
                              {group.name}
                            </option>
                          ))}
                        </Select>
                      </FormControl>

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
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
