import { createAuthorizedClient } from "../baseClient";

export default class {
	constructor(token) {
		this.client = createAuthorizedClient(token);
	}

	async fetchUserCart(userId, list_products = []) {
		try {
			const response = await this.client.post(
				`/external/basket/${userId}`,
				{
					product_ids: list_products,
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

	async fetchPreviouslyBoughtProducts(users) {
		try {
			const response = await this.client.post(
				`/external/previously_bought_products`,
				{
					users_ids: users,
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

	async addProduct(productCountRequest) {
		try {
			// this.client.interceptors.response.use(
			// 	async (response) => {
			// 		if (response.status === 401) {
			// 			console.log("You are not authorized");
			// 			return navigateTo("/login");
			// 		} else {
			// 			const response = await this.client.post(
			// 				`/external/add_to_basket`,
			// 				productCountRequest
			// 			);
			// 			return await Promise.resolve(response);
			// 		}
			// 	},
			// 	(error) => {
			// 		if (error.response && error.response.data) {
			// 			return Promise.reject(error.response.data);
			// 		}
			// 		return Promise.reject(error.message);
			// 	}
			// );
			const response = await this.client.post(
				`/external/add_to_basket`,
				productCountRequest
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

	async clear(uerId) {
		try {
			const response = await this.client.post(`/external/empty_basket`, {
				user_id: uerId,
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

	async removeProduct(productRemoveRequest) {
		try {
			const response = await this.client.post(
				`/external/delete_from_basket`,
				productRemoveRequest
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
	async changeItemCount(productCountRequest) {
		try {
			const response = await this.client.post(
				`/external/change_count_in_basket`,
				productCountRequest
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

	// KATEGORIE KOSZTÓW
	async fetchCategoryProductsCart() {
		try {
			const response = await this.client.get(`/external/cost_category`);
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

	// zmień kategorie produktom w koszyku
	async changeCostCategoryInBasket(body) {
		try {
			const response = await this.client.post(
				`/external/change_cost_category_in_basket`,
				body
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

	// ZMIANA WARIANTU w koszyku
	async changeVariantProductInBasket(body, idItemInCart) {
		try {
			const response = await this.client.put(
				`/external/basket/item/change/${idItemInCart}`,
				body
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
