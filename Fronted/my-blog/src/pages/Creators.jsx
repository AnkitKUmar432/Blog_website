import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthProvider';

function Creators() {
  const {URL} = useAuth();
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const adminCall = async () => {
      try {
        // const response = await axios.get('http://localhost:4000/api/users/admins', {
        const response = await axios.get(`${URL}/api/users/admins`, {
          withCredentials: true
        });
        setAdmin(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    adminCall();
  }, []);

  // console.log('admin data', admin?.admins);

  return (
    
    <div className='mx-auto w-full max-w-7xl p-4'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {admin?.admins?.map((data) => (
          <div
            key={data._id}
            className='bg-white shadow-lg border border-gray-200 rounded-lg overflow-hidden transition-transform transform hover:scale-105'>
            <img
              src={data?.photo?.url}
              alt={data.name}
              className='w-full h-48 object-cover'
            />
            <div className='p-4'>             
              <h2 className='text-sm font-semibold mb-2'>{data.name}</h2>
              <p className='text-gray-600 text-sm'>{data.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    
  )
}

export default Creators