// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    meta: { requiresAuth: true },
    children: [
      {
        path: "/home",
        name: "Home",
        component: () => import("@/components/Front/Home.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/sair",
        name: "Sair",
        component: () => import("@/views/Sair.vue"),
      },
      {
        path: '/profile',
        name: 'Profile',
        component: () => import('@/views/UserProfile.vue'),
      },
      {
        path: "/favorites",
        name: "favorites",
        component: () => import("@/components/Front/Favorite.vue"),
      },
      {
        path: "/movie/:id",
        name: "movie",
        component: () => import("@/components/Movies/Movie.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/actors",
        name: "actors",
        component: () => import("@/components/actors/Actors.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/actor/:id",
        name: "actor",
        component: () => import("@/components/actors/ActorDetail.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/register",
    component: () => import("@/views/Register.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const token = localStorage.getItem("access_token");
    if (!token) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
