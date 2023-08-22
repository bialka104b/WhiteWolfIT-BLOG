import axios from '@/utils/axios';

export async function login(email, password) {
    const response = await axios.post('/auth/login', { email, password });
    return response.data;
}

export async function refresh() {
    const response = await axios.post('/auth/refresh');
    return response.data;
}