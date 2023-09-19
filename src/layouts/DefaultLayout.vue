<script setup>
import { RouterView } from "vue-router";
import AppBar from "@/components/AppBar.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
	<AppBar />

	<v-main>
		<RouterView />
	</v-main>
	<Footer />
</template>
