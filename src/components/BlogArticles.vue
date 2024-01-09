<template>
	<div class="main__aboutMe blogId">
		<div class="blogId__container">
			<img
				:src="`http://localhost:5001/${articleThumbnail}`"
				alt=""
			/>
			<h2 class="main__small-title">{{ artilesTitle }}</h2>
		</div>
		<p class="blogId__paraf">{{ artilesDescription }}</p>
		<p class="blogId__info">
			{{ `${articlesAuthor.firstName} ${articlesAuthor.lastName}` }}
		</p>
		<p class="blogId__info">{{ timed() }}</p>
	</div>
</template>

<script>
export default {
	props: {
		artilesTitle: String,
		artilesDescription: String,
		artilesTime: String,
		articleThumbnail: String,
		articlesAuthor: Object
	},
	setup(props) {
		const timed = () => {
			const blogDate = new Date(props.artilesTime);

			const options = {
				year: "numeric",
				month: "short",
				day: "numeric",
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit"
			};

			return blogDate.toLocaleDateString("pl-PL", options);
		};

		return {
			timed
		};
	},
	methods: {
		goBack() {
			this.$router.back();
		}
	}
};
</script>

<style>
.blogId h1 {
	margin: 0 0 50px 0;
}

.blogId__container {
	display: flex;

	margin: 30px 0 30px 0;
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
.blogId__paraf {
	margin: 20px 20px 20px 20px;
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
</style>
