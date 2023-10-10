import { defineStore } from "pinia";
import { articlesId } from "@/services/blogService.js";

export const useStore = defineStore("store", {
	state: () => ({
		blogData: {
			title: "",
			description: "",
			thumbnail: "",
			images: "",
			createdAt: "",
			author: ""
		}
	}),
	actions: {
		async fetchDataBlog(id) {
			try {
				const res = await articlesId(id);
				const newData = res.data;
				this.blogData = newData;
			} catch (error) {
				console.error(error);
			}
		}
	},
	getters: {
		blogTitle() {
			return this.blogData.title;
		},
		blogDescription() {
			return this.blogData.description;
		},
		blogThumbnail() {
			if (this.blogData.thumbnail && this.blogData.thumbnail[0]) {
				return this.blogData.thumbnail[0].url || "";
			} else {
				return "";
			}
		},
		blogImg() {
			if (this.blogData.images.length > 0) {
				return this.blogData.images;
			} else {
				return " ";
			}
		},
		blogDate() {
			return this.blogData.createdAt;
		},
		blogAuthor() {
			return this.blogData.author;
		}
	}
});
