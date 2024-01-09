<template>
	<button :style="`background-color: ${bgColor};`">
		{{ text }}
	</button>
</template>
<script>
import { defineComponent } from 'vue';
export default defineComponent({
	name: "ButtonItem",
	props: {
		bgColor: {default: "#C943FF", type: String},
		text: {default: "meow", type: String}
	}
})
</script>
