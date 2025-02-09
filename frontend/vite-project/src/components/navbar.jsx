import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar() {
    // const [isLoggedIn, setIsLoggedIn] = useState(false); // Initialize state as false
    const navigate = useNavigate();
    const token = localStorage.getItem("jwt")

    const handleLogout = async () => {
        try {
            // Remove JWT token from localStorage
            localStorage.removeItem("jwt");

            // Call your logout API (optional)
            await axios.get("http://localhost:4005/user/logout", {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            });

            // setIsLoggedIn(false);
            navigate("/");
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    const handleLogin = () => {
        navigate("/dashboard"); // Redirect to dashboard
    };

    return (
        <div>
            <nav className="bg-white shadow-md fixed w-full z-10">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <a href="/" className="text-3xl font-bold text-blue-600">
                        MindEase
                    </a>
                    <div className="space-x-6 flex items-center">
                        <a
                            href="/journal"
                            className="text-gray-700 hover:text-blue-600 font-medium transition"
                        >
                            Journal
                        </a>
                        <a
                            href="/mood"
                            className="text-gray-700 hover:text-blue-600 font-medium transition"
                        >
                            Track Your Mood
                        </a>
                        <a
                            href="/ai"
                            className="text-gray-700 hover:text-blue-600 font-medium transition"
                        >
                            Chat with AI
                        </a>

                        {token ? (
                            <button
                                onClick={handleLogout}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition"
                            >
                                Logout
                            </button>
                        ) : (
                            <a
                                href="/login"
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                            >
                                Login
                            </a>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
