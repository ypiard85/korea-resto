import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/pages/home'
import CityResto from '@/pages/cityrestaurant'
import Restaurant from '@/pages/restuarant'
import Resgister from '@/pages/register'
import Login from '@/pages/login'
import Admin from '@/pages/admin'
import Favorie from '@/pages/favorie'
import {auth} from '@/firebaseConfig'

Vue.use(VueRouter)
const routes = [
  {path: '/', component: Home},
  {path: '/ville/:city', component: CityResto},
  {path: '/restaurant/:name/:city', component: Restaurant},
  {path: '/register', component: Resgister},
  {path: '/login', component: Login},
  {path: '/favories', component: Favorie, meta: {needAuth: true}},
  {path: '/admin', component: Admin, meta: {adminAuth: true}}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next)=> {
  const isAuth = auth.currentUser
  const isProtected = to.matched.some(route => route.meta.needAuth)

  if(!isAuth && isProtected){
    next('/login')
  }else{
    next()
  }
  
})

router.beforeEach((to, from, next)=> {
  const isAuth = auth.currentUser
  const isProtected = to.matched.some(route => route.meta.adminAuth)

  if(!isAuth && isProtected){
    next('/')
  }else if(isAuth && isProtected && isAuth.email != 'admin@admin.fr'){
    next('/')
  }else{
    next()
  }

})

export default router
