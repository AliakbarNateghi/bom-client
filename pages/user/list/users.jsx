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

function MoreLess({ value, className }) {
  const [expanded, setExpanded] = useState(false);

  const content =
    expanded || typeof value !== "string" ? value : value.slice(0, 40);

  const showMoreLessLink = value?.length > 40;

  return (
    <div className={`text-base font-medium ${className} digikala`}>
      {content}
      &nbsp;
      {showMoreLessLink && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-blue-500 hover:text-red-500 text-base digikala"
        >
          {expanded ? "کمتر" : "بیشتر"}
        </button>
      )}
    </div>
  );
}

export default function Users({ users, groups }) {
  const [groupID, setGroupID] = useState("");
  const [open, setOpen] = useState(false);
  const [group, setGroup] = useState([]);
  const [userName, setUserName] = useState("");
  const [userGroups, setUserGroups] = useState([]);

  const openModal = (e) => {
    e.preventDefault();
    console.log("e :", e);
    // users.map((user) => user === )
    setOpen(true);
  };
  const handleChangeMultiple = (e) => {
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
    setGroup(groups);
  };
  return (
    <div className="flex items-center h-screen w-full justify-center">
      {users.map((user) => (
        <div className="w-1/4 h-1/3 m-5" key={user.username}>
          <div className="bg-white shadow-xl rounded-lg py-3">
            <div className="p-4">
              <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
                {user.username}
              </h3>

              <div className="text-center text-gray-400 text-xs font-semibold">
                <p>
                  {user.first_name || user.username} {user.last_name}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="px-2 py-2 digikala">{user.phone_number}</p>
                <p className="px-2 py-2 text-gray-500 font-semibold digikala">
                  شماره تلفن
                </p>
              </div>
              <div className="flex justify-between">
                <MoreLess className="px-2 py-2" value={user.email} />
                <p className="px-2 py-2 text-gray-500 font-semibold digikala">
                  آدرس ایمیل
                </p>
              </div>
              <div className="flex justify-between">
                <p className="px-2 py-2 digikala">
                  {user.groups.map((group) => group.name).join(", ")}
                </p>
                <p className="px-2 py-2 text-gray-500 font-semibold digikala">
                  سطح دسترسی
                </p>
              </div>

              <div className="w-full mt-2">
                <Button onClick={openModal}>
                  <p className="digikala">تغییر گروه کاربر</p>
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
                      <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 300 }}>
                        <InputLabel shrink htmlFor="select-multiple-native">
                          گروه ها
                        </InputLabel>
                        <Select
                          multiple
                          native
                          value={user.groups}
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
                          className="w-full bg-gray-950 text-white rounded py-2 digikala"
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
