<template>
  <div class="main__aboutMe">
    <h1 class="main__title">Blog</h1>
    <h2 class="main__small-title">{{ blogTitle }}</h2>
    <p class="main__paraf">{{ blogDescription }}</p>
    <button class="main__btn" @click="goBack()">Powrót</button>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from '@/stores/blog.js'

export default {
  setup() {
    const store = useStore()

    const blogTitle = computed(() => store.blogTitle)
    const blogDescription = computed(() => store.blogDescription)

    return {
      blogTitle,
      blogDescription
    }
  },
  methods: {
    goBack() {
      this.$router.back()
    }
  }
}
</script>

<style>
.main__paraf {
  margin: 0px 0;
}
</style>
