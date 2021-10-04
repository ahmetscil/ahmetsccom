<template>
  <div :class="showHeaderBasket ? 'asc_pariette-header-headerbasket asc_pariette-header-headerbasket-show' : 'asc_pariette-header-headerbasket'">
    <div class="asc_pariette-header-headerbasket-box">
      <b-row>
        <b-col v-if="basketItems.item" cols="12">
          <h3>{{ $t('basket.myBasket', { val: basketItems.item.length }) }}</h3>
          <div>
            <ul>
              <li v-for="(or, o) in basketItems.item" :key="'myBasket' + o" class="asc_pariette-header-headerbasket-list">
                <div class="asc_pariette-header-headerbasket-list-img">
                  <img v-if="myStore.cdn_url" :src="myStore.cdn_url + or.image_web" :alt="or.title + ' on basket'" width="" height="">
                </div>
                <div class="asc_pariette-header-headerbasket-list-text">
                  <h5>{{ or.title }}</h5>
                  <span>{{ $t('basket.amount') }}: {{ or.amount }} {{ $t('basket.price') }}: {{ or.purchase_price }}</span>
                </div>
              </li>
            </ul>
            <nuxt-link :to="localePath({name: 'basket'})" class="asc_pariette-header-headerbasket-list-btn">
              <i class="fas fa-shopping-basket" /> {{ $t('basket.goToCart') }}
            </nuxt-link>
          </div>
        </b-col>
        <b-col v-else cols="12">
          <h3>{{ $t('basket.itsEmpty') }}</h3>
        </b-col>
      </b-row>
    </div>
    <div class="asc_pariette-header-headerbasket-close" @click="collapseheaderbasket(!showHeaderBasket)" />
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  computed: mapState(['myStore', 'showHeaderBasket', 'basketItems']),
  mounted () {
  },
  methods: {
    collapseheaderbasket (e) {
      this.$store.commit('setHeaderBasket', e)
    }
  }
}
</script>
<style lang="sass">
  .asc_pariette-header-headerbasket
    position: fixed
    z-index: 94
    animation: slideMenuFalse .5s ease-in-out
    transform: translateY(-100vh)
    height: 100vh
    width: 100%
    .asc_pariette-header-headerbasket-box
      background: rgba(255,255,255,.8)
      backdrop-filter: blur(5px)
      box-shadow: 0 0 10px #fff
      width: 350px
      min-height: 230px
      max-height: 430px
      position: absolute
      z-index: 98
      right: 10px
      top: 10px
      border-radius: 5px
      border: 1px solid #D8D8D8
      padding: 0px 10px
      & h3
        color: #3D6E47
        font-weight: 600
        font-size: 20px
        line-height: 30px
        letter-spacing: -0.04em
        margin: 0px
        padding: 10px 0
      & ul
        list-style: none
        padding: 10px 0
        max-height: 300px
        margin-bottom: .5rem
        overflow-x: auto
        & li
          display: block
          margin-bottom: 1rem
          min-height: 64px
      .asc_pariette-header-headerbasket-list
        .asc_pariette-header-headerbasket-list-img
          width: 30%
          padding: 2px
          height: 60px
          background: #fff
          border: 1px #ddd solid
          border-radius: 3px
          overflow: hidden
          float: left
          & img
            width: 100%
        .asc_pariette-header-headerbasket-list-text
          color: #575757
          font-size: 14px
          letter-spacing: -0.04em
          width: 70%
          float: left
          padding: 0 1% 1% 1%
          & h5
            color: #36241E
            font-weight: 600
            font-size: 14px
      .asc_pariette-header-headerbasket-list-btn
        background: radial-gradient(42.84% 335.36% at 48.24% 56%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 100%), #1D4732
        background-blend-mode: overlay, normal
        border: 1px #5e7b64 solid !important
        display: block
        line-height: 50px
        color: #fff
        text-align: center
        width: 100%
        height: 50px
        border-radius: 0px
        font-size: 16px
        transition: 300ms
        margin-bottom: .5rem
        &:hover
          text-decoration: none
          background: radial-gradient(42.84% 335.36% at 48.24% 56%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 100%), #0D3722
    .asc_pariette-header-headerbasket-close
      position: absolute
      z-index: 96
      width: 100%
      height: 100%
      top: 0
      left: 0
  .asc_pariette-header-headerbasket-show
    height: calc(100vh - 60px)
    transform: translateY(60px)
    animation: slideMenu .5s ease-in-out
</style>
<style>
@keyframes slideMenu {
  0% {
    transform: translateY(-100vh);
  }
  100% {
    transform: translateY(60px);
  }
}
@keyframes slideMenuFalse {
  0% {
    transform: translateY(60px);
    }
  100% {
    transform: translateY(-100vh);
  }
}
</style>
