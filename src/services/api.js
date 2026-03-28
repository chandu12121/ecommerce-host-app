import axios from 'axios';

// Dynamically connect to the local 5001 Express Backend
const api = axios.create({
    baseURL: 'http://localhost:5001/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Axios Request Interceptor automates JWT injection
api.interceptors.request.use(
    (config) => {
        // If a Host token exists locally, seamlessly attach it
        const hostInfo = localStorage.getItem('hostInfo');
        if (hostInfo) {
            const { token } = JSON.parse(hostInfo);
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Advanced Response Handling for centralized errors (401 token expiry)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized access. Host token invalid or expired.');
            // Implement silent logout or redirect here if strictly needed
            // localStorage.removeItem('hostInfo');
            // window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
