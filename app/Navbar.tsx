"use client";

import Link from 'next/link'
import { AiFillBug } from "react-icons/ai"
import { usePathname } from 'next/navigation'
import  classnames from "classnames"
import { useSession } from 'next-auth/react';
import { Box } from '@radix-ui/themes';

const Navbar = () => {
    const currentPath = usePathname();
    const {status , data:session}= useSession();

    const links = [
        { label : 'Dashboard' , href : '/'},
        { label : 'Issues' , href : '/issues/list'},
    ]

  return (
    <nav className='flex mb-5 border-b space-x-6 px-5 h-14 items-center'>
        <Link href="/"> <AiFillBug></AiFillBug></Link>
        <ul className='flex space-x-6'>
            {links.map(link=>(
                <Link href={link.href}
                key={link.href} 
                className={ classnames({
                    'text-zinc-900' : currentPath === link.href , 
                    'text-zinc-500' : currentPath !== link.href ,
                    'hover:text-zinc-800 transition-colors' : true
                    })}>
                    {link.label}
                </Link>
            ))}
        </ul>
        <Box>
            { status === 'authenticated' && (
                <Link href="/api/auth/signout"> Log out</Link>
            )}
            { status === 'unauthenticated' && (
                <Link href="/api/auth/signin"> Log in</Link>
            )}
        </Box>
    </nav>
  )
}

export default Navbar
