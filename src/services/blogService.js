import axios from "@/utils/axios";

export async function articles() {
	const response = await axios.get("/articles");
	return response;
}

export async function articlesId(id) {
	const response = await axios.get(`/articles/${id}`);
	return response;
}
