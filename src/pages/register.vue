<template>
    <div class="connexion">
        <h3>Inscription</h3>
        <form  @submit.prevent="register">
            <div class="input">
                <label for="email">Email</label>
                <input type="email" placeholder="azerty@azerty.fr" v-model="email" required>
            </div>
            <div class="input">
                <label for="password">Mot de passe</label>
                <input type="password" placeholder="password" v-model="password" required>
            </div>            
            <div class="input">
                <label for="confirmpass">Confirmer votre mot de passe</label>
                <input type="password" placeholder="confirm password" v-model="confirmpassword">
            </div>
            <button type="submit" class="btn_connexion">Inscription</button>
            <span><router-link to="/login">J'ai déjâ un compte</router-link></span>
        </form>
        <p v-if="msg != '' ">{{ msg }}</p>
    </div>
</template>

<script>
   
    //import {RestoService} from '@/service/firebase'
    import {mapState} from 'vuex'
    export default{
        data(){
            return{
                email: null,
                password: null,
                confirmpassword: null,
                msg: null,  
            }
        },

        computed:{
            ...mapState(['isAuth'])
        },

        methods:{
            async register(){
                try {
                    if(this.password.length >= 6 ) {
                    if(this.password == this.confirmpassword){
                        await this.isAuth.createUserWithEmailAndPassword(this.email, this.password)
                        await this.isAuth.signInWithEmailAndPassword(this.email, this.password)                        
                        this.$router.replace('/')

                    }else{
                        this.msg = 'Vos mots de passe ne sont pas identique'
                    }
                }else{
                    this.msg = 'Votre mot de passe doit être suppérieur à 6'                    
                } 
                } catch (error) {
                    alert(error)
                    this.$store.state.isConnext = false
                }
                 
            }
    }
}
</script>

<style scoped>
.connexion{    
    width: 500px;
    max-width: 80%;
    margin: 10% auto;
    box-shadow: 0 0 5px black;
    border-radius: 5px;
    padding: 20px;
}

h3{
    text-align: center;
    color: blue;
}

.input{
    display: flex;
    flex-direction: column;
    justify-content: center;
}

input{
    display: block;
}

label{
    margin: 10px 0;
}

input{
    border: none;
    border-bottom: 1px solid gray;
    outline: none;
}

.btn_connexion{
    margin: 20px 0;
    background: green;
    border: none;
    padding: 5px;
    color: white;
    font-weight: bold;
    border-radius: 5px;
    box-shadow: 1px 1px 5px black;
    cursor: pointer;
}

span{
    margin: 10px;
}
</style>