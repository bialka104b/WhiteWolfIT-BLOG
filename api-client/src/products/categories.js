import { createAuthorizedClient } from "../baseClient";

export default class {
	constructor(token) {
		this.client = createAuthorizedClient(token);
	}

	async fetchCategories() {
		try {
			const response = await this.client.get(`/external/taxons`);
			return await Promise.resolve(response);
		} catch (error) {
			if (error.response.status == 403) {
				alert("Problem z uprawnieniami konta.");
				return navigateTo("/");
			}
			if (error.response.status == 401) {
				alert("You are not authorized");
				return navigateTo("/");
			}
			return await Promise.reject(error);
		}
	}

	async fetchCategory(id) {
		try {
			const response = await this.client.get(`/external/taxons/${id}`);
			return await Promise.resolve(response);
		} catch (error) {
			if (error.response.status == 403) {
				alert("Problem z uprawnieniami konta.");
				return navigateTo("/");
			}
			if (error.response.status == 401) {
				alert("You are not authorized");
				return navigateTo("/");
			}
			return await Promise.reject(error);
		}
	}
}
