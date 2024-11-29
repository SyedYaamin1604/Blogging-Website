import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { signUpUser, uploadImage } from '../Config/Firebase/FirebaseMethods'
import { auth } from '../Config/Firebase/FirebaseMethods'

const Signup = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  // Navigate Hook
  const navigate = useNavigate()

  // Signing Up the User using Firebase Authentication
  const SignUpUserFromFirebase = async (data) => {
    console.log(data);
    const ProfileImageUrl = await uploadImage(data.profileImage[0]);

    try {
      const newUser = await signUpUser({
        username: data.username,
        email: data.email,
        password: data.password,
        imageUrl: ProfileImageUrl,
      })
      console.log(newUser);
      navigate("/login");
      reset();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className='flex justify-center items-center mt-16'>
        <div className='flex flex-col justify-center items-center w-[450px] min-h-[450px] rounded-2xl bg-white shadow-md shadow-black mx-20 px-10'>
          <h1 className='text-5xl font-bold'>Sign Up</h1>
          <form onSubmit={handleSubmit(SignUpUserFromFirebase)} className='flex flex-col justify-center items-center w-full' >
            <input className='w-full mt-10 h-10 bg-transparent border-2 border-black rounded-xl p-3 outline-none text-black' type="text" placeholder='Username' {...register("username", { required: true })} />
            {errors.username && <span className='text-red-700'>This field is required</span>}
            <br />
            <input className=' w-full h-10 bg-transparent border-2 border-black rounded-xl p-3 outline-none text-black' type="email" placeholder='Email' {...register("email", { required: true })} />
            {errors.email && <span className='text-red-700'>This field is required</span>}
            <br />
            <input className=' w-full h-10 bg-transparent border-2 border-black rounded-xl p-3 outline-none text-black' type="password" placeholder='Password' {...register("password", { required: true })} />
            {errors.password && <span className='text-red-700'>This field is required</span>}
            <br />
            <input type="file" className="file-input file-input-bordered w-full max-w-96" {...register("profileImage", { required: true })} />
            <button type='submit' className="mt-5 px-5 py-2 rounded-lg bg-indigo-700 font-medium text-xl border-2 text-white btn btn-ghost hover:bg-indigo-500">SignUp</button>
            <p className='mt-2'>Already a User? <span className='text-indigo-700 cursor-pointer'><Link to='/login'>Login</Link></span></p>
          </form>
        </div>
      </div>
    </>
  )
}

export default Signup