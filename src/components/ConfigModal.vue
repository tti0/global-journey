<template>
  <div class="modal" v-bind:class="{ 'is-active' : $store.state.configModalActive }">
    <div class="modal-background"></div>
    <div class="modal-card">

      <header class="modal-card-head">
        <p class="modal-card-title">Configuration</p>
        <button class="delete" aria-label="close" v-on:click="hideModal()"></button>
      </header>

      <section class="modal-card-body">
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
            <input required type="text" name="config-start-name" id="config-start-name" class="input" v-model="startName">
          </div>
        </div>

        <!--
        <label for="config-start-lat" class="label">Co-ordinates of start location</label>
        <div class="field is-grouped">
          <div class="control">
          <input type="text" name="config-start-lat" id="config-start-lat" class="input" placeholder="Latitude">
          </div>
          <p class="control">,</p>
          <div class="control">
          <input type="text" name="config-start-long" id="config-start-long" class="input" placeholder="Longitude">
          </div>
        </div>
        <p class="help">Co-ordinates should be specified as signed decimals (e.g. -2 for 2°W, 2 for 2°E).</p>
        -->

        <div class="field">
          <label for="config-start-name" class="label">Name of end location</label>
          <div class="control">
            <input required type="text" name="config-end-name" id="config-end-name" class="input" v-model="endName">
          </div>
        </div>

        <div class="field">
          <label for="config-reset" class="label">Reset application (this will clear localStorage and is irrevesible!)</label>
          <div class="control">
            <button class="button is-danger" name="config-reset" id="config-reset" v-on:click="resetApp()">Reset</button>
          </div>
        </div>
      
      </section>

      <footer class="modal-card-foot">
        Any changes you have made have been saved automatically.
      </footer>

    </div>
  </div>
</template>

<script>
export default {
  name: "ConfigModal",
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
        this.$store.commit("changeJourneyStartName", newStartName);
      }
    },
    endName: {
      get: function() {
        return this.$store.state.journey.end.name;
      },
      set: function(newEndName) {
        this.$store.commit("changeJourneyEndName", newEndName);
      }
    }
  },
  methods: {
    hideModal() {
      this.$store.commit("hideConfigModal");
    },
    resetApp() {
      if (process.env.NODE_ENV === "production") {
        localStorage.clear();
      } else {
        sessionStorage.clear();
      }
      location.reload();
    }
  },
};
</script>

<style scoped>

</style>
