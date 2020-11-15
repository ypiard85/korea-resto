<template>
    <div class="addresto">
            <form action="" class="form_resto" @submit.prevent="addresto" >                
                <div class="row">
                    <select name="" id="" v-model="ville" >
                        <option value="">--VILLE--</option>
                        <option v-for="c in city" :key="c.name" :value="c.name">{{ c.name }}</option>
                    </select>                  
                </div>
                <div class="row">
                    <input type="text" placeholder="name" v-model="name" >                    
                    <input type="text" placeholder="adress" v-model="adress" >                                 
                    <input type="text" placeholder="location" v-model="location" >                    
                </div>
                <div class="row">
                    <input type="text" placeholder="photo" v-model="photo" >
                    <input type="number" placeholder="rate" max="5" min="1" v-model="rate" >                    
                    <input type="tel" placeholder="telephone" v-model="tel" >                    
                </div>
                <div class="livraison">
                    <h4>Livraison</h4>
                    <div>
                        <label for="oui">Oui</label>                        
                        <input type="radio" name="livraison" value="Y" v-model="livraison" >
                    </div>
                    <div>
                        <label for="non">Non</label>
                        <input type="radio" name="livraison" value="N" v-model="livraison" >
                    </div>                                      
                </div>
                <div class="open">
                    <h4>Open</h4>
                    <div class="open_block">
                        <div class="input" v-for="(o,i) in open" :key="i" for="days">
                            <label >{{ o.day }}</label> 
                            <div>
                                <input type="time" v-model="o.time.open">   
                                <input type="time" v-model="o.time.close">                                                                         
                            </div>   
                        </div>                        
                    </div>  
                    <div class="menu">
                        <h4>Menu</h4>
                        <form action="" @submit.prevent="addmenu">
                            <input type="text" v-model="menuname">
                        <input type="text" v-model="menuprice">
                        <button type="submit">Add</button><br>
                        <p style="max-width: 300px">{{ menus }}</p>
                        </form>                        
                    </div>                                        
                </div>
                <button type="submit">Ajouter restaurant</button>
            </form>
            <table class="table" style="margin: 0;">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>City</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>              
                    <admin-resto-template v-for="(r,i) in restodata" :key="i" :r="r" @restoaction="updateresto(r)" />              
                </tbody>
            </table>
            <div class="datar" v-if="rdata">
                <modif-resto v-for="(r,i) in restoupdate" :key="i" :r="r" @closeform="close(r)" @closeforms="closes" />
            </div>
    </div>
</template>


<script>
    import { RestoService } from '@/service/firebase'
    import { adminService } from '@/service/admin'
    import AdminRestoTemplate from '@/templates/adminresto.template'
    import ModifResto from '@/templates/modifresto.template'
    import {db} from '../../firebaseConfig'

    export default{

        components:{
            AdminRestoTemplate, ModifResto
        },

        data(){
            return{ 
                restodata: [],                
                menudata: [],
                restoupdate: [],
                rdata: false,
                
                days: ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'],
                city: null,
                menuname: null,
                menuprice: null,
                menus: [],

                ville: null,
                name: null,
                adress: null,
                location: null,
                photo: null,
                rate: null,
                tel: null,
                livraison: null,

                open:[
                        { day: 'lundi', time: 
                            { open: '', close: '' }  
                        },
                        { day: 'mardi', time:
                            { open: '', close: '' }  
                        },
                        { day: 'mercredi', time:  {
                                            open: null,
                                            close: null
                                        }
                        },
                        { day: 'jeudi', time:  {
                                        open: null,
                                        close: null
                                    }
                        },
                        { day: 'vendredi', time: {
                            open: null,
                            close: null
                        } },
                        { day: 'samedi', time:  {
                            open: null,
                            close: null
                        }},
                        { day: 'dimanche', time:  {
                            open: null,
                            close: null,
                        }},     
                    ]
                    
        }
    },

    async mounted(){
        this.city = await RestoService.getVille()
        this.restodata = await adminService.getAllResto()
    },

    methods:{
       async addresto(){  
            try {
                await adminService.restoAdd(
                    this.adress, this.ville, this.livraison, this.location,
                    this.name, this.open, this.photo, this.rate,
                    this.tel
                    )

                await db.collection('menus').add({
                    lists: this.menus,
                    name: this.name,
                    city: this.ville
                })

                this.restodata.push({
                    menus: this.menu,
                    city: this.ville,
                    name: this.name,
                    adress: this.adress,
                    location: this.location,
                    photo: this.photo,
                    rate: this.rate,
                    telephone: this.telephone,
                    livraison: this.livraison,
                })

                this.adress = ''
                this.ville = '' 
                this.livraison = ''
                this.location = '' 
                this.name = ''
                this.open.time.open = ''
                this.open.time.close = ''
                this.photo = '' 
                this.rate = ''
                this.tel = ''
                this.menu = ''
                this.name = ''

            } catch (error) {
                console.log(error)
            }
        },

        addmenu(){
            this.menus.push({               
                    name: this.menuname,
                    price: this.menuprice                
            })
            this.menuname = ''
            this.menuprice = ''
            
        },

        updateresto(r){
            this.rdata = true

            this.restoupdate.push({
              id: r.id,
              adress: r.adress, 
              city: r.ville, 
              livraison: r.livraison, 
              location: r.location,
              name: r.name,
              open: r.open, 
              photo: r.photo, 
              rate: r.rate,
              telephone: r.telephone,
              ville: r.city
            })
        },

        close(r){
            this.rdata = false

            const s = this.restoupdate.findIndex(index => index.id === r.id)
            this.restoupdate.splice(s,1)
        },

        closes(){
            this.rdata = false

            this.restoupdate = []
        }

    }

}
</script>

<style scoped>

    .datar{
        position: fixed;
        overflow-y: scroll;
        top: 0;
        bottom: 0;
        left:0;
        right: 0;
        z-index: 10000;
        background: rgba(0, 0, 0, 0.719);
    }
    
    .addresto{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        padding: 0 30px;
        margin-bottom: 100px;        
    }

    .form_resto{
        display: flex;
        flex-direction: column;
        background-color: rgba(250, 235, 215, 0.425);
        padding: 10px;
        margin-bottom: 20px;
    }

    .form_resto > button{
        background-color: blue;
        color: white;
        padding: 5px;
        border: none;
        border-radius: 5px;
        box-shadow: 0 0 5px black;
    }

    .row{
        display: flex; 
        justify-content: space-between;
        margin: 0 0 20px 20px;
        flex-wrap: wrap;
    }

    .row > input, .row > select{
        margin: 10px 5px;
        padding: 5px;
    }

    .livraison > div{
        margin-top: 10px;
    }

    .livraison > div >input{
        margin-left: 30px    
    }

    .open{
        text-align: left;
        margin-top: 30px;
    }

    .open h4, .menu{
        margin-bottom: 15px;
    }

    .open_block{
        display: flex;
        flex-direction: column;
    }

    .input > label{
        padding: 3px;
    }

    .input > label, .input_option > input{
        margin-bottom: 10px;
        margin-right: 10px;
    }

</style>

