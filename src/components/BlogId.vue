<script>
import { ref, onMounted, getCurrentInstance, watch } from "vue";
import { articlesId } from "@/services/blogService.js";
import { useRoute, useRouter } from "vue-router";

export default {
	name: "BlogId",
	props: {
		item: Object
	},
	setup(props) {
		const route = useRoute();
		const router = useRouter();

		const obj = ref({});

		const showPublicArticles = async (id) => {
			try {
				console.log(id, "id")
				const res = await articlesId(id);
				obj.value = res.data;
			} catch (error) {
				console.log(error);
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

		const showGallery = (img) => {
			const element = img.srcElement;
			element.style.position = "fixed";
			element.style.top = "50%";
			element.style.left = "50%";
			element.style.transform = "translate(-50%, -50%)";

			const existingBackground = document.querySelector(
				".background-gallery"
			);
			if (existingBackground) {
				document.body.removeChild(existingBackground);
			}
			const backgroundGallery = document.createElement("div");
			backgroundGallery.className = "background-gallery";

			backgroundGallery.style.position = "fixed";
			backgroundGallery.style.top = "0";
			backgroundGallery.style.left = "0";
			backgroundGallery.style.width = "100%";
			backgroundGallery.style.height = "100%";
			backgroundGallery.style.backgroundColor = "rgba(0, 0, 0, 0.7)";

			document.body.appendChild(backgroundGallery);

			element.style.zIndex = "1";

			backgroundGallery.addEventListener("click", () => {
				document.body.removeChild(backgroundGallery);
				element.style.position = "static";
				element.style.top = "";
				element.style.left = "";
				element.style.transform = "";
				backgroundGallery.style.backgroundColor = "";
			});
		};

		const goBack = () => {
			router.back();
		};

		return {
			obj,
			showPublicArticles,
			showGallery,
			goBack,
			getFormattedDate
		};
	}
};
</script>
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
			<li
				v-for="item in obj.images"
				:key="item._id"
				@click="showGallery($event)"
			>
				<img
					class="blogId__imgs"
					:src="`https://api.iwhitewolf.it/${item.url}`"
					alt=""
				/>
			</li>
		</ul>
		<p class="blogId__info">
			{{ `${obj.author?.firstName} ${obj.author?.lastName}` }}
		</p>
		<p class="blogId__info">{{ getFormattedDate(obj.createdAt) }}</p>
		<button class="main__btn blogId__btn" @click="goBack()">Powrót</button>
	</div>
</template>
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
