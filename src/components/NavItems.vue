<script setup>
defineProps({
	nav: Array
});
</script>

<template>
	<nav>
		<v-btn
			v-for="(item, index) in nav"
			:key="index"
			:to="item.link"
			variant="plain"
			flat
			class="text-body-1"
			:class="{ 'ml-2': index !== 0 }"
			@click="item?.onClick"
		>
			{{ item.text }}

			<template v-if="item.items" #append>
				<v-icon icon="mdi-chevron-down"></v-icon>
			</template>
			<v-menu
				v-if="item.items"
				activator="parent"
				location="bottom center"
				offset="8"
			>
				<v-list
					elevation="0"
					bg-color="grey-lighten-4"
					min-width="150"
					class="py-0"
				>
					<v-list-item
						v-for="(subItem, subIndex) in item.items"
						:key="subIndex"
						:to="subItem.link"
						density="compact"
						class="text-body-2"
					>
						{{ subItem.text }}
					</v-list-item>
				</v-list>
			</v-menu>
		</v-btn>
	</nav>
</template>
