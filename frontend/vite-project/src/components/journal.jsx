import React from "react";

const Journal = () => {
    // Hardcoded journal entries
    const journals = [
        {
            _id: "1",
            content: "Today I felt really productive and completed all my tasks.",
            date: "2025-02-01",
        },
        {
            _id: "2",
            content: "Went for a walk in the park and enjoyed the fresh air.",
            date: "2025-02-02",
        },
        {
            _id: "3",
            content: "Had a great chat with a friend. Feeling grateful today.",
            date: "2025-02-03",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-6">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Journals</h1>

                <div className="space-y-6">
                    {journals.map((journal) => (
                        <div key={journal._id} className="p-4 bg-gray-100 rounded-md shadow-sm">
                            <p className="text-lg text-gray-800">{journal.content}</p>
                            <p className="text-sm text-gray-500 mt-2">
                                {new Date(journal.date).toLocaleDateString()}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-10">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Write a New Journal</h2>
                    <textarea
                        className="w-full h-32 p-4 bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Write your thoughts here..."
                    ></textarea>
                    <button className="mt-4 px-6 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600">
                        Save Journal
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Journal;
