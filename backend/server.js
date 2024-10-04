import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';

//get config from .env file
dotenv.config();

const app = express();

//allow to accept json data in the body of request
app.use(express.json());

app.use("/api/products", productRoutes);
//get request
app.get('/', (req, res) => {
    res.send('Server is ready');
});

//run the server
app.listen(5000, () => {
    connectDB();
    console.log('Server is running on port 5000 -> http://localhost:5000');
});
