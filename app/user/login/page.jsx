"use client";
import {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {login} from "@/app/redux/slices/user";
import {redirect, useRouter} from "next/navigation";
import {unwrapResult} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import {errorToast} from "@/app/services/toast";
import {store} from "@/app/redux/store";
import {clearCookie, setCookie,getCookie} from "@/app/services/cookie";

export default function Login() {
    const [loginForm, setLoginForm] = useState({username: '', password: ''});
    const dispatch = useDispatch()
    const {push} = useRouter()
    useEffect(() => {

    }, [loginForm])
    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await dispatch(login(loginForm))
            unwrapResult(res)
            push('/')
        } catch (err) {
            console.log(err)
            errorToast('Wrong Credential')
        }
    }
    localStorage.getItem('user') ? redirect('/user/profile') : ""
    return (
        <div className='bg-white '>
            <div className='  max-w-sm mx-auto mt-28 sm:mt-52'>
                <h2 className='text-center mb-5 text-xl '>Login</h2>
                <hr className='w-6/12 mx-auto'/>
                <form onSubmit={onSubmit} className=' border-0  sm:border-1 p-10   rounded border-violet-600'>
                    <div className='w-full'>
                        <label htmlFor="username" className=" text-sm font-medium leading-6 text-gray-900">
                            username
                        </label>
                        <div className="mt-2">
                            <input type="username" required
                                   value={loginForm.username}
                                   onChange={(e) => setLoginForm(v => {
                                       return {...loginForm, username: e.target.value}
                                   })}
                                   className="  outline-0 rounded p-1.5 w-full   border-2 border-violet-500"/>
                        </div>
                    </div>
                    <div className=''>
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                            password
                        </label>
                        <div className="mt-2">
                            <input value={loginForm.password} onChange={(e) => setLoginForm(v => {
                                return {...loginForm, password: e.target.value}
                            })} type="password" required
                                   className=" outline-0 rounded p-1.5 w-full  border-2 border-violet-500"/>

                        </div>
                        <div className="mt-5">
                            <button className='w-full bg-violet-950 text-white w-100 rounded py-2 '>login</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
