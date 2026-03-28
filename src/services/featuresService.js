import api from './api';

export const featuresService = {
    // CRM Database
    getCustomers: async () => {
        const response = await api.get('/host/features/crm');
        return response.data;
    },

    // Support Ticket System
    getTickets: async () => {
        const response = await api.get('/host/features/tickets');
        return response.data; // Arrays of active ticket profiles
    },

    // Marketing Campaign ROI
    getCampaigns: async () => {
        const response = await api.get('/host/features/campaigns');
        return response.data;
    },

    // Advanced Financial Breakdown 
    getFinance: async () => {
        const response = await api.get('/host/features/finance');
        return response.data; // Gross, Net, Multi-Vendor split data
    }
};
