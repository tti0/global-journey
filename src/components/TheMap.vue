<template>
  <div>
  <vl-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true" data-projection="EPSG:4326" style="height: 500px">
    <vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation"></vl-view>
    <vl-layer-tile id="osm">
      <vl-source-osm></vl-source-osm>
    </vl-layer-tile>
    <!-- Start -->
    <vl-feature>
      <vl-geom-point :coordinates="[$store.getters.journeyStart.lng, $store.getters.journeyStart.lat]"></vl-geom-point>
    </vl-feature>
    <vl-overlay :position="[$store.getters.journeyStart.lng, $store.getters.journeyStart.lat]">
      <div class="overlay-content">Start ({{ $store.getters.journeyStart.name }})</div>
    </vl-overlay>
    <!-- End -->
    <vl-feature>
      <vl-geom-point :coordinates="[$store.getters.journeyEnd.lng, $store.getters.journeyEnd.lat]"></vl-geom-point>
    </vl-feature>
    <vl-overlay :position="[$store.getters.journeyEnd.lng, $store.getters.journeyEnd.lat]">
      <div class="overlay-content">End ({{ $store.getters.journeyEnd.name }})</div>
    </vl-overlay>
    <!-- Geodesic path -->
    <vl-feature>
      <vl-geom-line-string :coordinates="geodesicPath"></vl-geom-line-string>
    </vl-feature>
    <!-- Current -->
    <div v-if="($store.getters.distanceCovered !== 0) && (! ($store.getters.distanceCovered >= $store.getters.distanceToCover))">
      <vl-feature>
        <vl-geom-point :coordinates="[$store.getters.journeyCurrent.lng, $store.getters.journeyCurrent.lat]"></vl-geom-point>
      </vl-feature>
      <vl-overlay :position="[$store.getters.journeyCurrent.lng, $store.getters.journeyCurrent.lat]">
        <div class="overlay-content">Current position ({{ $store.getters.journeyCurrent.name }})</div>
      </vl-overlay>
    </div>
  </vl-map>
  </div>
</template>

<script>
import GreatCircle from "great-circle";

export default {
  name: "TheMap",
  computed: {
    geodesicPath() {
      const steps = 25;
      const points = Array(steps);
      points[0] = 0;
      const step = this.$store.getters.distanceToCover / steps;
      for (let i = 1; i <= steps; i++) {
        points[i] = points[i - 1] + step;
      }
      const start = this.$store.getters.journeyStart;
      const bearing = this.$store.getters.bearingToEnd;
      for (let j = 0; j <= steps; j++) {
        const thisDestination = GreatCircle.destination(start.lat, start.lng, bearing, points[j]);
        points[j] = [thisDestination.LON, thisDestination.LAT];
      }
      return points;
    },
  },
  data() {
    return {
      zoom: 2,
      center: [0, 0],
      rotation: 0,
    };
  },
};
</script>

<style scoped>
.overlay-content {
  background: #efefef;
  box-shadow: 0 5px 10px rgba(2, 2, 2, 0.2);
  padding: 10px 20px;
}
</style>
