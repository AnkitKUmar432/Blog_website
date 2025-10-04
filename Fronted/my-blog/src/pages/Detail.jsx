import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

function Detail() {
const {URL} = useAuth()
  const { id } = useParams();
  const [blogs, setBlogs] = useState({});
  console.log('Detail', blogs);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(`${URL}/api/blogs/single-blog/${id}`, {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setBlogs(data)
      } catch (error) {
        console.log(error.response.message);
        toast.error('Failed to fetch the blog data');
      }
    };
    if(URL){
      fetchBlog();
    }
  }, [URL,id]);
  return (
    <div>
      {blogs && (
        <section className="container mx-auto p-4">

          {/* Title */}
          <div className="flex justify-center items-center mb-4 mt-4">
              <h1 className="text-4xl font-bold text-gray-800 mb-6 transition-all duration-300 ease-in-out hover:text-blue-500">
                {blogs?.title}
              </h1>
            </div>

          {/* Category */}
          <div className="text-blue-500 uppercase text-xs font-bold mb-4 ml-3 tracking-wide">
              {blogs?.category}
            </div>

          <div className='grid grid-rows-1 lg:grid-cols-2'>


            {/* Image (will take full width on small screens) */}
            <div className='p-4'>
              {blogs?.blogImage && (
                <img
                  src={blogs?.blogImage?.url}
                  alt="mainblogsImg"
                  className="w-full  h-[500px] mb-6 rounded-lg shadow-lg border cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105"
                />
              )}
            </div>
            {/* Image and Paragraph Section */}
            <div className="p-4">
              {/* Text (will come first on small screens and after the image on larger screens) */}
              <p className="text-[16px] md:text-lg lg:text-[20px]  mb-6 text-gray-700 leading-relaxed transition-all duration-300 ease-in-out hover:text-gray-900">
                {blogs?.about}
              </p>
            </div>

          </div>

          {/* Author Info */}
          <div className="inline-flex items-center mb-6 border p-4 rounded-lg shadow-sm transition-all duration-300 ease-in-out hover:border-blue-400 hover:shadow-md bg-white hover:bg-gray-50">
            <img
              src={blogs?.adminPhoto}
              alt="author_avatar"
              className="w-12 h-12 rounded-full mr-4 border border-gray-200"
            />
            <div>
              <p className=" text-sm lg:text-xl font-semibold text-gray-700">{blogs?.adminName}</p>
              <p className="text-sm text-gray-500">Author</p>
            </div>
          </div>

        </section>
      )}
    </div>

  )
}

export default Detail