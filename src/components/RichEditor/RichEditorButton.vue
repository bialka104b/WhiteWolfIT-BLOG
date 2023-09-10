<script setup>
import { inject } from 'vue'

const editor = inject('editor')
const props = defineProps(['name', 'icon', 'tooltip'])
</script>

<template>
    <v-btn
        :active="props.name ? editor.isActive(props.name) : false"
        flat
        variant="tonal"
        size="small"
        min-height="36"
    >
        <v-icon :icon="`mdi-${props.icon || 'circle-small'}`" />

        <v-tooltip
            v-if="tooltip"
            activator="parent"
            location="top"
        >{{ props.tooltip }}</v-tooltip>

        <slot />
    </v-btn>
</template>