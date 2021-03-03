import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import App from "./App.vue";

// STORAGE

Vue.use(Vuex);

const vuexPersist = new VuexPersist({
  key: "global-journey",
  storage: window.localStorage
});

const store = new Vuex.Store({
  state: {
    units: "km",
    unitsModifier: 1,
    configModalActive: true
  },
  mutations: {
    changeUnits(state, newUnits) {
      state.units = newUnits;
      switch(newUnits) {
        case "km": {
          state.unitsModifier = 1;
          break;
        }
        case "mile": {
          state.unitsModifier = 0.6213;
          break;
        }
        case "nm": {
          state.unitsModifier = 0.5400;
          break;
        }
      }
    },
    showConfigModal(state) {
      state.configModalActive = true;
    },
    hideConfigModal(state) {
      state.configModalActive = false;
    }
  },
  getters: {
    units: state => state.units,
    unitsModifier: state => state.unitsModifier,
    configModalActive: state => state.configModalActive
  },
  plugins: [vuexPersist.plugin]
});

// APP INIT

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  store: store
}).$mount('#app');
