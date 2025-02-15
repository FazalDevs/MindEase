import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const HUGGING_FACE_API_URL = "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium";
const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY;
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getChatResponse = async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: "Message is required" });
    }

    if (!HUGGING_FACE_API_KEY) {
        console.error("Hugging Face API key is missing.");
        return res.status(500).json({ error: "API key is not configured." });
    }

    try {
        let attempts = 3;
        let response;

        while (attempts > 0) {
            try {
                response = await axios.post(
                    HUGGING_FACE_API_URL,
                    { inputs: message },
                    {
                        headers: {
                            Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
                        },
                    }
                );
                break;
            } catch (error) {
                if (error.response?.status === 503) {
                    const estimatedTime = error.response?.data?.estimated_time || 30;
                    console.log(
                        `Model is loading. Retrying after ${Math.ceil(estimatedTime)} seconds`
                    );
                    await delay(Math.ceil(estimatedTime) * 1000);
                    attempts--;
                } else {
                    throw error;
                }
            }
        }

        if (!response) {
            return res
                .status(503)
                .json({ error: "Model is still loading. Please try again later." });
        }

        const botMessage =
            response.data.generated_text ||
            (response.data[0]?.generated_text) ||
            "I'm sorry, I couldn't understand that.";

        res.status(200).json({ botMessage });
    } catch (error) {
        console.error(
            "Error communicating with Hugging Face API:",
            error.message,
            error.response?.data || error.toString()
        );

        if (error.response?.status === 401) {
            return res.status(401).json({ error: "Unauthorized: Check your API key." });
        } else {
            return res
                .status(500)
                .json({ error: "Failed to fetch response from Hugging Face API" });
        }
    }
};
