<script setup>
import { inject } from 'vue'

const editor = inject('editor')
const props = defineProps(['name', 'icon'])
</script>

<template>
    <v-btn
        :active="props.name ? editor.isActive(props.name) : false"
        flat
        size="small"
        min-height="36"
    >
        <v-icon :icon="`mdi-${props.icon || 'circle-small'}`" />
    </v-btn>
</template>