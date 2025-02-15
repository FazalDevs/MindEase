import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios'
import toast from 'react-hot-toast';
const Dashboard = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("jwt")
    const [menuOpen, setMenuOpen] = useState(false);
    const handleLogout = async () => {
        try {
            localStorage.removeItem("jwt");


            await axios.get("https://mindease-juv4.onrender.com/user/logout", {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            });
            toast.success("Logged out successfully")
            // setIsLoggedIn(false);
            navigate("/login");
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    const handleLogin = () => {
        navigate("/dashboard");
    };
    return (
        <div>
            <div>
                <nav className="bg-white shadow-md fixed w-full z-10">
                    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                        <a href="/dashboard" className="text-3xl font-bold text-blue-600">
                            MindEase
                        </a>
                        <div className="hidden md:flex space-x-6 items-center">
                            <a href="/journal" className="text-gray-700 hover:text-blue-600 font-medium transition">Journal</a>
                            <a href="/mood" className="text-gray-700 hover:text-blue-600 font-medium transition">Track Your Mood</a>
                            <a href="/chat" className="text-gray-700 hover:text-blue-600 font-medium transition">Chat with AI</a>
                            {token ? (
                                <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition">
                                    Logout
                                </button>
                            ) : (
                                <a href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
                                    Login
                                </a>
                            )}
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button className="md:hidden p-2 focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
                            {menuOpen ? <span className="text-2xl">✖</span> : <span className="text-2xl">☰</span>}
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {menuOpen && (
                        <div className="md:hidden bg-white shadow-md absolute w-full left-0 top-16 p-4 flex flex-col space-y-4 items-center">
                            <a href="/journal" className="text-gray-700 hover:text-blue-600 font-medium transition">Journal</a>
                            <a href="/mood" className="text-gray-700 hover:text-blue-600 font-medium transition">Track Your Mood</a>
                            <a href="/chat" className="text-gray-700 hover:text-blue-600 font-medium transition">Chat with AI</a>
                            {token ? (
                                <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition">
                                    Logout
                                </button>
                            ) : (
                                <a href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
                                    Login
                                </a>
                            )}
                        </div>
                    )}
                </nav>
            </div>
            <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 p-8 flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl font-extrabold text-gray-800">Welcome!</h1>
                    <p className="text-lg text-gray-600 mt-3">Your Mental Health Companion</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="col-span-1"
                    >
                        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
                            <h2 className="text-2xl font-bold text-gray-700 mb-4">Journal</h2>
                            <p className="text-gray-600 text-center mb-6">Write and reflect on your thoughts and emotions.</p>
                            <a
                                href="/journal"
                                className="px-6 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition"
                            >
                                Go to Journal
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="col-span-1"
                    >
                        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
                            <h2 className="text-2xl font-bold text-gray-700 mb-4">Track Your Mood</h2>
                            <p className="text-gray-600 text-center mb-6">Visualize and monitor your daily mood trends.</p>
                            <a
                                href="/mood"
                                className="px-6 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition"
                            >
                                Track Mood
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="col-span-1"
                    >
                        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
                            <h2 className="text-2xl font-bold text-gray-700 mb-4">Chat with AI</h2>
                            <p className="text-gray-600 text-center mb-6">Have meaningful conversations with our AI therapist.</p>
                            <a
                                href="/chat"
                                className="px-6 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition"
                            >
                                Chat Now
                            </a>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-12 text-center"
                >
                    <p className="text-gray-500 text-sm">
                        Remember, your mental health journey is important. We're here to help.
                    </p>
                </motion.div>
            </div>
        </div >
    );
};

export default Dashboard;
