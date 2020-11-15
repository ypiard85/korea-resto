<template>  
    <div>        
        <form class="form_update" @submit.prevent="updated(r)">
            <p class="close" @click="close">X</p>              
            <div class="row">
                <label for="">Nom restaurant</label>                
                    <input type="text" placeholder="name" v-model="name" >            
                <label for="">Adresse</label>                   
                    <input type="text" placeholder="adress" v-model="adress" >                    
                <label for="">Localisation</label>                                       
                    <input type="text" placeholder="location" v-model="location" >                               
            </div>
            <div class="row">
                <label for="">Photo</label>  
                <input type="text" placeholder="photo" v-model="photo">                
                <label for="">Rate</label>  
                <input type="number" placeholder="rate" max="5" min="1" v-model="rate">                   
                <label for="">Telephone</label>                   
                <input type="tel" placeholder="telephone" v-model="tel" >                    
            </div>
            <div class="row">
                <h4>Livraison</h4>
                <div class="radio">
                    <label for="oui">Oui</label>                        
                    <input type="radio" name="livraison" value="Y" v-model="livraison" >
                </div>
                <div class="radio">
                    <label for="non">Non</label>
                    <input type="radio" name="livraison" value="N" v-model="livraison" >                    
                </div>                                      
            </div>
            <div class="open">
                <h4>Open</h4>
                <div class="open_block">
                    <div class="input" v-for="(o,i) in open" :key="i" >
                        <label>{{ o.day }}</label> 
                        <div>
                            <input type="time" v-model="o.time.open">                              
                            <input type="time" v-model="o.time.close">                                                                                                                             
                        </div>  
                    </div>                     
                </div>                                        
            </div>
            <button type="submit">Update restaurant</button>  
            </form>   
    </div>
</template>

<script>
    import {db} from '../firebaseConfig'
    export default {
        props:{
            r:{
                type: Object,                
            }
        },

        data(){
            return{
                id: this.r.id,                
                name: this.r.name,
                adress: this.r.adress,
                location: this.r.location,
                photo: this.r.photo,
                rate: this.r.rate,
                tel: this.r.telephone,
                livraison: this.r.livraison,
                ville: this.r.ville,
                open: this.r.open
            }
        },

        methods:{
            close(){
                this.$emit('closeform')
            },

            async updated(){
               this.$emit('closeforms')
                
                try{
                    await db.collection('restaurants').doc(this.id).update({                    
                        name: this.name,
                        city: this.ville,
                        photo: this.photo,
                        livraison: this.livraison,
                        open: this.open,
                        telephone: this.tel,
                        adress: this.adress,
                        rate: this.rate,
                        location: this.location  
                    }) 
                    
                    
                }catch(e){
                    console.log(e)
                }

                
            }
        }
    }
</script>

<style scoped>
    .close{
        color: white;
        background-color: rgba(0, 0, 0, 0.678);
        width: 30px;
        margin: auto;
        padding: 5px;
        border-radius: 50%;
        cursor: pointer;
    }

    .form_update{     
        width: 400px;
        max-width: 100%;
        margin: 10% auto;
    }

    .row{
        display: flex;
        flex-direction: column;
    }

    .row > input{
        margin-bottom: 20px;
        padding: 5px;
    }

    .input{
        color: white;
        display: flex;
        justify-content: space-around;
        padding: 10px 0!important;
    }

    .row>h4{
        margin-bottom: 10px;
    }

    .row > label, h4{
        text-align: left;
        color: white;
    }

    .radio > input, .radio > label{
        float: left;
        color: white;
        margin-bottom: 10px;
    }

    .radio > label{
        margin-right: 20px;
    }

</style>