<template>
    <div class="nav">
        <div class="nav_left">
            <div class="nav_title">               
                <h4 :style="{display: [ toogle_status ? 'none': 'block']}"><a href="/">Korean Resto</a></h4>      
            </div>
        </div>
        <div class="nav_right">
           <ul>
            <li>
                <router-link to="/login" v-if="!isAuth.currentUser">Connexion</router-link>
                <a href="http://localhost:8080/" v-else @click="logOut">Deconnexion</a>
             </li> 
               <li><router-link to="/favories" v-if="isAuth.currentUser">Mes favoris</router-link></li>               
               <li><router-link to="/admin" v-if="isAuth.currentUser && isAuth.currentUser.email == 'admin@admin.fr' ">Admin</router-link></li>                    
           </ul>
           <span id="toogle" @click="toogle" :style="{transform: [ toogle_status ? 'translateX(-250px)' : 'translateX(0px)']}"><i class="material-icons">fastfood</i></span>
        </div>
        <div class="nav_mobile" :style="{transform: [ toogle_status ? 'translateX(0px)' : 'translateX(300px)']}">            
            <ul>
                <li>
                    <router-link to="/login" v-if="!isAuth.currentUser">Connexion</router-link>
                    <a href="http://localhost:8080/" v-else @click="logOut">Deconnexion</a>
                 </li> 
                <li><router-link to="/favories" v-if="isAuth.currentUser">Mes favoris</router-link></li>               
                <li><router-link to="/admin" v-if="isAuth.currentUser && isAuth.currentUser.email == 'admin@admin.fr' ">Admin</router-link></li>                    
            </ul>                    
        </div>
    </div>
</template>

<script>
    import '../css/nav.css'
    
    import {mapGetters} from 'vuex'

    export default{    

        data(){
            return{
                toogle_status: false,                 
            }
        },

        computed:{
            ...mapGetters(['isAuth']),         
        },
            
       methods:{
           toogle(){
               this.toogle_status = !this.toogle_status
           },

          async logOut(){
               try {
                await this.isAuth.signOut()                              
                this.$router.replace('/')
               } catch (error) {
                   console.log(error)
               }
               
           }
       }
    }
</script>