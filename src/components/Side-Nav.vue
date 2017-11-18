<template >
  <div class="side-nav row between" v-if="$route.name != 'not-found'">
    <button class="prev"
      :class="{'invisible': isFirstPage}"
      @click="$router.go(-1)"
      ><</button>

    <button class="next"
      :class="{'invisible': isLastPage}"
      @click="nextPage()"
      >></button>
  </div>
</template>

<script>
export default {
  name: 'side-nav',

  data() {
    return {
      pages: []
    }
  },

  computed: {
    isFirstPage() {
      return this.$route.path === '/'
    },

    isLastPage() {
      return this.$route.name === this.pages[this.pages.length - 1]
    },

    getCurrentPageIndex() {
      return this.pages.indexOf(this.$route.name)
    }
  },

  methods: {
    nextPage() {
      let currentPage = this.getCurrentPageIndex
      this.$router.push(this.pages[currentPage += 1])
    },

    getAllRoutes() {
      const routeNames = []
      this.$router.options.routes.forEach(route => {
        if (route.name !== 'not-found') {
          routeNames.push(route.name)
        }
      })
      this.pages = routeNames
    }
  },

  created() {
    this.getAllRoutes()
  }
}
</script>