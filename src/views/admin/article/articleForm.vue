<script setup>
import { ref, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import { toast } from 'vue3-toastify';
import { saveArticle as saveArticleReq, editArticle } from '@/services/articleService';
import { articlesId } from '@/services/blogService';
import RichEditor from '@/components/RichEditor/index.vue';
import DeleteButton from '../../../components/articles/DeleteButton.vue';
import ThumbnailButton from '@/components/articles/ThumbnailButton.vue';
import router from '../../../router';

const data = ref({
    title: '',
    description: '',
    isPublic: true,
    content: '',
    files: []
});
const loading = ref(false);

// check if it's edit routing
const route = useRoute();
const editMode = ref(route.params.id);
onBeforeMount(async () => {
    const { id } = route.params;
    if(id) {
        try {
            loading.value = true;
            const response = await articlesId(id, true);
            data.value = response.data;
        } catch {
            await router.push({ name: 'admin-articles'})
            toast.error('An error occured [articleForm]')
        } finally {
            loading.value = false;
        }
    }
})

// rules and validation
const formValid = ref(false);

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

const thumbnail = ref(null);
const thumbnailRules = [
    v => !!v || 'Thumbnail i required',
    v => (v && v.length && v[0].size < 2000000) || 'Thumbnail size should be less than 2 MB'
]

// api logic
const saveArticle = async () => {
    if(!formValid.value)
        return

    loading.value = true;

    try {
        const formData = new FormData();
        if(thumbnail.value?.[0])
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

        if(editMode.value)
            await editArticle(data.value, route.params.id);
        else
            await saveArticleReq(formData);

        await router.push({ name: 'admin-articles' })

        if(editMode.value)
            toast.success('Article updated.');
        else
            toast.success('Article has been added.')
    } catch (err) {
        toast.error('An error occured!')
    } finally {
        loading.value = false;
    }
}

// save thumbnail
const saveThumbnail = async () => {
    console.log(thumbnail.value);
}
</script>

<template>
    <div v-if="loading && editMode">
        <v-progress-circular indeterminate />
        <span class="text-body-1 ml-5">Loading data...</span>
    </div>
    <v-form v-else v-model="formValid" @submit.prevent="saveArticle">
        <v-row no-gutters>
            <v-col cols="12">
                <v-text-field
                    v-model="data.title"
                    :rules="titleRules"
                    :counter="titleMaxLength"
                    label="Title *"
                    variant="solo"
                    density="compact"
                    hide-details="auto"
                    clearable
                    required
                />
            </v-col>

            <v-col cols="12">
                <v-textarea
                    v-model="data.description"
                    :rules="descRules"
                    :counter="descMaxLength"
                    label="Description *"
                    variant="solo"
                    density="compact"
                    hide-details="auto"
                    clearable
                    required
                    no-resize
                    class="mt-2"
                />
            </v-col>

            <v-col cols="12">
                <v-file-input
                    v-if="!editMode"
                    v-model="thumbnail"
                    :rules="thumbnailRules"
                    accept="image/png, image/jpeg"
                    label="Thumbnail *"
                    variant="solo"
                    density="compact"
                    clearable
                    show-size
                    class="mt-2"
                />
            </v-col>

            <v-col cols="12">
                <RichEditor v-model="data.content" class="mt-2" />
            </v-col>
        </v-row>
        
        <v-footer app height="64" class="d-flex align-center flex-row">
            <v-checkbox
                v-model="data.isPublic"
                :label="`Article is ${data.isPublic ? 'public' : 'private'}.`"
                :color="data.isPublic ? 'green' : 'grey'"
                hide-details
                class="flex-0-0"
            />

            <v-divider vertical class="mx-5"></v-divider>

            <v-btn
                flat
                variant="tonal"
                prepend-icon="mdi-check"
                :loading="loading"
                :disabled="loading"
                color="green"
                type="submit"
            >
                {{ editMode ? 'Update article' : 'Save' }}
            </v-btn>

            <template v-if="editMode">
                <DeleteButton
                    class="ml-3"
                    prepend-icon="mdi-delete"
                    :id="route.params.id"
                    @after-delete="router.push({name: 'admin-articles'})"
                >
                    Delete
                </DeleteButton>

                <v-divider vertical class="mx-5"></v-divider>

                <ThumbnailButton
                    prepend-icon="mdi-image"
                    :id="route.params.id"
                >
                    Change thumbnail
                </ThumbnailButton>
            </template>
        </v-footer>
    </v-form>
</template>