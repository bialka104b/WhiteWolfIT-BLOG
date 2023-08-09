<script setup>
import { ref } from 'vue'

const navItems = ref([
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
  { text: 'Calculator' },
  { text: 'Sign in' }
])
</script>

<template>
  <v-app-bar scroll-behavior="hide" height="80" flat>
    <v-container class="d-flex align-center h-100 py-2">
      <img alt="logo" src="src/assets/logo-black-short.png" class="w-auto h-75 d-block" />

      <v-spacer />

      <v-app-bar-nav-icon class="d-md-none" />
      <nav class="d-none d-md-block">
        <v-btn
          v-for="(item, index) in navItems"
          :key="index"
          :to="item.link"
          variant="plain"
          flat
          class="text-body-1"
          :class="{ 'ml-2': index !== 0 }"
        >
          {{ item.text }}

          <template v-if="item.items" #append>
            <v-icon icon="mdi-chevron-down"></v-icon>
          </template>
          <v-menu v-if="item.items" activator="parent" location="bottom center" offset="8">
            <v-list elevation="0" bg-color="grey-lighten-4" min-width="150" class="py-0">
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
    </v-container>
  </v-app-bar>
</template>
