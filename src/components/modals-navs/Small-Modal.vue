<template>
  <div class="small-modal" :id="getID" :class="{open: visible}">
    <button :class="(visible) ? 'open' : 'closed'" @click="toggle()">
      <img src="/static/icon/plus-x-icon.svg" alt="expand / collapse">
    </button>
    <div class="modal-body" :class="{inverted: opensInverted}" >
      <header class="row upper">
        <span>{{data.modalData.title}}</span>
      </header>
      <div class="row start panel-container">
        <div class="panel left">
          <video src="/static/video/data-tx.mp4" loop muted playsinline></video>
        </div>
        <div class="panel right">
          <p class="subtitle">{{data.modalData.subtitle}}</p>
          <p>
            {{data.modalData.body}}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'small-modal',
  props: ['data'],

  data() {
    return {
      visible: false
    };
  },

  methods: {
    /**
     * Toggles the visibility of the sender modal. Emits an event to the parent to turn all modals off first.
     */
    toggle() {
      if (this.visible) {
        this.visible = !this.visible;
      } else {
        this.$parent.allOff();
        this.visible = !this.visible;
      }
    }
  },
  computed: {
    getID() {
      return this.data.modalData.title.toLowerCase().replace(/ /g, '-');
    },

    opensInverted() {
      if (this.data.x >= 50) {
        return true;
      } else {
        return false;
      }
    }
  },

  mounted() {
    const selector = `#${this.getID}`;
    const el = document.querySelector(selector);
    el.style.left = this.data.x + '%';
    el.style.top = this.data.y + '%';
  },

  watch: {
    visible(newVal) {
      this.video = document.querySelector(`#${this.getID} video`);
      newVal ? this.video.play() : setTimeout(() => this.video.currentTime = 0, 1000);
    }
  }
};
</script>

<style src="../../scss/small-modal.scss" lang="scss"></style>
