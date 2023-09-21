<script setup>
import { nextTick, ref } from 'vue'
import { toast } from 'vue3-toastify'
import { getArticles, changeToPrivate, changeToPublic } from '@/services/articleService.js'
import DeleteButton from '../../../components/articles/DeleteButton.vue'
import ThumbnailButton from '../../../components/articles/ThumbnailButton.vue'
import { VDataTable } from 'vuetify/labs/VDataTable'

const loading = ref(false)
const items = ref([])
const props = ref('dddd')
const headers = [
	{ title: 'Title', key: 'title' },
	{ title: 'Published', key: 'isPublic' },
	{ title: 'Created at', key: 'createdAt' },
	{ title: 'Description', key: 'description' }
]

const loadArticles = async (soft = false) => {
	if (!soft) loading.value = true

	try {
		const { data } = await getArticles(true)
		items.value = data.reverse()
	} catch (err) {
		toast.error('An error occurred while loading data')
	} finally {
		loading.value = false
	}
}
loadArticles()

const getThumbnail = (item) => {
	return item.thumbnail[item.thumbnail.length - 1]?.url ?? ''
}

const loadingVisibility = ref(false)
const changeVisibility = async (id, val) => {
	if (loadingVisibility.value) return

	loadingVisibility.value = true

	try {
		val ? await changeToPrivate(id) : await changeToPublic(id)
	} catch (err) {
		toast.error('An error occured! [articleList]')
	} finally {
		loadingVisibility.value = false
		loadArticles(true)
	}
}
</script>

<template>
	<v-data-table :loading="loading" :headers="headers" :items="items">
		<template v-slot:item.description="{ item }">
			<span class="text-truncate">{{ item.raw.description }}</span>
		</template>

		<template v-slot:item.isPublic="{ item }">
			<v-icon v-if="item.raw.isPublic" color="success" icon="mdi-check" />
			<v-icon v-else="item.raw.isPublic" color="error" icon="mdi-close" />
		</template>

		<template v-slot:item.createdAt="{ item }">
			<span class="text-truncate">{{
				new Date(item.raw.createdAt).toLocaleString().slice(0, -3)
			}}</span>
		</template>
	</v-data-table>
	<v-container fluid>
		<span class="text-h6 mb-5 d-block">Found {{ items.length }} items!</span>

		<div v-if="loading">
			<v-progress-circular indeterminate />
			<span class="text-body-1 ml-5">Loading data...</span>
		</div>
		<v-row v-else align-content="stretch">
			<v-col v-for="(item, index) in items" :key="index" cols="12" sm="6" md="4" lg="3">
				<v-card class="d-flex flex-column h-100">
					<template v-if="item.thumbnail[0]">
						<v-img
							:src="`https://api.iwhitewolf.it/${item.thumbnail[0].url}`"
							:alt="item.thumbnail[0].url"
							height="128"
							contain
							class="mt-4"
						/>

						<v-divider class="mt-4"></v-divider>
					</template>

					<v-card-item>
						<v-chip
							style="cursor: pointer"
							size="small"
							@click="changeVisibility(item._id, item.isPublic)"
							v-bind="{
								...(item.isPublic
									? {
											color: 'green',
											prependIcon: 'mdi-check'
									  }
									: {
											color: 'red',
											prependIcon: 'mdi-close'
									  })
							}"
						>
							{{ item.isPublic ? 'Public' : 'Private' }}
						</v-chip>

						<v-card-title class="mt-1">
							{{ item.title }}
						</v-card-title>

						<v-card-subtitle class="text-medium-emphasis">
							{{ new Date(item.createdAt).toLocaleString() }}
						</v-card-subtitle>
					</v-card-item>

					<v-card-text class="text-truncate">
						{{ item.description }}
					</v-card-text>

					<v-card-actions class="px-4 mt-auto">
						<v-btn
							color="primary"
							variant="tonal"
							size="small"
							v-bind:props="props"
							:to="`/admin/articles/${item._id}`"
						>
							<v-icon icon="mdi-pen"></v-icon>
						</v-btn>

						<DeleteButton size="small" :id="item._id" @afterDelete="loadArticles" />

						<ThumbnailButton size="small" :id="item._id" @afterSave="loadArticles" />
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>
