dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import movieRouter from './routes';
import cacheController from 'express-cache-controller';


const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI!).then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

// Middleware
app.use(express.json());
app.use(cacheController());
app.use('/api', movieRouter);

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the Movie Lobby API');
});
