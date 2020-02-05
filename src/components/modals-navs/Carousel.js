import { Carousel } from 'vue-carousel';

export default {
  extends: Carousel,
  methods: {
    /**
     * Set the current page to a specific value
     * This function will only apply the change if the value is within the carousel bounds
     * @param  {Number} page The value of the new page number
     * @override function from Carousel.vue@methods.GoToPage.
     */
    goToPage(page) {
      if (page >= 0 && page <= this.pageCount) {
        this.currentPage = page;
        this.$emit('pageChange', this.currentPage);
      }
    }
  }
}
