<template>
    <p class="message" v-if="message !== '' ">{{ message }}</p>
    
</template>

<script>
import {mapGetters} from 'vuex'

   export default{

    data() {
        return {
            
        }
    },

        computed:{
            ...mapGetters(['message'])
        }
    }

</script>


<style scoped>

.message{
  position:fixed;
  bottom: 30px;
  right: 30px;
  padding: 5px;
  box-shadow: 0 0 5px red;
  border-radius: 5px;
  color: #fff;
  background: rgba(0, 128, 0, 0.658);
}

</style>
