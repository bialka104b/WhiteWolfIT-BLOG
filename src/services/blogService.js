import axios from "@/utils/axios";

export async function articles() {
	const response = await axios.get("/articles");
	return response;
}

export async function articlesId(id, admin = false) {
	const response = await axios.get(`/articles${!admin || "/admin"}/${id}`);
	return response;
}
