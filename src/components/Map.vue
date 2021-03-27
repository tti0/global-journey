<template>
  <div>
    <vl-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true" data-projection="EPSG:4326" style="height: 400px">
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
        <vl-geom-multi-line-string :coordinates="[geodesicPath]"></vl-geom-multi-line-string>
      </vl-feature>
    </vl-map>
    <p>{{ geodesicPath }}</p>
  </div>
</template>

<script>
import GreatCircle from "great-circle";

export default {
  computed: {
    geodesicPath: function () {
      var steps = 20;
      var points = Array(steps);
      points[0] = 0;
      var step = this.$store.getters.distanceToCover / steps;
      for (var i = 1; i <= steps; i++) {
        points[i] = points[i - 1] + step;
      }
      var start = this.$store.getters.journeyStart;
      var bearing = this.$store.getters.bearingToEnd;
      for (var j = 0; j <= steps; j++) {
        var thisDestination = GreatCircle.destination(start.lat, start.lng, bearing, points[j])
        points[j] = [thisDestination.LON, thisDestination.LAT];
      }
      return points;
    }
  },
  data: function() {
    return { 
      zoom: 2,
      center: [0, 0],
      rotation: 0
    }
  }
}
</script>

<style scoped>
.overlay-content {
	background: #efefef;
	box-shadow: 0 5px 10px rgba(2, 2, 2, 0.2);
	padding: 10px 20px;
}
</style>