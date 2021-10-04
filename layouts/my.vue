<template>
  <div id="app_target" class="app">
    <TopHeader />
    <div class="asc_pariette-my">
      <b-container>
        <b-row>
          <b-col>
            <Nuxt />
          </b-col>
        </b-row>
      </b-container>
    </div>
    <BottomFooter />
    <b-modal v-if="canvas.modal" id="canvasModal" >
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
  .asc_pariette-my
    padding-top: 160px
    min-height: 90vh
    & a
      color: #3D6E47
    & h1
      color: #36241E
      font-weight: 700
      letter-spacing: -0.04em
      margin-bottom: 1rem
  .input--alert
    border: 1px red solid !important
    background: #ff000020
    color: red
  .input--alert-checkbox
    background: #ff000020
    color: red
</style>
