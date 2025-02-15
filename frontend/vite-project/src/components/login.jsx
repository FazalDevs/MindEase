import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Navbar from './navbar';
function Login({ setToken }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:4005/user/login",
                { email, password },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const token = response.data.user?.token;
            if (token) {
                toast.success("Login successful");
                localStorage.setItem("jwt", token);
                setToken(token);
                navigate("/dashboard");
            } else {
                toast.error("Failed to retrieve token. Please try again.");
            }
        } catch (error) {
            console.log("Error during login:", error);
            toast.error(error.response?.data?.message || "Login failed. Please try again.");
        }
    };

    return (
        <div>
            <Navbar />
            <div className="flex justify-center items-center h-screen bg-gray-100 pt-18">
                <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                    <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
                    <form onSubmit={handleRegister}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-600">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            Login
                        </button>
                        <p className="mt-4 text-center text-gray-600">
                            New User?{" "}
                            <Link to="/register" className="text-blue-600 hover:underline">
                                Register
                            </Link>{" "}
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;

