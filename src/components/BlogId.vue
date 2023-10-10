<template>
	<div class="main__aboutMe blogId">
		<div class="blogId__container">
			<img
				v-if="obj && obj.thumbnail && obj.thumbnail.length > 0"
				:src="`http://localhost:5000/${obj.thumbnail[0].url}`"
			/>
			<h2 class="main__small-title">{{ obj.title }}</h2>
		</div>
		<p class="main__paraf">{{ obj.description }}</p>
		<ul>
			<template v-for="item in obj.images" :key="item._id">
				<li @click="showGallery(item)">
					<img
						class="blogId__imgs"
						:src="`http://localhost:5000/${item.url}`"
					/>
				</li>
			</template>
		</ul>
		<template v-if="showModalImage">
			<ImageModal
				:src="srcImage"
				:id="idImage"
				:showModalImage="showModalImage"
				@closeModal="closeImageModal"
			/>
		</template>
		<p class="blogId__info">
			{{ `${obj.author?.firstName} ${obj.author?.lastName}` }}
		</p>
		<p class="blogId__info">{{ getFormattedDate(obj.createdAt) }}</p>
		<button class="main__btn blogId__btn" @click="goBack">Powrót</button>
	</div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { articlesId } from "@/services/blogService.js";
import { useRoute, useRouter } from "vue-router";
import ImageModal from "@/components/modals/ImageModal.vue";

export default {
	name: "BlogId",
	components: {
		ImageModal
	},
	setup() {
		const route = useRoute();
		const router = useRouter();

		const obj = ref({});

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

		const blogId = ref(null);

		let showModalImage = ref(false);
		const srcImage = ref(null);
		const idImage = ref(null);
		const showGallery = (item) => {
			srcImage.value = `http://localhost:5000/${item.url}`;
			idImage.value = item._id;
			showModalImage.value = true;
		};
		const closeImageModal = () => {
			showModalImage.value = !showModalImage.value;
		};

		const goBack = () => {
			router.go(-1);
		};

		watch(
			() => route.params.blogId,
			(newBlogId) => {
				blogId.value = newBlogId;
				showBlogID(newBlogId);
			}
		);

		onMounted(() => {
			blogId.value = route.params.blogId;
			showBlogID(blogId.value);
		});

		const showBlogID = async (id) => {
			try {
				const res = await articlesId(id);
				res && res.data ? (obj.value = res.data) : null;
			} catch (error) {
				console.log(error);
			}
		};

		return {
			blogId,
			closeImageModal,
			obj,
			showGallery,
			goBack,
			getFormattedDate,
			showModalImage,
			srcImage,
			idImage
		};
	}
};
</script>

<style>
.blogId {
	margin: 120px 20px;
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
