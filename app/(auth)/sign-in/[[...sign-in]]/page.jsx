'use client'
import React from 'react'
import { SignIn } from '@clerk/nextjs'
function Page() {
  return (
    <div className='flex justify-center pt-20'>
      <SignIn />
   </div>
)
}

export default Page