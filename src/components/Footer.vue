<script>
import { ref, defineComponent } from 'vue'
// import { NewsModule } from '~/api-client/src/index.js'
import { articles } from '@/services/blogService.js'

export default defineComponent({
  name: 'Footer',
  setup() {
    const clients = {
      article: articles()
    }
    return {
      clients
    }
  },
  async created() {
    await this.articleOnclick()
    // const res = await fetch('http://localhost:5000/api/articles')
    // const json = await res.json()
    // console.log(json)
  },
  methods: {
    articleOnclick() {
      this.clients.article
        .then((res) => {
          console.log('działa')
          console.log(res.data)
          // tu możesz zrobic cos z tymi danymi
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
})
</script>

<template>
  <footer>
    <div class="footer-top">
      <div class="footer-top__contact">
        <h1>Dane Kontaktowe</h1>
        <h2>Biuro</h2>
        <p>Rzeszów, ul. Krzyżanowskiego 22/250</p>
        <p>Poniedziałek-Piątek 10:00 - 18:00,</p>
        <h2>Obsługa klienta</h2>
        <p>kontakt@biuro.pl</p>
        <p>Telefon +48 978 543 123</p>
      </div>
      <div class="footer-top__news">
        <h1>Aktualności</h1>
        <p>W trakcie budowy...</p>
      </div>
      <div class="footer-top__socials">
        <div class="footer-top__social"></div>
        <div class="footer-top__social"></div>
        <div class="footer-top__social"></div>
        <div class="footer-top__social"></div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-bottom__logo">
        <img src="src/assets/logo-color.png" alt="" />
      </div>
      <div class="footer-bottom__info">
        <p>&copy; 2023 IWhiteWolf.IT - Wszelkie prawa zastrzeżone.</p>
      </div>
    </div>
  </footer>
</template>
