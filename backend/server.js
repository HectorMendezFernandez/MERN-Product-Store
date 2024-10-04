import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './models/product.model.js';

//get config from .env file
dotenv.config();

const app = express();

//allow to accept json data in the body of request
app.use(express.json());

//get request
app.get('/', (req, res) => {
    res.send('Server is ready');
});

//post request for product
app.post('/api/products', async (req, res) => {
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

//delete request for product
app.delete('/api/products/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await Product.findByIdAndDelete(id);
        res.json({success: true, message: 'Product deleted successfully'});
    } catch (error) {
        console.error('Error in Delete product:', error);
        res.status(500).json({success: false, message: 'Internal Server Error'});
    }
});

//get all products
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({success: true, data: products});
    } catch (error) {
        console.error('Error in Fetch products:', error);
        res.status(500).json({success: false, message: 'Internal Server Error'});
    }
});

//update product
app.put('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = req.body;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product  , {new: true}); //new: true will return the updated product
        res.status(200).json({success: true, data: updatedProduct});    
    } catch (error) {
        console.error('Error in Update product:', error);
        res.status(500).json({success: false, message: 'Internal Server Error'});
    }
} );

//run the server
app.listen(5000, () => {
    connectDB();
    console.log('Server is running on port 5000 -> http://localhost:5000');
});
