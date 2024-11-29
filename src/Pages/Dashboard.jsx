import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { auth, getData, sendData } from '../Config/Firebase/FirebaseMethods'
import { BiLogoSass } from 'react-icons/bi'

const Dashboard = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const [existingUser, setExistingUser] = useState([]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          // const getUserData = await getData('users', uid);
          const uid = user.uid;
          const getBlogData = await getData('blogs', uid);

          // console.log('User Data:', getUserData);
          // setExistingUser(getUserData);

          console.log('Blog Data:', getBlogData);
          setBlogs([...getBlogData]);
        }
      }
      catch (error) {
        console.log(error);
      }
    });
  }, []);


  const sendDataToFirebase = async (data) => {
    onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          const uid = user.uid;
          const getUserData = await getData('users', uid);
          console.log('User Data:', getUserData);
          console.log(getUserData[0].username);

          const sendBlogData = await sendData({
            title: data.title,
            description: data.description,
            uid: auth.currentUser.uid,
            username: getUserData[0].username,
            imageUrl: getUserData[0].imageUrl
          }, 'blogs')
          blogs.push({
            title: data.title,
            description: data.description,
            uid: auth.currentUser.uid,
            username: getUserData[0].username,
            imageUrl: getUserData[0].imageUrl
          })

          setBlogs([...blogs]);
          reset();
        }
      }
      catch (error) {
        console.log(error);
      }
    });
  }

  return (
    <>
      <div className='text-black h-20 bg-white flex justify-center items-center'>
        <h1 className='text-3xl font-bold text-center'>Dashboard</h1>
      </div>
      <div className='bg-gray-300 min-h-[495px] flex flex-col justify-center items-center mx-8 lg:mx-20 xl:mx-40'>
        <div className='bg-white min-h-[300px] w-full mt-8 pb-5 rounded-lg shadow-md shadow-black'>
          <form onSubmit={handleSubmit(sendDataToFirebase)} className='flex flex-col items-center pt-10 px-5 text-gray-400'>
            <input type="text" placeholder='Title' className='border-2 border-gray-400 p-2 px-4 rounded-lg w-full outline-indigo-700' {...register("title", { required: true })} />
            <textarea placeholder="Whats's In your Mind" className='border-2 border-gray-400 p-2 px-4 rounded-lg min-h-[150px] w-full outline-indigo-700 mt-5' {...register("description", { required: true })}></textarea>
            <button type='submit' className='justify-start bg-indigo-700 text-white text-lg font-medium p-2 px-6 rounded-xl my-3'>Post Blog</button>
          </form>
        </div>
        <div className='mt-10 w-full'>
          <h1 className='text-3xl text-black text-center font-bold'>My Blogs</h1>
        </div>

        {/* Blog Section Start*/}

        {blogs.length > 0 ? blogs.map((item) => {
          return (
            <div key={item.title} className='bg-white w-full md:max-w-[650px] lg:max-w-[700px] rounded-lg shadow-lg shadow-black min-h-[300px] px-5 my-10 border-2'>
              {/* Blog Header Start*/}
              <div className='border-2 border-gray-300 mt-10 flex flex-col md:flex-row items-center md:items-start gap-8 min-h-[100px]'>
                <div>
                  <img className='rounded-2xl w-[70px] h-[70px] md:w-[100px] md:h-[100px]' src={item.imageUrl} alt="" />
                </div>
                <div className='flex flex-col md:my-4 items-start justify-center'>
                  <div className='w-full text-center md:text-left'>
                    <h1 className='text-xl font-medium'>{item.title}</h1>
                  </div>
                  <div className=' w-full mt-2'>
                    <p className='text-base text-center md:text-left font-medium'>{item.username}</p>
                  </div>
                </div>
              </div>
              {/* Blog Header End */}

              {/* Blog Description Start */}
              <div className='w-full py-4 text-base text-justify text-gray-500 font-normal'>
                <p>{item.description}</p>
              </div>
              {/* Blog Description End */}
            </div>
          )
        }) : <h1>No Blogs Found</h1>}

      </div>
    </>
  )
}

export default Dashboard
