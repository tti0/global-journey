<template>
  <span>{{ distanceNumber }}{{ distanceUnit }}</span>
</template>

<script>
export default {
  props: ["kms"],
  computed: {
    distanceUnit() {
      if (this.$store.getters.units === "km" || this.$store.getters.units === "nm") {
        return this.$store.getters.units;
      }
      // miles
      if (this.kms * this.$store.getters.unitsModifier === 1) {
        return " mile";
      }
      return " miles";
    },
    distanceNumber() {
      return (this.kms * this.$store.getters.unitsModifier).toFixed(1);
    },
  },
};
</script>

<style scoped>

</style>
