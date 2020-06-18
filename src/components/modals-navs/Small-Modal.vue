<template>
  <div class="small-modal" :id="getID" :class="{open: visible}">
    <a class="button" :class="(visible) ? 'open' : 'closed'" @click="toggle()" v-show="(showButton)">
      <img src="../../assets/icon/plus-x-icon.svg" alt="expand / collapse">
    </a>
    <div class="modal-body" :class="{inverted: opensInverted}">
      <header class="upper align-center">
        <span>{{data.modalData.title}}</span>
      </header>
      <div class="start panel-container">

        <div class="panel left" v-if="data.modalData.media">
          <video :src="data.modalData.media" loop muted playsinline></video>
        </div>
        <div class="panel right" ref="smallModalText">
          <p class="subtitle lime bold upper">{{data.modalData.subtitle}}</p>
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
  props: {
    data: Object,
    showButton: {
      type: Boolean,
      required: false,
      default: true
    }
  },

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
      return this.data.x >= 50;
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
      newVal ? this.video.play() : this.video.pause();
    }
  }
};
</script>

<style src="../../assets/scss/small-modal.scss" lang="scss" scoped></style>
