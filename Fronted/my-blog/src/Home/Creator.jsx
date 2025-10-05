// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../context/AuthProvider';

// function Creator() {
//   const [admin, setAdmin] = useState(null);

//   useEffect(() => {
//       const { URL } = useAuth()
    
//     const adminCall = async () => {
//       try {
//         const response = await axios.get(`${URL}/api/users/admins`, {
//           withCredentials: true
//         });
//         setAdmin(response.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     adminCall();
//   }, []);

//   // console.log('admin data', admin?.admins);

//   return (
//     <div className='bg-slate-200 mt-20'>

//       <div className='mx-auto w-full max-w-screen-xl'>
//         <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
//           <h1 className='text-center font-mono text-2xl text-red-900'>Admin Details</h1>
//           <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
//             <thead className="text-xs text-gray-700 uppercase border-b ">
//               <tr>
//                 <th scope="col" className="p-4"></th>
//                 <th scope="col" className="px-6 py-3">Name</th>
//                 <th scope="col" className="px-6 py-3">Education</th>
//                 <th scope="col" className="px-6 py-3">Joined Date</th>
//                 <th scope="col" className="px-6 py-3">Contact No.</th>
//               </tr>
//             </thead>

//             <tbody>
//               {admin?.admins && admin.admins.length > 0 ? (
//                 admin.admins.map((data) => (
//                   <tr key={data._id} className="bg-white border-b hover:bg-gray-300">
//                     <td className="w-4 p-4"></td>
//                     <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
//                       <img className="w-10 h-10 rounded-full" src={data?.photo?.url} alt="Profile" />
//                       <div className="ps-3">
//                         <div className="text-base font-semibold">{data.name}</div>
//                         <div className="font-normal  text-gray-600">{data.email}</div>
//                       </div>
//                     </th>
//                     <td className="px-6 py-4">{data.education}</td>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center">
//                         {new Date(data.createdAt).getDate()} /
//                         {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"][new Date(data.createdAt).getMonth()]} /
//                         {new Date(data.createdAt).getFullYear()}
//                         {/* {data.createdAt.Date()} */}
//                         {/* {new Date(data.createdAt).getDate()} / {new Date(data.createdAt).getMonth() + 1} / {new Date(data.createdAt).getFullYear()} */}
//                         {/* {new Date(data.createdAt).getDate()} This will return the day of the month */}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">{data.phone}</a>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="5" className="px-6 py-4 text-center">No admins available</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>

//   );
// }

// export default Creator;
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";

function Creator() {
  const { URL } = useAuth();
  const [admin, setAdmin] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get(`${URL}/api/users/admins`, {
          withCredentials: true,
        });
        setAdmin(response.data);
      } catch (err) {
        console.error("Error fetching admin data:", err);
        setError("Failed to fetch admin data. Please try again later.");
      }
    };

    if (URL) {
      fetchAdmins();
    }
  }, [URL]);

  return (
    <div className="bg-slate-200 mt-20">
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <h1 className="text-center font-mono text-2xl text-red-900">Admin Details</h1>
          {error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : (
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase border-b">
                <tr>
                  <th scope="col" className="p-4"></th>
                  <th scope="col" className="px-6 py-3">Name</th>
                  <th scope="col" className="px-6 py-3">Education</th>
                  <th scope="col" className="px-6 py-3">Joined Date</th>
                  <th scope="col" className="px-6 py-3">Contact No.</th>
                </tr>
              </thead>
              <tbody>
                {admin?.admins && admin.admins.length > 0 ? (
                  admin.admins.map((data) => (
                    <tr key={data._id} className="bg-white border-b hover:bg-gray-300">
                      <td className="w-4 p-4"></td>
                      <th
                        scope="row"
                        className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <img
                          className="w-10 h-10 rounded-full"
                          src={data?.photo?.url || "https://via.placeholder.com/150"}
                          alt={`Profile of ${data.name}`}
                        />
                        <div className="ps-3">
                          <div className="text-base font-semibold">{data.name}</div>
                          <div className="font-normal text-gray-600">{data.email}</div>
                        </div>
                      </th>
                      <td className="px-6 py-4">{data.education}</td>
                      <td className="px-6 py-4">
                        {new Intl.DateTimeFormat("en-US", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }).format(new Date(data.createdAt))}
                      </td>
                      <td className="px-6 py-4">
                        <a
                          href={`tel:${data.phone}`}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          {data.phone}
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center">
                      {admin === null ? "Loading..." : "No admins available"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Creator;
