<script setup>
import { ref, useAttrs, defineProps, defineEmits } from "vue";
import { saveThumbnail as saveThumbnailReq } from "@/services/articleService.js";
import { toast } from "vue3-toastify";

const props = defineProps(["id"]);
const emits = defineEmits(["afterSave"]);
const attrs = useAttrs();
const model = ref(false);

const formValid = ref(false);
const thumbnail = ref(null);
const thumbnailRules = [
	(v) => !!v || "Thumbnail i required",
	(v) =>
		(v && v.length && v[0].size < 2000000) ||
		"Thumbnail size should be less than 2 MB"
];

const loading = ref(false);
const saveThumbnail = async () => {
	if (!formValid) return;

	loading.value = true;
	try {
		const formData = new FormData();
		if (thumbnail.value?.[0])
			formData.append("thumbnail", thumbnail.value[0]);

		const { data } = await saveThumbnailReq(formData, props.id);
		toast.success(data.message || "Thumbnail saved!");
		model.value = false;
		emits("afterSave");
	} catch (err) {
		toast.error("An error occured! [ThumbnailButton]");
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
			<v-btn
				color="primary"
				variant="tonal"
				v-bind="{ ...attrs, ...props }"
			>
				<slot>
					<v-icon icon="mdi-image" />
				</slot>
			</v-btn>
		</template>

		<v-card class="pa-4" min-width="400">
			<v-icon
				icon="mdi-image"
				class="mx-auto mb-3"
				color="primary"
				size="36"
			/>

			<v-form v-model="formValid" @submit.prevent="saveThumbnail">
				<v-file-input
					v-model="thumbnail"
					:rules="thumbnailRules"
					accept="image/png, image/jpeg"
					label="Thumbnail"
					variant="solo"
					density="compact"
					clearable
					show-size
					class="mt-2"
				/>

				<v-divider class="mt-1 mb-3"></v-divider>

				<v-card-actions class="d-flex justify-center">
					<v-btn
						size="small"
						@click="model = false"
						:disabled="loading"
					>
						Cancel
					</v-btn>

					<v-btn
						variant="tonal"
						size="small"
						class="ml-3"
						type="submit"
						:loading="loading"
						:disabled="loading"
					>
						Save
					</v-btn>
				</v-card-actions>
			</v-form>
		</v-card>
	</v-dialog>
</template>
