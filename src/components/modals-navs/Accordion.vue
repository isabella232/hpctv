<template>
  <div class="accordion">
    <div class="accordion-header" @click="toggleAccordion()" ref="header">
      <slot name="header"></slot>
    </div>

    <div class="accordion-content" ref="content">
      <div class="content-wrapper">
        <slot name="content"></slot>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Accordion',
  props: {
    instance: {
      type: Number,
      required: false,
      default: 0
    }
  },
  data() {
    return {
      header: null,
      content: null
    };
  },

  methods: {
    toggleAccordion() {
      const content = this.$refs['content'];
      this.$refs['header'].classList.toggle('active');
      content.style.maxHeight = content.style.maxHeight ? null : content.scrollHeight + 'px';
    }
  },

  mounted() {
    const header = this.$slots.header[0];
    const content = this.$slots.content[0];

    this.header = header;
    this.content = content;

    // console.log(header);
    // console.log(content);
  }
};
</script>

<style lang="scss" scoped>
.accordion {
  padding: 0 0.5em;
  .accordion-header {
    @include gradient_grey-linear;
    border-bottom: solid 5px $color_dark_grey;
    color: #444;
    cursor: pointer;
    padding: 1em;
    width: 100%;
    border: none;
    text-align: left;
    outline: none;
    transition: 0.4s;
    margin-bottom: 5px;
    position: relative;
    &::after {
      position: absolute;
      right: 1.5em;
      content: '\002B';
      color: $color_lime;
      font-weight: bold;
    }

    &.active::after {
      content: '\2212';
    }
  }
  .accordion-content {
    margin-bottom: 10px;
    background-color: $color_dark_grey;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.2s ease-out;

    .content-wrapper {
      padding: 10px 1em;
      color: lighten($color_light_grey, 15%);
    }

    .subtitle{
      display: block;
      color: $color_white;
      text-transform: uppercase;
      font-family: $font_poppins_bold;
      font-size: 112.5%;
      line-height: 1.2;
    }
  }
}
</style>
