<script>
import { ref, onMounted, getCurrentInstance } from "vue";
import { articles } from "@/services/blogService.js";
import { useStore } from "@/stores/blog.js";

export default {
	name: "Footer",
	props: {
		item: Object
	},
	setup() {
		function reduceParagraph(description) {
			const words = description.split(" ");
			if (words.length <= 8) return description;
			const shortenedParagraph = words.slice(0, 8).join(" ") + "...";
			return shortenedParagraph;
		}
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

		const { proxy } = getCurrentInstance();
		const store = useStore();

		const handleClick = async (id) => {
			try {
				await store.fetchDataBlog(id);
				proxy.$router.push(`/blog/${id}`);
			} catch (error) {
				console.error(error);
			}
			window.scrollTo({
				top: 0,
				behavior: "smooth"
			});
		};

		return {
			obj,
			handleClick,
			showPublicArticles,
			reduceParagraph
		};
	}
};
</script>

<template>
	<<<<<<< HEAD
	<footer>
		<div class="footer-top">
			<div class="footer-top__contact">
				<h1>Dane Kontaktowe</h1>
				<h2>Biuro</h2>
				<p>Rzeszów, ul. Krzyżanowskiego 22/250</p>
				<p>Poniedziałek-Piątek 10:00 - 18:00,</p>
				<h2>Obsługa klienta</h2>
				<p>kontakt@biuro.pl</p>
				<p>Telefon +48 978 543 123</p>
			</div>
			<div class="footer-top__news">
				<h1>Aktualności</h1>
				<ul>
					<li
						v-for="item in obj.slice(obj.length - 3)"
						:key="item.id"
						@click="handleClick(item._id)"
					>
						<img
							:src="`http://localhost:5000/${item.thumbnail[0].url}`"
							alt=""
							class="footer-top__news__img"
						/>
						<div>
							<h2>{{ item.title }}</h2>
							<p>{{ reduceParagraph(item.description) }}</p>
						</div>
					</li>
				</ul>
			</div>
			<div class="footer-top__socials">
				<h1>Socjal</h1>
				<div class=""></div>
				<div class=""></div>
				<div class=""></div>
				<div class=""></div>
			</div>
		</div>
		<div class="footer-bottom">
			<div class="footer-bottom__logo">
				<img src="src/assets/logo-color.png" alt="" />
			</div>
			<div class="footer-bottom__info">
				<p>&copy; 2023 IWhiteWolf.IT - Wszelkie prawa zastrzeżone.</p>
			</div>
		</div>
	</footer>
	=======
	<footer>
		<div class="footer-top">
			<div class="footer-top__contact">
				<h1>Dane Kontaktowe</h1>
				<h2>Biuro</h2>
				<p>Rzeszów, ul. Krzyżanowskiego 22/250</p>
				<p>Poniedziałek-Piątek 10:00 - 18:00,</p>
				<h2>Obsługa klienta</h2>
				<p>kontakt@biuro.pl</p>
				<p>Telefon +48 978 543 123</p>
			</div>
			<div class="footer-top__news">
				<h1>Aktualności</h1>
				<ul>
					<li
						v-for="item in obj"
						:key="item.id"
						@click="handleClick(item._id)"
					>
						<img
							src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png"
							alt=""
							class="footer-top__news__img"
						/>
						<div>
							<h2>{{ item.title }}</h2>
							<p>{{ reduceParagraph(item.description) }}</p>
						</div>
					</li>
				</ul>
			</div>
			<div class="footer-top__socials">
				<div class=""></div>
				<div class=""></div>
				<div class=""></div>
				<div class=""></div>
			</div>
		</div>
		<div class="footer-bottom">
			<div class="footer-bottom__logo">
				<img src="../assets/logo-color.png" />
			</div>
			<div class="footer-bottom__info">
				<p>&copy; 2023 IWhiteWolf.IT - Wszelkie prawa zastrzeżone.</p>
			</div>
		</div>
	</footer>
	>>>>>>> 45ac38aa82dfa70c7886a2ef56e2caa727b22beb
</template>

<style>
.footer-top__news ul {
	padding: 10px;
	list-style-type: none;
}

.footer-top__news ul li {
	display: flex;
	margin: 20px;
	list-style-type: none;
}

.footer-top__news ul li:hover {
	cursor: pointer;
}

.footer-top__news img {
	height: 100px;
	margin: 0 10px 0 0;
}
</style>
