<template>
    <div>    
        <h1>Mes favories</h1>  
        <table class="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>City</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>                
                <favorie-template @deleteaction="deleteThis" v-for="view in views" :view="view" :key="view.name"/>                   
            </tbody>
        </table>
    </div>
</template>

<script>
    import {userService} from '@/service/user'
    import {mapGetters} from 'vuex'
    import FavorieTemplate from '@/templates/favorie.template'
    import '@/css/table.css'
    export default{
        components:{
            FavorieTemplate
        },

        data(){
            return{
                views: []
            }
        },

        computed:{
            ...mapGetters(['isAuth'])
        },


        async mounted(){
            this.views = await userService.getFavoriesByUser(this.isAuth.currentUser.email)
        },

        methods:{
            deleteThis(views){ 
                userService.deleteFavorie(views)          
                const del = this.views.findIndex(item => item.id === views.id)
                this.views.splice(del, 1)            
            }  
        }

             

    }
</script>

<style scoped>
    h1{
    border-bottom: 1px solid black;
    text-align: center; 
    margin: 50px 0;
}

</style>