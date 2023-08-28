import { userInfo } from "@/pages/redux/slices/userinfo";
import { useSelector, useDispatch } from "react-redux";
import logo from "@/public/logos/white-logo.png";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Home({}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.userInfo);
  const [user, setUser] = useState(data);

  const userGroups = [];
  for (let i = 0; i < data?.groups?.length; i++) {
    userGroups.push(data.groups[i].name);
  }

  useEffect(() => {
    const localstorage = JSON.parse(localStorage.getItem("user"));
    dispatch(userInfo(localstorage ? localstorage.username : ""));
  }, [router.pathname !== "user/login", dispatch]);

  return (
    <div className="float-right">
      <p className="digikala">لیست جداول</p>
      <ul>
        <li>
          <Link
            href="/table/main/bom?page=1"
            className="digikala text-blue-500"
          >
            اسکوپ ماتریکس
          </Link>
        </li>
        <li>
          <Link href="/table/main/provide?page=1" className="digikala text-blue-500">
            تامین
          </Link>
        </li>
      </ul>
      <br />
      {userGroups.map((group) => {
        return group == "god" ? (
          <div>
            <p className="digikala">لیست جداول دسترسی</p>
            <ul>
              <li>
                <Link
                  href="/table/permission/bom?page=1&group=1"
                  className="digikala text-blue-500"
                >
                  اسکوپ ماتریکس
                </Link>
              </li>
              <li>
                <Link href="/table/permission/provide?page=1&group=1" className="digikala text-blue-500">
                  تامین
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <div></div>
        );
      })}
      <br />
      <p className="digikala">
        برای گزارش باگ ب شماره واتساپ زیر باگ خود را بفرستید یا به اکانت تلگرام
        زیر پیام دهید
      </p>
      <p className="digikala">WHATSAPP: 09309096215</p>
      <p className="digikala">TELEGRAM: @aliakbar_nateghi</p>
    </div>
  );
}
