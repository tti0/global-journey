<template>
  <div id="app">
    <Config />
    <section class="section">
      <div class="container">
        <h1 class="title">Hello world!</h1>
        <p class="subtitle">Hello world again!</p>
        <div class="columns">
          <div class="column is-two-thirds">
            Map
          </div>
          <div class="column">
            Journeys
          </div>
        </div>
      </div> <!-- close container -->
    </section>
    <Footer />
  </div>
</template>

<script>
import Config from "./components/Config.vue"
import Footer from "./components/Footer.vue"

export default {
  name: "App",
  components: {
    Config,
    Footer
  }
}
</script>

<style>
@import "../node_modules/bulma/css/bulma.css";
</style>
