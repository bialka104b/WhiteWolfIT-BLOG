<template>
	<div class="main__aboutMe">
		<h1 class="main__title">Blog</h1>
		<div class="blog__container" v-for="item in obj" :key="item.id">
			<img
				src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png"
				alt=""
				class="blog__img"
			/>
			<h2>{{ item.title }}</h2>
			<p>{{ item.description }}</p>
			<p class="blog__time">{{ item.createdAt }}</p>
		</div>
	</div>
</template>

<script>
import { ref, onMounted } from "vue";
// import { useStore } from '@/stores/blog.js'
import { articles } from "@/services/blogService.js";

export default {
	name: "Footer",
	props: {
		item: Object
	},
	setup() {
		const clients = {
			article: articles()
		};
		const obj = ref([]);

		const showPublicArticles = async () => {
			try {
				const res = await clients.article;
				obj.value = res.data;
			} catch (error) {
				console.log(error);
			}
		};

		onMounted(() => {
			showPublicArticles();
		});

		return {
			obj,
			showPublicArticles
		};
	}
};
</script>

<style>
.main__paraf {
	margin: 0px 0;
}
.blog__img {
	height: 100px;
}

.blog__container {
	margin: 30px 0;
}
.blog__time {
	color: gray;
	margin: 10px 0;
	font-size: 0.8rem;
}
</style>
