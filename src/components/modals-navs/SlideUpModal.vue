<template>
  <section class="slide-up-modal" :class="{open: legendIsOpen}">
    <header @click="toggleState()">
      <h3>
        <img src="../../assets/icon/plus-x-icon.svg" width="24">
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
  },

  methods: {
    toggleState() {
      this.legendIsOpen = !this.legendIsOpen;
      document.querySelector('body').classList.toggle('freeze');
      document.querySelector('html').classList.toggle('freeze');
    }
  }
};
</script>

<style lang="scss"  src="../../assets/scss/slide-up-modal.scss" >
</style>
