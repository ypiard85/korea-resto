<template>
    <div>
        <p class="infoLogin" v-if="isAuth.currentUser">Bonjour: {{ CutAuthName[0] }}</p>            
        <p  v-else></p>            
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default{


        data(){
            return{
                
            }
        },

        computed:{
            ...mapGetters(['isAuth', 'CutAuthName'])
        },

    }

</script>

<style scoped>
    .infoLogin{
        background-color: rgba(0, 128, 0, 0.199);
        padding: 5px;
    }
</style>