import axios from "axios";
import { useCookies } from "vue3-cookies";
import { useUserStore } from "@/stores/user.js";

const instance = axios.create({
	baseURL: "https://api.iwhitewolf.it/v1"
});

instance.interceptors.response.use(
	(response) => {
		return response;
	},
	async ({ response }) => {
		if (
			response?.status === 401 ||
			(response?.status === 403 &&
				response?.requst?.responseURL.includes("/refresh"))
		) {
			const { userLoggedIn, refresh } = useUserStore();
			if (userLoggedIn) await refresh(true);
		}
	}
);

instance.interceptors.request.use((config) => {
	const { cookies } = useCookies();
	const token = cookies.get("accessToken");

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});

export default instance;
