import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import App from "./App.vue";
import GreatCircle from "great-circle";
import { v4 as uuidv4 } from "uuid";

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
      start: {
        coordinates: [null, null],
        name: null
      },
      end: {
        coordinates: [null, null],
        name: null
      },
      distanceToCover: 100,
      distanceCovered: 0,
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
    },
    newJourney(state, payload) {
      state.journey.contributions.push({
        id: uuidv4(),
        time: new Date(),
        distanceKms: payload[1],
        contributor: payload[0]
      });
      state.journey.distanceCovered = state.journey.contributions.reduce(
        function(acc, i) {
          return acc + i.distanceKms
        }, 0
      );
    },
    dropJourney(state, id) {
      state.journey.contributions = state.journey.contributions.filter(i => (i.id !== id));
      state.journey.distanceCovered = state.journey.contributions.reduce(
        function(acc, i) {
          return acc + i.distanceKms
        }, 0
      );
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
