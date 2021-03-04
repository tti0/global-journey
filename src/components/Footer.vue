<template>
  <footer class="footer">
    <div class="content has-text-centered">
      <button class="button is-info mb-3" v-on:click="showConfigModal()">Configuration</button>
      <p>Copyright etc.</p>
      <p>Favicon: Globe by Alvaro Cabrera from the Noun Project</p>
    </div>
  </footer>
</template>

<script>
export default {
  methods: {
    showConfigModal: function() {
      this.$store.commit("showConfigModal");
    }
  }
}
</script>

<style>

</style>