<template>
    <tr>        
            <td v-if="view.name.length < 9">{{ view.name }}</td>        
            <td v-else>{{ citylenght }}...</td>        
            <td>{{ view.city }}</td>        
            <td class="action">
                <button><router-link :to="'/restaurant/' + view.name + '/' + view.city ">Voir</router-link></button>
                <button @click="deleteitem">Supprimer</button>
            </td>        
    </tr>
</template>

<script>    

export default{
    props:{
        view:{
            type: Object,
            default: null
        } 
    },

    data(){
        return{
            citylenght: this.view.name
        }
    },

    mounted(){
        this.citylenght = this.citylenght.substr(0, 9)
    },

     methods:{
        deleteitem(){
            this.$emit('deleteaction', this.view)
        }
    }
}

    
</script>

<style scoped>
    

    
</style>