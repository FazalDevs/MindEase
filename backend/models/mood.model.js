import mongoose from "mongoose";
const MoodSchema = mongoose.Schema({
    mood: {
        type: Number,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
})
const Mood = mongoose.model("Mood", MoodSchema)
export default Mood;