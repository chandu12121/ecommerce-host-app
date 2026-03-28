import api from './api';

export const orderService = {
    // Fetch distinct orders tied to the host's inventory
    getOrders: async () => {
        const response = await api.get('/host/orders');
        return response.data;
    }
};
