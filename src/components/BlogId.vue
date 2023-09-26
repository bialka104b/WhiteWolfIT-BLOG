<template>
	<div class="main__aboutMe blogId">
		<div class="blogId__container">
			<img
				v-if="obj && obj.thumbnail && obj.thumbnail.length > 0"
				:src="`https://api.iwhitewolf.it/${obj.thumbnail[0].url}`"
				:alt="obj.title"
			/>
			<h2 class="main__small-title">{{ obj.title }}</h2>
		</div>
		<p class="main__paraf">{{ obj.description }}</p>
		<ul>
			<template v-for="item in obj.images" :key="item._id">
				<li @click="showGallery(item)">
					<img
						class="blogId__imgs"
						:src="`https://api.iwhitewolf.it/${item.url}`"
						alt=""
					/>
				</li>
			</template>
			<template v-if="showModalImage">
				{{showModalImage}}
				<ImageModal
					:src="srcImage"
					:id="idImage"
					:showModalImage="showModalImage"
					@closeModal="closeImageModal"
				/>
			</template>
		</ul>
		<p class="blogId__info">
			{{ `${obj.author?.firstName} ${obj.author?.lastName}` }}
		</p>
		<p class="blogId__info">{{ getFormattedDate(obj.createdAt) }}</p>
		<button class="main__btn blogId__btn" @click="goBack()">Powrót</button>
	</div>
</template>
<script>
import { ref, onMounted, getCurrentInstance, watch, reactive } from "vue";
import { articlesId } from "@/services/blogService.js";
import { useRoute, useRouter } from "vue-router";
import ImageModal from "@/components/modals/ImageModal.vue";
export default {
	name: "BlogId",
	props: {
		item: Object
	},
	components: {
		ImageModal
	},
	setup(props) {
		const route = useRoute();
		const router = useRouter();

		const obj = ref({});

		const showPublicArticles = async (id) => {
			if (id) {
				try {
					console.log(id, "id");
					const res = await articlesId(id);
					obj.value = res.data;
				} catch (error) {
					console.log(error);
				}
			}
		};
		function getFormattedDate(date) {
			const time = new Date(date);
			const options = {
				year: "numeric",
				month: "short",
				day: "numeric",
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit"
			};
			return time.toLocaleDateString("pl-PL", options);
		}

		onMounted(() => {
			showPublicArticles(route.params.id);

			watch(
				() => route.path,
				(newPath) => {
					showPublicArticles(route.params.id);
				}
			);
		});

		let showModalImage = ref(false);
		const srcImage = ref(null);
		const idImage = ref(null);
		const showGallery = (item) => {
			srcImage.value = `https://api.iwhitewolf.it/${item.url}`;
			idImage.value = item._id;
			showModalImage.value = true;
		};
		const closeImageModal = () => {
			showModalImage.value = !showModalImage.value;
		};

		const goBack = () => {
			router.back();
		};

		return {
			closeImageModal,
			obj,
			showPublicArticles,
			showGallery,
			goBack,
			getFormattedDate,
			showModalImage,
			srcImage,
			idImage
		};
	},
	created() {}
};
</script>

<style>
.blogId {
	margin: 50px 20px;
}
.blogId h2 {
	margin: 0 0 100px 0;
}

.blogId__container {
	display: flex;
	margin: 20px 0 20px 0;
}

.blogId__container img {
	height: 100px;
}

.blogId__container h2 {
	margin: auto 20px;
}

.blogId__btn {
	margin: 20px 0 50px 0;
}

.blogId ul {
	cursor: pointer;
	margin: 20px 0;
	text-align: center;
	list-style: none;
}

.blogId__imgs {
	width: 75vw;
}

.blogId__info {
	font-size: 0.8rem;
	font-weight: bold;
}
.main__paraf {
	margin: 20px 20px 20px 20px;
}
</style>
