import React from 'react';
import { useAuth } from '../context/AuthProvider';
import { Link } from 'react-router-dom';

function Blogs() {
  const { blogs } = useAuth();//AuthProvider Context se data le rahe hain 
 

  return (
    <div className='px-4 py-3'>

      <div className='max-w-screen-xl container m-auto'>

        <h1 className="text-2xl font-bold mb-6">All Blogs here!</h1>

        {/* Responsive grid system */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          {blogs && blogs.length > 0 ? (
            blogs?.map((element, index) => {
              return (
                
                <Link
                  to={`/blog/${element._id}`}  // Link URL to the blog page details(Redirect kr dega)
                  key={index}
                  className='bg-white relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-300'
                >
               
                  {/* Blog Image */}
                  <div className='relative'>
                    <img
                      src={element.blogImage?.url || "fallback-image-url.jpg"}  // check blogimage exists
                      alt={element.title || 'No title'}  
                      className='w-full h-48 object-cover'
                    />
                  </div>

                  {/* Blog Title */}
                  <div className='p-4'>
                    <h2 className='font-bold text-lg md:text-xl text-yellow-800'>
                      {element.title || 'Untitled Blog'}
                    </h2>
                    <div className='bg-slate-200 w-full h-[1px] my-2'></div>

                    {/* Admin Info */}
                    <div className='flex items-center mt-4'>
                      <div className='w-10 h-10'>
                        <img
                          src={element.adminPhoto || "fallback-admin-photo.jpg"}  // Ensure adminPhoto exists
                          alt={element.adminName || 'Admin'}  // Fallback for admin name
                          className='rounded-full w-full h-full object-cover'
                        />
                      </div>
                      <div className='ml-3'>
                        <h2 className='font-semibold text-gray-700'>
                          {element.adminName || 'Unknown Admin'}
                        </h2>
                        <p className='text-sm text-gray-500'>
                          {element.category || 'Uncategorized'}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <p>No blogs available</p>  // Fallback if blogs array is empty
          )}
        </div>

      </div>
    </div>
  );
}

export default Blogs;
