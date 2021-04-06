<template>
  <div id="app">
  <ConfigModal />
  <section class="section">
    <div class="container">
    <h1 class="title">global-journey</h1>
    <p class="subtitle">Subtitle</p>
    <div class="columns">
      <div class="column is-three-fifths">
      <StatisticsBar />
      <TheMap />
      </div>
      <div class="column">
      <JourneyList />
      </div>
    </div>
    </div> <!-- close container -->
  </section>
  <TheFooter />
  </div>
</template>

<script>
import ConfigModal from "./components/ConfigModal.vue";
import TheFooter from "./components/TheFooter.vue";
import StatisticsBar from "./components/StatisticsBar.vue";
import JourneyList from "./components/JourneyList.vue";
import TheMap from "./components/TheMap.vue";

export default {
  name: "App",
  components: {
    ConfigModal,
    TheFooter,
    StatisticsBar,
    JourneyList,
    TheMap,
  },
};
</script>

<style>
@import "../node_modules/bulma/css/bulma.css";
</style>
