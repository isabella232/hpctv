<template>
  <div class="small-modal" :id="getID">
    <button :class="(visible) ? 'open' : 'closed'" @click="toggle()"><img src="/static/icon/plus-x-icon.svg" alt="expand / collapse"></button>
    <div class="modal-body" v-if="visible">
      <header class="row upper">
        <span>{{data.modalData.title}}</span>
      </header>
      <div class="row start panel-container">
        <div class="panel left">
          <img src="http://www.rackworld.com.au/media/service-01.jpg" alt="">
        </div>
        <div class="panel right">
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
    toggle() {
      // console.log(document.querySelectorAll('button.open').length)
      // if (document.querySelectorAll('button.open').length) {
      //   document.querySelectorAll('button.open').classList.remove('open');
      // }
      this.visible = !this.visible;
    }
  },
  computed: {
    getID() {
      return this.data.modalData.title.toLowerCase().replace(/ /g, '-');
    }
  },

  mounted() {
    const selector = `#${this.getID}`;
    const el = document.querySelector(selector);
    el.style.left = this.data.x + '%';
    el.style.top = this.data.y + '%';
  }
};
</script>

<style src="../scss/small-modal.scss" lang="scss"></style>
