<template>
  <div class="side-nav row between">
    <button class="prev" :class="{'invisible': isFirstPage}"><</button>
    <button class="next" :class="{'invisible': isLastPage}">></button>
  </div>
</template>

<script>
export default {
  name: 'side-nav',

  data() {
    return {
    }
  },

  computed: {
    isFirstPage() {
      return this.$route.path === '/'
    },

    isLastPage() {
      return this.$route.path === '/projects'
    }
  }
}
</script>