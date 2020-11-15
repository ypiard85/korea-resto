<template>
        <div class="card" :style="{backgroundImage: 'url(' + ville.image + ')'}">
            <router-link :to="'/ville/' + ville.name">{{ ville.name }}</router-link>
        </div>
</template>

<script>
    
    export default{
        props:{
            ville:{
                type: Object,                
            }
        },
    }

</script>

<style scoped>
     .card{
         max-height: 200px ;         
         width: 200px;        
         position: relative;
         z-index: 10;
         background-size: cover;
         background-position: center center;
         border-radius: 10px;
         margin: 10px 20px;
         box-shadow: 0 0 10px rgba(0, 0, 0, 0.233);
     }

     .card > a{
        display: inline-block;
        height: 100%;
        width: 100%;
        text-align: center;
        padding: 50% 0;
        color: white;
        font-size: 28px;
        font-weight: bold;
        text-shadow:  0 0 10px black;
     }
     

</style>