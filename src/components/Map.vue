<template>
  <div id="mapContainer">
      <p>{{ currentPosition }}</p>
  </div>

</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.geodesic";
import GreatCircle from "great-circle";

export default {
  name: "Map",
  data: function() {
   return {
     center: L.latLng(0, 0),
     zoom: 2
   }
  },
  computed: {
    currentPosition: function() {
      var start = this.$store.getters.journeyStart;
      var end = this.$store.getters.journeyEnd;
      var bearing = GreatCircle.bearing(start.lat, start.lng, end.lat, end.lng);
      var currentDistance = this.$store.getters.distanceCovered;
      return GreatCircle.destination(start.lat, start.lng, bearing, currentDistance);
    }
  },
  methods: {
   setupLeafletMap: function () {
     const mapDiv = L.map("mapContainer").setView(this.center, this.zoom);
     L.tileLayer(
       "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
       {
         attribution:
           "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
       }
     ).addTo(mapDiv);
    var start = this.$store.getters.journeyStart;
    var end = this.$store.getters.journeyEnd;
    L.marker([start.lat, start.lng]).addTo(mapDiv)
      .bindPopup(`Journey start: ${start.name}`);
    L.marker([end.lat, end.lng]).addTo(mapDiv)
      .bindPopup(`Journey end: ${end.name}`);
    // journey geodesic
    var startCoords = {
      lat: start.lat,
      lng: start.lng
    };
    var endCoords = {
      lat: end.lat,
      lng: end.lng
    };
    L.geodesic([startCoords, endCoords]).addTo(mapDiv);
    // progress geodesic
    L.geodesic([startCoords, this.currentPosition], {color: "red"}).addTo(mapDiv);
   }
 },
 mounted: function() {
   this.setupLeafletMap();
 }
};
</script>

<style scoped>
  #mapContainer {
    height: 100vh;
  }
</style>
