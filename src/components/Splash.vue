<template>
  <div class="splash dead-center">
    <header class="text-center dead-center">
      <h1 class="lime upper">Meet Cheyenne:</h1>
      <blockquote class="upper white">
        &ldquo;{{ quote.text }}&rdquo;
        <p class="source lime">
          - {{ quote.source }}
        </p>
      </blockquote>
    </header>
    <div class="center">
      <div class="start-button upper dead-center" @click="handleStartClick()" ref="startButton">
        <span>Start</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    quote() {
      return this.$store.state.home.quote;
    }
  },
  methods: {
    /**
     * modifies the decentralized state in Vuex for whether or not the start button has been clicked. This ensures that the start button does not show up again until a new browser session is initiated, or the property is manually set back.
     */
    handleStartClick() {
      this.$store.commit('startButtonClicked');
    }
  }
};
</script>
