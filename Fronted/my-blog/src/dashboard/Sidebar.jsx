import React, { useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from "react-hot-toast";
import { MdOutlineClose } from "react-icons/md";
import { IoMenuSharp } from "react-icons/io5";

function Sidebar({ setComponent }) {
  const { profileData, setIsAuthenticated, URL } = useAuth();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleComponents = (value) => {
    setComponent(value);
    setShow(false); // Auto-close sidebar on mobile after selection
  };

  const gotoHome = () => {
    navigate('/');
    setShow(false);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`${URL}/api/users/logout`, {
        withCredentials: true,
      });
      toast.success(data.message);
      localStorage.removeItem('jwt');
      setIsAuthenticated(false);
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to logout');
    }
  };

  return (
    <>
      {/* Burger Menu Icon */}
      <div
        className="sm:hidden fixed top-4 left-4 z-50 cursor-pointer"
        onClick={() => setShow(!show)}
      >
        <IoMenuSharp className="text-2xl" />
      </div>

      {/* Sidebar */}
      <div
        className={`w-64 h-full shadow-lg fixed top-0 left-0 bg-gray-50 transition-transform duration-300 transform sm:translate-x-0 ${
          show ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Close Icon */}
        <div
          className="sm:hidden absolute top-4 right-4 text-xl cursor-pointer"
          onClick={() => setShow(false)}
        >
          <MdOutlineClose className="text-2xl" />
        </div>

        {/* Profile */}
        <div className="text-center mt-6">
          <img
            className="w-24 h-24 rounded-full mx-auto mb-2 object-cover"
            src={profileData?.user?.photo?.url}
            alt="Profile"
          />
          <p className="text-lg font-semibold">{profileData?.user?.name}</p>
        </div>

        {/* Navigation */}
        <ul className="space-y-6 mx-4 mt-8">
          <li>
            <button
              onClick={() => handleComponents('My Blogs')}
              className="w-full px-4 py-2 bg-green-500 rounded-lg hover:bg-green-700 transition"
            >
              MY BLOGS
            </button>
          </li>
          <li>
            <button
              onClick={() => handleComponents('Create Blog')}
              className="w-full px-4 py-2 bg-blue-400 rounded-lg hover:bg-blue-700 transition"
            >
              CREATE BLOG
            </button>
          </li>
          <li>
            <button
              onClick={() => handleComponents('My Profile')}
              className="w-full px-4 py-2 bg-pink-500 rounded-lg hover:bg-pink-700 transition"
            >
              MY PROFILE
            </button>
          </li>
          <li>
            <button
              onClick={gotoHome}
              className="w-full px-4 py-2 bg-red-500 rounded-lg hover:bg-red-700 transition"
            >
              HOME
            </button>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 bg-yellow-500 rounded-lg hover:bg-yellow-700 transition"
            >
              LOGOUT
            </button>
          </li>
          <li>
            <Link to="/users">
              <button
                className="w-full px-4 py-2 bg-gray-500 rounded-lg hover:bg-gray-700 transition"
              >
                ALL USERS
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
