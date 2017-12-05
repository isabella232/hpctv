<template>
  <div class="splash col dead-center">
    <header class="col text-center dead-center">
      <h1>
        <span class="lime upper">Meet Cheyenne:</span>
      </h1>
      <blockquote class="upper white">
        &ldquo; {{ quote.text }} &rdquo;
        <p class="source lime">
          - {{ quote.source }}
        </p>
      </blockquote>
    </header>
    <div class="row center">
      <button class="start-button upper" @click="handleStartClick()">Start</button>
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
    handleStartClick() {
      this.$store.commit('startButtonClicked');
    }
  }
};
</script>