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

export async function editArticle(formData, id) {
    const response = await axios.put(`/articles/${id}`, formData);

    return response;
}

export async function removeArticle(id) {
    const response = await axios.delete(`/articles/${id}`);

    return response;
}

export async function saveThumbnail(formData, id) {
    const response = await axios.post(`/articles/${id}/thumbnail`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    return response;
}

export async function changeToPrivate(id) {
    const response = await axios.put(`/articles/${id}/private`)
    return response;
}

export async function changeToPublic(id) {
    const response = await axios.put(`/articles/${id}/public`)
    return response;
}