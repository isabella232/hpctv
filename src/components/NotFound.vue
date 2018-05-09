<template>
  <div class="col dead-center not-found">
    <h1 class="lime">404</h1>
    <h1>Woops. You've hit a dead end. Let's try that again.</h1>
    <router-link to="/">Back to home</router-link>
  </div>
</template>

<script>
</script>

<style lang="scss" scoped>
.not-found {
  height: 100vh;

  h1.lime {
    font-size: 1000%;
    font-family: $font_poppins_bold;
    margin-top: -10%;
  }

  a {
    color: $color_lime;
    text-decoration: underline;
  }
}
</style>
