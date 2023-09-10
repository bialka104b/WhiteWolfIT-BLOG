<script setup>
import { ref } from 'vue';
import { saveArticle as saveArticleReq } from '@/services/articleService';
import RichEditor from '@/components/RichEditor/index.vue';

const formData = ref({
    title: 'q',
    description: 'q',
    content: 'q',
    isPublic: true,
    thumbnail: [],
    files: []
});

const titleMaxLength = 64;
const titleRules = [
    v => !!v || 'Title is required',
    v => (v && v.length <= titleMaxLength) || `Title must be less than ${titleMaxLength} characters`
]

const descMaxLength = 256;
const descRules = [
    v => !!v || 'Description is required',
    v => (v && v.length <= descMaxLength) || `Description must be less than ${descMaxLength} characters`
]

const thumbnailRules = [
    v => !!v || 'Thumbnail i required',
    v => (v && v.length && v[0].size < 2000000) || 'Thumbnail size should be less than 2 MB'
]

// api logic
const loading = ref(false);
const saveArticle = async () => {
    loading.value = true;

    try {
        const { data } = saveArticleReq(formData.value);
        console.log(data);
    } catch (err) {
        console.error('err', err);
    } finally {
        loading.value = false;
    }
}
</script>

<template>
    <v-form>
        <v-text-field
            v-model="formData.title"
            :rules="titleRules"
            :counter="titleMaxLength"
            label="Title"
            variant="solo"
            density="compact"
            hide-details="auto"
            clearable
            required
        />

        <v-text-field
            v-model="formData.description"
            :rules="descRules"
            :counter="descMaxLength"
            label="Description"
            variant="solo"
            density="compact"
            hide-details="auto"
            clearable
            required
        />

        <v-checkbox
            v-model="formData.isPublic"
            label="Public"
            density="comfortable"
        />

        <!-- <v-file-input
            v-model="formData.thumbnail"
            :rules="thumbnailRules"
            accept="image/png, image/jpeg"
            prepend-icon="mdi-camera"
            label="Thumbnail"
            variant="solo"
            density="compact"
            hide-details="auto"
            clearable
            show-size
        /> -->

        <RichEditor v-model="formData.content" />

        <v-divider class="my-5" />
        
        <v-footer app height="96" class="d-flex align-center">
            <v-btn
                flat
                variant="tonal"
                prepend-icon="mdi-check"
                color="success"
                class="mr-4"
                @click="saveArticle"
                :loading="loading"
                :disabled="loading"
            >
                Save
            </v-btn>
        </v-footer>
    </v-form>
</template>