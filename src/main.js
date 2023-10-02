import "vuetify/styles";
import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

// plugins
import Vue3Toastify from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import vuetify from "./plugins/vuetify";

import Footer from "./components/Footer.vue";
import BlogId from "./components/BlogId.vue";
const app = createApp(App);

app.use(vuetify);
app.use(Vue3Toastify, {
	autoClose: 3000
});
app.component("Footer", Footer);
app.component("BlogId", BlogId);

app.use(createPinia());
app.use(router);

app.mount("#app");
