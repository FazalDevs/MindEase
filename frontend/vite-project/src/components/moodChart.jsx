import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Link } from "react-router-dom";
import "chart.js/auto";
import Navbar from "./navbar";

const MoodChart = () => {
    const [moodData, setMoodData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newMood, setNewMood] = useState("");

    useEffect(() => {
        const fetchMoods = async () => {
            try {
                const response = await axios.get("http://localhost:4005/mood/fetch", {
                    withCredentials: true,
                });

                const moods = await response.data.map((item) => ({
                    date: new Date(item.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                    }),
                    mood: item.mood,
                }));
                setMoodData(moods);
                setLoading(false);
                setError(null);
            } catch (error) {
                console.error("Failed to fetch moods:", error);
                setError(error);
                setLoading(false);
            }
        };

        fetchMoods();
    }, []);

    const handleAddMood = async () => {
        if (newMood >= 1 && newMood <= 5) {
            try {
                const today = new Date().toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                });

                const response = await axios.post(
                    "http://localhost:4005/mood/create",
                    {
                        date: today,
                        mood: Number(newMood),
                    },
                    {
                        withCredentials: true,
                    }
                );
                const newMoodEntry = {
                    date: today,
                    mood: response.data.moodEntry.mood,
                };
                setMoodData((prevMoods) => [...prevMoods, newMoodEntry]);

                setNewMood("");
            } catch (error) {
                console.error("Failed to add mood:", error);
                alert("Something went wrong while adding your mood.");
            }
        } else {
            alert("Please enter a mood value between 1 and 5.");
        }
    };

    if (error) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-red-600 text-lg">
                    {error.response?.data?.message}
                    <Link to="/" className="text-blue-600 hover:underline">
                        {" "}
                        Go To Home Page{" "}
                    </Link>
                </p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-gray-600 text-lg">Loading...</p>
            </div>
        );
    }

    const chartData = {
        labels: moodData.map((item) => item.date),
        datasets: [
            {
                label: "Mood Levels",
                data: moodData.map((item) => item.mood),
                backgroundColor: moodData.map((item) => {
                    if (item.mood === 1) return "rgba(255, 99, 132, 0.6)"; // Sad
                    if (item.mood === 3) return "rgba(255, 206, 86, 0.6)"; // Neutral
                    if (item.mood === 5) return "rgba(75, 192, 192, 0.6)"; // Happy
                    return "rgba(153, 102, 255, 0.6)"; // Default
                }),
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 2,
                pointRadius: 6,
                pointBackgroundColor: moodData.map((item) => {
                    if (item.mood === 1) return "rgba(255, 99, 132, 1)"; // Sad
                    if (item.mood === 3) return "rgba(255, 206, 86, 1)"; // Neutral
                    if (item.mood === 5) return "rgba(75, 192, 192, 1)"; // Happy
                    return "rgba(153, 102, 255, 1)"; // Default
                }),
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: "top",
                labels: {
                    font: {
                        size: 14,
                    },
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 5,
                ticks: {
                    stepSize: 1,
                },
            },
        },
    };

    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex-grow overflow-y-auto">
                <div className="w-full max-w-4xl mx-auto bg-gray-100 shadow-md rounded-lg py-10 px-8 mt-10">
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
                        Mood Tracker
                    </h2>

                    <div className="flex justify-between items-center mb-6">
                        <p className="text-sm font-medium text-gray-600">
                            <span className="text-red-500 font-bold">1</span>: Sad |{" "}
                            <span className="text-yellow-500 font-bold">3</span>: Neutral |{" "}
                            <span className="text-green-500 font-bold">5</span>: Happy
                        </p>
                    </div>

                    <div className="mb-6 flex items-center justify-between">
                        <input
                            type="number"
                            value={newMood}
                            onChange={(e) => setNewMood(e.target.value)}
                            placeholder="Enter mood (1-5)"
                            className="w-3/4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={handleAddMood}
                            className="ml-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                        >
                            Add Mood
                        </button>
                    </div>

                    <div className="h-72">
                        <Line data={chartData} options={chartOptions} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MoodChart;
