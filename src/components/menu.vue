<template>
    <div class="menu">
        <h3>Menus</h3>        
        <menu-template v-for="(menu, i) in menus" :menu="menu" :key="i" />
    </div>
</template>

<script>
    import { RestoService } from '@/service/firebase'
    import MenuTemplate from '@/templates/menu.template'

    export default{

        components:{
            MenuTemplate
        },

        data(){
            return{
                menus: null
            }
        },
        
        async mounted(){
            this.menus = await RestoService.getMenu(this.$route.params.name)    
           
        }

    }
</script>

<style scoped>
   .menu{
        margin: 10px 0;
        background-color: white;   
        width: 100%;     
    }
</style>