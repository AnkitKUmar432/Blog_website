
import React from 'react'
import { useAuth } from '../context/AuthProvider'
import { Link } from 'react-router-dom'

function Devotional() {
  const { blogs } = useAuth()
  return (
    <div className='px-4 py-3'>
      <div className='max-w-screen-xl m-auto'>
        <div className='container mx-auto my-10 px-4'>
          <h1 className='text-2xl font-semibold mb-6'>Devotional Items</h1>
          <div className=' max-w-screen-xl'>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mb-5 gap-5 shadow-sm'>
              {blogs && blogs.length > 0 ? (
                blogs.slice(0, 4).map((element) => (
                  <Link
                    to={`/blog/${element._id}`} // Corrected the blog link
                    key={element._id}
                    className='bg-white mb-5 rounded-lg hover:shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300'
                  >
                    {/* Blog Image */}
                    <div className='relative'>
                      <img
                        src={element.blogImage.url}
                        alt={element.title}
                        className='w-full h-48 object-cover' // Ensured image responsiveness
                      />
                    </div>

                    {/* Blog Title */}
                    <div className='p-4'>
                      <h2 className='font-bold text-lg md:text-xl text-yellow-800'>{element.title}</h2>
                      <div className='bg-slate-200 w-full h-[1px] my-2'></div>

                      {/* Admin Info */}
                      <div className='flex items-center'>
                        <img
                          src={element.adminPhoto}
                          alt={element.adminName}
                          className='rounded-full w-10 h-10 object-cover'
                        />
                        <div className='ml-3'>
                          <h2 className='font-semibold text-slate-600'>{element.adminName}</h2>
                          <p className='text-sm text-slate-400'>{element.category}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p>No blogs available</p>
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Devotional