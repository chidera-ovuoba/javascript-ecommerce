import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { handleGoogleAuth } from '../lib/firebase'
import { useNavigate } from 'react-router'

const SignWIthGoogle = () => {
  const navigate = useNavigate();
  return (
    <div className='grid place-items-center gap-8 text-lg  text-orange-900 mb-4'>
          <h6 className='signin_title flex items-center gap-4 justify-center font-black'>OR</h6>
          <span className='rounded-3xl py-2 px-3 xs:px-5 bg-orange-500 flex items-center justify-center gap-2 cursor-pointer' onClick={()=>handleGoogleAuth(navigate)}><span className='text-[2.5rem]'><FcGoogle/></span><span className='xs:hidden text-sm font-semibold'>Continue with Google</span></span>
        </div>
  )
}

export default SignWIthGoogle