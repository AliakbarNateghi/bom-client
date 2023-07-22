'use client'

import Loggedin from "./services/loggedin";
import { useEffect } from 'react'
import { infoToast } from "./services/toast";
import { redirect } from "next/navigation";

export default function Home() {
    useEffect(() => {
        if(!localStorage.getItem('user')){
          infoToast('! ابتدا وارد شوید');
          redirect('/user/login');
        }
      }, [])
    // return (
    //     <main className="bg-white">
    //         <div className='text-black text-center'>
    //            CONTENT
    //         </div>
    //     </main>
    // )
}
