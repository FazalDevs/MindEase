import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { generateToken } from '../jwt/token.js';
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!email || !password || !name) {
            return res.status(400).json({ message: "Please fill all fields" })
        }
        const schema = z.object({
            name: z.string(),
            email: z.string().email({ errors: "Invalid Email" }),
            password: z.string().min(6, { errors: "Not long Enough" }),
        });
        const validate = await schema.safeParse({ name, email, password });
        if (!validate.success) {
            const errorMessages = validate.error.errors.map((err) => err.message)
            return res.status(400).json({ errors: errorMessages });
        }
        const user = await User.findOne({ email: email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        const token = await generateToken(newUser._id, res);
        return res.status(200).json({ message: "User registered", newUser, token: token });
        // return res.status(201).json({ message: "User registered", newUser });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "User not registered" });
    }
}
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all fields" })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ message: "Invalid credentials" })
        }
        const token = generateToken(user._id, res);
        return res.status(200).json({ message: "User logged in", user, token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "User not logged in" });
    }
}
export const logoutUser = async (req, res) => {
    try {
        await res.clearCookie("jwt", {
            path: '/'
        });
        res.status(200).json({ message: "User logged out" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "User not logged out" });
    }
}
export const pingServer = async (req, res) => {
    try {
        res.status(200).json({ message: "Server is alive" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Ping failed");
    }
};
export default {};