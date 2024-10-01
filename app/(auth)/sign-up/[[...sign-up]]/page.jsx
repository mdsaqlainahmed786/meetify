import React from 'react'
import { SignUp } from '@clerk/nextjs'
function Page() {
  return (
    <div className='flex justify-center pt-20'>
      <SignUp />
   </div>
)
}

export default Page