import { userInfo } from "@/pages/redux/slices/userinfo";
import { useSelector, useDispatch } from "react-redux";
import background from "@/public/logos/background.jpg";
import back1 from "@/public/logos/back1.jpg";
import back2 from "@/public/logos/back2.jpg";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { SocialIcon } from "react-social-icons";
import mapna from "@/public/logos/mapnalogo.png";
import Mapna from "@/public/logos/LogoMapna1.png";
import Box from "@mui/material/Box";

export default function Contact({}) {
  const [telegramHover, setTelegramHover] = useState(false);
  const [whatsappHover, setWhatsappHover] = useState(false);
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center", // center horizontally
          alignItems: "center", // center vertically
          height: "100vh",
        }}
      >
        <p className="digikala text-2xl text-center">
          برای گزارش باگ ب شماره واتساپ زیر باگ خود را بفرستید یا به اکانت
          تلگرام زیر پیام دهید
        </p>
        <br />
        <div className="flex justify-between m-5">
          <SocialIcon
            url="https://wa.link/p5mhw8"
            fallback="whatsapp"
            bgColor={whatsappHover ? "#25D366" : "black"}
            style={{ width: 25, height: 25 }}
            onMouseOver={() => setWhatsappHover(true)}
            onMouseLeave={() => setWhatsappHover(false)}
          />
          <Link
            href="https://wa.link/p5mhw8"
            className="digikala text-xl pl-5 ml-5"
            id="whatsapp-icon"
          >
            09309096215
          </Link>
        </div>
        <div className="flex justify-between m-5">
          <SocialIcon
            url="https://telegram.me/aliakbar_nateghi"
            bgColor={telegramHover ? "#229ED9" : "black"}
            style={{ width: 25, height: 25 }}
            onMouseOver={() => setTelegramHover(true)}
            onMouseLeave={() => setTelegramHover(false)}
          />
          <Link
            href="https://telegram.me/aliakbar_nateghi"
            className="digikala text-xl pl-5 ml-5"
            id="telegram-icon"
          >
            @aliakbar_nateghi
          </Link>
        </div>
      </Box>
    </div>
  );
}
