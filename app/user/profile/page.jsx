"use client"

import Loggedin from "@/app/services/loggedin";
import React, { useState, useEffect } from 'react'
import Image from "next/image";
// import React, { useState } from 'react'
import { store } from "@/app/redux/store";
// import { selectCurrentUser } from "@/app/redux/slices/user";
import { useSelector } from "react-redux";

export default function Profile() {
    const [user, setUser] = useState({})
    useEffect(() => {
        setUser(JSON.parse(Loggedin()))
      }, [])
    console.log('user :', user);
    return (
        <div className="flex items-center h-screen w-full justify-center">
        <div className="max-w-xs">
            <div className="bg-white shadow-xl rounded-lg py-3">
            <div className="p-2">
                <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
                    {user.username}
                </h3>

                <div className="text-center text-gray-400 text-xs font-semibold">
                    <p>{user.first_name} {user.last_name}</p>
                </div>

                <table className="text-xs my-3">
                <tbody>
                    <tr>
                        <td className="px-2 py-2">{user.phone_number}</td>
                        <td className="px-2 py-2 text-gray-500 font-semibold">شماره تلفن</td>
                    </tr>
                    <tr>
                        <td className="px-2 py-2">{user.email}</td>
                        <td className="px-2 py-2 text-gray-500 font-semibold">آدرس ایمیل</td>
                    </tr>
                </tbody>
                </table>
            </div>
            </div>
        </div>
        </div>
    )
}