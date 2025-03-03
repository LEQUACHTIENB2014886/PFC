import { createRouter, createWebHashHistory } from "vue-router";
import useUser from "@/hooks/useUser";
import HomePage from "@/views/HomePage.vue"
import PFC_CoverPage from "@/views/PFCPages/PFC_CoverPage.vue"
import LoginV1Page from "@/views/LoginV1Page.vue";
import TestView from "@/views/TestView.vue";

const { isAuthenticated } = useUser();

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: LoginV1Page,
      beforeEnter: (to, from, next) => {
        if (isAuthenticated()) {
          next('/Home')
        } else {
          next()
        }
      },
    },
    {
      path: "/Home",
      name: "/Home",
      component: HomePage,
      beforeEnter: (to, from, next) => {
        if (isAuthenticated()) {
          next();
        } else {
          next("/");
        }
      },
    },
    {
      path: "/PFCDetail",
      name: "/PFCDetail",
      component: PFC_CoverPage,
      beforeEnter: (to, from, next) => {
        if (isAuthenticated()) {
          next();
        } else {
          next("/");
        }
      },
    },
    {
      path: "/TestView",
      name: "/TestView",
      component: TestView,
      beforeEnter: (to, from, next) => {
        if (isAuthenticated()) {
          next();
        } else {
          next("/");
        }
      },
    },
  ],
});

export default router;
