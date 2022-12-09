import Link from 'next/link';
import React from 'react'

function Header() {
  return (
    <header className='p-5 flex justify-between max-w-7xl mx-auto'>
        <div className='flex flex-row items-center'>
            <Link href="/">
                <img alt="logo" className="object-contain w-40 md:w-44" src="https://links.papareact.com/yvf" />
            </Link>
            <div className='hidden md:inline-flex flex flex-row items-center'>
                <Link href="" className='mt-1 ml-4 font-medium'>About</Link>
                <Link href="" className='mt-1 ml-4 font-medium'>Contact</Link>
                <Link href="" className='mt-1 ml-4'>
                    <div className="bg-green-600 font-medium pt-1 pb-1 pl-4 pr-4 rounded-3xl text-white">Follow</div>
                </Link>
            </div>
        </div>
        <div className='flex flex-row items-center'>
            <Link href="" className='mt-1 ml-3 text-green-600'>Sign In</Link>
            <Link href="" className='mt-1 ml-3 text-green-600'>
                <div className="border-2 border-green-600 pt-1 pb-1 pl-4 pr-4 rounded-3xl ">Get Started</div>
            </Link>
        </div>
    </header>
  )
}

export default Header;