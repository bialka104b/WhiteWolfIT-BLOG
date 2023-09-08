import axios from 'axios';
import { useCookies } from 'vue3-cookies';

const instance = axios.create({
    baseURL: 'http://localhost:5000/api',
})

instance.interceptors.request.use((config) => {
    const { cookies } = useCookies();
    const token = cookies.get('accessToken');

    if(!!token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default instance;