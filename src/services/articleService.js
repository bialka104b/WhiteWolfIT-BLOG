import axios from '@/utils/axios';

export async function getArticles(admin = false) {
    const path = `/articles${admin ? '/admin/all' : ''}`;
    const response = await axios.get(path);
    
    return response;
}

export async function saveArticle(formData) {
    const response = await axios.post('/articles/new', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    return response;
}