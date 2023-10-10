import axios from "@/utils/axios";

export async function articles() {
	const response = await axios.get("/articles");
	return response;
}

export async function articlesId(id) {
	if (id === undefined) {
		return;
	} else {
		const response = await axios.get(`/articles/${id}`);
		return response;
	}
}
