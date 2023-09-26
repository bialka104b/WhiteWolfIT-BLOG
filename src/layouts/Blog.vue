<template>
	<div class="main__aboutMe blogId">
		<h1 class="main__title">Blog</h1>
		<div
			class="blog__container"
			@click="handleClick(item._id)"
			v-for="item in obj"
			:key="item.id"
		>
			<BlogArticles
				:artilesTitle="item.title"
				:artilesDescription="item.description"
				:artilesTime="item.createdAt"
				:articleThumbnail="item.thumbnail[0].url"
				:articlesImg="item.images"
				:articlesAuthor="item.author"
			/>
		</div>
	</div>
</template>

<script>
import { ref, onMounted, getCurrentInstance } from "vue";
import { articles } from "../services/blogService.js";
import BlogArticles from "../components/BlogArticles.vue";
import { useRouter } from "vue-router";

export default {
	name: "Blog",
	components: {
		BlogArticles
	},
	setup() {
		const router = useRouter();
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

		const handleClick = async (id) => {
			router.push({ name: "blogId", params: { id } });
			window.scrollTo({
				top: 0,
				behavior: "smooth"
			});
		};

		return {
			obj,
			BlogArticles,
			showPublicArticles,
			handleClick
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
	cursor: pointer;
}
.blog__time {
	color: gray;
	margin: 10px 0;
	font-size: 0.8rem;
}
</style>
