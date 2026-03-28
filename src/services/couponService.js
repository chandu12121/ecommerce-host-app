import api from './api';

export const couponService = {
    // Fetch all coupons owned by this host
    getCoupons: async () => {
        const response = await api.get('/host/features/coupons');
        return response.data;
    },

    // Initialize new promotional asset
    createCoupon: async (couponData) => {
        const response = await api.post('/host/features/coupons', couponData);
        return response.data;
    },

    // Permanently remove coupon from rotation
    deleteCoupon: async (id) => {
        const response = await api.delete(`/host/features/coupons/${id}`);
        return response.data;
    }
};
