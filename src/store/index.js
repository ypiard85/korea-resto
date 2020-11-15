import Vue from 'vue'
import Vuex from 'vuex'
import { RestoService } from '@/service/firebase'
import {auth} from '@/firebaseConfig'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    villes: RestoService.getVille(),
    isAuth: auth,
    isConnect: false,
    logged: true,
    message: ''
  },

  getters:{
    CutAuthName(state){
      const s = state.isAuth.currentUser.email.split('@')
      s.splice(1)      
      return s
    },

    message(state){
      return state.message
    },

    isAuth(state){
     return state.isAuth       
    },

    isConnect(state){
      return state.isConnect
    },

    logged(state){
      return state.logged
    }

  },

  mutations:{
    
  },

  actions: {

  },

})
