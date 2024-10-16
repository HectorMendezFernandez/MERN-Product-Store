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
        const response = await fetch("/api/products");
        const data = await response.json();
        set({products: data.data});
    },  
    deleteProduct: async (id) => {
        const response = await fetch(`/api/products/${id}`, {
            method: "DELETE",
        });
        const data = await response.json();
        if(!data.success) return {success: false, message: data.message}
        //update the state by removing the deleted product and is going to update the UI inmediately without refreshing the page
        set((state) => ({products: state.products.filter((product) => product._id !== id)}));
        return {success: true, message: data.message};
    },
    //update a product inmediately without refreshing the page
    updateProduct: async (pid, updatedProduct) => {
        const response = await fetch(`/api/products/${pid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProduct),
        });
        const data = await response.json();
        if(!data.success) return {success: false, message: data.message}
        //update the state with the new product data
        set((state) => ({
            products: state.products.map((product) => {
                if(product._id === pid) {
                    return data.data;
                }
                return product;
            }),
        }));
        return { success: true, message: "Product updated successfully" }; // Retornar en caso de éxito
    }
}))
