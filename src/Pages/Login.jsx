import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { auth } from '../Config/Firebase/FirebaseMethods'
import { loginUser } from '../Config/Firebase/FirebaseMethods'

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  // React Hooks Form 
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  // Calling Navigate Hook
  const navigate = useNavigate();

  //Login User With Firebase Authentication
  const LoginUserFromFirebase = async (data) => {
    try {
      const existingUser = await loginUser({
        email: data.email,
        password: data.password
      })
      console.log(existingUser);
      navigate("/");
      reset();
    }
    catch (error) {
      console.log(error.code);
      if (error.code === 'auth/invalid-credential') {
        setErrorMessage("Email or Password is Incorrect");
      }
    }
  }
  return (
    <>
      <div className='flex justify-center items-center mt-16'>
        <div className='flex flex-col justify-center items-center w-[450px] min-h-[450px] rounded-2xl bg-white shadow-md shadow-black mx-20 px-10'>
          <h1 className='text-5xl font-bold'>Login</h1>
          <form onSubmit={handleSubmit(LoginUserFromFirebase)} className='flex flex-col justify-center items-center w-full'>
            <input className='w-full mt-10 h-10 bg-transparent border-2 border-black rounded-xl p-3 outline-none text-black' type="email" placeholder='Email' {...register("email", { required: true })} />
            {errors.email && <span>This field is required</span>}
            <br />
            <input className='w-full h-10 bg-transparent border-2 border-black rounded-xl p-3 outline-none text-black' type="password" placeholder='Password' {...register("password", { required: true })} />
            {errors.password && <span>This field is required</span>}
            <br />
            {errorMessage && <span>{errorMessage}</span>}
            <button type='submit' className="px-5 py-2 rounded-lg bg-indigo-700 font-medium text-xl border-2 text-white btn btn-ghost hover:bg-indigo-500">Login</button>
            <p className='mt-2'>Not a User? <span className='text-indigo-700 cursor-pointer'><Link to='/signup'>Signup</Link></span></p>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login