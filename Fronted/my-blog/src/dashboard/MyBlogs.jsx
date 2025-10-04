import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

function MyBlogs() {
  const [myBlogs, setMyBlogs] = useState([]);
    const { URL } = useAuth()
  

  useEffect(() => {
    const fetchMyBlogsData = async () => {
      try {
        const { data } = await axios.get(`${URL}/api/blogs/my-blog`, {
          withCredentials: true,
        });
        console.log('Blog Data', data);
        setMyBlogs(data);
      } catch (error) {
        console.log('my-blogs', error.response.data.message);
      }
    };

    fetchMyBlogsData();
  }, );

  const deleteblog = async (id) => {
    await axios
      .delete(`${URL}/api/blogs/remove/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message || 'Blog deleted successfully');
        setMyBlogs(myBlogs.filter((blog) => blog._id !== id)); // Remove deleted blog from state
      })
      .catch((error) => {
        console.log(error.response.message);
        toast.error(error.response.message || 'Failed to delete blog');
      });
  };

  return (
    <div className='min-h-screen bg-gray-100 py-10'>
      <div className='max-w-5xl bg-white m-auto container px-4 md:px-10'>
        {/* Adjusted Grid Layout for Various Devices */}
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 animate-fade-in'>
          {myBlogs && myBlogs.length > 0 ? (
            myBlogs.map((data) => (
              <div
                key={data._id}
                className='w-full mt-5 flex flex-col shadow-md bg-white p-5 rounded-lg transform transition-all duration-500 hover:scale-105 hover:shadow-lg'
              >
                {/* Category */}
                <span className='items-start ml-5 text-sm border-b mb-1 text-blue-600'> {/* Adjusted color */}
                  {data.category}
                </span>
                  {/* Blog Created Date */}
                  <p className='text-gray-400 text-xs flex justify-end'>
                      {new Date(data?.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>

                {/* Blog Image and Details */}
                <div className='flex justify-between items-start'>
                  {/* Blog Image */}
                  <div className='w-full lg:w-[60%]'>
                    <img
                      src={data?.blogImage?.url}
                      alt={data.title}
                      className='w-full h-48 object-cover rounded-lg transition-transform duration-500 ease-in-out hover:scale-110'
                    />
                  </div>

                  {/* Blog Info */}
                  <div className='ml-4 w-full lg:w-[40%]'>
                    <p className='text-blue-700 md:mt-10 font-semibold text-lg md:text-xl lg:text-2xl hover:text-red-700 transition duration-300 ease-in-out'> {/* Adjusted color */}
                      {data.title}
                    </p>
                  </div>
                </div>

                {/* Blog About Section */}
                <span className='text-md text-gray-700 mt-3 border-b'> {/* Adjusted color */}
                  About
                </span>
                <p className='text-sm text-gray-600 mt-1'>{data.about}</p>

                {/* Buttons */}
                <div className='flex justify-around text-sm mt-4'>
                  <Link
                    to={`/blog/update/${data._id}`}
                    className='text-green-500 rounded-lg border p-1 hover:border-green-400 hover:text-gray-400 transition duration-300'
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => deleteblog(data._id)}
                    className='text-red-600 rounded-lg border p-1 hover:border-red-400 hover:text-red-400 transition duration-300'
                  >
                    Delete
                  </button>
                </div>

                <div className='bg-gray-200 w-full h-[1px] mt-3'></div>
              </div>
            ))
          ) : (
            <p className='text-gray-500'>No blogs available</p> 
          )}
        </div>
      </div>
    </div>
  );
}

export default MyBlogs;
