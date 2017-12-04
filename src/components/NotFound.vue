<template>
  <div class="col dead-center not-found">
    <h1>View not found</h1>
    <router-link to="/">Back to Home</router-link>
    <h2>Show Component:</h2>
    <ul class="row around" style="width:80%">
      <li @click="activeComponent = 'line'">Line Chart</li>
      <li @click="activeComponent = 'three'">Three JS</li>
    </ul>
    <line-graph v-if="activeComponent == 'line'"></line-graph>
    <three v-if="activeComponent == 'three'"></three>
  </div>
</template>

<script>
// import LineGraph from './graphs/LineGraph';
// import Three from './graphs/Three';

export default {
  // components: { LineGraph, Three },

  data() {
    return {
      activeComponent: 'three'
    };
  },

  created() {
    document.body.classList = '';
  }
};
</script>

<style lang="scss" scoped>
@import '../scss/global.scss';
li {
  cursor: pointer;
}
</style>
