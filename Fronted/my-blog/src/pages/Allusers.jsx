import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthProvider';
function Allusers() {
    const [userData, setUserData] = useState([]); // Ensure userData is initialized as an array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { URL } = useAuth();

    useEffect(() => {

        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${URL}/api/blogs/all-users`, { withCredentials: true });
                setUserData(response.data.user); // Assuming response.data.user is the array of users
            } catch (error) {
                console.error(error.response?.data?.message || "An error occurred");
                setError(error.response?.data?.message || "An error occurred");
            } finally {
                setLoading(false);
            }
        };
        if (URL) {
            fetchUsers(); // Call the async function
        }
    }, [URL]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-900"></div>
                <span className="ml-4 text-lg">Loading...</span>
            </div>
        );
    }

    if (error) {
        return <div className="text-center text-red-600">Error: {error}</div>;
    }

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`${URL}/api/blogs/user/delete/${id}`, { withCredentials: true });
            // Update state to remove the deleted user
            setUserData(prevUserData => prevUserData.filter(user => user._id !== id));
            
            toast.success(response.data.message)
            console.log(response.data || "deleted successfully");
        } catch (error) {
            console.log(error.response?.data?.message || "Error deleting user");
        }
    };

    return (
        <div className='px-4 py-3'>
            <div className='mx-auto max-w-screen-xl'>
                <h1 className='text-center font-mono text-2xl text-red-900 mb-4 mt-5'>Client Details</h1>

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase border-b bg-cyan-100 ">
                            <tr>
                                <th scope="col" className="p-4"></th>
                                <th scope="col" className="px-6 py-3">S.NO</th>
                                <th scope="col" className="px-6 py-3">Profile</th>
                                <th scope="col" className="px-6 py-3">Name & Email</th>
                                <th scope="col" className="px-6 py-3">Education</th>
                                <th scope="col" className="px-6 py-3">Join Date</th>
                                <th scope="col" className="px-6 py-3">Number</th>
                                <th scope="col" className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userData?.length > 0 ? (
                                userData.map((data, index) => (
                                    <tr key={data._id} className="bg-white border-b hover:bg-gray-200 transition duration-200">
                                        <td className="w-4 p-4"></td>
                                        <td className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                            <div className='mr-7'>
                                                <div className="text-gray-500">{index + 1}.</div>
                                            </div>
                                        </td>
                                        <td>
                                            <img className="w-10 h-10 rounded-full" src={data?.photo?.url} alt="Profile" />
                                        </td>
                                        <td>
                                            <div className="ps-3">
                                                <div className="text-black font-semibold">{data.name}</div>
                                                <div className="font-normal text-gray-600">{data.email}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">{data.education}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                {new Date(data.createdAt).getDate()} /
                                                {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"][new Date(data.createdAt).getMonth()]} /
                                                {new Date(data.createdAt).getFullYear()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <a href={`tel:${data.phone}`} className="font-medium text-blue-600 hover:underline">{data.phone}</a>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleDelete(data._id)}
                                                className="text-red-600 hover:underline"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="px-6 py-4 text-center">No users available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Allusers;
