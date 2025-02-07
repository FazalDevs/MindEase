import Mood from "../models/mood.model.js"; // Import your Mood model

// Add a new mood entry
export const addMood = async (req, res) => {
    try {
        const { mood } = req.body;
        const userId = req.userId; // Assuming `userId` is attached to the request via middleware (e.g., JWT)

        // Validate input
        if (!mood || mood < 1 || mood > 5) {
            return res.status(400).json({ message: "Mood must be a number between 1 and 5." });
        }

        // Create and save the mood entry
        const moodEntry = new Mood({
            mood,
            userId,
        });
        await moodEntry.save();
        res.status(201).json({ message: "Mood logged successfully", moodEntry });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to log mood" });
    }
};

// Fetch all moods for a user (optional: filter by date range)
export const getMoods = async (req, res) => {
    try {
        const userId = req.userId; // Assuming `userId` is attached to the request via middleware
        const { startDate, endDate } = req.query;

        // Build query filter
        const filter = { userId };

        const moods = await Mood.find(filter);
        return res.status(200).json(moods);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch moods" });
    }
};

// Delete a mood entry
export const deleteMood = async (req, res) => {
    try {
        const { id } = req.params; // Mood ID to delete
        const userId = req.userId; // Assuming `userId` is attached to the request via middleware

        const mood = await Mood.findOneAndDelete({ _id: id, userId });

        if (!mood) {
            return res.status(404).json({ message: "Mood not found" });
        }

        res.status(200).json({ message: "Mood deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete mood" });
    }
};
