<template>
  <div class="three-modal" :class="{open: visible}" id="three-modal">
    <a class="button" :class="(visible) ? 'open' : 'closed'" @click="toggle()">
      <img src="../../assets/icon/plus-x-icon.svg" alt="expand / collapse">
    </a>
    <div class="modal-body" :class="{inverted: opensInverted}">
      <header class="row upper">
        <span>{{data.modalData.title}}</span>
      </header>
      <div class="row start panel-container">
        <div class="panel right">
          <p class="subtitle lime bold upper">{{data.modalData.subtitle | numFormatter}} Core Hours Used In The Last 30 Days</p>
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

  filters: {
    /**
     * Used to adjust the notation of larger numbers. e.g. (100,000 => 100k).
     * @param {Number} num the number to transform.
     * @returns {String} numbers under 49,000 get comma treatment.
     */
    numFormatter(num) {
      if (num < 49000) {
        // Comma notation.
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      } else {
        const map = [{ value: 1, symbol: '' }, { value: 1e3, symbol: 'K' }, { value: 1e6, symbol: 'M' }, { value: 1e9, symbol: 'B' }, { value: 1e12, symbol: 'T' }];
        const parser = /\.0+$|(\.[0-9]*[1-9])0+$/;
        let i;
        for (i = map.length - 1; i > 0; i--) {
          if (num >= map[i].value) {
            break;
          }
        }
        return (num / map[i].value).toFixed(1).replace(parser, '$1') + map[i].symbol;
      }
    }
  },
  
  watch: {
    data: {
      deep: true,
      handler() {
        const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        const el = document.querySelector('#three-modal');

        if (viewportWidth > 768) {
          el.style.left = this.data.x + '%';
          el.style.top = this.data.y + '%';
        } else {
          el.style.left = '15%';
          el.style.top = '25%';
        }
        this.toggle();
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

<style src="../../assets/scss/three-modal.scss" lang="scss" scoped></style>
