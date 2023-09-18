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
</template>

<script>
import { ref, defineComponent, onMounted, onUnmounted } from 'vue'

export default defineComponent({
  name: 'Header',
  setup() {
    // ref tworzy zmienną reaktywną. Pomimo tego że zmienne są typu const to można je zmieniać
    const activeSlide = ref(0)
    const items = ref([
      {
        title: 'Tworzymy oprogramowanie',
        description:
          'Zajmujemy się tworzeniem aplikacji internetowych, wizytówek, strony internetowych, portale internetowe i inne.',
        image: '../assets/background1.jpg'
      },
      {
        title: 'Zapytaj o wycenę',
        description: 'Tworzymy projekty na życzenie klientów.',
        image: '../assets/background2.jpg'
      },
      {
        title: 'Napisz do nas!',
        description: 'A my zajmiemy się tworzeniem i wdrażaniem',
        image: '../assets/background3.jpg'
      }
    ])
    //syntax dla Vue3
    function przykladowaFunkcja() {
      // jakis kod
      // jak uzyskać dostęp do zmiennej activeSlide?
      // activeSlide.value = 'nowa wartość' // dodanie .value jest tutaj wymagane
    }
    // syntax dla vue3
    onMounted(() => {})
    onUnmounted(() => {})
    // https://vuejs.org/api/composition-api-lifecycle.html haki cyklu zycia komponentu. 2 podstawowe najbardziej przydatne wypisałam

    return {
      activeSlide,
      items,
      przykladowaFunkcja
    }
  },
  // syntax dla vue2, możecie z tego korzystać ale trzeba być świadomym że to nie jest Vue3
  async created() {
    // coś co chcesz wywołac na starcie
    await this.przykladowaFunkcja()
  },
  // syntax dla vue2
  mouted() {}, // hak cyklu życia komponentu, odpalany w momencie renderowania naszego <template></template>
  methods: {
    // tu tez mozna deklarować funkcje, ale jest to syntax dla Vue2
    przykladowaFunkcja2() {}
  }
})
</script>
