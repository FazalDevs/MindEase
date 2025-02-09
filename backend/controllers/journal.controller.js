import Journal from "../models/journal.model.js";
const fetchJournal = async (req, res) => {
    // console.log(req.userId.id)
    try {
        const journal = await Journal.find({ user: req.userId.id });
        return res.status(200).json({ message: "Journal fetched", journal });
    } catch (error) {
        return res.status(500).json({ message: "Journal not fetched" });
    }
}
const createJournal = async (req, res) => {
    try {
        const { text } = req.body;
        const journal = new Journal({ text: text, user: req.userId.id });
        const newJournal = await journal.save();
        return res.status(201).json({ message: "Journal created", newJournal });
    } catch (error) {
        return res.status(500).json({ message: "Journal not created" });
    }
}
const editJournal = async (req, res) => {
    try {
        const { text } = req.body;
        const journal = await Journal.findById(req.params.id);
        if (!journal) {
            return res.status(404).json({ message: "Journal not found" });
        }
        journal.text = text;
        const updatedJournal = await journal.save();
        return res.status(200).json({ message: "Journal updated", updatedJournal });
    } catch (error) {
        return res.status(500).json({ message: "Journal not updated" });
    }
}
const deleteJournal = async (req, res) => {
    try {
        const journal = await Journal.findByIdAndDelete(req.params.id)
        return res.status(200).json({ message: "Journal deleted", journal });
    } catch (error) {
        return res.status(500).json({ message: "Journal not deleted" });
    }
}
export { fetchJournal, createJournal, editJournal, deleteJournal };