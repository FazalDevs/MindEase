import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
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
                const response = await axios.get("https://mindease-juv4.onrender.com/mood/fetch", { withCredentials: true });
                const moods = response.data.map((item) => ({
                    date: new Date(item.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short" }),
                    mood: item.mood,
                }));
                setMoodData(moods);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        fetchMoods();
    }, []);

    const handleAddMood = async () => {
        if (newMood >= 1 && newMood <= 5) {
            try {
                const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
                const response = await axios.post("https://mindease-juv4.onrender.com/mood/create", { date: today, mood: Number(newMood) }, { withCredentials: true });
                setMoodData((prev) => [...prev, { date: today, mood: response.data.moodEntry.mood }]);
                setNewMood("");
            } catch (error) {
                alert("Error adding mood");
            }
        } else {
            alert("Enter a mood value between 1 and 5.");
        }
    };

    const chartData = {
        labels: moodData.map((item) => item.date),
        datasets: [{
            label: "Mood Levels",
            data: moodData.map((item) => item.mood),
            borderColor: "#4CAF50",
            backgroundColor: "rgba(76, 175, 80, 0.2)",
            borderWidth: 2,
            pointRadius: 5,
        }],
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            <div className="flex-grow flex flex-col items-center px-4 sm:px-6 lg:px-8 py-10">
                <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Mood Tracker</h2>
                    {loading ? (
                        <p className="text-center text-gray-600">Loading...</p>
                    ) : error ? (
                        <p className="text-center text-red-600">Failed to fetch moods</p>
                    ) : (
                        <div className="h-64 w-full">
                            <Line data={chartData} />
                        </div>
                    )}
                    <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
                        <input
                            type="number"
                            value={newMood}
                            onChange={(e) => setNewMood(e.target.value)}
                            placeholder="Enter mood (1-5)"
                            className="w-full sm:w-3/4 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                        />
                        <button
                            onClick={handleAddMood}
                            className="w-full sm:w-auto bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                        >
                            Add Mood
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MoodChart;
