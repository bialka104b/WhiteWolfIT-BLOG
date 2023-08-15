<script setup>
import { ref, watch } from 'vue'
import { useTheme } from 'vuetify';
import NavItems from '@/components/NavItems.vue'
import NavDrawer from '@/components/NavDrawer.vue'

const drawer = ref(false)
const nav = ref([
  { text: 'Home', link: '/' },
  {
    text: 'Blog',
    items: [
      {
        text: 'Article 1',
        link: '/blog/1'
      },
      {
        text: 'Article 2',
        link: '/blog/2'
      }
    ]
  },
  { text: 'Calculator', link: '/calculator' },
  { text: 'Sign in' }
])

// Day/Night mode
const theme = useTheme();
const nightMode = ref(false)
watch(nightMode, (val) => {
  theme.global.name.value = val ? 'dark' : 'light';
}, { immediate: true})
</script>

<template>
  <v-app-bar scroll-behavior="hide" :height="80" flat>
    <v-container class="d-flex align-center h-100 py-2">
      <img alt="logo" src="src/assets/logo-black-short.png" class="w-auto h-75 d-block" />

      <v-spacer />

      <div class="d-flex align-center mr-5 mr-md-10">

        <v-icon size="xsmall" icon="mdi-white-balance-sunny" />
        <v-switch
          v-model="nightMode"
          hide-details
          class="mx-3"
          flat
        />
        <v-icon size="xsmall" icon="mdi-weather-night" />
      </div>

      <NavItems :nav="nav" class="d-none d-md-block" />

      <v-app-bar-nav-icon
        class="d-md-none"
        @click="drawer = !drawer"
        :icon="drawer ? 'mdi-close' : 'mdi-menu'"
      />
    </v-container>
  </v-app-bar>

  <NavDrawer :nav="nav" v-model="drawer" />
</template>