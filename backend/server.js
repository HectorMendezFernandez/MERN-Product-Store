import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';
import path from 'path';

//get config from .env file
dotenv.config();

const app = express();
//get port from .env file or use 5000
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

//allow to accept json data in the body of request
app.use(express.json());

app.use("/api/products", productRoutes);

//serve static assets if in production
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    }
    );
}
//get request
app.get('/', (req, res) => {
    res.send('Server is ready');
});

//run the server
app.listen(PORT, () => {
    connectDB();
    console.log('Server is running on port ' + PORT + ' ->  http://localhost:' + PORT);
});