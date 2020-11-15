<template>
    <div class="connexion">
        <h3>Connexion</h3>
        <form @submit.prevent="login">
            <div class="input">
                <label for="email">Email</label>
                <input type="email" placeholder="azerty@azerty.fr" v-model="email" required>
            </div>
            <div class="input">
                <label for="password">Mot de passe</label>
                <input type="password" placeholder="password" v-model="password" required>
            </div>
            <button type="submit" class="btn_connexion">Connexion</button>
            <span><router-link to="/register">Créer un compte</router-link></span>
        </form>
        <p v-if="msg != '' ">{{ msg }}</p>
    </div>
</template>

<script>
    import {auth} from '@/firebaseConfig'
    export default{
        data(){
            return{
                email: null,
                password: null,  
                msg: null
            }
        },

        methods:{
            async login(){
                try {
                  await auth.signInWithEmailAndPassword(this.email, this.password)
                  this.$router.replace('/')
                  window.location.reload()                                 
                } catch (error) {
                    this.msg ='Email ou mots de passe invalide'
                    this.email = ''
                    this.password = ''
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