

<template>
  <nav>Nawigacja</nav>
  

 
  <Header />
  <Main />
  <Contact />
  <Baton :text="'Kliknij mnie!'" />
  <Baton :text="'jbdfaho hnio'" colors="red" />
</template>




<script>
import Header from "@/components/Header.vue";
import Main from "@/components/Main.vue";
import Contact from "@/components/Contact.vue";
    import Baton from '@/components/CustomButtons.vue'
    import { ref, defineComponent } from 'vue'
  export default defineComponent({
    components:{
      Baton
    },
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
