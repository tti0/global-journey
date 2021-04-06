import Vue from "vue";
import VueLayers from "vuelayers";
import App from "./App.vue";

// VUEX STORE

import store from "./store";

// MAPPING

import "vuelayers/lib/style.css";

Vue.use(VueLayers);

// APP INIT

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  store,
}).$mount("#app");
