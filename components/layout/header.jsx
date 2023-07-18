'use client';
import Link from "next/link";
import {useSelector} from 'react-redux'

export default function Header() {
    const user = useSelector((state) => state.user.user);
    console.log('user', user)
    return (
        <header>
            <nav>
                <div className='flex h-10 bg-white text-black'>
                    <ul className='w-3/12 my-auto'>
                        <li className='mx-2'>
                            {
                                localStorage.getItem('user') ? <Link
                                    className='transition ease-in-out delay-0  hover:-translate-y-1  hover:scale-100 hover:bg-violet-950 hover:text-white duration-300 p-2 rounded '
                                    href="/user/profile">
                                    Profile
                                </Link> : <Link
                                    className='transition ease-in-out delay-0  hover:-translate-y-1  hover:scale-100 hover:bg-violet-950 hover:text-white duration-300 p-2 rounded '
                                    href="/user/login">
                                    Login
                                </Link>
                            }
                        </li>
                    </ul>
                    <ul className='flex justify-center flex-row w-6/12 my-auto'>
                        <li className='mx-2'>
                            <Link href="/orders"
                                className='transition ease-in-out delay-0  hover:-translate-y-1  hover:scale-100 hover:bg-violet-950 hover:text-white duration-300 p-2 rounded '>Orders</Link>
                        </li>
                    </ul>
                    <ul className='w-3/12 my-auto '>
                        <li className='mx-2'>
                            <Link className='float-right' href="/">logo</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>

    )
}


