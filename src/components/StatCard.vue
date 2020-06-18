<template>
  <li class="stat-card row middle">
    <div v-if="cardData.iconPath" class="icon">
      <img :src="cardData.iconPath">
    </div>
    <div class="info start">
      <div class="number lime">{{ cardData.statNumber | numFormatter}}
        <div class="extra" v-if="cardData.infoIcon" @click.prevent.stop="extraEL()">
          <a href=""><img :src="require('@/assets/icon/info-icon.svg')" width="28" alt=""></a>
        </div>
      </div>
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
      // default: '',
      validator(data) {
        return typeof data === 'object';
      }
    },

    extraEL:{
      type: Function,
      required: false,
      default: function(){
        this.$emit('StatCardWasClicked');
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
  }
};
</script>

<style src="../assets/scss/stat-card.scss" lang="scss" scoped></style>