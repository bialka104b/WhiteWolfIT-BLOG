import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/user.js";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import HomeView from "@/views/HomeView.vue";
import Blog from "@/layouts/Blog.vue";
import BlogId from "@/components/BlogId.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "layout-default",
			component: DefaultLayout,
			children: [
				{
					path: "",
					name: "home",
					component: HomeView
				},
				{
					path: "blog",
					name: "Blog",
					component: Blog
				}
			]
		},
		{
			path: "/blog/:blogId",
			name: "BlogId",
			component: BlogId
		},
		{
			path: "/calculator",
			component: HomeView
		},
		{
			path: "/admin",
			name: "layout-admin",
			component: () => import("@/layouts/AdminLayout.vue"),
			children: [
				{
					path: "",
					name: "admin",
					component: () => import("@/views/admin/index.vue")
				},
				{
					path: "users",
					name: "admin-users",
					component: () => import("@/views/admin/users.vue")
				},
				{
					path: "notes",
					name: "admin-notes",
					component: () => import("@/views/admin/notes.vue")
				},
				{
					path: "articles",
					children: [
						{
							path: "",
							name: "admin-articles",
							component: () =>
								import("@/views/admin/article/articleList.vue"),
							meta: {
								title: "All articles",
								linkOfNewObject: "admin-articles-new"
							}
						},
						{
							path: "new",
							name: "admin-articles-new",
							component: () =>
								import("@/views/admin/article/articleForm.vue"),
							meta: {
								title: "Create new article"
							}
						},
						{
							path: ":id",
							name: "admin-articles-edit",
							component: () =>
								import("@/views/admin/article/articleForm.vue"),
							meta: {
								title: "Edit article"
							}
						}
					]
				}
			]
		}
	]
});

router.beforeResolve((to) => {
	const { userLoggedIn } = useUserStore();

	if (!userLoggedIn && to?.matched[0].name === "layout-admin") {
		return { name: "home" };
	}
});

export default router;
