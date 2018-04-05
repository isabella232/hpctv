<template>
  <section class="slide-up-modal" :class="{open: legendIsOpen}">
    <header @click="legendIsOpen = !legendIsOpen">
      <h3>
        <img src="/static/icon/plus-x-icon.svg" width="24">
        <span class="upper">{{title}}</span>
      </h3>
    </header>
    <slot>
    </slot>
  </section>
</template>

<script>
export default {
  props: ['title'],

  data() {
    return {
      legendIsOpen: false
    };
  },

  watch: {
    legendIsOpen(newVal) {
      // It's possible that this component may be initialized via a hash route. If so, then when we close it, we want to remove the hash.
      if (!newVal) {
        this.$router.replace(this.$route.path);
      }
    }
  }
};
</script>

<style lang="scss"  src="../../scss/slide-up-modal.scss" >

</style>
