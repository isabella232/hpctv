<template>
  <div class="col dead-center not-found">
    <h1>View not found</h1>
    <router-link to="/">Back to Home</router-link>
    <h2>Show Component:</h2>
    <ul class="row around" style="width:80%">
      <li @click="activeComponent = 'line'">Line Chart</li>
      <li @click="activeComponent = 'three'">Three JS</li>
    </ul>
    <!-- <line-graph v-if="activeComponent == 'line'"></line-graph> -->
  </div>
</template>

<script>
export default {

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
