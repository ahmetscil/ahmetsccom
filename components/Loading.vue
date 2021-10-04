<template>
  <div v-if="loading" class="loading-page" :tag="loading">
    <div class="loading-logo">
      <img src="../assets/canvas-logo-black.svg">
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    loading: false
  }),
  methods: {
    start () {
      this.loading = true
    },
    finish () {
      this.loading = false
    },
    hebele () {
      return true
    }
  }
}
</script>
<style scoped lang="sass">
  .loading-page
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: #fff
    z-index: 999999
    .loading-logo
      width: 200px
      margin: auto
      padding-top: 40vh
      text-align: center
      & img
        width: 100%
</style>
