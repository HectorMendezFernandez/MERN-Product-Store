import {create} from "zustand"

//global states
export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({products}),
    createProduct: async (newProduct) => {
        if(!newProduct.name || !newProduct.description || !newProduct.price || !newProduct.image) {
            return {success: false, message: "Please fill all fields"};
        }
        const response = await fetch("api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct),
        });
        const data = await response.json();
        //update the state with the new product data
        set((state) => ({products: [...state.products, data.data]}));
        return {success: true, message: "Product Create Successfully"};
    },
    fetchProducts: async () => {
        const response = await fetch("api/products");
        const data = await response.json();
        set({products: data.data});
    },  
}))
