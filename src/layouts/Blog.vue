<template>
	<div class="main__aboutMe blogId">
		<h1 class="main__title">Blog</h1>
		<div
			class="blog__container"
			@click="handleClick1(item._id)"
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
import { ref, onMounted } from "vue";
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

		const obj = ref([]);

		const showBlogArticles = async () => {
			try {
				const res = await articles();

				res && res.data ? (obj.value = res.data) : null;
			} catch (error) {
				console.error("Błąd podczas wykonywania żądania API:", error);
			}
		};

		onMounted(() => {
			showBlogArticles();
		});

		const handleClick1 = async (id) => {
			window.scrollTo(0, 0);
			router.push({ name: "BlogId", params: { blogId: id } });
		};

		return {
			obj,
			BlogArticles,
			showBlogArticles,
			handleClick1
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
