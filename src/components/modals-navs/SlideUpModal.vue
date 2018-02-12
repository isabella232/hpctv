<template>
  <section class="slide-up-modal" :class="{open: legendIsOpen}">
    <header @click="legendIsOpen = !legendIsOpen">
      <h3>
        <img src="/static/icon/plus-x-icon.svg" width="24">
        <span class="upper">{{title}}</span>
      </h3>
    </header>
    <legend class="legend">
      <dl class="legend-list col wrap">
        <div class="legend-item" v-for="term in vuex.glossary" :key="term.title">
          <dt class="upper lime">{{ term.title }}</dt>
          <dd>
            {{ term.definition }}
          </dd>
        </div>
      </dl>
    </legend>
  </section>
</template>

<script>
export default {
  data() {
    return {
      title: 'Glossary',
      legendIsOpen: false
    };
  },

  computed: {
    vuex() {
      return this.$store.state.specs;
    }
  }
};
</script>

<style lang="scss"  src="../../scss/slide-up-modal.scss" scoped>

</style>
