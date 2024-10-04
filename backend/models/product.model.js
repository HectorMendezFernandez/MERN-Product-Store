import mongoose from "mongoose";

//create product schema with name, price, price and image
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    description: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: true,
    },
    
}, {timestamps: true});


//create Product model using the schema
const Product = mongoose.model('Product', productSchema);

export default Product;