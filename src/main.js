import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import App from "./App.vue";
import GreatCircle from "great-circle";

// STORAGE

Vue.use(Vuex);

const vuexPersist = new VuexPersist({
  key: "global-journey",
  storage: window.sessionStorage
});

const store = new Vuex.Store({
  state: {
    units: "km",
    unitsModifier: 1,
    configModalActive: false,
    journey: {
      start: [],
      end: [],
      distanceToCover: 100,
      distanceCovered: 22,
      contributions: []
    }
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
    changeJourney(state, coordsStart, coordsEnd) {
      state.start = coordsStart;
      state.end = coordsEnd;
      state.distanceToCover = GreatCircle.distance(coordsStart[0], coordsStart[1], coordsEnd[0], coordsEnd[1]);
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
    configModalActive: state => state.configModalActive,
    distanceToCover: state => state.journey.distanceToCover,
    distanceCovered: state => state.journey.distanceCovered,
    journeys: state => state.journey.contributions
  },
  plugins: [vuexPersist.plugin]
});

// APP INIT

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  store: store
}).$mount('#app');
