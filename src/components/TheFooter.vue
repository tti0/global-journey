<template>
  <footer class="footer">
  <div class="content has-text-centered">
    <button class="button is-info mb-3" v-on:click="showConfigModal()">Configuration</button>
    <p>global-journey by Theodore Tucker (tti0)</p>
    <p>Copyright &copy; 2021, Licensed under the MIT License</p>
    <p>Favicon: <a href="https://thenounproject.com/search/?q=1822912&i=1822912">Globe</a> by <a href="https://thenounproject.com/vendetusvectores/">Alvaro Cabrera</a> from <a href="https://thenounproject.com/">The Noun Project</a></p>
  </div>
  </footer>
</template>

<script>
export default {
  name: "TheFooter",
  methods: {
    showConfigModal() {
      this.$store.commit("showConfigModal");
    },
  },
};
</script>

<style scoped>

</style>
