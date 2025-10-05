import React from 'react'
import { useAuth } from '../context/AuthProvider'

function MyProfile() {

  const { profileData } = useAuth()

  const data = profileData?.user;
  if (!data) {
    return <div>Something went wrong</div>;
  }

  return (    
    <div className='flex justify-center items-center min-h-screen'>
      <div className='shadow-md bg-amber-50 border rounded-md p-4'>
        <div className='flex flex-col items-center'>
          <div className="relative flex justify-center items-center w-full">
            <img className="object-center  rounded-full w-48 h-48" src={data?.photo?.url} alt="" />
            {/* <span className="absolute bottom-0 left-7 w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span> */}
          </div>
          <div className='text-lg mt-2'>{data.name}</div>
        </div>
        <div className='border-2 border-gray-500 mt-8 px-4 pb-2 pt-5 rounded'>
          <p className='text-md md:text-lg border-b border-gray-400 '>email: <span className='text-blue-600 font-mono text-sm md:text-lg' >{data.email}</span></p>
          <p className='text-md md:text-lg border-b border-gray-400  mt-3'>Contact No: <span className='text-blue-600 font-mono text-sm md:text-lg'>{data.phone}</span></p>
          <p className='text-md md:text-lg border-b border-gray-400  mt-3'>Education: <span className='text-blue-600 font-mono text-sm md:text-lg'>{data.education}</span></p>
          <p className='text-md md:text-lg mt-3 '>
            Join At:
            <span className='text-blue-600 ml-2 font-mono text-sm md:text-lg'>
              {new Date(data.createdAt).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true, // for AM/PM format
              })},
              {new Date(data.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </p>
        </div>
      </div>
    </div>

  )
}


export default MyProfile