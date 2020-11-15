import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import {auth} from '@/firebaseConfig'
Vue.config.productionTip = false

let app;

auth.onAuthStateChanged(user => {

  console.log(user)
  if(!app){ 
   app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }

})


      




