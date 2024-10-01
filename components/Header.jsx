import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { PenBox } from 'lucide-react';
import { SignedOut, UserButton } from '@clerk/nextjs';
import { SignInButton } from '@clerk/nextjs';
import { SignedIn } from '@clerk/nextjs';
import UserMenu from './UserMenu';
function Header() {
  return (
    <div className='w-full border-b-2 shadow-lg'>
    <div className='flex justify-between items-center mx-auto w-full max-w-[80vw] py-4 lg:max-w-[90vw]'>
     <div className='cursor-pointer'>
     <Link href='/'>
        <h1 className='text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600'>Meetify</h1>
      </Link>
     </div>
     <div className='flex items-center'>
      <Button className="mx-3"><PenBox/>
      <span className='hidden md:block text-sm px-2'>Create Event</span>
      </Button>
      <SignedOut>
        <SignInButton fallbackRedirectUrl='/dashboard'>   
      <Button className="bg-white text-black border-2 hover:bg-gray-100">Login</Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
      <UserMenu/>
      </SignedIn>
     </div>
    </div>
    </div>
  )
}

export default Header