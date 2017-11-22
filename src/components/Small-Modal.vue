<template>
  <div class="small-modal">
    <button :class="(visible) ? 'open' : 'closed'" @click="toggle()"><img src="/static/icon/plus-x-icon.svg" alt="expand / collapse"></button>
    <div class="modal-body" v-if="visible">
      <header class="row upper">
        <span>title</span>
      </header>
      <div class="row start panel-container">
        <div class="panel left">
          <img src="http://www.rackworld.com.au/media/service-01.jpg" alt="">
        </div>
        <div class="panel right">
          <p>
            This is some text about cable management and some other things.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'small-modal',
  data() {
    return {
      visible: false
    };
  },

  methods: {
    toggle() {
      this.visible = !this.visible;
    }
  }
};
</script>

<style src="../scss/small-modal.scss" lang="scss"></style>
