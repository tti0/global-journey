<template>
  <div>
    <h3 class="title is-4">Configuration</h3>

    <router-link to="/" class="button is-link">❮ Back</router-link>

    <div class="notification">
      Any changes you make will be automatically saved.
    </div>

    <div class="field">
      <label for="config-units" class="label">Display units</label>
      <div class="control">
        <div class="select">
          <select v-model="units" name="config-units">
            <option value="km">Kilometres / km</option>
            <option value="mile">Miles / m</option>
            <option value="nm">Nautical miles / nm</option>
          </select>
        </div>
      </div>
    </div>

    <div class="field">
      <label for="config-start-name" class="label">Name of start location</label>
      <div class="control">
        <input required type="text" name="config-start-name" class="input" v-model="startName" v-bind:class="{ 'is-danger': validationErrors.configStartName }">
      </div>
      <p class="help is-danger" v-if="validationErrors.configStartName">{{ validationErrors.configStartName }}</p>
    </div>

    <label for="config-start-lat" class="label">Co-ordinates of start location</label>
    <div class="field is-grouped">
      <div class="control">
        <input type="text" name="config-start-lat" class="input" placeholder="Latitude" v-model="startLat" v-bind:class="{ 'is-danger': validationErrors.configStartCoords }">
      </div>
      <p class="control">,</p>
      <div class="control">
        <input type="text" name="config-start-lng" class="input" placeholder="Longitude" v-model="startLng" v-bind:class="{ 'is-danger': validationErrors.configStartCoords }">
      </div>
      <p class="help">Co-ordinates should be specified as signed decimals (e.g. -2 for 2°W, 2 for 2°E).</p>
      <p class="help is-danger" v-if="validationErrors.configStartCoords">{{ validationErrors.configStartCoords }}</p>
    </div>

    <div class="field">
      <label for="config-end-name" class="label">Name of end location</label>
      <div class="control">
        <input required type="text" name="config-end-name" class="input" v-model="endName" v-bind:class="{ 'is-danger': validationErrors.configEndName }">
      </div>
      <p class="help is-danger" v-if="validationErrors.configEndName">{{ validationErrors.configEndName }}</p>
    </div>

    <label for="config-end-lat" class="label">Co-ordinates of end location</label>
    <div class="field is-grouped">
      <div class="control">
        <input type="text" name="config-end-lat" class="input" placeholder="Latitude" v-model="endLat" v-bind:class="{ 'is-danger': validationErrors.configEndCoords }">
      </div>
      <p class="control">,</p>
      <div class="control">
        <input type="text" name="config-end-lng" class="input" placeholder="Longitude" v-model="endLng" v-bind:class="{ 'is-danger': validationErrors.configEndCoords }">
      </div>
      <p class="help">Co-ordinates should be specified as signed decimals (e.g. -2 for 2°W, 2 for 2°E).</p>
      <p class="help is-danger" v-if="validationErrors.configEndCoords">{{ validationErrors.configEndCoords }}</p>
    </div>

    <hr>

    <div class="field">
      <label for="config-reset" class="label">Reset application (this will clear localStorage and is irrevesible!)</label>
      <div class="control">
        <button class="button is-danger" name="config-reset" id="config-reset" v-on:click="resetApp()">Reset</button>
      </div>
    </div>

    <hr>

    <router-link to="/" class="button is-link">❮ Back</router-link>
  </div>
</template>

<script>
import isLatitudeValid from "@/helpers/isLatitudeValid";
import isLongitudeValid from "@/helpers/isLongitudeValid";

export default {
  name: "ConfigView",
  data: function() {
    return {
      validationErrors: {
        configStartName: false,
        configEndName: false,
        configStartCoords: false,
        configEndCoords: false
      }
    };
  },
  computed: {
    units: {
      get: function() {
        return this.$store.state.units;
      },
      set: function(newUnits) {
        this.$store.commit("changeUnits", newUnits);
      }
    },
    startName: {
      get: function() {
        return this.$store.state.journey.start.name;
      },
      set: function(newStartName) {
        if (newStartName === "") {
          this.validationErrors.configStartName = "This field cannot be blank.";
        } else {
          this.validationErrors.configStartName = false;
          this.$store.commit("changeJourneyStartName", newStartName);
        }
      }
    },
    endName: {
      get: function() {
        return this.$store.state.journey.end.name;
      },
      set: function(newEndName) {
        if (newEndName === "") {
          this.validationErrors.configEndName = "This field cannot be blank.";
        } else {
          this.validationErrors.configEndName = false;
          this.$store.commit("changeJourneyEndName", newEndName);
        }
      }
    },
    startLat: {
      get: function() {
        return this.$store.state.journey.start.lat;
      },
      set: function(newStartLat) {
        if (newStartLat === "") {
          this.validationErrors.configStartCoords = "These fields cannot be blank.";
        } else if (! isLatitudeValid(newStartLat)) {
          this.validationErrors.configStartCoords = "You have entered an invalid latitude.";
        } else {
          this.validationErrors.configStartCoords = false;
          this.$store.dispatch("changeStartPosition", {
            lat: newStartLat,
            lng: Number(this.startLng)
          });
        }
      }
    },
    startLng: {
      get: function() {
        return this.$store.state.journey.start.lng;
      },
      set: function(newStartLng) {
        if (newStartLng === "") {
          this.validationErrors.configStartCoords = "These fields cannot be blank.";
        } else if (! isLongitudeValid(newStartLng)) {
          this.validationErrors.configStartCoords = "You have entered an invalid longitude.";
        } else {
          this.validationErrors.configStartCoords = false;
          this.$store.dispatch("changeStartPosition", {
            lat: Number(this.startLat),
            lng: newStartLng
          });
        }
      }
    },
    endLat: {
      get: function() {
        return this.$store.state.journey.end.lat;
      },
      set: function(newEndLat) {
        if (newEndLat === "") {
          this.validationErrors.configEndCoords = "These fields cannot be blank.";
        } else if (! isLatitudeValid(newEndLat)) {
          this.validationErrors.configEndCoords = "You have entered an invalid latitude.";
        } else {
          this.validationErrors.configEndCoords = false;
          this.$store.dispatch("changeEndPosition", {
            lat: newEndLat,
            lng: Number(this.endLng)
          });
        }
      }
    },
    endLng: {
      get: function() {
        return this.$store.state.journey.end.lng;
      },
      set: function(newEndLng) {
        if (newEndLng === "") {
          this.validationErrors.configEndCoords = "These fields cannot be blank.";
        } else if (! isLongitudeValid(newEndLng)) {
          this.validationErrors.configEndCoords = "You have entered an invalid longitude.";
        } else {
          this.validationErrors.configEndCoords = false;
          this.$store.dispatch("changeEndPosition", {
            lat: Number(this.endLat),
            lng: newEndLng
          });
        }
      }
    },
  },
  methods: {
    resetApp() {
      if (process.env.NODE_ENV === "production") {
        localStorage.clear();
      } else {
        sessionStorage.clear();
      }
      location.reload();
    },
  },
};
</script>

<style scoped>

</style>
