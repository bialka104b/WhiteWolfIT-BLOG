<script setup>
import { ref, useAttrs, defineEmits, defineProps } from "vue";
import { removeArticle } from "@/services/articleService.js";
import { toast } from "vue3-toastify";

const props = defineProps(["id"]);
const emits = defineEmits(["afterDelete"]);
const attrs = useAttrs();
const model = ref(false);

const loading = ref(false);
const confirmDeletion = async () => {
	loading.value = true;
	try {
		const { data } = await removeArticle(props.id);
		toast.success(data.message || "Article deleted successfully");
		model.value = false;
		emits("afterDelete");
	} catch (err) {
		toast.error("An error occured! [DeleteButton]");
	} finally {
		loading.value = false;
	}
};
</script>

<template>
	<v-dialog
		transition="dialog-bottom-transition"
		width="auto"
		v-model="model"
	>
		<template v-slot:activator="{ props }">
			<v-btn color="red" variant="tonal" v-bind="{ ...attrs, ...props }">
				<slot>
					<v-icon icon="mdi-delete" />
				</slot>
			</v-btn>
		</template>

		<v-card class="pa-4 text-center" min-width="300">
			<v-icon
				icon="mdi-information-outline"
				class="mx-auto mb-3"
				color="red"
				size="36"
			/>

			<span class="text-h6"> Are you sure? </span>
			<span class="text-caption text-medium-emphasis">
				This action is irreversible
			</span>

			<v-divider class="mt-4 mb-3"></v-divider>

			<v-card-actions class="mx-auto">
				<v-btn size="small" @click="model = false" :disabled="loading">
					Cancel
				</v-btn>

				<v-btn
					variant="tonal"
					size="small"
					class="ml-3"
					@click="confirmDeletion"
					:loading="loading"
					:disabled="loading"
				>
					Discard
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>
