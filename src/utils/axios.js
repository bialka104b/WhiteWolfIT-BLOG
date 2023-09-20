import axios from "axios";
import { useCookies } from "vue3-cookies";

const instance = axios.create({
	baseURL: "https://api.iwhitewolf.it/v1"
});

instance.interceptors.request.use((config) => {
	const { cookies } = useCookies();
	const token = cookies.get("accessToken");

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});

export default instance;
