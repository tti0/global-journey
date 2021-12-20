<template>
  <div id="app">
    <section class="section">
      <div class="container">
        <div class="notification is-warning is-light">
          This project is not entirely complete and is no longer maintained. Please see the <a href="https://github.com/tti0/global-journey">repository</a> for details.
        </div>
        <h1 class="title">global-journey</h1>
        <p class="subtitle">Track contributions to a journey across the world</p>
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
@import "../node_modules/bulma/css/bulma.min.css";
</style>
