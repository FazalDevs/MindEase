import express from 'express';
import journalRoute from './routes/journal.route.js'
import userRoute from './routes/user.route.js'
import moodRoute from './routes/mood.routes.js'
import chatRoute from './routes/chat.route.js'

const app = express()
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors'
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
const port = process.env.PORT || 4000;

//middleware
app.use(cookieParser())
app.use(express.json());
app.use(cors({
    origin: "https://frontend-35ey.onrender.com",
    credentials: true, // Enable cookies or authorization headers
}));
// app.use(bodyParser.json());


//routes
app.use('/journal', journalRoute)
app.use('/user', userRoute)
app.use('/mood', moodRoute)
app.use('/chat', chatRoute)


app.get('/', function (req, res) {
    res.send('Hello World')
})

//db connection
try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Database connected');
} catch (error) {
    console.log('Error:', error);
}


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});