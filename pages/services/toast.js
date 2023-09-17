"use client";
import { toast } from "react-toastify";

const options = {
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};
export const successToast = (text) => {
  toast.success(text, options);
};
export const errorToast = (text) => {
  toast.error(text, options);
};
export const infoToast = (text) => {
  toast.info(text, options);
};
export const warningToast = (text) => {
  toast.warn(text, options);
};
export const defaultToast = (text) => {
  toast(text, options);
};
