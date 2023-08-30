<script>
import { ref, defineComponent } from 'vue'
import { NewsModule} from 'C:/Users/kidak/PraktykiFront/api-client/src/news/index.js'

export default defineComponent({
  name: 'Contact',
  setup() {
    const authToken = '12345'
    const clients = {
      article: new NewsModule.Article()
    }
    return {
      clients
    }
  },
  async created(){
    await this.articleOnclick()
  },
  methods: {
    articleOnclick() {
      this.clients.article
        .toggleFavourite()
        .then(() => {
          console.log('działa')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
})
</script>

<template>
  <h1>CONTACT</h1>

  <section class="section4">
    <div class="wrapper">
      <h2>
        <img src="../images/logo/Short white@iwhitewolf.png" alt="commpany logo" />
        <p>Address</p>
      </h2>
      <div class="content">
        <img src="../images/Icon/mail-1454733_640.png" alt="mail icon" /><a href="">Mail</a>
      </div>
      <div class="content">
        <p>Rzeszów, ul,Ulica 1/2 <br />00-000</p>
      </div>
      <div class="content">
        <img src="../images/Icon/icon-157358_640.png" alt="telephone icon" style="max-width: 3vh" />
        <p>+48 000 00 00</p>
      </div>
    </div>

    <div class="wrapper">
      <h2>
        <img src="../images/Icon/communication-1809935_640.png" alt="" class="bas" />Social Media
      </h2>

      <div class="content">
        <img src="../images/Icon/facebook.png" alt="facebook icon" /><a href="/">Facebook</a>
      </div>

      <div class="content">
        <img src="../images/Icon/tweeter.png" alt="tweeter icon" /> <a href="/">Tweeter</a>
      </div>

      <div class="content">
        <img src="../images/Icon/instagram.png" alt="instagram icon" /><a href="/">instagram</a>
      </div>

      <div class="content">
        <img src="../images/Icon/link.png" alt="Linkedin icon" /><a href="/">Linkedin</a>
      </div>
    </div>

    <div class="wrapper">
      <h2><img src="../images/Icon/book-2282152_640.png" alt="book icon" /> Blog</h2>

      <div class="content">
        <a href="">Article 1</a>
      </div>

      <div class="content">
        <a href="">Article 2</a>
      </div>
    </div>
  </section>
</template>
