import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useAuth } from '../context/AuthProvider';
import { Link } from 'react-router-dom';

function Treanding() {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const { blogs } = useAuth();

  return (
    <div className='px-4 py-3'>
      <div className='max-w-screen-xl container m-auto'>
        <h1 className='text-2xl font-semibold mb-6 px-4 '>Trending</h1>
        <div className='grid'>
          <Carousel responsive={responsive} itemClass="px-4" className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
            {blogs && blogs.length > 0 ? (
              blogs.slice(0, 8).map((element) => (
                <Link
                  to={`/blog/${element._id}`}
                  key={element._id}
                  className='bg-white rounded-lg hover:shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300'
                >
                  {/* Blog Image */}
                  <div className='relative'>
                    <img
                      src={element.blogImage?.url || 'fallback-image.jpg'}  // Ensure blogImage.url exists
                      alt={element.title || 'No title'}  // Add fallback for alt text
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
                    <div className='flex items-center'>
                      <img
                        src={element.adminPhoto || 'fallback-admin-photo.jpg'}  // Ensure adminPhoto exists
                        alt={element.adminName || 'Admin'}  // Fallback for admin name
                        className='rounded-full w-10 h-10 object-cover'
                      />
                      <div className='ml-3'>
                        <h2 className='font-semibold text-slate-600'>
                          {element.adminName || 'Unknown Admin'}
                        </h2>
                        <p className='text-sm text-slate-400'>
                          {Array.isArray(element.category) ? element.category.join(', ') : element.category || 'Uncategorized'}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p>No blogs available</p>
            )}
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default Treanding;
