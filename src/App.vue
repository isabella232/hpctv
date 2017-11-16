<template>
<div id="app" >
  <side-nav></side-nav>
  <router-view></router-view>
  <footer class="app-footer" v-if="$route.path == '/'">
    <ul class="sponsors row center">
      <li><img src="https://placehold.it/200x50" alt=""></li>
      <li><img src="https://placehold.it/200x50" alt=""></li>
      <li><img src="https://placehold.it/200x50" alt=""></li>
    </ul>
  </footer>
</div>
</template>
    
<script>

import SideNav from './components/Side-Nav'

export default {
  name: 'app',
  components: {
    SideNav
  }
}
</script>

<style src="./scss/global.scss" lang="scss"></style>