<template>
  <div id="app">
    <Config />
    <section class="section">
      <div class="container">
        <h1 class="title">global-journey</h1>
        <p class="subtitle">Hello world!</p>
        <div class="columns">
          <div class="column is-three-fifths">
            <Statistics />
            <Map />
          </div>
          <div class="column">
            <JourneyList />
          </div>
        </div>
      </div> <!-- close container -->
    </section>
    <Footer />
  </div>
</template>

<script>
import Config from "./components/Config.vue";
import Footer from "./components/Footer.vue";
import Statistics from "./components/Statistics.vue";
import JourneyList from "./components/JourneyList.vue";
import Map from "./components/Map.vue";

export default {
  name: "App",
  components: {
    Config,
    Footer,
    Statistics,
    JourneyList,
    Map
  }
}
</script>

<style>
@import "../node_modules/bulma/css/bulma.css";
</style>
