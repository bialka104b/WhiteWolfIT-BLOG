<script setup>
import { ref } from 'vue';
import { saveArticle as saveArticleReq } from '@/services/articleService';
import RichEditor from '@/components/RichEditor/index.vue';

const thumbnail = ref(null);
const data = ref({
    title: '',
    description: '',
    content: '',
    isPublic: true,
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
        const formData = new FormData();
        formData.append('thumbnail', thumbnail.value[0]);

        for(const key in data.value) {
            if(data.value.hasOwnProperty(key)) {
                const value = data.value[key];

                if (Array.isArray(value)) {
                    for (let i = 0; i < value.length; i++) {
                        formData.append(`${key}[${i}]`, value[i]);
                    }
                } else {
                    switch(key) {
                        case 'isPublic':
                            formData.append(key, data.value.isPublic ? 1 : 0);
                        default:
                            formData.append(key, value);
                    }
                }
            }
        }

        const response = await saveArticleReq(formData);
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
            v-model="data.title"
            :rules="titleRules"
            :counter="titleMaxLength"
            label="Title"
            variant="solo"
            density="compact"
            hide-details="auto"
            clearable
            required
        />

        <v-textarea
            v-model="data.description"
            :rules="descRules"
            :counter="descMaxLength"
            label="Description"
            variant="solo"
            density="compact"
            hide-details="auto"
            clearable
            required
            no-resize
        />

        <v-checkbox
            v-model="data.isPublic"
            label="Public"
            density="comfortable"
        />

        <v-file-input
            v-model="thumbnail"
            :rules="thumbnailRules"
            accept="image/png, image/jpeg"
            prepend-icon="mdi-camera"
            label="Thumbnail"
            variant="solo"
            density="compact"
            clearable
            show-size
        />

        <RichEditor v-model="data.content" />

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