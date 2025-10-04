// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import toast from 'react-hot-toast';
// import { IoMenuOutline } from "react-icons/io5";
// import { RxCross2 } from "react-icons/rx";
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthProvider';

// function Navbar() {
//   const {URL} = useAuth();
//   const [show, setShow] = useState(false);
//   const { profileData,isAuthenticated, setIsAuthenticated, setProfileData} = useAuth();

//   // console.log('navbar',profileData?.user);
  
//   const navigate = useNavigate()
// useEffect(()=>{
  
// })
//   const handleLogout = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.get(`${URL}/api/users/logout`, { withCredentials: true });
//       localStorage.removeItem('jwt');
//       setProfileData(data)
//       setIsAuthenticated(false);
//       toast.success(data.message);
//       navigate('/');
//     } 
//     catch (error) {
//       console.log(error);
//       toast.error(error.data.message || 'Failed to logout');
//     }

//   };

//   return (
//     <>
//       <nav className='shadow-md px-4 py-3'>
//         <div className='max-w-screen-xl flex justify-between container mx-auto items-center'>
//           <div className='font-semibold text-xl'>
//             Ankit<span className='text-blue-400'>Blog</span>
//           </div>
//           {/* Desktop Menu */}
//           <div className='mx-6'>
//             <ul className='hidden md:flex space-x-6 cursor-pointer'>
//               <Link to='/' className='hover:text-blue-600'>HOME</Link>
//               <Link to='/blogs' className='hover:text-blue-600'>Blog</Link>
//               <Link to='/creators' className='hover:text-blue-600'>Creators</Link>
//               <Link to='/about' className='hover:text-blue-600'>About</Link>
//               <Link to='/contact' className='hover:text-blue-600'>Contact</Link>
//             </ul>
//             {/* Mobile Menu Icon */}
//             <div className='md:hidden' onClick={() => setShow(!show)}>
//               {show ? <RxCross2 size={24} /> : <IoMenuOutline size={24} />}
//             </div>
//           </div>
//           {/* Dashboard Buttons */}
        
//           <div className='flex space-x-2'>
//           {isAuthenticated && profileData?.user?.role ==='admin'?(
//             <Link to='/dashboard' className='rounded bg-cyan-500 px-2 py-1 hover:bg-cyan-700 text-white font-semibold'>User Dashboard</Link>
//           ):("")}
          
//           {!isAuthenticated ? (
//              <Link to='/login' className='rounded bg-red-400 px-2 py-1 hover:bg-red-500 text-white font-semibold'>
//              Login
//              </Link>
//           ):( <button onClick={handleLogout} className='rounded bg-red-400 px-2 py-1 hover:bg-red-500 text-white font-semibold'>
//             Logout
//             </button>)}
           
//           </div>
//         </div>
//         {/* Mobile Menu */}
//         <div
//           className={`transition-transform duration-300 transform md:hidden ${show ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`}>
//           <ul className='flex flex-col h-screen items-center justify-center space-y-4 text-xl bg-white'>
//             <Link to='/' onClick={() => setShow(false)} className='hover:text-blue-600'>HOME</Link>
//             <Link to='/blogs' onClick={() => setShow(false)} className='hover:text-blue-600'>Blog</Link>
//             <Link to='/creators' onClick={() => setShow(false)} className='hover:text-blue-600'>Creators</Link>
//             <Link to='/about' onClick={() => setShow(false)} className='hover:text-blue-600'>About</Link>
//             <Link to='/contact' onClick={() => setShow(false)} className='hover:text-blue-600'>Contact</Link>
//           </ul>
//         </div>
//       </nav>
//     </>
//   );
// }

// export default Navbar;
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { IoMenuOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

function Navbar() {
  const navigate = useNavigate();
  
  // ✅ Use useAuth once
  const {
    URL,
    profileData,
    isAuthenticated,
    setIsAuthenticated,
    setProfileData
  } = useAuth();

  const [show, setShow] = useState(false);

  // ✅ Logout handler
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`${URL}/api/users/logout`, { withCredentials: true });
      localStorage.removeItem('jwt');
      setProfileData(null); // Clear profile data
      setIsAuthenticated(false);
      toast.success(data.message);
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || 'Failed to logout');
    }
  };

  return (
    <>
      <nav className='shadow-md px-4 py-3'>
        <div className='max-w-screen-xl flex justify-between container mx-auto items-center'>
          {/* Logo */}
          <div className='font-semibold text-xl'>
            Ankit<span className='text-blue-400'>Blog</span>
          </div>

          {/* Desktop Menu */}
          <div className='mx-6'>
            <ul className='hidden md:flex space-x-6 cursor-pointer'>
              <Link to='/' className='hover:text-blue-600'>HOME</Link>
              <Link to='/blogs' className='hover:text-blue-600'>Blog</Link>
              <Link to='/creators' className='hover:text-blue-600'>Creators</Link>
              <Link to='/about' className='hover:text-blue-600'>About</Link>
              <Link to='/contact' className='hover:text-blue-600'>Contact</Link>
            </ul>

            {/* Mobile Menu Icon */}
            <div className='md:hidden' onClick={() => setShow(!show)}>
              {show ? <RxCross2 size={24} /> : <IoMenuOutline size={24} />}
            </div>
          </div>

          {/* Dashboard Buttons */}
          <div className='flex space-x-2'>
            {isAuthenticated && profileData?.user?.role === 'admin' && (
              <Link to='/dashboard' className='rounded bg-cyan-500 px-2 py-1 hover:bg-cyan-700 text-white font-semibold'>
                User Dashboard
              </Link>
            )}

            {!isAuthenticated ? (
              <Link to='/login' className='rounded bg-red-400 px-2 py-1 hover:bg-red-500 text-white font-semibold'>
                Login
              </Link>
            ) : (
              <button onClick={handleLogout} className='rounded bg-red-400 px-2 py-1 hover:bg-red-500 text-white font-semibold'>
                Logout
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`transition-transform duration-300 transform md:hidden ${show ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`}>
          <ul className='flex flex-col h-screen items-center justify-center space-y-4 text-xl bg-white'>
            <Link to='/' onClick={() => setShow(false)} className='hover:text-blue-600'>HOME</Link>
            <Link to='/blogs' onClick={() => setShow(false)} className='hover:text-blue-600'>Blog</Link>
            <Link to='/creators' onClick={() => setShow(false)} className='hover:text-blue-600'>Creators</Link>
            <Link to='/about' onClick={() => setShow(false)} className='hover:text-blue-600'>About</Link>
            <Link to='/contact' onClick={() => setShow(false)} className='hover:text-blue-600'>Contact</Link>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
