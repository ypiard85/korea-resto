<template>
    <div class="admin">
        <div class="admin_link">
            <div class="admin_option">
                <label for="">Gestion ville</label>      
                <input type="radio" name="gestion" value="ville" v-model="gestion" >
            </div>
            <div class="admin_option">
                <label for="">Gestion restaurant</label>      
                <input type="radio" name="gestion" value="restaurant" v-model="gestion">
            </div>
            <div class="admin_option">
                <label for="">Gestion menu</label>
                <input type="radio" value="menu" name="gestion" v-model="gestion">
            </div>
        </div>

        <div class="gestion">   
            <p v-if="gestion == 'ville' "><add-city /></p>
            <p v-if="gestion == 'restaurant' "><add-restaurant /></p>
            <p v-if="gestion == 'menu' "><gestion-menu /></p>
        </div>
    </div>
</template>

<script>
    import AddRestaurant from '@/components/admin/addrestaurant'
    import AddCity from '@/components/admin/addcity'
    import GestionMenu from '@/components/admin/gestionmenu'
export default {

    components:{
        AddRestaurant, AddCity, GestionMenu
    },

    data(){
        return{
            gestion: 'ville',

        }
    }
}
</script>

<style scoped>
    
    .admin_link{
        display: flex;
        justify-content: center;
        padding: 20px;
    }

    .admin_option{
        display: flex;
        flex-direction: column;
        justify-content: right;
        margin-right: 30px;
        text-align: center;
    }

    input[type="radio"]{       
       margin: 10px auto;
       
    }

    .gestion{
        text-align: center;
    }

</style>





