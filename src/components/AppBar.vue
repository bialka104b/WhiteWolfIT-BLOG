<script setup>
import { ref, watch, computed, onMounted } from "vue";
import { useTheme } from "vuetify";
import { useUserStore } from "@/stores/user";
import NavItems from "@/components/NavItems.vue";
import NavDrawer from "@/components/NavDrawer.vue";
import LoginDialog from "@/components/LoginDialog.vue";
import { articles } from "@/services/blogService.js";

// Login dialog management
const loginDialog = ref(false);
const userStore = useUserStore();

const openLoginDialog = () => {
	loginDialog.value = true;
};

const obj = ref([]);

const showPublicArticles = async () => {
	try {
		const res = await articles();
		obj.value = res.data;
	} catch (error) {
		console.log(error);
	}
};

onMounted(() => {
	showPublicArticles();
});

// Navigation & main drawer
const drawer = ref(false);

const nav = computed(() => {
	return [
		{ text: "Home", link: "/" },
		{
			text: "Blog",
			link: "/blog",
			items: [
				{
					text: "Blog",
					link: "/blog"
				},
				...obj.value.map((article) => ({
					text: article.title,
					link: `/blog/${article._id}`
				}))
			]
		},
		{
			text: "Sign in",
			onClick: openLoginDialog,
			disabled: userStore.userLoggedIn
		},
		{
			text: "Logout",
			onClick: async () => await userStore.logout(),
			disabled: !userStore.userLoggedIn
		}
	].filter((el) => !el.disabled);
});

// Day/Night mode
const theme = useTheme();
const nightMode = ref(!!window.localStorage.getItem("darkTheme"));
watch(nightMode, (val) => {
	if (val) window.localStorage.setItem("darkTheme", true);
	else window.localStorage.removeItem("darkTheme", false);

	theme.global.name.value = val ? "dark" : "light";
});
</script>

<template>
	<v-app-bar scroll-behavior="hide" :height="80" flat>
		<v-container class="d-flex align-center h-100 py-2">
			<img
				alt="logo"
				src="../assets/logo-black-short.png"
				class="w-auto h-75 d-block"
			/>

			<v-spacer />

			<div class="d-flex align-center mr-5 mr-md-10">
				<v-icon size="xsmall" icon="mdi-white-balance-sunny" />
				<v-switch v-model="nightMode" hide-details class="mx-3" flat />
				<v-icon size="xsmall" icon="mdi-weather-night" />
			</div>

			<NavItems :nav="nav" class="d-none d-md-block" />

			<v-app-bar-nav-icon
				class="d-md-none"
				@click="drawer = !drawer"
				:icon="drawer ? 'mdi-close' : 'mdi-menu'"
			/>
		</v-container>
	</v-app-bar>

	<LoginDialog v-model="loginDialog" @onSuccess="loginDialog = false" />
	<NavDrawer :nav="nav" v-model="drawer" />
</template>
