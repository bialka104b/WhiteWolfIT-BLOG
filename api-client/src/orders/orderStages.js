import { createAuthorizedClient } from "../baseClient";

export default class {
	constructor(token) {
		this.client = createAuthorizedClient(token);
	}

	async fetchCountByStatus() {
		try {
			const response = await this.client.get(
				`/external/count_order_stages_by_status`
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
	async fetchStage(id) {
		try {
			const response = await this.client.get(
				`/external/order_stage/${id}`
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

	async fetchInTransport() {
		try {
			const response = await this.client.get(
				`/external/order_stages_in_transport`
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

	async fetchInProgress() {
		try {
			const response = await this.client.get(
				`/external/order_stages_in_progress`
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

	async fetchInApproval() {
		try {
			const response = await this.client.get(
				`/external/order_stages_to_accept`
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

	async fetchCancelled() {
		try {
			const response = await this.client.get(
				`/external/order_stages_canceled`
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

	async fetchPaid() {
		try {
			const response = await this.client.get(
				`/external/order_stages_shipped_settled`
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
	async fetchCompleted() {
		try {
			const response = await this.client.get(
				`/external/order_stages_shipped`
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
	async fetchAll(usersId) {
		try {
			const response = await this.client.post(
				`/external/all_user_order_stages`,
				{
					users_ids: usersId,
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
	async fetchArchived() {
		try {
			const response = await this.client.get(
				`/external/order_stages_archived`
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

	async fetchStageModificationHistory(id) {
		try {
			const response = await this.client.get(
				`/external/order_stage_changes/${id}`
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

	async fetchOrderProductChanges(id) {
		try {
			const response = await this.client.get(
				`/external/order_product_changes/${id}`
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

	async fetchUsersInStage(id) {
		try {
			const response = await this.client.get(
				`/external/get_users_in_stage/${id}`
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

	async collect(userId, lukod) {
		try {
			const response = await this.client.post(
				`/external/order_stage_receipt_confirmation`,
				{
					user_id: userId,
					lukod,
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

	async changeOrderReceivers(receivers, orderId) {
		try {
			const response = await this.client.post(
				`/external/change_order_receivers`,
				{
					receivers,
					order_id: orderId,
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
	async changeOrderStageReceivers(receivers, orderId) {
		try {
			const response = await this.client.post(
				`/external/change_order_receivers`,
				{
					receivers,
					order_stage_id: orderId,
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

	async addProductToStage(id, productVariantId, count) {
		try {
			const response = await this.client.post(
				`/external/add_product_to_order_stage`,
				{
					stage_id: id,
					product_variant_id: productVariantId,
					count,
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

	async deleteStageProduct(userId, orderProductId, id) {
		try {
			const response = await this.client.post(
				`/external/order_stage_delete_product`,
				{
					user_id: userId,
					order_product_id: orderProductId,
					order_stage_id: id,
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

	async changeStageItemCount(userId, orderProductId, count) {
		try {
			const response = await this.client.post(
				`/external/order_stage_delete_product`,
				{
					user_id: userId,
					order_product_id: orderProductId,
					count,
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

	async approveStage(userId, stageId, verify = 0) {
		try {
			const response = await this.client.post(
				`/external/accept_order_stage`,
				{
					user_id: userId,
					order_stage_id: stageId,
					to_verify: verify,
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
	async cancelStage(stageId) {
		try {
			const response = await this.client.post(
				`/external/cancel_order_stage`,
				{
					order_stage_id: stageId,
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

	async changeProductQuantity(userId, productId, count) {
		try {
			const response = await this.client.post(
				`/external/order_stage_change_product_count`,
				{
					user_id: userId,
					order_product_id: productId,
					count,
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

	async removeProduct(userId, productId, stageId) {
		try {
			const response = await this.client.post(
				`/external/order_stage_delete_product`,
				{
					user_id: userId,
					order_product_id: productId,
					order_stage_id: stageId,
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

	async modifyDeliveryDate(date, stageId) {
		try {
			const response = await this.client.post(
				`/external/order_stage_change_estimated_date`,
				{
					date,
					order_stage_id: stageId,
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
	async sendMessage(message, userId, orderId) {
		try {
			const response = await this.client.post(`/external/order_message`, {
				message,
				user_id: userId,
				order_id: orderId,
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
	async sendStageMessage(message, userId, orderId) {
		try {
			const response = await this.client.post(`/external/order_message`, {
				message,
				user_id: userId,
				order_stage_id: orderId,
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

	async changeCostCategoryInOrder(body) {
		try {
			const response = await this.client.post(
				`/external/change_cost_category_in_order`,
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
