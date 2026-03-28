import axios from 'axios';

const paymentApi = axios.create({
    baseURL: 'http://localhost:7000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

paymentApi.interceptors.request.use(
    (config) => {
        // Use unified hostInfo token for host portal financial requests
        const hostInfo = localStorage.getItem('hostInfo');
        if (hostInfo) {
            const { token } = JSON.parse(hostInfo);
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default paymentApi;
