<template>
  <div class="asc_pariette-stars">
    <i v-for="s in full" :key="'full' + s" class="stars" :class="'fas fa-star'" />
    <i v-for="f in other" :key="'other' + f" class="stars" :class="'far fa-star'" />
  </div>
</template>
<script>
export default {
  props: {
    stars: {
      type: Number,
      required: false,
      default () {
        return 1
      }
    }
  },
  computed: {
    full () {
      const star = this.stars
      return star
    },
    other () {
      const limit = 5
      const total = limit - this.full
      return total
    }
  }
}
</script>
<style lang="sass">
  .asc_pariette-stars
    position: relative
    color: orange
    display: block
    .stars
      float: left
      cursor: pointer
</style>
