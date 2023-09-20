import axios from "axios";

const BASE_URI = "https://api.iwhitewolf.it/v1/";

export const createClient = (options = {}) => {
	const baseOptions = {
		baseURL: BASE_URI,
		headers: {
			"Content-Type": "application/json"
		}
	};

	const clientOptions = { ...baseOptions, ...options };

	const axiosInstance = axios.create(clientOptions);
	return axiosInstance;
};

export const createAuthorizedClient = (token) => {
	const options = {
		headers: {
			Accept: "application/json",
			Authorization: token
		}
	};

	return createClient(options);
};
