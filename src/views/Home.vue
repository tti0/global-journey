<template>
  <div class="columns">
    <div class="column is-three-fifths">
      <StatisticsBar />
      <TheMap />
    </div>
    <div class="column">
      <JourneyList />
      <hr>
      <router-link to="/configuration" class="button is-link is-fullwidth">Change configuration</router-link>
    </div>
  </div>
</template>

<script>
import StatisticsBar from "@/components/StatisticsBar.vue";
import JourneyList from "@/components/JourneyList.vue";
import TheMap from "@/components/TheMap.vue";

export default {
  name: "HomeView",
  components: {
    StatisticsBar,
    JourneyList,
    TheMap,
  },
};
</script>
