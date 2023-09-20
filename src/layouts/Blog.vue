<template>
	<div class="main__aboutMe blogId">
		<h1 class="main__title">Blog</h1>
		<div class="blog__container" v-for="item in obj" :key="item.id">
			<BlogArticles
				:artilesTitle="item.title"
				:artilesDescription="item.description"
				:artilesTime="item.createdAt"
				:articleThumbnail="item.thumbnail[0].url"
				:articlesImg="item.images"
				:articlesAuthor="item.author"
			/>
		</div>

		<!-- Dodaj komponent BlogId i przekaż do niego odpowiednie dane, jeśli to konieczne -->
	</div>
</template>

<script>
import { ref, onMounted } from "vue";
import { articles } from "@/services/blogService.js";
import BlogArticles from "@/components/BlogArticles.vue"; // Import komponentu BlogId

export default {
	name: "Blog",
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
			BlogArticles,
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
