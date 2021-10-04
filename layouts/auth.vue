<template>
  <div id="app_target" class="app">
    <TopHeader />
    <div class="asc_pariette-auth">
      <b-container>
        <b-row>
          <b-col
            cols="12"
            lg="6"
            xl="4"
            offset-lg="3"
            offset-xl="4"
            class="asc_pariette-auth-bg"
          >
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
  .asc_pariette-auth
    padding-top: 160px
    min-height: 90vh
    & a
      color: #3D6E47
    & h1
      color: #1B4D25
      font-weight: 700
      letter-spacing: -0.04em
      margin-bottom: 1rem
    .asc_pariette-auth-bg
      padding: 20px
      background: rgba(255,255,255,.6)
      backdrop-filter: blur(5px)
    .asc_pariette-auth-form
      font-size: 14px
      .asc_pariette-auth-form-inputs
        & input
          margin-bottom: 1.5rem
          font-size: 14px
          display: inline-block !important
          background-position: right
          background-repeat: no-repeat
          background-size: 24px
          background-position-x: 96%
        .asc_pariette-auth-form-inputs-name
          background-image: url('@/assets/user.svg')
        .asc_pariette-auth-form-inputs-email
          background-image: url('@/assets/email.svg')
        .asc_pariette-auth-form-inputs-password
          background-image: url('@/assets/password.svg')
      .asc_pariette-auth-form-btn
        background: radial-gradient(42.84% 335.36% at 48.24% 56%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 100%), #1D4732
        background-blend-mode: overlay, normal
        border: 1px #5e7b64 solid !important
        display: block
        font-weight: 600
        color: #fff
        text-align: center
        width: 100%
        height: 50px
        border-radius: 0px
        font-size: 16px
        transition: 300ms
        margin-top: 1.5rem
        margin-bottom: 1.5rem
        &:hover
          text-decoration: none
          background: radial-gradient(42.84% 335.36% at 48.24% 56%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 100%), #0D3722
  .input--alert
    border: 1px red solid !important
    background: #ff000020
    color: red
  .input--alert-checkbox
    background: #ff000020
    color: red
</style>
