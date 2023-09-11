<script>
import { useRoute } from 'vue-router'
import { articlesId } from '@/services/blogService.js'
import { onMounted, ref } from 'vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Blog',
  props: {
    item: Object
  },
  setup() {
    // const clients = {
    //   articleId: articlesId()
    // }
    const route = useRoute() // Użyj useRoute() do uzyskania dostępu do $route

    // Odczytaj parametr 'someProp' z route.params
    const vlr = route.params.someProp
    const obj = ref([])

    // ... reszta kodu komponentu ...
    const showPublicArticles = async () => {
      try {
        const res = await articlesId(vlr)
        obj.value = res.data
      } catch (error) {
        console.log(error)
      }
    }
    onMounted(() => {
      showPublicArticles()
    })

    return {
      vlr,
      obj
    }
  }
}
</script>
<template>
  <div class="main__aboutMe">
    <h1 class="main__title">Blog</h1>
    <h2 class="main__small-title">{{ obj.title }}</h2>
    <p>{{ obj.description }}</p>
  </div>
</template>
