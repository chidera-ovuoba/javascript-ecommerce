import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../lib/context';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../lib/firebase';
import Loader from '../components/Loader';
import Snackbar from '../components/Snackbar';
import SignWIthGoogle from '../components/SignWIthGoogle';


const SignUp = ({setNameInitialsArr}) => {
  // const { submitInfo,passwordError,accountError } = useGlobalContext();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState('');
  console.log('signup rerendered')
   useEffect(() => {
      const timeout =  setTimeout(() => {
            if (errorText) {
                setErrorText('')
            }
      }, 6000)
     return () => {
       clearTimeout(timeout)
     }
    },[errorText])
 

  return (
      <div className='grid place-items-center pt-28 pb-7'>
      <div className="grid gap-5">
      <h1 className='text-2xl font-bold mb-6 text-yellow-800'>SIGN-UP</h1>
        <form className='flex flex-col gap-6 text-lg font-medium text-yellow-800' onSubmit={(e) => {
          e.preventDefault()
          signup( name, email, password, confirm,setLoading,setErrorText,setNameInitialsArr)
        }}>
               <div className='flex flex-col gap-2' >
               <label htmlFor="nameID">Name</label>
               <input type="text" className='outline-none border-yellow-800 border-b-2 focus:border-yellow-500 border-solid pb-3 max-w-[26rem] bg-transparent w-[90vw]' placeholder='enter name' id='nameID' value={name} onChange={(e) => setName(e.target.value)}  />
               </div>     
               <div className='flex flex-col gap-2'>
              <label htmlFor="emailID">Email Address</label>
              <input type="email" className='outline-none border-yellow-800 border-b-2 focus:border-yellow-500 border-solid pb-3 max-w-[26rem] bg-transparent w-[90vw]' placeholder='enter email' id='emailID' value={email} onChange={(e) => setEmail(e.target.value)}  />
              </div>
              <div className='flex flex-col gap-2'>
               <label htmlFor="passwordID">Password</label>
               <input type="password" className='outline-none border-yellow-800 border-b-2 focus:border-yellow-500 border-solid pb-3 max-w-[26rem] bg-transparent w-[90vw]' placeholder='enter password' id='passwordID' value={password} onChange={(e) => setPassword(e.target.value)}  />
               </div>         
               <div className='flex flex-col gap-2'>
               <label htmlFor="confirmID">Confirm Password</label>
               <input type="password" className='outline-none border-yellow-800 border-b-2 focus:border-yellow-500 border-solid pb-3 max-w-[26rem] bg-transparent w-[90vw]' placeholder='enter password' id='confirmID' value={confirm} onChange={(e) => setConfirm(e.target.value)}  />
               </div>         
               
           <button type='submit' className='bg-orange-500 mt-4 text-orange-800 font-medium  text-center text-md text-white p-3 rounded-lg place-self-start mb-5 flex justify-center items-center gap-2'>REGISTER {loading && <Loader color={'green'}/>}</button>
          {
            errorText && <Snackbar errorText={errorText}  />
          }
        </form>
        <SignWIthGoogle/>
      <span className='place-start text-lg  text-yellow-800'>Have an account ?<Link to="/signin" className='cursor-pointer focus:text-yellow-500 hover:text-yellow-500 font-bold'>Login</Link></span>
      </div>
    </div>
   
  )
}


export default SignUp