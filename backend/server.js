import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';

//get config from .env file
dotenv.config();

const app = express();
//get port from .env file or use 5000
const PORT = process.env.PORT || 5000;

//allow to accept json data in the body of request
app.use(express.json());

app.use("/api/products", productRoutes);
//get request
app.get('/', (req, res) => {
    res.send('Server is ready');
});

//run the server
app.listen(PORT, () => {
    connectDB();
    console.log('Server is running on port ' + PORT + ' ->  http://localhost:' + PORT);
});


// MONGO_URI=mongodb+srv://hfmendez25:h6yuuH6iJMfPPpBJ@cluster0.e6ukl.mongodb.net/products?retryWrites=true&w=majority&appName=Cluster0

// PORT=5000