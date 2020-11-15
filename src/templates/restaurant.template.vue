<template>
    <div class="view_restaurant">                          
        <div class="image_restaurant" :style="{ 'background-image': 'url(' + view.photo + ')' }"></div>
        <div class="view_restaurant_top">
            <h3>{{ view.name }}</h3>                 
                <div class="rate" v-if="m > 0">                    
                    <p v-for="(s,i) in f" :key="i" v-html="s"></p>                                                               
                </div>                
            <p>{{ view.adress }}</p>                                                                    
        </div>
        <div class="restaurant_info">
            <div class="info_option">
                <a :href="'tel:' + view.telephone ">
                    <i class="material-icons">phone</i>
                    <p>Appeler</p>
                </a>
            </div>
            <div class="info_option">
                <a :href="view.location" target="_blank">
                    <i class="material-icons">gps_fixed</i>
                    <p>Navigation</p>
                    {{ favories }}
                </a>          
            </div>           
            <div class="info_option" v-if="isAuth.currentUser">                                    
                    <a v-if="favories.length == 0 " href="#" @click="addFavorie">
                        <i class="material-icons">favorite_border</i>
                        <p>Favoris</p>                    
                    </a>                                    
                    <router-link v-else to="/favories">
                        <i class="material-icons" style="color: red;">favorite</i>
                        <p>Favoris</p>                    
                    </router-link>                                                                     
            </div>
            <div class="info_option" v-else @click="addFavorie">                                    
                    <a href="">
                        <i class="material-icons">favorite_border</i>
                        <p>Favoris</p>                    
                    </a>                                                                                                  
            </div>                   
        </div>   
        <div class="block_ancre">
            <Information :view="view" />
            <Menu />
            <Commentaire />
        </div>
    </div>
</template>

<script>
    import Information from '@/components/information'
    import Menu from '@/components/menu'
    import Commentaire from '@/components/commentaire'
    import {userService} from '@/service/user'
    import {mapGetters} from 'vuex'

    export default{
        props:['view', 'min'],  


        data(){
            return{
                favories: null,
                rate: this.view.rate,
                m: 1,
                f: [],
            }
        },

        components:{
            Information, Menu, Commentaire
        },

        computed:{
            ...mapGetters(['isAuth'])
        },

        async mounted(){
            
            while(this.m < this.rate){
                this.f.push(
                    '<i class="material-icons" style="color: yellow;" title="max = 5">grade</i>'
                    )                            
                    this.m = this.m +1                          
                }
                
                this.favories = await userService.getFavories(this.$route.params.name, this.isAuth.currentUser.email, this.$route.params.city)
        },

        methods:{
          async addFavorie(){
               try {
                   if(this.isAuth.currentUser){
                        await userService.addFavorie(this.isAuth.currentUser.email, this.$route.params.name, this.$route.params.city)
                    this.favories.push({
                        user: this.isAuth.currentUser.email,
                        name: this.$route.params.name,
                        city: this.$route.params.city
                    })

                    this.$store.state.message =  'Restaurant ajouter au favorie'

                    setTimeout(() => {
                        this.$store.state.message = ''
                    }, 3000)

                }else{
                    this.$router.push('/login')                    
                }
               } catch (error) {
                   console.log(error)
               }  
                                            
            },

        }
    }
</script>

<style scoped>

    .image_restaurant{
        height: 300px;
        width: 100%;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        box-shadow: 0 0 -10px black;
    }

    .view_restaurant{
        background-color: rgba(128, 128, 128, 0.192);
    }

    .view_restaurant_top{
        text-align: center;        
        padding: 30px;
        background-color: white;
    }

    .rate{
        display: flex;
        justify-content: center;
    }

    .restaurant_info, .link_ancre{
        display: table;
       table-layout: fixed;
        width: 100%;
    }

    .info_option{
        display: table-cell;
        text-align: center;  
        background-color: white;  
    }

    .info_option:hover a{
        color: white;
    }


    .info_option:hover{
        background-color: rgba(0, 128, 0, 0.486);
        color: white;
    }

    .ancre_option{
        display: table-cell;
        text-align: center;  
        background-color: white;  
    }

    .info_option > a{
        display: block;
        padding: 10px 0;
        font-size: 12px;
    }

    .ancre_option > a{
        display: block;
        padding: 10px 0;
    }

    .link_ancre{
        margin: 10px 0;
        margin-bottom: 0;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.123);
        border-bottom: 1px solid rgba(0, 0, 0, 0.123);
    }

    

</style>