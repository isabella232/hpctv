<template>
  <li class="stat-card row middle">
    <div
      v-if="cardData.iconPath"
      class="icon">
      <img :src="cardData.iconPath">
    </div>
    <div class="info col start">
      <span class="number lime">{{ insertCommas(cardData.statNumber) }}</span>
      <span class="label upper">{{ cardData.statName }}</span>
    </div>
  </li>
</template>

<script>
export default {
  name: 'stat-card',
  props: {
    cardData: {
      type: Object,
      required: true,
      default: '',
      validator(data) {
        return typeof data === 'object';
      }
    }
  },

  methods: {
    /**
      * inserts commas into the thousands and millions place of its argument
      * @param num Number
      */
    insertCommas(num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  }
};
</script>

<style src="../scss/stat-card.scss" lang="scss" scoped></style>