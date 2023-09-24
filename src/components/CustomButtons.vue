<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name:"Baton", 
    props:{
        text:{
            type:String
        },
    colors:{
        type:String
    },
    },
    setup(props){
        const click=ref("Kliknij mnie!")
        const colors=ref(props.colors)
        function abc(){
            console.log(colors)
        }
        return{
            click,
            colors,
            abc
        }
    }
})

</script>
<template>
    <button @click="abc()" :style="`background:${colors}`">
        {{ text }}
    </button>
    
</template>