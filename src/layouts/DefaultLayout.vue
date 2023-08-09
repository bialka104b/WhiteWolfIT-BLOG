<script setup>
import { RouterView } from 'vue-router'
import AppBar from '@/components/AppBar.vue'
import HeroSection from '@/components/HeroSection.vue'
</script>

<template>
  <AppBar />
  <HeroSection />

  <v-main>
    <RouterView />
  </v-main>
</template>
