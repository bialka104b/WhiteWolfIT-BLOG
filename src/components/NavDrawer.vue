<script setup>
import { defineProps } from 'vue'
defineProps({
	nav: Array
});
</script>

<template>
	<v-navigation-drawer location="right" class="w-100" elevation="0" touchless>
		<v-container>
			<v-list class="py-0" tag="nav">
				<component
					v-for="(item, index) in nav"
					:key="index"
					:is="item.items ? 'v-list-group' : 'v-list-item'"
					:to="item.link"
					rounded
					:class="{ 'mt-1': index !== 0 }"
					:title="item.text"
					@click="item?.onClick"
				>
					<template v-if="item.items" v-slot:activator="{ props }">
						<v-list-item
							v-bind="props"
							:title="item.text"
							rounded
						/>
					</template>

					<template v-if="item.items">
						<v-list-item
							v-for="(subItem, subIndex) in item.items"
							:key="subIndex"
							:title="subItem.text"
							:to="subItem.link"
							density="compact"
						/>
					</template>
				</component>
			</v-list>
		</v-container>
	</v-navigation-drawer>
</template>
