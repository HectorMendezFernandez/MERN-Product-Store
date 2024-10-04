import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './models/product.model.js';

//get config from .env file
dotenv.config();

const app = express();

//get request
app.get('/', (req, res) => {
    res.send('Server is ready');
});
//post request for product
app.post('/', async (req, res) => {
    const product = req.body; //user will send this data

    if(!product.name || !product.price || !product.image) {
        return res.status(400).send({message: 'All fields are required'});
    }

    const newProduct = new Product(product);

    try {
        const createdProduct = await newProduct.save();
        res.status(201).json({success: true, data: createdProduct});
    } catch (error) {   
        console.error('Error in Create product:', error);
        res.status(500).json({success: false, message: 'Internal Server Error'});
    }
});

//run the server
app.listen(5000, () => {
    connectDB();
    console.log('Server is running on port 5000 -> http://localhost:5000');
});
