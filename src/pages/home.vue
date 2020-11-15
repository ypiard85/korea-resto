<template>
    <div class="home">
        <div class="top_home">
            <h2>Où voulez vous manger ?</h2>        
            <input placeholder="Rechercher ville..." type="text" v-model="search">
        </div>
        <div class="city_choise" v-if="search != '' ">
            <div  v-for="ville in searchcity" :key="ville.name">
                <home-template :ville="ville" />                
            </div>
        </div>
        <div class="city_choise" v-else>
            <div  v-for="ville in villes" :key="ville.name">
                <home-template :ville="ville" />                
            </div>
        </div>

        <div class="api_service">
            <div class="header_service">
                <div class="sep"></div>
                <h3>Informations</h3>
                <div class="sep"></div>
            </div>
            <div class="api">
                <div class="api_weather">                    
                    <Weather />                                                
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import HomeTemplate from '@/templates/home.template'
    import Weather from '@/components/weather'
    import '@/css/component.css'
 
    export default{

        components:{
            HomeTemplate, Weather
        },

        data(){
            return{
                villes: null,  
                search: '',               
            }
        },

       async mounted(){
            this.villes = await this.$store.state.villes
        },

        computed:{
            searchcity(){
               return this.villes.filter( r => {
                    return r.name.toLowerCase().includes(this.search.toLowerCase())
                })
               
            }
        }
    }
</script>

<style scoped>
    .home{
        padding: 30px;
        position: relative;
        z-index: 10;
    }

    .city_choise{
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }

    .api_service{
        margin: 50px 0;
    }

    .header_service{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .header_service > h3{
        width: 100%;
        text-align: center;          
    }

    .sep{
        width: 100%;      
        height: 1px;
        background-color: blue;
    }


    @media screen and (max-width: 605px){

        
        
        .card{         
            margin: 10px 10px;
            padding: 0px;
            width: 130px;
            height: 130px;
            max-width: 100%;
        }

    }

</style>