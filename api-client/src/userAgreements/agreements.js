import { createAuthorizedClient } from "../baseClient";

export default class {
	constructor(token) {
		this.client = createAuthorizedClient(token);
	}

	async fetch(userId) {
		try {
			const response = await this.client.get(
				`/external/user_agreements/${userId}`
			);
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

	async create(userId, name, value) {
		try {
			const response = await this.client.post(
				`/external/create_agreement`,
				{
					user_id: userId,
					agreement: {
						name,
						value,
					},
				}
			);
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

	async update(id, value) {
		try {
			const response = await this.client.post(
				`/external/update_agreement`,
				{
					id,
					value,
				}
			);
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
