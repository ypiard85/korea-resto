<template>
    <div class="commentaire">
        <h3>Commentaires</h3>
        <button @click="comment">Ajouter un commentaire</button>     
        <div v-if="coms == []">
            <commentaire-template v-for="(com,i) in coms" :key="i" :com="com"/> 
        </div>
        <div class="block" v-else>
            <p> [ Pas encore de commentaires ]</p>
        </div>        
        <modal-commentaire v-if="modal" @modalclose="close" @closeModal="closed" />
       
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {userService} from '@/service/user'
    import CommentaireTemplate from '@/templates/commentaire.template'
    import ModalCommentaire from '@/components/modalcommentaire'
    
    export default{

        components:{
            CommentaireTemplate, ModalCommentaire 
        },

        data(){
            return{                
                coms: null,
                modal: false,                
            }
        },

        computed:{
            ...mapGetters([ 'isAuth']),        
        },

        async mounted(){
            this.coms = await userService.getComs(this.$route.params.name, this.$route.params.city)
        },

        methods:{
            dateBuilder(){
                let d = new Date()
                let mounths = ["janvier", "fevrier", "mars", "avril", "mai", "juin", "juillet", "aout", "septembre", "octobre", "novembre", "decembre"]
                let days =["dimanche","lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"]
                let day = days[d.getDay()]
                let date = d.getDate();
                let mounth = mounths[d.getMonth()]
                let year = d.getFullYear()
                let minute = d.getMinutes()
                let hour = d.getHours()
                return `${day} ${date} ${mounth} ${year} à ${hour}:${minute}`
            },
            
            comment(){                
                if(!this.isAuth.currentUser){
                    this.$router.push('/login')
                }else{
                    this.modal = true
                    
                }
            },

            close(payload){        
                
                this.modal = false  
                this.$store.state.message = payload.message          
                    this.coms.push({
                            city: payload.city,
                            resto: payload.resto,
                            user: payload.user,
                            publish_date: payload.date,
                            content: payload.content                
                    })  
                    
                    setTimeout(() => {
                        this.$store.state.message = ''
                    }, 3000);
                
            },

            closed(){
                this.modal = false
            }

        }
    }
</script>

<style scoped>

    button{
        margin: 5px 0 10px 20px;
        background: blue;
        border: none;
        padding: 5px;
        color: white;
        font-weight: bold;
        border-radius: 5px;
        box-shadow: 1px 1px 5px black;
        cursor: pointer;
    }

    .commentaire{
        margin: 10px 0;
        background: white;
    }

    .badge{
        font-size: 13px;
        position: absolute;
        color: red;       
        padding: 5px;
        margin-top: -10px;
        
    }

</style>