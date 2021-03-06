<template>
  <nav class="level">
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">Distance covered so far</p>
        <p class="title"><DistanceWithUnits v-bind:kms="$store.getters.distanceCovered" /></p>
      </div>
    </div>
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">Percentage covered so far</p>
        <p class="title">{{ Math.round($store.getters.distanceCovered / $store.getters.distanceToCover * 100) }}%</p>
      </div>
    </div>
    <div class="level-item has-text-centered" v-if="$store.getters.distanceCovered < $store.getters.distanceToCover">
      <div>
        <p class="heading">Distance remaining</p>
        <p class="title"><DistanceWithUnits v-bind:kms="$store.getters.distanceToCover - $store.getters.distanceCovered" /></p>
      </div>
    </div>
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">Target distance</p>
        <p class="title"><DistanceWithUnits v-bind:kms="$store.getters.distanceToCover" /></p>
     </div>
    </div>
  </nav>
</template>

<script>
import DistanceWithUnits from "./DistanceWithUnits.vue";

export default {
  components: {
    DistanceWithUnits
  }
}
</script>

<style>

</style>