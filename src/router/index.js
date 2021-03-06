import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/reader',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },{
    path:'/reader',
    name:'Reader',
    component:() => import(/* webpackChunkName: "about" */'../views/Reader/index.vue')
  },{
    path:'/book',
    name:'Book',
    component:() => import(/* webpackChunkName: "about" */'../views/Book/index.vue')
  },
  {
    path:'/brolog',
    name:'Brolog',
    component:() => import(/* webpackChunkName: "about" */'../views/brolog/index.vue')
  },
  {
    path:'/orderbook',
    name:'orderboook',
    component:() => import(/* webpackChunkName: "about" */'../views/OrderBook/index.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
