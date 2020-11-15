<template>
  <div id="app">
    <Log />
    <Nav />
    <message />
    <router-view></router-view>    
  </div>
</template>

<script>
  import Nav from '@/components/nav'
  import Log from '@/components/loginfo'
  import {mapGetters} from 'vuex'
  import Message from '@/components/message'

  export default{
    components:{
      Nav, Log, Message,
    },

    computed:{
      ...mapGetters(['message', 'isAuth'])
    },

  }
</script>

<style lang="scss">

*{
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
  transition: 0.4s;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
} 

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
