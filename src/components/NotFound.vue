<template>
  <div class="col dead-center not-found">
    <h1>View not found</h1>
    <router-link :to="{name:'home'}">Back to Home</router-link>
  </div>
</template>

<script>

export default {
  created() {
    document.body.classList = ''
  }
}
</script>

<style lang="scss" scoped>
  @import '../scss/global.scss';

</style>
