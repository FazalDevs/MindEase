import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./navbar";
const Journal = () => {
    const [journal, setjournal] = useState([]);
    const [newjournals, setnewjournals] = useState("");
    const [error, seterror] = useState(null)
    const [loading, setloading] = useState(true)
    useEffect(() => {
        const fetchData = async () => {
            try {
                setloading(true);
                const response = await axios.get("https://mindease-juv4.onrender.com/journal/fetch", {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                console.log(response);
                setjournal(response.data.journal);
                setloading(false);
            } catch (error) {
                console.error("Failed to fetch journals:", error);
                seterror(error)
            }
        };
        fetchData();
    }, []);

    const createJournal = async () => {
        try {
            // setloading(true);
            const response = await axios.post(
                "https://mindease-juv4.onrender.com/journal/create",
                { text: newjournals },
                { withCredentials: true }
            );
            console.log(response.data.newJournal);
            setjournal([...journal, response.data.newJournal]);
            setnewjournals("");
            // setloading(false);
        } catch (error) {
            console.error("Failed to create journal:", error);
            seterror(error)
            setnewjournals("")
            setloading(false);
        }
    };

    const deleteJournal = async (id) => {
        try {
            // setloading(true);
            const response = await axios.delete(`https://mindease-juv4.onrender.com/journal/delete/${id}`, {
                withCredentials: true,
            });
            setjournal(journal.filter((entry) => entry._id !== id));
            console.log(response.data.journal);
            // setloading(false);
        } catch (error) {
            console.error("Failed to delete journal:", error);
            setnewjournals("")
            setloading(false);
        }
    };
    if (error) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-red-600 text-lg">{error.response.data.message}

                    <Link to="/" className="text-blue-600 hover:underline">{" "}Home{"\n"}

                    </Link>{" "}
                    <Link to="/login" className="text-blue-600 hover:underline">{" "}Login{" "}

                    </Link>{" "}
                </p>
            </div>

        )
    }
    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-gray-600 text-lg">Loading...</p>
            </div>
        );
    }
    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-gray-50 py-10 px-6 pt-20">
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Journals</h1>

                    <div className="space-y-6">
                        {journal.map((entry) => (
                            <div
                                key={entry._id}
                                className="p-4 bg-gray-100 rounded-md shadow-sm flex items-center justify-between"
                            >
                                <div>
                                    <p className="text-lg text-gray-800">{entry.text}</p>
                                    <p className="text-sm text-gray-500 mt-2">
                                        {new Date(entry.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <button
                                    onClick={() => deleteJournal(entry._id)}
                                    className="px-4 py-2 bg-red-500 text-white font-medium rounded-md hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Write a New Journal</h2>
                        <textarea
                            value={newjournals}
                            onChange={(e) => setnewjournals(e.target.value)}
                            className="w-full h-32 p-4 bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Write your thoughts here..."
                        ></textarea>
                        <button
                            onClick={createJournal}
                            className="mt-4 px-6 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600"
                        >
                            Save Journal
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Journal;
