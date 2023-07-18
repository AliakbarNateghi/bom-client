"use client"

import Loggedin from "@/app/services/loggedin"

export default function Profile() {
    const user = Loggedin()
    return (
        <h1>{user}</h1>
    )
}