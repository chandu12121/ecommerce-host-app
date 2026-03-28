import api from './api';

export const hostService = {
    // Fetch comprehensive Host/Seller Profile (KYC, Bank, Policy)
    getProfile: async () => {
        const response = await api.get('/host/profile');
        return response.data;
    },

    // Update specific segments of the Host/Seller Profile
    updateProfile: async (profileData) => {
        const response = await api.put('/host/profile', profileData);
        return response.data;
    }
};

export default hostService;
