<template>
    <div class="restuarant">
        <div v-for="view in views" :key="view.name">
            <restaurant-template :view="view" min="0" />
        </div>
    </div>
</template>

<script>
    import RestaurantTemplate from '@/templates/restaurant.template'
    import { RestoService } from '@/service/firebase'
    
    export default{
        components:{
            RestaurantTemplate
        },

        data(){
            return{
                views: null,
            }
        },

        async mounted(){
            this.views = await RestoService.getRestoOne(this.$route.params.name, this.$route.params.city)
        }

    }
</script>