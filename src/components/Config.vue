<template>
  <div class="modal" v-bind:class="{ 'is-active' : $store.getters.configModalActive }">
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
                <option value="km">Kilometre / km</option>
                <option value="mile">Miles / m</option>
                <option value="nm">Nautical miles / nm</option>
              </select>
            </div>
          </div>
        </div>
        <div class="field">
          <label for="config-start-name" class="label">Name of start location</label>
          <div class="control">
            <input type="text" name="config-start-name" id="config-start-name" class="input">
          </div>
        </div>
        <!--<label for="config-start-lat" class="label">Co-ordinates of start location</label>
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
      </section>
      <footer class="modal-card-foot">
        Any changes you have made have been saved automatically.
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    units: {
      get () {
        return this.$store.getters.units;
      },
      set(value) {
        this.$store.commit("changeUnits", value);
      }
    }
  },
  methods: {
    hideModal: function() {
      this.$store.commit("hideConfigModal");
    }
  }
}
</script>

<style>

</style>