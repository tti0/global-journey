import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import { v4 as uuidv4 } from "uuid";
import GreatCircle from "great-circle";
import axios from "axios";

Vue.use(Vuex);

const vuexPersist = new VuexPersist({
  key: "global-journey",
  storage: (process.env.NODE_ENV === "production" ? window.localStorage : window.sessionStorage), // Use localStorage on production only
});

export default new Vuex.Store({
  state: {
    initialised: false,
    units: "km",
    unitsModifier: 1,
    configModalActive: false,
    journey: {
      start: {
        lat: 53.479444,
        lng: -2.245278,
        name: "Manchester",
      },
      end: {
        lat: 25.263056,
        lng: 55.297222,
        name: "Dubai",
      },
      current: {
        lat: null,
        lng: null,
        name: null,
      },
      distanceToCover: GreatCircle.distance(53.479444, -2.245278, 25.263056, 55.297222),
      distanceCovered: 0,
      bearingToEnd: GreatCircle.bearing(53.479444, -2.245278, 25.263056, 55.297222),
      contributions: [],
    },
  },
  mutations: {
    changeUnits(state, newUnits) {
      state.units = newUnits;
      switch (newUnits) {
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
    newContribution(state, payload) {
      state.journey.contributions.push({
        id: uuidv4(),
        time: new Date(),
        distanceKms: payload.distanceKms,
        contributor: payload.contributor,
      });
    },
    dropContribution(state, id) {
      state.journey.contributions = state.journey.contributions.filter((i) => (i.id !== id));
    },
    setCurrentPosition(state, payload) {
      state.journey.current = payload;
    },
    setDistanceCovered(state, distanceKms) {
      state.journey.distanceCovered = distanceKms;
    },
    initialise(state) {
      state.initialised = true;
    },
  },
  actions: {
    updateDistanceCoveredFromContext(context) {
      const distanceCovered = context.getters.contributions.reduce(
        (acc, i) => acc + i.distanceKms, 0,
      );
      context.commit("setDistanceCovered", distanceCovered);
    },
    updateCurrentPositionFromContext(context) {
      const start = context.getters.journeyStart;
      const currentPos = GreatCircle.destination(start.lat, start.lng, context.getters.bearingToEnd, context.getters.distanceCovered);
      const currentPosObject = {
        lat: currentPos.LAT,
        lng: currentPos.LON,
        name: null,
      };
      axios.get("https://api.opencagedata.com/geocode/v1/json",
        {
          params: {
            key: process.env.VUE_APP_OPENCAGEDATA_API_KEY,
            q: `${currentPosObject.lat}+${currentPosObject.lng}`,
            language: "en",
            no_annotations: 1
          },
        })
        .then((res) => {
          res = res.data.results[0];
          if (res.components._type === "body_of_water") {
            currentPosObject.name = res.formatted;
          } else {
            let country = res.components.country;
            let state = res.components.state;
            let county = res.components.county;
            let city = res.components.city;
            if (city) {
              currentPosObject.name = `${city}, ${country}`;
            } else if (state) {
              currentPosObject.name = `${state}, ${country}`;
            } else if (county) {
              currentPosObject.name = `${county}, ${country}`;
            } else if (country) {
              currentPosObject.name = country;
            } else {
              currentPosObject.name = res.formatted;
            }
          }
          context.commit("setCurrentPosition", currentPosObject);
        })
        .catch((err) => {
          console.error(err);
          currentPosObject.name = `${currentPosObject.lat}, ${currentPosObject.lng}`;
          context.commit("setCurrentPosition", currentPosObject);
        });
    },
    newContribution(context, payload) {
      context.commit("newContribution", payload);
      context.dispatch("updateDistanceCoveredFromContext");
      context.dispatch("updateCurrentPositionFromContext");
    },
    dropContribution(context, id) {
      context.commit("dropContribution", id);
      context.dispatch("updateDistanceCoveredFromContext");
      context.dispatch("updateCurrentPositionFromContext");
    },
  },
  getters: {
    units: (state) => state.units,
    unitsModifier: (state) => state.unitsModifier,
    configModalActive: (state) => state.configModalActive,
    distanceToCover: (state) => state.journey.distanceToCover,
    distanceCovered: (state) => state.journey.distanceCovered,
    contributions: (state) => state.journey.contributions,
    journeyStart: (state) => state.journey.start,
    journeyEnd: (state) => state.journey.end,
    bearingToEnd: (state) => state.journey.bearingToEnd,
    journeyCurrent: (state) => state.journey.current,
    initialised: (state) => state.initialised,
  },
  plugins: [vuexPersist.plugin],
});
