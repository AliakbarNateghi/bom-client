import { userInfo } from "@/pages/redux/slices/userinfo";
import { useSelector, useDispatch } from "react-redux";
import logo from "@/public/logos/white-logo.png";
import background from "@/public/logos/background8.jpg";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { SocialIcon } from "react-social-icons";
import { width } from "@mui/system";

// import { CFM56 } from "@/public/3d/Engine_cfm56-7b";
// import { Canvas } from "@react-three/fiber";
// import {
//   OrbitControls,
//   PerspectiveCamera,
//   directionalLight,
//   ambientLight,
// } from "@react-three/drei";
// import ModelViewer from "./components/3d/modelviewer";
// import CFM56 from "@/public/3d/cfm56.glb";

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
    <div className="flex flex-col float-right">
      <Image
        src={background}
        alt=""
        className="absolute z-[-1] left-0 top-0 w-full"
      />

      {/* <div className="sketchfab-embed-wrapper background-iframe">
        <iframe
          title="Turbojet Engine"
          frameborder="0"
          allowfullscreen
          mozallowfullscreen="true"
          webkitallowfullscreen="true"
          allow="autoplay; fullscreen; xr-spatial-tracking"
          xr-spatial-tracking
          execution-while-out-of-viewport
          execution-while-not-rendered
          web-share
          width="2000"
          height="1100"
          src="https://sketchfab.com/models/d520e097acae4b1194343e1b72acacc0/embed?autostart=1"
          // src="https://sketchfab.com/models/864dabdcb3ae40438c999443bc2caa1d/embed?autostart=1"
        ></iframe>
      </div> */}
      {/* <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[1, 1, 1]} />
        <CFM56 />
        <OrbitControls />
      </Canvas> */}
      {/* <ModelViewer scale="40" modelPath="/public/3d/cfm56.glb" /> */}
      <p className="digikala text-xl text-center">:لیست جداول</p>
      <ul className="">
        <li className="text-center">
          <Link
            href="/table/main/bom?page=1"
            className="digikala text-blue-500 text-xl text-right"
          >
            اسکوپ ماتریکس
          </Link>
        </li>
        <li className="text-center">
          <Link
            href="/table/main/provide?page=1"
            className="digikala text-blue-500 text-xl text-right"
          >
            تامین
          </Link>
        </li>
      </ul>
      <br />
      {userGroups.map((group) => {
        return group == "god" ? (
          <div>
            <p className="digikala text-xl text-center">:لیست جداول دسترسی</p>
            <ul>
              <li className="text-center">
                <Link
                  href="/table/permission/bom?page=1&group=1"
                  className="digikala text-blue-500 text-xl"
                >
                  اسکوپ ماتریکس
                </Link>
              </li>
              <li className="text-center">
                <Link
                  href="/table/permission/provide?page=1&group=1"
                  className="digikala text-blue-500 text-xl"
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
      <br />
      <p className="digikala text-2xl text-center">
        :برای گزارش باگ ب شماره واتساپ زیر باگ خود را بفرستید یا به اکانت تلگرام
        زیر پیام دهید
      </p>
      <br />
      <div className="flex justify-between m-5">
        <SocialIcon
          url="https://wa.link/p5mhw8"
          fallback="whatsapp"
          bgColor="black"
          style={{ width: 25, height: 25 }}
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
          bgColor="black"
          style={{ width: 25, height: 25 }}
        />
        <Link
          href="https://telegram.me/aliakbar_nateghi"
          className="digikala text-xl hover:text-blue-500"
        >
          @aliakbar_nateghi
        </Link>
      </div>
    </div>
  );
}
