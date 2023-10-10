<script setup>
import { ref } from "vue";
import { RouterView } from "vue-router";
import "./sass/style.scss";

import { useCookies } from "vue3-cookies";
import { useTheme } from "vuetify";
import { useUserStore } from "@/stores/user.js";
import LoadingScreen from "@/components/LoadingScreen.vue";
import Footer from "@/components/Footer.vue";
import AppBar from "@/components/AppBar.vue";

const { cookies } = useCookies();
const userStore = useUserStore();
const hasToken = cookies.isKey("accessToken");

const loading = ref(!hasToken);
const refreshToken = async () => {
	await userStore.refresh();
	loading.value = false;
};

if (!hasToken) refreshToken();

// dark/light version
const isDark = window.localStorage.getItem("darkTheme");
const theme = useTheme();
theme.global.name.value = isDark ? "dark" : "light";
</script>

<template>
	<v-app>
		<AppBar />
		<LoadingScreen v-if="loading" />
		<RouterView v-else />
		<Footer />
	</v-app>
</template>
