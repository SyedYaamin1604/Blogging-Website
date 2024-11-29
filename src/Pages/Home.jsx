import React, { useEffect, useState } from 'react'
import { getAllData } from '../Config/Firebase/FirebaseMethods';

const Home = () => {

  const [allBlogs, setAllBlogs] = useState([]);

  useEffect(() => {
    const allData = async () => {
      const data = await getAllData("blogs")
      setAllBlogs(data);
    }
    allData();
  }, [])




  return (
    <>
      <div className='text-black h-20 bg-white flex justify-center items-center'>
        <h1 className='text-3xl font-bold text-center'>Hello Readers</h1>
      </div>
      <div className='mt-10 mx-40'>
        <h1 className='text-3xl text-center font-bold'>All Blogs</h1>
        <div className='flex flex-col justify-center items-center'>
          {allBlogs.length > 0 ? allBlogs.map((item) => {
            return (
              <div key={item.documentId} className='bg-white w-full md:max-w-[650px] lg:max-w-[700px] rounded-lg shadow-lg shadow-black min-h-[300px] px-5 my-5 border-2'>
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
          }) : <h1>No Blogs Found!!!</h1>}

        </div>
      </div>
    </>
  )
}

export default Home