<template>
    <div >
        <form class="form_admin" @submit.prevent="addcity">
            <input v-model="city" placeholder="city name" type="text" style="text-align: center;">
            <input v-model="photo" placeholder="city photo" type="text" style="text-align: center;">
            <button type="submit">ajouter</button>            
        </form>

        <div class="villes">
            <table class="table">
                <thead>
                    <tr>                        
                        <th>City</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>                
                    <tr v-for="(city,i) in villes" :key="i">
                        <td>{{ city.name }}</td>                                               
                        <td><button class="delete_btn" @click="modifier(city)">Modifier</button></td>                                         
                    </tr>                            
                </tbody>                
            </table>
            <div v-for="(f,i) in array" :key="i">
                <input type="text" :placeholder="f.name" v-model="cityname">
                <input type="text" :placeholder="f.image" v-model="cityphoto">
                <button @click="send(f)">valider</button>
            </div> 
        </div>
    </div>
</template>

<script>
    import {RestoService} from '@/service/firebase'
    import {adminService} from '@/service/admin'
    import {db} from '../../firebaseConfig'
    export default{
        data(){
            return {
                villes: null,  
                array: [],              
                city: null,
                photo: null,                
                namecity: null,
                cityname: '',
                cityphoto: '',
                                              
            }
        },

        async mounted(){
            this.villes = await RestoService.getVille()  
           
        },

        methods:{
            async addcity(){
                try {                     

                    if(this.city != null && this.photo != null){
                        await adminService.CityAdd(this.city, this.photo)
                        this.villes.push({
                            name: this.city,
                            image: this.photo,
                            edit: false,
                        })
                    }
                } catch (e) {
                    console.log(e)
                }
            },

            modifier(city){ 
                this.array.push({
                    id: city.id,
                    name: city.name, 
                    image: city.image                   
                })
            },

           async send(f){   
                if(this.cityname == ''){
                    this.cityname = f.name
                }else if(this.cityphoto == ''){
                    this.cityphoto = f.image 
                }
                this.$store.state.message = 'Ville modifier avec succès'
               await db.collection('villes').doc(f.id).update({                    
                    name: this.cityname,
                    image: this.cityphoto
                })
                
                setTimeout(() => {
                    const d = this.array.findIndex(item => item.id == f.id)
                    this.array.splice(d, 1)
                    
                    this.cityname = ''
                    this.cityphoto = ''
                    this.$store.state.message = ''                
                }, 300);
                
                
            }
        },
    }

</script>


<style>
    .form_admin{
        margin-bottom:30px;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }

    .form_admin > input{
        padding: 5px;
    }

    .form_admin > button{
        margin: 0 5px;
    }

    .delete_btn{
        background-color: blue;
        color: white;
        padding: 5px;
        border: none;
        border-radius: 5px;
        box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.404);
        outline-width: 0;
        cursor: pointer;
    }

</style>