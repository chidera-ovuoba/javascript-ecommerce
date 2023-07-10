import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { auth, login, showError } from '../lib/firebase';
import { AiFillCheckCircle } from 'react-icons/ai';
import { sendPasswordResetEmail } from 'firebase/auth';
import ErrorSnackbar from '../components/ErrorSnackbar';
import Loader from '../components/Loader';
import SignWIthGoogle from '../components/SignWIthGoogle';
const SignIn = ({setNameInitialsArr}) => {
  const passwordResetRef = useRef(null);
  const [passWordLinkSent, setPassWordLinkSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')

  const passwordRestHandler = async (e) => {
    e.preventDefault();
    await sendPasswordResetEmail(auth,passwordResetRef.current.value).then(() => {
      setPassWordLinkSent(true)
      passwordResetRef.current.value = '';
      document.getElementById('forget_password_checkbox').checked = false;
    }).catch((error) => {
      document.getElementById('forget_password_checkbox').checked = false;
      showError(error,setError)
    })
  } 

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (passWordLinkSent) {
         setPassWordLinkSent(false)
      }
      if (error) {
        setError('')
      }
    },6000)
    return () => {
      clearTimeout(timeout)
    };
  }, [passWordLinkSent,error])

  return (
    <>
      <div className='grid place-items-center pt-32 px-4 user_auth_bg'>
     <div className="grid gap-5">
      <h1 className='text-2xl font-bold mb-6 text-yellow-800'>SIGN-IN</h1>
      <form className='flex flex-col gap-6 text-lg font-medium text-yellow-800' onSubmit={(e) => {
          e.preventDefault()
          login( email, password,setLoading,setError,setNameInitialsArr)
        }}>
      <div className='flex flex-col gap-2'>
      <label htmlFor="emailID">Email Address</label>
      <input type="email" className='outline-none border-yellow-800 border-b-2 focus:border-yellow-500 border-solid pb-3 max-w-[26rem] bg-transparent w-[90vw]' placeholder='enter email' id='emailID' value={email} onChange={(e) => setEmail(e.target.value)}  />
      </div>
      <div className='flex flex-col gap-2'>
      <label htmlFor="passwordID">Password</label>
      <input type="password" className='outline-none border-yellow-800 border-b-2 focus:border-yellow-500 border-solid pb-3 max-w-[26rem] bg-transparent w-[90vw]' placeholder='enter password' id='passwordID' value={password} onChange={(e) => setPassword(e.target.value)}  />
      </div>
      
      <button type='submit' className='bg-orange-500 mt-4  font-medium  text-center text-md text-white p-3 rounded-lg place-self-start mb-5 flex justify-center items-center gap-2'>LOGIN {loading && <Loader color='green' w='w-[2rem] xs:w-[1rem]' h='h-[2rem] xs:h-[1rem]'/>}</button>
      </form>
      <SignWIthGoogle/>
      <span className='place-start text-lg  text-yellow-800'> New Customer ?<Link to="/signup" className='cursor-pointer focus:text-yellow-500 hover:text-yellow-500 font-bold'>Register</Link></span>
          <span className='forgot_password_dialog flex flex-col gap-5 items-center justify-center'>
          <input type="checkbox" id="forget_password_checkbox" className='hidden'/>
            <label className='cursor-pointer focus:text-yellow-500 hover:text-yellow-500 font-bold mr-auto' htmlFor="forget_password_checkbox">Forgot Password?</label>
            <form className='p-10 xs:p-8 rounded-lg bg-white hidden items-center gap-3 lg_2:order-3 text-md text-yellow-950 flex-col justify-center' onSubmit={passwordRestHandler}>
              <input type="email" className='ring-2 ring-yellow-800 outline-0 p-3 w-[18rem] sm:w-full rounded-lg' placeholder='Your Email Address' ref={passwordResetRef}/>
              <button type='submit' className='px-4 py-2 bg-orange-500 font-semibold text-md capitalize rounded-md'>submit</button>
              </form>
              {error && <ErrorSnackbar errorText={error}/>}
              {passWordLinkSent &&  <span className='bg-orange-500 p-3 font-semibold flex items-center gap-2 fixed top-[30%] w-[90%] max-w-[600px]'><AiFillCheckCircle size={20} />A link has been sent to your email follow the link to rest your password</span>}
              </span>
              </div>
              </div>
      </>
  )
}

export default SignIn