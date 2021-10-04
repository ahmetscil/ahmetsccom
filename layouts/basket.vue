<template>
  <div id="app_target" class="app">
    <TopHeader />
    <b-container fluid="md" class="asc_pariette-basket">
      <Nuxt />
    </b-container>
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
  .asc_pariette-basket
    padding-top: 160px
    padding-bottom: 160px
    & h1
      color: #36241E
      font-weight: 700
      font-size: 48px
      line-height: 56px
      letter-spacing: -0.02em
      margin-bottom: 3rem
    & p
      width: 60%
      font-weight: 300
      font-size: 16px
      line-height: 130%
      letter-spacing: -0.02em
      color: #575757
    .asc_pariette-basket-info
      color: #36241E
      font-weight: 300
      margin-bottom: 1rem
      font-size: 20px
    .asc_pariette-basket-list
      background: #fff
      margin-bottom: 1.5rem
      padding-top: 15px
      padding-bottom: 15px
      .asc_pariette-basket-list-opt
        margin-top: 40px
        .asc_pariette-basket-list-opt-amount
          // border: 1px solid #D9D9D9
          height: 36px
          padding: 2px 4px
          border-radius: 2px
          & small
            text-align: center
            color: #1D4732
            margin-top: 1rem
            width: 100%
            display: block
            cursor: pointer
          .asc_pariette-basket-list-opt-amount-btn
            width: 30px
            height: 30px
            line-height: 30px
            background: #E8E8E8
            border-radius: 2px
            text-align: center
            display: inline-block
            position: relative
            cursor: pointer
            &:active
              background: darken(#e8e8e8, 5%)
          .asc_pariette-basket-list-opt-amount-btn-minus
            float: left
            &::before
              content: '-'
          .asc_pariette-basket-list-opt-amount-btn-plus
            float: right
            &::before
              content: '+'
          .asc_pariette-basket-list-opt-amount-amount
            width: calc( 100% - 70px )
            display: inline-block
            margin: auto
            text-align: center
            & input
              background: #fff
              border: none
              line-height: 30px
              text-align: center
              width: 100%
      .asc_pariette-basket-list-price
        & h3
          color: #36241E
          font-weight: 700
          font-size: 20px
          letter-spacing: -0.04em
          line-height: 120px
          margin: 0px
          padding: 0px
      .asc_pariette-basket-list-img
        height: 130px
        width: 100%
        overflow: hidden
        & img
          height: 100%
      .asc_pariette-basket-list-text
        color: #575757
        font-size: 14px
        letter-spacing: -0.04em
        width: 70%
        float: left
        & h5
          color: #36241E
    .asc_pariette-basket-summary
      .asc_pariette-basket-summary-agree
        background: #ffffff90
        width: 100%
        height: 100%
        position: absolute
        left: 0
        top: 0
        z-index: 999999999
        border-radius: 10px
      .asc_pariette-basket-summary-head
        font-weight: 700
        margin-bottom: 1rem
        font-size: 20px
      .asc_pariette-basket-summary-box
        background: #fff
        font-size: 14px
        padding: 15px
        .asc_pariette-basket-summary-box-list
          font-weight: 400
          font-size: 16px
          line-height: 30px
          letter-spacing: -0.02em
        .asc_pariette-basket-summary-box-agree
          color: #6B6B6B
          margin-top: 1rem
          margin-bottom: 1rem
        .asc_pariette-basket-summary-box-button
          background: radial-gradient(42.84% 335.36% at 48.24% 56%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 100%), #1D4732
          background-blend-mode: overlay, normal
          color: #fff
          width: 100%
          font-weight: 600
          font-size: 16px
          line-height: 30px
          letter-spacing: -0.02em
    .asc_pariette-basket-summary-box-list
      .form-group
        margin-bottom: 0 !important
        .col-form-label
          padding: 0px !important
          font-size: 14px
</style>
