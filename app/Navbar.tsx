import Link from 'next/link'
import { AiFillBug } from "react-icons/ai"

const Navbar = () => {
 
    const links = [
        { label : 'Dashboard' , href : '/'},
        { label : 'issues' , href : '/issues'},
    ]

  return (
    <nav className='flex mb-5 border-b space-x-6 px-5 h-14 items-center'>
        <Link href="/"> <AiFillBug></AiFillBug></Link>
        <ul className='flex space-x-6'>
            {links.map(link=>(
                <Link href={link.href}
                key={link.href} 
                className='text-zinc-500 hover:text-zinc-800 transition-colors'>
                    {link.label}
                </Link>
            ))}
        </ul>
    </nav>
  )
}

export default Navbar
