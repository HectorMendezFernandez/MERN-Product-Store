import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
//get config from .env file
dotenv.config();


const app = express();

app.get('/', (req, res) => {
    res.send('Server is ready');
});

//run the server
app.listen(5000, () => {
    connectDB();
    console.log('Server is running on port 5000 -> http://localhost:5000');
});
