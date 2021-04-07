<template>
  <section>
    <h4 class="is-size-4">Contributions</h4>
    <div class="journeylist">
      <button class="button" v-on:click="$store.dispatch('newContribution', {contributor: 'Test', distanceKms: 100})" v-if="! ($store.getters.distanceCovered >= $store.getters.distanceToCover)">Create new journey</button>
      <p v-if="$store.getters.contributions.length === 0">No contributions have been recorded yet.</p>
      <table class="table mr-2 ml-2" v-if="$store.getters.contributions.length > 0">
        <thead>
          <tr>
            <th></th>
            <th>Time</th>
            <th>Distance</th>
            <th>Contributor</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in $store.getters.contributions" v-bind:key="i.id">
            <th><button class="button is-small is-danger" v-on:click="$store.dispatch('dropContribution', i.id)">✗</button></th>
            <td>{{ toRelativeTime(i.time) }}</td>
            <td><DistanceWithUnits v-bind:kms="i.distanceKms" /></td>
            <td>{{ i.contributor }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import DistanceWithUnits from "./DistanceWithUnits.vue";

dayjs.extend(relativeTime);

export default {
  components: {
    DistanceWithUnits,
  },
  methods: {
    toRelativeTime(date) {
      return dayjs(date).fromNow();
    },
  },
};
</script>

<style scoped>
.journeylist {
  max-height: 500px;
  overflow: auto;
}
</style>
