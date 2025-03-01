import React from "react";
import Navbar from "./navbar";

const LandingPage = () => {
    return (
        <div>
            <Navbar />
            <div className="bg-gray-100 min-h-screen font-sans pt-16">

                <header header className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-20" >
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-4xl font-bold mb-4">
                            Your Mental Health, Simplified
                        </h2>
                        <p className="text-lg max-w-2xl mx-auto mb-6">
                            Unlock your emotional well-being with tools designed to help you
                            journal, track your mood, and get personalized support with AI.
                        </p>
                        <a
                            href="/register"
                            className="bg-white text-blue-600 font-medium px-8 py-4 rounded-lg shadow-md hover:bg-blue-50 transition"
                        >
                            Get Started
                        </a>
                    </div>
                </header >

                <section section className="py-16 bg-gray-100" >
                    <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">

                        <div
                            id="journal"
                            className="bg-white border rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow"
                        >
                            <div className="text-blue-600 text-4xl mb-4">
                                📓
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                Journal Your Thoughts
                            </h3>
                            <p className="text-gray-600 text-sm mb-6">
                                Reflect and write down your emotions to better understand your
                                journey.
                            </p>
                            <a
                                href="/register"
                                className="text-blue-600 font-medium hover:underline"
                            >
                                Explore Journal →
                            </a>
                        </div>

                        <div
                            id="mood-tracker"
                            className="bg-white border rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow"
                        >
                            <div className="text-blue-600 text-4xl mb-4">
                                📊
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                Track Your Mood
                            </h3>
                            <p className="text-gray-600 text-sm mb-6">
                                Visualize and monitor your emotional trends with ease.
                            </p>
                            <a
                                href="/register"
                                className="text-blue-600 font-medium hover:underline"
                            >
                                Track Now →
                            </a>
                        </div>

                        <div
                            id="ai-chat"
                            className="bg-white border rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow"
                        >
                            <div className="text-blue-600 text-4xl mb-4">
                                🤖
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                Chat with AI
                            </h3>
                            <p className="text-gray-600 text-sm mb-6">
                                Get instant support and insights from our AI assistant.
                            </p>
                            <a
                                href="/chat"
                                className="text-blue-600 font-medium hover:underline"
                            >
                                Chat Now →
                            </a>
                        </div>
                    </div>
                </section >

                <footer footer className="bg-blue-700 text-white py-6" >
                    <div className="container mx-auto px-6 text-center">
                        <p className="text-sm">
                            © 2025 MindEase. All rights reserved.
                        </p>
                    </div>
                </footer >
            </div >
        </div>
    );
};

export default LandingPage;
