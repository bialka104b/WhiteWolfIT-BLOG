<script setup>
import { ref } from 'vue';
import { toast } from 'vue3-toastify';
import { VDataTable } from 'vuetify/labs/VDataTable';
import { getArticles } from '@/services/articleService.js';

const loading = ref(false);
const headers = [
    { title: 'Title', key: 'title' },
    { title: 'Published', key: 'isPublic' },
    { title: 'Created at', key: 'createdAt' },
    { title: 'Description', key: 'description' }
];
const items = ref([]);

const loadArticles = async () => {
    loading.value = true;

    try {
        const { data } = await getArticles(true);
        items.value = data;
    } catch(err) {
        toast.error("An error occurred while loading data")
    } finally {
        loading.value = false;
    }
}
loadArticles();
</script>

<template>
    <v-data-table
        :loading="loading"
        :headers="headers"
        :items="items"
    >
        <template v-slot:item.description="{ item }">
            <span class="text-truncate">{{ item.raw.description }}</span>
        </template>

        <template v-slot:item.isPublic="{ item }">
            <v-icon v-if="item.raw.isPublic" color="success" icon="mdi-check" />
            <v-icon v-else="item.raw.isPublic" color="error" icon="mdi-close" />
        </template>

        <template v-slot:item.createdAt="{ item }">
            <span class="text-truncate">{{ new Date(item.raw.createdAt).toLocaleString().slice(0, -3) }}</span>
        </template>
    </v-data-table>
</template>