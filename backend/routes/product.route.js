import express from "express";
import { getProducts, deleteProduct, createProduct, updateProduct } from "../controllers/product.controller.js";

const router = express.Router();

//post request for product
router.post('/', createProduct);

//delete request for product
router.delete('/:id', deleteProduct);

//get all products
router.get('/', getProducts);

//update product
router.put('/:id', updateProduct);

export default router;