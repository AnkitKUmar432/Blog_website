import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function Login() {
  const { setIsAuthenticated, setProfileData} = useAuth();
  
  const navigateTo = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // Ensure role is defined
  const [error, setError] = useState(null); // Added error state

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    // Basic form validation
    if (!email || !password || !role) {
      setError("Please fill in all fields.");
      return;
    }

    const formData = new FormData();   
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", role);

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/users/login",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 10000, // Optional: 10 seconds timeout
        }
      );

      toast.success(data.message);
      localStorage.setItem("jwt", data.token);// setItem
      setProfileData(data);
      setIsAuthenticated(true);
      setEmail("");
      setPassword("");
      if(role ==="admin"){
        navigateTo("/dashboard")
      }else{
        navigateTo("/")
      }
      setRole("");
      
       
    } catch (error) {
      console.log(error.response);
      toast.error(error?.response?.message|| "Login failed. Please try again.");

    }
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
          <form onSubmit={handleLogin}>
            <div className="font-semibold text-xl items-center text-center animate-bounce">
              Ankit<span className="text-blue-500">Blog</span>
            </div>
            <h1 className="text-xl font-semibold mb-6 animate-fadeIn">Login</h1>
            {error && (
              <div className="text-red-500 text-center mb-4 animate-fadeIn">
                {error}
              </div>
            )}

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2 mb-4 border rounded-md"
            >
              <option value="">Select Role</option>
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>

            <div className="mb-4">
              <input
                type="email"
                placeholder="Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
            
            <div className="mb-4">
              <input
                type="password"
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <p className="text-center mb-4">
              Already registered?{" "}
              <Link to={"/register"} className="text-blue-600">
                Register Now
              </Link>
            </p>

            <button
              type="submit"
              className="w-full p-2 bg-blue-500 hover:bg-blue-700 transition duration-300 rounded-md text-white"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
