<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable';

const props = defineProps({
    headers: Array,
    items: Array,
})
</script>

<template>
    <v-data-table
        :headers="headers"
        :items="items"
    >
        <slot />
    </v-data-table>
</template>