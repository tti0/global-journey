<template>
  <div id="app">
    <section class="section">
      <div class="container">
        <h1 class="title">global-journey</h1>
        <p class="subtitle">Subtitle</p>
        <router-view></router-view>
      </div>
    </section>
    <TheFooter />
  </div>
</template>

<script>
import TheFooter from "./components/TheFooter.vue";

export default {
  name: "App",
  components: {
    TheFooter,
  },
};
</script>

<style>
@import "../node_modules/bulma/css/bulma.css";
</style>
