import React, { useEffect, useState } from 'react'
import { FaBars } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { auth, getData, signOutUser } from '../Config/Firebase/FirebaseMethods';
import { onAuthStateChanged } from 'firebase/auth';


const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [user, setIsUser] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsUser(true);
        const id = user.uid;
        const profile = await getData("users", id);
        setProfileImage(profile[0].imageUrl);
        console.log(profileImage);
      }
      else {
        setIsUser(false);
        setProfileImage("http://placehold.it/10x10");
      }
    });
  }, [profileImage, navigate]);


  // Logout Function
  const handleLogout = async () => {
    const user = await signOutUser();
    setIsUser(false);
    console.log(user);
    navigate('/login');
  }
  return (
    <>
      <div className="navbar w-full bg-indigo-700 flex justify-between px-5">
        <div className='block lg:hidden' onClick={() => setOpen(!open)}>
          <span className='text-2xl text-white btn btn-ghost border-2 border-white'><FaBars /></span>
        </div>
        <div className=''>
          <a className="btn btn-ghost text-2xl text-white">Blogging App</a>
        </div>
        <div className='bg-transparent flex justify-center items-center gap-24'>
          <div className='hidden lg:block'>
            <ul className='bg-transparent flex justify-center items-center gap-5 text-white text-xl'>
              <li className='btn btn-ghost text-xl'><Link to="/">Home</Link></li>
              <li className='btn btn-ghost text-xl'><Link to="dashboard">Dashboard</Link></li>
              <li className={`${user ? "hidden" : "btn btn-ghost text-xl"}`}><Link to="login">Login</Link></li>
            </ul>
          </div>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 h-10 rounded-full">
                <img className='w-fit h-fit'
                  alt="Tailwind CSS Navbar component"
                  src={profileImage} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li ><Link to="profile">Profile</Link></li>
              <li className={`${user ? "block" : "hidden"}`} onClick={handleLogout}><a>Logout</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className={`bg-indigo-700 w-full flex justify-center items-center py-2 text-white text-lg min-h-20 ${open ? "block" : "hidden"}`}>
        <ul className='text-center font-medium flex flex-col'>
          <li className='btn btn-ghost text-lg'><Link to='/'>Home</Link></li>
          <li className='btn btn-ghost text-lg'><Link to='dashboard'>Dashboard</Link></li>
          <li className={`${user ? "hidden" : "btn btn-ghost text-xl"}`}><Link to='login'>Login</Link></li>
        </ul>
      </div>
    </>
  )
}

export default Navbar