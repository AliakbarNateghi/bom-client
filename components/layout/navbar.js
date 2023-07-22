import { useState } from 'react' 
import {useSelector} from 'react-redux'
import Link from 'next/link';


export default function Navbar() {
  const [open, setOpen] = useState(false)
  const user = useSelector((state) => state.user.user);
  console.log('user', user)

  return (
    <nav className="relative">
      <button 
        className="p-2 text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
        onClick={() => setOpen(!open)}
      >
        ....
      </button>

      localStorage.getItem('user') ? <Link
                                    className='transition ease-in-out delay-0  hover:-translate-y-1  hover:scale-100 hover:bg-violet-950 hover:text-white duration-300 p-2 rounded '
                                    href="/user/profile">
                                    Profile
                                </Link> : <Link
                                    className='transition ease-in-out delay-0  hover:-translate-y-1  hover:scale-100 hover:bg-violet-950 hover:text-white duration-300 p-2 rounded '
                                    href="/user/login">
                                    Login
                                </Link>
    </nav>
  )
}