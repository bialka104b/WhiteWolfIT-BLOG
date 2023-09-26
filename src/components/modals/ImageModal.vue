<template>
	<div id="ImageModal" class="background-gallery" v-if="showModalImage">
		<button @click="closeModal()">
			<img :src="src" :id="id" />
		</button>
	</div>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
	name: "ImageModal",
	emits: ["closeModal"],
	props: {
		src: {
			type: String,
			require: true
		},
		showModalImage: {
			type: Boolean
		},
		id: {
			type: String
		}
	},
	setup(props, { emit }) {
		function closeModal() {
			emit("closeModal");
		}
		return {
			closeModal
		};
	}
});
</script>
<style scoped lang="scss">
#ImageModal {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	padding: 10%;
	background-color: rgba(0, 0, 0, 0.7);
	z-index: 100;
	img {
		position: relative;
		display: block;
		width: 100%;
		max-height: 100%;
	}
}
</style>
