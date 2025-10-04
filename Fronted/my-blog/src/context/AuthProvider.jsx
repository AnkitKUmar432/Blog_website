import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const URL = 'http://localhost:4000';
    const [blogs, setBlogs] = useState([]);
    const [profileData, setProfileData] = useState(null); // Use null to show when it's not yet loaded
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // console.log("ProfileData Context", profileData);
    // console.log("ProfileData", isAuthenticated);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                // let token = Cookies.get('jwt');
                let token = localStorage.getItem('jwt');
                // console.log('token in context', Cookies.get('jwt'))

                if (token) {
                    // console.log("Token:", token);
                    const responseProfile = await axios.get(`${URL}/api/users/my-profile`, {
                        withCredentials: true,
                        headers: {
                            "Content-Type": "application/json",
                            // "Authorization": `Bearer ${token}` // Include the token in the headers
                        },
                    });
                    // console.log(responseProfile.user);
                    setProfileData(responseProfile.data);
                    setIsAuthenticated(true);
                } else {
                    console.log("No token found, user not authenticated");
                }
            } catch (error) {
                console.log("Error fetching profile data:", error);
            }
        };

        const fetchBlogs = async () => {
            try {
                const responseBlogs = await axios.get(`${URL}/api/blogs/all-blogs`, {
                    withCredentials: true, // if required
                });
                setBlogs(responseBlogs.data);
            } catch (error) {
                console.log("Error fetching blogs:", error);
            }
        };
        if (URL) {
            fetchProfileData();
            fetchBlogs();
        }

    }, [URL]);

    return (
        <AuthContext.Provider value={{ blogs, profileData, setProfileData, isAuthenticated, setIsAuthenticated, URL }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
