import Vue from "vue";
import App from "./App.vue";

// VUEX STORE

import store from "./store";

// ROUTER

import router from "./router";

// MAPPING

import VueLayers from "vuelayers";
import "vuelayers/lib/style.css";

Vue.use(VueLayers);

// APP INIT

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
  store
}).$mount("#app");
