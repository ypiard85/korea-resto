<template>
    <div class="container">
        <div class="top_home">            
            <h1>{{ $route.params.city }}</h1>
            <input type="text" placeholder="Un restaurant ?" v-model="search"><br>
            <label for="">Livraison</label>
            <input type="radio" name="rate" value="Y" v-model="livraison"><br>
            <label for="">Pas de livraison</label>
            <input type="radio" name="rate" value="N" v-model="livraison"><br>
            <label for="">Pas de choix</label>
            <input type="radio" name="rate" value="" v-model="livraison">
            
        </div>
        <div v-if="search != '' || livraison != ''  ">
            <div v-for="resto in searchresto" :key="resto.name">
                <cityrestaurant-template :resto="resto" />            
            </div>
        </div>
        <div v-else>
            <div v-for="resto in restos" :key="resto.name">
                <cityrestaurant-template :resto="resto" />            
            </div>
        </div>
    </div>
</template>

<script>
import { RestoService } from '@/service/firebase'
import CityrestaurantTemplate from '@/templates/cityrestaurant.template'
import '@/css/component.css'
    export default{
        components:{
            CityrestaurantTemplate
        },

        data(){
            return{
                restos: null, 
                search: '',
                livraison: ''                                            
            }
        },

        async mounted(){
             this.restos = await RestoService.getRestoByVille(this.$route.params.city)

             if(this.search != ''){
                 this.livraison = ''
             }
        },

        computed:{
            searchresto(){
                return this.restos.filter(v => {
                    if(this.livraison != ''){
                        return v.livraison.includes(this.livraison)
                    }else if(this.livraison == '' && this.search != ''){
                        return v.name.toLowerCase().includes(this.search.toLowerCase())
                    }
                })
                
            }
        }
    }
</script>

<style scoped>

.container{
    padding: 20px;
}

</style>