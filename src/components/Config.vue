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
                <option disabled>Select an option...</option>
                <option value="km">Kilometre / km</option>
                <option value="mile">Miles / m</option>
                <option value="nm">Nautical miles / nm</option>
              </select>
            </div>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" v-on:click="updateConfig(); hideModal()">Save changes</button>
        <button class="button" aria-label="close" v-on:click="hideModal()">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    updateConfig: function() {
      console.log(this.units);
      this.$store.commit("changeUnits", this.units);
    },
    hideModal: function() {
      this.$store.commit("hideConfigModal");
    }
  }
}
</script>

<style>

</style>