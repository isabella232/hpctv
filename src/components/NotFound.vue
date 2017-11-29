<template>
  <div class="col dead-center not-found">
    <h1>View not found</h1>
    <router-link to="/">Back to Home</router-link>
    <line-graph></line-graph>
  </div>
</template>

<script>
import LineGraph from './graphs/LineGraph.vue';

export default {

  components: {LineGraph},

  created() {
    document.body.classList = '';
  }
};
</script>

<style lang="scss" scoped>
@import '../scss/global.scss';
</style>
