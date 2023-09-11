<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user.js'

const userStore = useUserStore()

const prefix = '/admin'
const options = ref([
  {
    icon: 'account-group-outline',
    title: 'Users',
    value: 'users',
    count: 2,
    link: `${prefix}/users`
  },
  {
    icon: 'note-outline',
    title: 'Notes',
    value: 'notes',
    count: 5,
    link: `${prefix}/notes`
  },
  {
    icon: 'file-document-outline',
    title: 'Articles',
    value: 'articles',
    count: 45,
    link: `${prefix}/articles`
  },
  {
    icon: 'logout',
    title: 'Logout',
    value: 'logout',
    onClick: userStore.logout
  }
])
</script>

<template>
  <v-navigation-drawer permanent>
    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="mdi-keyboard-backspace"
        title="Back to website"
        to="/"
        value="home"
      ></v-list-item>

      <v-divider class="my-3"></v-divider>

      <v-list-item
        v-for="(item, index) in options"
        :key="index"
        :prepend-icon="`mdi-${item.icon}`"
        :to="item.link"
        :value="item.value"
        :title="item.title"
        @click="item.onClick"
        v-bind="
          item.count
            ? {
                lines: 'two',
                subtitle: `${item.count} items`
              }
            : {}
        "
      />
    </v-list>
  </v-navigation-drawer>

  <v-app-bar :height="80" flat> test </v-app-bar>

  <v-main>
    <RouterView />
  </v-main>
</template>
