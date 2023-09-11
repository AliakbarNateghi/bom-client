import { userInfo } from "@/pages/redux/slices/userinfo";
import { useSelector, useDispatch } from "react-redux";
import background from "@/public/logos/background8.jpg";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { SocialIcon } from "react-social-icons";

export default function Home({}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.userInfo);
  const [user, setUser] = useState(data);
  const [telegramHover, setTelegramHover] = useState(false)
  const [whatsappHover, setWhatsappHover] = useState(false)

  const userGroups = [];
  for (let i = 0; i < data?.groups?.length; i++) {
    userGroups.push(data.groups[i].name);
  }

  useEffect(() => {
    const localstorage = JSON.parse(localStorage.getItem("user"));
    dispatch(userInfo(localstorage ? localstorage.username : ""));
  }, [router.pathname !== "user/login", dispatch]);

  return (
    <div className="flex flex-col float-right w-1/6 m-5">
      <Image
        src={background}
        alt=""
        className="absolute z-[-1] left-0 top-0 w-full"
      />
      <p className="digikala text-2xl text-center">:لیست جداول</p>
      <ul className="">
        <li className="text-center">
          <Link
            href="/table/main/bom?page=1"
            className="digikala text-blue-500 hover:text-red-600 text-xl hover:text-2xl"
          >
            اسکوپ ماتریکس
          </Link>
        </li>
        <li className="text-center">
          <Link
            href="/table/main/provide?page=1"
            className="digikala text-blue-500 hover:text-red-600 text-xl hover:text-2xl"
          >
            تامین
          </Link>
        </li>
      </ul>
      <br />
      {userGroups.map((group) => {
        return group == "god" ? (
          <div>
            <p className="digikala text-2xl text-center">:لیست جداول دسترسی</p>
            <ul>
              <li className="text-center">
                <Link
                  href="/table/permission/bom?page=1&group=1"
                  className="digikala text-blue-500 hover:text-red-600 text-xl hover:text-2xl"
                >
                  اسکوپ ماتریکس
                </Link>
              </li>
              <li className="text-center">
                <Link
                  href="/table/permission/provide?page=1&group=1"
                  className="digikala text-blue-500 hover:text-red-600 text-xl hover:text-2xl"
                >
                  تامین
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <div></div>
        );
      })}
      <br /><br /><br /><br />
      <div className="flex flex-col">
        <p className="digikala text-2xl text-center">
          برای گزارش باگ ب شماره واتساپ زیر باگ خود را بفرستید یا به اکانت
          تلگرام زیر پیام دهید
        </p>
        <br />
        <div className="flex justify-between m-5">
          <SocialIcon
            url="https://wa.link/p5mhw8"
            fallback="whatsapp"
            bgColor={whatsappHover ? '#25D366' : 'black'}
            style={{ width: 25, height: 25 }}
            onMouseOver={() => setWhatsappHover(true)}
            onMouseLeave={() => setWhatsappHover(false)}
          />
          <Link
            href="https://wa.link/p5mhw8"
            className="digikala text-xl hover:text-blue-500"
          >
            09309096215
          </Link>
        </div>
        <div className="flex justify-between m-5">
          <SocialIcon
            url="https://telegram.me/aliakbar_nateghi"
            bgColor={telegramHover ? '#229ED9' : 'black'}
            style={{ width: 25, height: 25 }}
            onMouseOver={() => setTelegramHover(true)}
            onMouseLeave={() => setTelegramHover(false)}
          />
          <Link
            href="https://telegram.me/aliakbar_nateghi"
            className="digikala text-xl hover:text-blue-500"
          >
            @aliakbar_nateghi
          </Link>
        </div>
      </div>
    </div>
  );
}
