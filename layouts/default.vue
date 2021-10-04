<template>
  <div id="app_target" class="app">
    <div class="asc_pariette-body-noise" />
    <div class="asc_pariette-body-color" />
    <TopHeader />
    <div class="asc_pariette">
      <Nuxt />
    </div>
    <BottomFooter />
    <b-modal v-if="canvas.modal" id="canvasModal">
      <!-- <div v-for="(box, y) in canvas.modal.content.filter(f => f.lang === locale)" :key="'modal' + y"> -->
      <div v-for="(box, y) in canvas.modal.content" :key="'modal' + y">
        <slot name="modal-header">
          {{ box.title }}
        </slot>
        <div v-html="box.content" />
      </div>
    </b-modal>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import TopHeader from '~/components/Header.vue'
import BottomFooter from '~/components/Footer.vue'
export default {
  components: {
    TopHeader,
    BottomFooter
  },
  computed: mapState(['locale', 'canvas', 'canvasModal']),
  watch: {
    'canvasModal' (newVal) {
      if (newVal === true) {
        this.$bvModal.show('canvasModal')
      } else {
        this.$bvModal.hide('canvasModal')
      }
    }
  }
}
</script>
<style lang="sass">
body
  font-family: 'Inter', sans-serif !important
  position: relative
  min-height: 100vh
  width: 100vw
  overflow-x: hidden
  background: #fff
  .asc_pariette-body-noise
    position: absolute
    z-index: -1
    top: -20px
    left: 0
    width: 100%
    height: 100%
    background: url('../assets/noise.png') repeat
    // background: linear-gradient(rgba(255,255,255,.5), rgba(0,0,0,.5)), url('../assets/a.svg')
    mix-blend-mode: overlay
    opacity: 0.32
  .asc_pariette-body-color
    position: absolute
    z-index: -2
    width: 100%
    height: 100%
    top: -45%
    right: -45%
    background: conic-gradient(from 180deg at 50% 50%, #FFC51A 0deg, #D5FC0D 40.17deg, #45A1F7 90deg, #1F8C7E 143.12deg, #BDFFB3 180deg, #D20CF2 222.51deg, #FF3AE0 268.13deg, #EA5B62 311.21deg, #FFC51A 360deg)
    filter: blur(1220px)
    border-radius: 538px

html
  font-family: 'Inter', sans-serif !important
  font-size: 16px
  word-spacing: 1px
  -ms-text-size-adjust: 100%
  -webkit-text-size-adjust: 100%
  -moz-osx-font-smoothing: grayscale
  -webkit-font-smoothing: antialiased
  box-sizing: border-box
*,
*::before,
*::after
  box-sizing: border-box
  margin: 0
  outline: none
.asc_pariette
  padding-top: 100px
  min-height: 80vh
.asc_pariette-line-light
  height: 1px
  width: 90%
  background: rgba(255,255,255,.5)
  display: block
  clear: both
  margin: 5px auto
.asc_pariette-line-dark
  height: 1px
  width: 90%
  background: rgba(0,0,0,.5)
  display: block
  clear: both
  margin: 5px auto
.input--alert
  border: 1px red solid !important
  background: #ff000020
  color: red
.asc_pariette-h75
  height: 75vh
.asc_pariette-h50
  height: 50vh
.asc_pariette-page
  position: relative
  min-height: 80vh
  .asc_pariette-page-header
    min-height: 70px
    & h1
      font-size: 36px
      font-weight: bold
      letter-spacing: -0.02em
      color: #36241E
      margin: 0
      padding: 0
    .badge
      font-weight: 400
      border: 1px #ddd solid
      padding: 5px 10px
      border-radius: 5px
</style>
