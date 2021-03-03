<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Configuration</p>
        <button class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <label for="config-units" class="label">15km = {{ (15 * $store.getters.unitsModifier).toFixed(2) }}{{ $store.getters.units }}</label>
          <div class="control">
            <div class="select">
              <select v-model="units" v-on:change="updateConfig()" name="config-units" id="config-units">
                <option value="km" default>Kilometre / km</option>
                <option value="mile">Miles / m</option>
                <option value="nm">Nautical miles / nm</option>
              </select>
            </div>
          </div>
        </div>

      </section>
      <footer class="modal-card-foot">
        Any changes have been saved automatically.
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  copmuted: {
    units () {
      return this.store.state.units;
    },
    modifierFromKm () {
      return this.store.state.unitsModifier;
    }
  },
  methods: {
    updateConfig: function() {
      this.$store.commit("changeUnits", this.units);
    }
  }
}
</script>

<style>

</style>