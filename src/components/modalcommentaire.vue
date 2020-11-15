<template>
    <div class="modal_bg">
        <div class="modal">
            <h4 style="text-align: center; padding: 20px 0;">Commentaire</h4>
            <form action="" class="form" @submit.prevent="sendComs">
                <input type="hidden" v-model="user">
                <input type="hidden" v-model="date">
                <input type="hidden" v-model="city">
                <input type="hidden" v-model="name">
                <textarea cols="30" rows="10" v-model="text"></textarea>
                <button class="material-icons" type="submit" >send</button>
            </form>
            <!--Html Hex-->
            <span id="closed" @click="closemodal">&#x2716;</span>
        </div>
    </div>    
</template>

<script>
    import {mapGetters} from 'vuex'
    import {userService} from '@/service/user'
    export default{
        data(){
            return{
                date: this.dateBuilder(),
                city: this.$route.params.city,
                name: this.$route.params.name,
                text: null,
                user: null      
            }
        },

        computed:{
            ...mapGetters(['isAuth'])
        },

        created(){
            this.user = this.isAuth.currentUser.email   
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
                return `${day} ${date} ${mounth} ${year} - ${hour} h ${minute}`
            },

            async sendComs(){
                try {  
                await userService.sendCom(
                    this.name, this.user, this.city, this.date, this.text
                )               

                this.$emit('modalclose', {                    
                        resto: this.name, user: this.user, city: this.city, publish_date: this.date,
                        content: this.text,

                        message: 'Commentaire envoyer' 
                })
                
                } catch (e) {
                    alert(e)
                }
                
            },

            closemodal(){
                this.$emit('closeModal')
            }

        }
    }
</script>



<style scoped>
.modal_bg{
    position: fixed;
    left:0; right: 0; top:0; bottom: 0;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.295);
    z-index: 1000;
}

.modal{
    background-color: rgb(245, 241, 241);
    width: 500px;
    max-width: 100%;       
    margin: 10% auto;
    border-radius: 5px;
    box-shadow: 0 0 10px black;
    position: relative;
}

.form{
    padding: 20px;
    position: relative;
}

#closed{
    position: absolute;
    top: 20px;
    left: 20px;
    cursor: pointer;
    transform: scale(1);
    font-weight: bold;
}

#closed:hover{
    transform: scale(1.5);
}

.form > input{
    width: 100%;
    text-align: center;
}

.form > textarea{
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    padding: 5px;
}

i{
    cursor: pointer;
}

</style>