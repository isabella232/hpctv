<template>
  <div class="not-found">
    <h1 class="lime">404</h1>
    <h1>Woops. You've hit a dead end. Let's try that again.</h1>
    <router-link to="/">Back to home</router-link>
  </div>
</template>

<style lang="scss" scoped>
  @import '../assets/scss/global';

.not-found {
  height: calc(100vh - 47px);

  h1.lime {
    font-size: 1000%;
    font-weight: 700;
  }

  a {
    color: $color_lime;
    text-decoration: underline;
  }
}
</style>
