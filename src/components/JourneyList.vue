<template>
  <div style="max-height: 500px; overflow: auto;">
    <button class="button" v-on:click="$store.commit('newJourney', ['Theodore', 10])">Create new journey</button>
    <ul>
      <li v-for="i in $store.getters.journeys" v-bind:key="i.id">
        {{ i }} 
        <button class="button" v-on:click="$store.commit('dropJourney', i.id)">X</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>