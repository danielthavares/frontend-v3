import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomeView.vue";
import NotFound from "../views/NotFoundView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/examplei",
      name: "examplei",
      component: () => import("../views/ExampleIView.vue"),
    },
    {
      path: "/exampleii",
      name: "exampleii",
      component: () => import("../views/ExampleIIView.vue"),
    },
    {
      path: "/exampleiii",
      name: "exampleiii",
      component: () => import("../views/ExampleIIIView.vue"),
    },
    {
      path: "/exampleiv",
      name: "exampleiv",
      component: () => import("../views/ExampleIVView.vue"),
    },
    {
      path: "/examplev",
      name: "examplev",
      component: () => import("../views/ExampleVView.vue"),
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/:pathMatch(.*)",
      name: "NotFound",
      component: NotFound,
    },
  ],
});

export default router;
