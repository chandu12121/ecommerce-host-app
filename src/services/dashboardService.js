import api from './api';

export const dashboardService = {
    // Fetch aggregated host dashboard statistics (Sales, Orders, Pipelines)
    getStats: async () => {
        const response = await api.get('/host/stats');
        return response.data;
    }
};
