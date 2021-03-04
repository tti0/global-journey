<template>
  <span>{{ distanceNumber }}{{ distanceUnit }}</span>
</template>

<script>
export default {
  props: ["kms"],
  computed: {
    distanceUnit: function() {
      if (this.$store.getters.units === "km" || this.$store.getters.units === "nm") {
        return this.$store.getters.units;
      } else {
        // miles
        if (this.kms * this.$store.getters.unitsModifier === 1) {
          return " mile";
        } else {
          return " miles";
        }
      }
    },
    distanceNumber: function () {
      return (this.kms * this.$store.getters.unitsModifier).toFixed(1);
    }
  }
}
</script>

<style>

</style>