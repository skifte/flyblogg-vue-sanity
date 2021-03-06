import { createRouter, createWebHistory } from 'vue-router'
import { trackRouter } from 'vue-gtag-next'
import Home from '../views/Home.vue'
import NotFoundPage from '../views/404.vue'

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
    component: () => import(/* webpackChunkName: "about" */ '../views/SingleArticle.vue')
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
    component: NotFoundPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
  routes
})

trackRouter(router)

export default router
