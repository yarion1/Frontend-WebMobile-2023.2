// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [ 
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/Register.vue'),
      },
      {
        path: 'movie/:id',
        name: 'movie',
        component: () => import('@/components/Movies/Movie.vue'),
      },
      {
        path: '/actors',
        name: 'actors',
        component: () => import('@/components/actors/Actors.vue'),
      },
      {
        path: '/actor/:id',
        name: 'actor',
        component: () => import('@/components/actors/ActorDetail.vue'),
      }
    ],
  },
  {
    path: '/login',
    component: () => import('@/views/Login.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
