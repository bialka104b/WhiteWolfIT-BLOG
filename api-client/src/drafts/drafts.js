import { createAuthorizedClient } from "../baseClient";

export default class {
	constructor(token) {
		this.client = createAuthorizedClient(token);
	}

	async newConversationDraft(formData) {
		try {
			const response = await this.client.post(
				`/external/new_draft_conversation_messege`,
				formData,
				{
					"Content-Type": "multipart/form-data",
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
	async newMessageDraft(formData) {
		try {
			const response = await this.client.post(
				`/external/new_draft_messege`,
				formData,
				{
					"Content-Type": "multipart/form-data",
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
	async newDraft(formData) {
		try {
			const response = await this.client.post(
				`/external/new_draft`,
				formData,
				{
					"Content-Type": "multipart/form-data",
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
	async updateDraft(formData) {
		try {
			const response = await this.client.post(
				`/external/update_draft`,
				formData,
				{
					"Content-Type": "multipart/form-data",
				}
			);
			return await Promise.resolve(response);
		} catch (error) {
			return await Promise.reject(error);
		}
	}

	async fetchDrafts(draftType) {
		try {
			const response = await this.client.get(
				`/external/drafts/${draftType}`
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

	async fetchDraft(id) {
		try {
			const response = await this.client.get(`/external/draft/${id}`);
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

	async deleteDraft(id) {
		try {
			const response = await this.client.delete(
				`/external/delete_draft/${id}`
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

	async fetchDraftMessage(id) {
		try {
			const response = await this.client.get(
				`/external/get_draft_messege/${id}`
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

	async fetchDraftEmail(id) {
		try {
			const response = await this.client.get(
				`/external/get_conversation_draft_messege/${id}`
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
