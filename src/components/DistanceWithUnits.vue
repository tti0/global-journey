<template>
  <span>{{ distanceNumber }}{{ distanceUnit }}</span>
</template>

<script>
export default {
  props: ["kms"],
  computed: {
    distanceUnit() {
      if (this.$store.state.units === "km" || this.$store.state.units === "nm") {
        return this.$store.state.units;
      }
      // miles
      if (this.kms * this.$store.state.unitsModifier === 1) {
        return " mile";
      }
      return " miles";
    },
    distanceNumber() {
      return (this.kms * this.$store.state.unitsModifier).toFixed(1);
    },
  },
};
</script>

<style scoped>

</style>
