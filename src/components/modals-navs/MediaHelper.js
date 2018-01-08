import { Slide } from 'vue-carousel';

export default {
  extends: Slide,
  data() {
    return {
      mediaType: null,
      ID: null
    };
  },

  computed: {
    currentSlide() {
      return this.$parent.currentPage;
    }
  },

  methods: {
    /**
      * this function may not be used in the present implementation.
      */
    getDataType() {
      if (typeof this.$slots === 'object') {
        this.mediaType = this.$slots.default[0].tag;
        return this.$slots.default[0].tag;
      }
    }
  },

  mounted() {
    // this.mediaType = this.getDataType();
    // this.$parent.$emit('mediaType', this.mediaType);
  }
};
