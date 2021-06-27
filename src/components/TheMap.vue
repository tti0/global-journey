<template>
  <div>
  <vl-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true" data-projection="EPSG:4326" style="height: 500px">
    <vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation"></vl-view>
    <vl-layer-tile id="osm">
      <vl-source-osm></vl-source-osm>
    </vl-layer-tile>
    <!-- Start -->
    <vl-feature>
      <vl-geom-point :coordinates="[$store.state.journey.start.lng, $store.state.journey.start.lat]"></vl-geom-point>
    </vl-feature>
    <vl-overlay :position="[$store.state.journey.start.lng, $store.state.journey.start.lat]">
      <div class="overlay-content">Start<span v-if="$store.state.journey.start.name !== ''"> ({{ $store.state.journey.start.name }})</span></div>
    </vl-overlay>
    <!-- End -->
    <vl-feature>
      <vl-geom-point :coordinates="[$store.state.journey.end.lng, $store.state.journey.end.lat]"></vl-geom-point>
    </vl-feature>
    <vl-overlay :position="[$store.state.journey.end.lng, $store.state.journey.end.lat]">
      <div class="overlay-content">End<span v-if="$store.state.journey.end.name !== ''"> ({{ $store.state.journey.end.name }})</span></div>
    </vl-overlay>
    <!-- Geodesic path -->
    <vl-feature>
      <vl-geom-line-string :coordinates="geodesicPath"></vl-geom-line-string>
    </vl-feature>
    <!-- Current -->
    <div v-if="($store.getters.totalDistanceCoveredKms !== 0) && (! ($store.getters.totalDistanceCoveredKms >= $store.state.journey.distanceToCover))">
      <vl-feature>
        <vl-geom-point :coordinates="[$store.state.journey.current.lng, $store.state.journey.current.lat]"></vl-geom-point>
      </vl-feature>
      <vl-overlay :position="[$store.state.journey.current.lng, $store.state.journey.current.lat]">
        <div class="overlay-content">Current position ({{ $store.state.journey.current.name }})</div>
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
      const step = this.$store.state.journey.distanceToCover / steps;
      for (let i = 1; i <= steps; i++) {
        points[i] = points[i - 1] + step;
      }
      const start = this.$store.state.journey.start;
      const bearing = this.$store.state.journey.bearingToEnd;
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
