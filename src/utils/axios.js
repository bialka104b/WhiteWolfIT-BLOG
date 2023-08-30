import axios from 'axios';
import { useUserStore } from '../stores/user.js';

const instance = axios.create({
    baseURL: 'http://localhost:5000/api',
})

instance.interceptors.request.use((config) => {
    const { access_token } = useUserStore();

    if(!!access_token) {
        config.headers.Authorization = `Bearer ${access_token}`;
    }

    return config;
})

export default instance;