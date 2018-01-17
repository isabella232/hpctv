<template>
    <div class="vm-accordion">
      <button class="vm-acc-header">
        <slot name="header">
        </slot>
        </button>
      <div class="vm-acc-content">
        <slot name="content"></slot>
      </div>
    </div>
</template>

<script>
export default {
  mounted() {
    let acc = document.getElementsByClassName('vm-acc-header');
    let i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener('click', function() {
        this.classList.toggle('active');
        let content = this.nextElementSibling;
        if (content.style.maxHeight) {
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    }
  }
};
</script>

<style lang="scss" src="../../scss/accordion.scss" scoped>
</style>
