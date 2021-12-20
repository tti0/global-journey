import Vue from "vue";
import VueRouter from "vue-router";

import HomeView from "@/views/Home.vue";
import ConfigView from "@/views/Config.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView
  },
  {
    path: "/configuration",
    name: "Configuration",
    component: ConfigView
  }
];

const router = new VueRouter({
  routes
});

export default router;
