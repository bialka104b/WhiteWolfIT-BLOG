<script setup>
import AdminDataTable from '@/components/admin/DataTable.vue';

const headers = [
    { title: 'id', key: 'id' }
];
const items = [];
</script>

<template>
    <AdminDataTable
        :headers="headers"
        :items="items"
    />
</template>