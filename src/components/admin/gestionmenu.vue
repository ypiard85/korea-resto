<template>
    <div>
        <div class="villes">
            <div class="top_home">
                <input type="text" placeholder="Menu..." v-model="search">
            </div>
            <table class="table">
                <thead>
                    <tr>                        
                        <th>Name</th>
                        <th>City</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody v-if="this.search != ''">                
                    <tr v-for="(m,i) in menufilter" :key="i">
                        <td>{{ m.name }}</td>                                               
                        <td>{{ m.city }}</td>                                               
                        <td><button class="delete_btn" @click="menuView(m)">Voir le menu</button></td>                                         
                    </tr>                            
                </tbody>                
                <tbody v-else>                
                    <tr v-for="(m,i) in menus" :key="i">
                        <td>{{ m.name }}</td>                                               
                        <td>{{ m.city }}</td>                                               
                        <td><button class="delete_btn" @click="menuView(m)">Voir le menu</button></td>                                         
                    </tr>                            
                </tbody>                
            </table>
            <div class="bg_menu" v-if="menuopen">
                <div class="menu_content">                    
                    <div v-for="(mp,i) in menu_update" :key="i">
                        <p class="close" @click="close(mp)">X</p>
                       <h1>{{ mp.city }}</h1>         
                       <h4>{{ mp.name }}</h4>         
                       <form action="" @submit.prevent="updatemenu">
                        <div v-for="(l,n) in lists" :key="n">
                            <input type="text" v-model="l.name">
                            <input type="text" v-model="l.price">                               
                        </div>                                     
                        <button type="submit">Update menu</button>                                                     
                    </form>
                    <form action="" @submit.prevent="extendmenu" >
                        <input type="text" v-model="menuname">
                        <input type="text" v-model="menuprice">
                        <button type="submit">Ajouter menu</button>                         
                    </form>
                    </div>
                    
                </div>                    
            </div>            
        </div>
    </div>
</template> 

<script>
    import {RestoService} from '@/service/firebase'
    import {db} from '../../firebaseConfig'

    export default{

    data(){
        return{
            search: '',

            menus: null,
            menu_update: [],
            menuopen: false,
            id: null,
            name: null,
            city: null,
            lists: null,

            menuname: null,
            menuprice: null,
        }
    },

    computed:{
        menufilter(){
            return this.menus.filter(m => {              
                    return m.name.toLowerCase().includes(this.search.toLowerCase())
            })
        }
    },

    async mounted(){
        this.menus = await RestoService.getMenuAll()
    },

    methods:{
        menuView(m){
            this.menuopen = true
            this.name = m.name, this.city = m.city, this.lists = m.lists, this.id = m.id
           this.menu_update.push({                
                name: m.name,
                city: m.city,
                lists: m.lists
            })
        },

        close(mp){
            const dm = this.menu_update.findIndex(e => e.id === mp.id)
            this.menu_update.splice(dm, 1)
            this.menuopen = false
        },

        updatemenu(l){

            const dm = this.menu_update.findIndex(e => e.id === l.id)
            this.menu_update.splice(dm, 1)
            this.menuopen = false
            this.$store.state.message = "Menu changer avec succè"

            db.collection('menus').doc(this.id).update({
                name: this.name,
                city: this.city,
                lists: this.lists
            })    
            
            setTimeout(() => {
                this.$store.state.message = ""
            }, 2000);
        },

        extendmenu(){
            this.lists.push({
                name: this.menuname,
                price: this.menuprice
            })
            this.menuname = ''
            this.menuprice = '' 
        },
    }
    

}

</script>

<style scoped>
    .bg_menu{
        background-color: rgba(0, 0, 0, 0.616);
        position: fixed;        
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        color: white;
    }

    .close{
        cursor: pointer;
    }

    .menu_content{
      margin: 10%;
        overflow: scroll;
        display: flex;
       justify-content: center;
       overflow: auto;
    }

    .menu_content input{
        padding: 5px;
        margin: 5px;

    }


</style>