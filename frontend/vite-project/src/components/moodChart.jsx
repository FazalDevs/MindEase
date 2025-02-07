import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const MoodChart = () => {
    const [moodData, setMoodData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMoods = async () => {
            try {
                const response = await axios.get("http://localhost:4005/mood/fetch", {
                    withCredentials: true, // Include this if credentials are required
                });

                // Parse data from the response
                const moods = response.data.map((item) => ({
                    date: new Date(item.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                    }), // Format the date
                    mood: item.mood,
                }));

                setMoodData(moods);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch moods:", error);
            }
        };

        fetchMoods();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-gray-600 text-lg">Loading...</p>
            </div>
        );
    }

    // Prepare data for the chart
    const chartData = {
        labels: moodData.map((item) => item.date),
        datasets: [
            {
                label: "Mood Levels",
                data: moodData.map((item) => item.mood),
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderWidth: 2,
                tension: 0.4, // Smooth curve
                pointRadius: 5,
                pointBackgroundColor: "rgba(75, 192, 192, 1)",
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
                max: 5, // Assuming mood is rated on a scale of 1-5
                ticks: {
                    stepSize: 1,
                },
            },
        },
    };

    return (
        <div className="w-full max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
                Mood Tracker
            </h2>
            <div className="h-64">
                <Line data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default MoodChart;

