<template>
  <div class="main__aboutMe blogId">
    <div class="blogId__container">
      <img :src="`http://localhost:5000/${blogThumbnail}`" :alt="blogTitle" />
      <h2 class="main__small-title">{{ blogTitle }}</h2>
    </div>
    <p class="main__paraf">{{ blogDescription }}</p>
    <ul>
      <li v-for="item in blogImg" :key="item._id" @click="showGallery($event)">
        <img class="blogId__imgs" :src="`http://localhost:5000/${item.url}`" alt="" />
      </li>
    </ul>
    <p class="blogId__info">{{ `${blogAuthor.firstName} ${blogAuthor.lastName}` }}</p>
    <p class="blogId__info">{{ time }}</p>
    <button class="main__btn blogId__btn" @click="goBack()">Powrót</button>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from '@/stores/blog.js'

export default {
  setup() {
    const store = useStore()

    const blogTitle = computed(() => store.blogTitle)
    const blogDescription = computed(() => store.blogDescription)
    const blogThumbnail = computed(() => store.blogThumbnail)
    const blogImg = computed(() => store.blogImg)
    const blogAuthor = computed(() => store.blogAuthor)

    const time = computed(() => {
      const blogDate = new Date(store.blogDate)

      const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }

      return blogDate.toLocaleDateString('pl-PL', options)
    })

    const showGallery = (img) => {
      const element = img.srcElement
      element.style.position = 'fixed'
      element.style.top = '50%'
      element.style.left = '50%'
      element.style.transform = 'translate(-50%, -50%)'

      const existingBackground = document.querySelector('.background-gallery')
      if (existingBackground) {
        document.body.removeChild(existingBackground)
      }
      const backgroundGallery = document.createElement('div')
      backgroundGallery.className = 'background-gallery'

      backgroundGallery.style.position = 'fixed'
      backgroundGallery.style.top = '0'
      backgroundGallery.style.left = '0'
      backgroundGallery.style.width = '100%'
      backgroundGallery.style.height = '100%'
      backgroundGallery.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'

      document.body.appendChild(backgroundGallery)

      element.style.zIndex = '1'

      backgroundGallery.addEventListener('click', () => {
        document.body.removeChild(backgroundGallery)
        element.style.position = 'static'
        element.style.top = ''
        element.style.left = ''
        element.style.transform = ''
        backgroundGallery.style.backgroundColor = ''
      })
    }

    // Inicjalizacja danych przy użyciu async created()
    onMounted(async () => {
      try {
        await store.fetchBlogData() // Załóżmy, że masz taką funkcję w store

        // Przy użyciu Pinia, możesz inicjalizować dane bezpośrednio z Pinia w async created()
        // Tu możesz wywołać store.fetchBlogData(), aby pobrać dane z serwera i zaktualizować stan Pinia.
      } catch (error) {
        console.error('Wystąpił błąd podczas pobierania danych:', error)
      }
    })

    return {
      blogTitle,
      blogDescription,
      blogThumbnail,
      blogImg,
      blogAuthor,
      time,
      showGallery
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
.blogId {
  margin: 50px 20px;
}
.blogId h2 {
  margin: 0 0 100px 0;
}

.blogId__container {
  display: flex;

  margin: 20px 0 20px 0;
}

.blogId__container img {
  height: 100px;
}

.blogId__container h2 {
  margin: auto 20px;
}

.blogId__btn {
  margin: 20px 0 50px 0;
}

.blogId ul {
  cursor: pointer;
  margin: 20px 0;
  text-align: center;
  list-style: none;
}

.blogId__imgs {
  width: 75vw;
}

.blogId__info {
  font-size: 0.8rem;
  font-weight: bold;
}
</style>
