import api from './api';

export const productService = {
    // Fetch all active products owned uniquely by this host
    getProducts: async () => {
        const response = await api.get('/host/items');
        return response.data;
    },

    // Initialize a new Host Product draft
    createProduct: async (productData) => {
        const response = await api.post('/host/items', productData);
        return response.data;
    },

    // Update existing Product catalog data
    updateProduct: async (productId, productData) => {
        const response = await api.put(`/host/items/${productId}`, productData);
        return response.data;
    },

    // Remove product from global catalog
    deleteProduct: async (productId) => {
        const response = await api.delete(`/host/items/${productId}`);
        return response.data;
    },

    // Update Product Onboarding Status
    updateProductStatus: async (productId, status, note) => {
        const response = await api.put(`/host/items/${productId}/status`, { newStatus: status, note });
        return response.data;
    }
};
