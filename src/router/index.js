import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    redirect: '/flyblogg'
  },
  {
    path: '/om-anders-skifte',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/flyblogg',
    name: 'Home',
    component: Home
  },
  {
    path: "/flyblogg/:slug",
    name: "SinglePost",
    component: () => import(/* webpackChunkName: "404" */ '@/views/SinglePost.vue')
  },
  { 
    path: '/:pathMatch(.*)*', 
    name: '404', 
    component: import(/* webpackChunkName: "404" */ '@/views/404.vue') }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
