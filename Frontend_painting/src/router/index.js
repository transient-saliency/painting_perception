/*
 * @Description: 
 * @Author: Qing Shi
 * @Date: 2022-11-20 18:21:36
 * @LastEditTime: 2022-11-21 00:21:58
 */
import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/Login.vue"),
    },
    {
      path: "/beforeTest1",
      name: "beforeTest1",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/BeforeTrain.vue"),
    },
    {
      path: "/beforeTest2",
      name: "beforeTest2",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/BeforeStart.vue"),
    },
    {
      path: "/test2",
      name: "test2",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/Training.vue"),
    },
    // {
    //   path: "/test2",
    //   name: "test2",
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import("../views/Testing.vue"),
    // },
    {
        path: "/test1",
        name: "test1",
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("../views/Testing_demo.vue"),
      },
    {
      path: "/end",
      name: "end",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/StudyEnd.vue"),
    },
  ],
});

export default router;
