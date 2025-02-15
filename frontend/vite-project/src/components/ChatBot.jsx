import React, { useState } from "react";
import axios from "axios";
import Navbar from "./navbar";

const ChatBot = () => {
    const [userMessage, setUserMessage] = useState("");
    const [chatHistory, setChatHistory] = useState([]);

    const sendMessage = async () => {
        if (!userMessage.trim()) return;

        setChatHistory((prev) => [...prev, { sender: "user", message: userMessage }]);

        try {

            const { data } = await axios.post("https://mindease-juv4.onrender.com/chat/chat", {
                message: userMessage,
            });

            const botMessage = data.botMessage;
            setChatHistory((prev) => [...prev, { sender: "bot", message: botMessage }]);
        } catch (error) {
            console.error("Error communicating with the chatbot:", error.message);
            setChatHistory((prev) => [
                ...prev,
                { sender: "bot", message: "Error: Unable to fetch a response." },
            ]);
        }

        setUserMessage("");
    };

    return (
        <div>
            <Navbar />
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl">
                    <div className="bg-blue-600 text-white p-4 rounded-t-lg">
                        <h1 className="text-xl font-bold">AI Chatbot</h1>
                        <p className="text-sm">Powered by Hugging Face API</p>
                    </div>

                    <div className="p-4 bg-gray-50 h-96 overflow-y-auto">
                        {chatHistory.length === 0 ? (
                            <div className="text-gray-400 text-center mt-20">
                                <p>No messages yet. Start the conversation!</p>
                            </div>
                        ) : (
                            chatHistory.map((chat, index) => (
                                <div
                                    key={index}
                                    className={`mb-4 flex ${chat.sender === "user" ? "justify-end" : "justify-start"
                                        }`}
                                >
                                    <div
                                        className={`rounded-lg p-3 ${chat.sender === "user"
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-200 text-gray-800"
                                            } max-w-sm`}
                                    >
                                        <strong>{chat.sender === "user" ? "You" : "Bot"}:</strong>
                                        <p className="mt-1">{chat.message}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="flex items-center p-4 border-t bg-gray-100">
                        <input
                            type="text"
                            value={userMessage}
                            onChange={(e) => setUserMessage(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <button
                            onClick={sendMessage}
                            className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatBot;
