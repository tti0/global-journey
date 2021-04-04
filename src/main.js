import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import App from "./App.vue";
import { v4 as uuidv4 } from "uuid";
import GreatCircle from "great-circle";
import axios from "axios";

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
        lat: 53.479444,
        lng: -2.245278,
        name: "Manchester"
      },
      end: {
        lat: 41.881944,
        lng: -87.627778,
        name: "Chicago"
      },
      current: {
        lat: null,
        lng: null,
        name: null
      },
      distanceToCover: GreatCircle.distance(53.479444, -2.245278, 41.881944, -87.627778),
      distanceCovered: 0,
      bearingToEnd: GreatCircle.bearing(53.479444, -2.245278, 41.881944, -87.627778),
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
    changeJourney(state, startLat, startLng, endLat, endLng) {
      state.start.lat = startLat;
      state.start.lng = startLng;
      state.end.lat = endLat;
      state.end.lng = endLng;
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
          return acc + i.distanceKms;
        }, 0
      );
      var currentPos = GreatCircle.destination(state.journey.start.lat, state.journey.start.lng, state.journey.bearingToEnd, state.journey.distanceCovered);
      state.journey.current.lat = currentPos.LAT;
      state.journey.current.lng = currentPos.LON;
      axios.get("https://api.opencagedata.com/geocode/v1/json",
      {
        params: {
          key: process.env.VUE_APP_OPENCAGEDATA_API_KEY,
          q: `${state.journey.current.lat}+${state.journey.current.lng}`,
          language: "en"
        }
      })
        .then(function(res) {
          state.journey.current.name = res.data.results[0].formatted;
          console.log(res.data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
    },
    dropJourney(state, id) {
      state.journey.contributions = state.journey.contributions.filter(i => (i.id !== id));
      state.journey.distanceCovered = state.journey.contributions.reduce(
        function(acc, i) {
          return acc + i.distanceKms;
        }, 0
      );
      var currentPos = GreatCircle.destination(state.journey.start.lat, state.journey.start.lng, state.journey.bearingToEnd, state.journey.distanceCovered);
      state.journey.current.lat = currentPos.LAT;
      state.journey.current.lng = currentPos.LON;
    }
  },
  getters: {
    units: state => state.units,
    unitsModifier: state => state.unitsModifier,
    configModalActive: state => state.configModalActive,
    distanceToCover: state => state.journey.distanceToCover,
    distanceCovered: state => state.journey.distanceCovered,
    contributions: state => state.journey.contributions,
    journeyStart: state => state.journey.start,
    journeyEnd: state => state.journey.end,
    bearingToEnd: state => state.journey.bearingToEnd,
    journeyCurrent: state => state.journey.current
  },
  /*actions: {
    updateCurrent: function(state) {

    }
  }*/
  plugins: [vuexPersist.plugin]
});

// MAPPING

import VueLayers from "vuelayers";
import "vuelayers/lib/style.css";

Vue.use(VueLayers);

// APP INIT

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  store: store
}).$mount("#app");
