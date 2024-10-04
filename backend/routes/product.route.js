import express from "express";
import Product from './models/product.model.js';
import mongoose, { mongo } from 'mongoose';

const router = express.Router();

//post request for product
router.post('/', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
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
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({success: true, data: products});
    } catch (error) {
        console.error('Error in Fetch products:', error);
        res.status(500).json({success: false, message: 'Internal Server Error'});
    }
});

//update product
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const product = req.body;

    //check if id is valid
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({success: false, message: 'Invalid Product Id'});
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product  , {new: true}); //new: true will return the updated product
        res.status(200).json({success: true, data: updatedProduct});    
    } catch (error) {
        console.error('Error in Update product:', error);
        res.status(500).json({success: false, message: 'Internal Server Error'});
    }
} );

export default router;