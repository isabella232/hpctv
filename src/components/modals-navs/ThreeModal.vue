<template>
  <div class="three-modal" :class="{open: visible}" id="three-modal">
    <a class="button" :class="(visible) ? 'open' : 'closed'" @click="toggle()">
      <img src="/static/icon/plus-x-icon.svg" alt="expand / collapse">
    </a>
    <div class="modal-body" :class="{inverted: opensInverted}">
      <header class="row upper">
        <span>{{data.modalData.title}}</span>
      </header>
      <div class="row start panel-container">
        <div class="panel right">
          <p class="subtitle lime bold upper">{{data.modalData.subtitle}} Core Hours Used Today</p>
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
  name: 'three-modal',
  props: {
    data: Object
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
      this.visible = !this.visible;
    }
  },
  computed: {
    opensInverted() {
      if (this.data.x >= 50) {
        return true;
      } else {
        return false;
      }
    }
  },

  watch: {
    data: {
      deep: true,
      handler(newVal) {
        const el = document.querySelector('#three-modal');
        // if (newVal.x !== 0) {
          el.style.left = this.data.x + '%';
          el.style.top = this.data.y + '%';
          this.toggle();
        // }
      }
    },

    visible(newVal){
      // if visible is false, re-render all the sprites.
      if (!newVal) {
        this.$store.commit('renderAllSprites', true);
      }
    }
  }
};
</script>

<style src="../../scss/three-modal.scss" lang="scss" scoped></style>
