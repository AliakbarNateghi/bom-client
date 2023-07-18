import { redirect } from "next/navigation"

export default function Loggedin() {
    !localStorage.getItem('user') ? redirect('/user/login') : ""
    return localStorage.getItem('user')
}