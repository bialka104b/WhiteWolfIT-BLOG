<template>
  <v-carousel height="75vh" v-model="activeSlide" hide-delimiters :show-arrows="false">
    <v-carousel-item v-for="(item, index) in items" :key="index">
      <v-row
        justify="center"
        class="fill-height header__custom__carousel"
        :style="{ backgroundImage: `url('${item.image}')` }"
      >
        <v-col cols="10" md="5" align="center">
          <h1 class="header__title">{{ item.title }}</h1>
          <p class="header__paraf">{{ item.description }}</p>
          <button class="header__btn">Zapytaj o wycenę</button>
          <div class="header__arrows"></div>
        </v-col>
      </v-row>
    </v-carousel-item>
  </v-carousel>
  <v-carousel-indicators v-model="activeSlide" :length="items.length"></v-carousel-indicators>
</template>

<script>
export default {
  data() {
    return {
      activeSlide: 0,
      items: [
        {
          title: 'Tworzymy oprogramowanie',
          description:
            'Zajmujemy się tworzeniem aplikacji internetowych, wizytówek, strony internetowych, portale internetowe i inne.',
          image: 'src/assets/background1.jpg'
        },
        {
          title: 'Zapytaj o wycenę',
          description: 'Tworzymy projekty na życzenie klientów.',
          image: 'src/assets/background2.jpg'
        },
        {
          title: 'Napisz do nas!',
          description: 'A my zajmiemy się tworzeniem i wdrażaniem',
          image: 'src/assets/background3.jpg'
        }
      ]
    }
  }
}
</script>
