<template>
  <nav>Nawigacja</nav>
  <header>Nagłówek</header>

  <main>
    <section class="section1">
      <div class="animation">
        <img src="../images/logo/Short white@iwhitewolf.png" alt="" />
        <p>
          <span>iWhiteWolf</span> <br />Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Inventore, amet?
        </p>
      </div>
    </section>

    <section class="section2">
      <v-carousel hide-delimiters :show-arrows="false" :cycle="true">
        <v-carousel-item cover><img src="../images/logo/Long@iwhitewolf.png" alt=""></v-carousel-item>

        <v-carousel-item cover><img src="../images/logo/Long black@iwhitewolf.png" alt=""></v-carousel-item>
      </v-carousel>
    </section>

    <h1>What we do!!!</h1>

    <section class="section3">
      <div class="tiles">
        <div class="square">
          <img src="../images/SmallPic/a-notice-2410276_640.png" alt="Podróże" class="bas" />
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
        </div>
        <div class="square">
          <img src="../images/SmallPic/a-heart-2438744_640.png" alt="Serce" />
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
        </div>
        <div class="square">
          <img src="../images/SmallPic/chip-1710300_640.png" alt="Procesor" />
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
        </div>
        <div class="square">
          <img src="../images/SmallPic/false-2061131_640.png" alt="X" />
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
        </div>
        <div class="square">
          <img src="../images/SmallPic/flat-2126880_640.png" alt="Komputer" />
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
        </div>
        <div class="square">
          <img src="../images/SmallPic/responsive-2440940_640.png" alt="Urządzenia" class="bas" />
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
        </div>
      </div>
    </section>

    <h1>CONTACT</h1>

    <section class="section4">
      <div class="wrapper">
        <h2><img src="../images/logo/Short white@iwhitewolf.png" alt="commpany logo" /><p>Address</p></h2>
        <div class="content">
          <img src="../images/Icon/mail-1454733_640.png" alt="mail icon" /><a href="">Mail</a>
        </div>
        <div class="content">
          <p>Rzeszów, ul,Ulica 1/2 <br />00-000</p>
        </div>
        <div class="content">
          <img
            src="../images/Icon/icon-157358_640.png"
            alt="telephone icon"
            style="max-width: 3vh"
          />
          <p>+48 000 00 00</p>
        </div>
      </div>

      <div class="wrapper">
        <h2>
          <img src="../images/Icon/communication-1809935_640.png" alt="" class="bas" />Social Media
        </h2>

        <div class="lings content">
          <a @mouseout="removeshowfacebook()" @mouseover="changeshowfacebook()">
            <img class="yes" src="../images/Icon/facebook.svg" alt="facebook icon" />
            <span v-if="showfacebook">
              Facebook
            </span>
          </a>
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

    <footer>
      <p>data utworzenia firmy</p>
      <div>
        <img src="../images/Icon/copy.png" alt="" />
        <p>iWhiteWolf.IT</p>
      </div>
      <a href="/">Privacy Policy</a>
    </footer>
  </main>
</template>

<script>
    import { ref, defineComponent } from 'vue'
  export default defineComponent({
    setup(){
      const showfacebook=ref(false)
      function changeshowfacebook(){
        showfacebook.value=true
      }

      function removeshowfacebook(){
        showfacebook.value=false
      }
      return{
        showfacebook,
        changeshowfacebook,
        removeshowfacebook
      }
    }
  })
</script>
