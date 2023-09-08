import { createClient, createAuthorizedClient } from "../baseClient.js";

export default class {
	constructor(token) {
		this.client = createAuthorizedClient(token);
	}

	async loginA(email, password) {
		try {
			const client = createClient();
			const response = await client.post("/external/session", {
				user: {
					email: email,
					password: password,
				},
			});
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

	async check(currentToken, currentLocation = {}) {
		try {
			const authorizedClient = createAuthorizedClient(currentToken);
			const response = await this.client.post(
				"/external/user_check",
				currentLocation
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

	async renewSession(renewToken) {
		try {
			const authorizedClient = createAuthorizedClient(renewToken);
			const response = await authorizedClient.post(
				"/external/session/renew"
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
