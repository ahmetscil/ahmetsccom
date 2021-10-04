<template>
  <div class="asc_pariette-header">
    <b-container fluid>
      <b-row>
        <b-col cols="1">
          <div class="asc_pariette-header-logo">
            <img v-if="showLogo" src="@/assets/canvas-logo-black.svg">
          </div>
        </b-col>
        <b-col />
        <b-col cols="1" class="float-right">
          <div class="asc_pariette-header-hamburger">
            <span />
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data: () => ({
    headerNav: [],
    navigationButtonClass: 'asc_pariette-header-navbar-button-lines',
    mobileMenu: 'asc_pariette-header-mobile-navbar'
  }),
  async fetch () {
    this.headerNav = await this.$axios.$get('p/navigation/header-navigation-1613914979').then(res => res.data)
  },
  computed: {
    ...mapState(['myStore', 'showSearch', 'orderCode', 'showMegamenu', 'headerBasketClass', 'showHeaderBasket', 'basketItems', 'headerBasketAdded']),
    showLogo () {
      let show = true
      if (this.$route.fullPath === '/') {
        show = false
      } else {
        show = true
      }
      return show
    }
  },
  activated () {
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      this.$fetch()
    }
  },
  mounted () {
    this.setHeader()
  },
  methods: {
    setNavigation () {
      if (this.navigationButtonClass === 'asc_pariette-header-navbar-button-lines') {
        this.navigationButtonClass = 'asc_pariette-header-navbar-button-lines-active'
        this.mobileMenu = 'asc_pariette-header-mobile-navbar asc_pariette-header-mobile-navbar-open'
      } else {
        this.navigationButtonClass = 'asc_pariette-header-navbar-button-lines'
        this.mobileMenu = 'asc_pariette-header-mobile-navbar'
      }
    },
    setHeader () {
      this.$store.commit('checkOrderCode')
      this.$store.dispatch('getMyStore')
      this.$store.commit('setHeaderBasket', false)
      setTimeout(() => {
        this.headerBasketDisplay(this.showHeaderBasket)
      }, 1000)
      this.$store.dispatch('getVersion')
    },
    megamenuDisplay () {
      this.$store.commit('setMegamenu')
    },
    getSearch () {
      this.$store.commit('setSearch', true)
      console.log('qwe')
    },
    headerBasketDisplay (e) {
      if (this.orderCode) {
        this.$store.dispatch('getOrders')
      } else {
        this.$store.commit('setBasketItems', [])
      }
      this.$store.commit('setHeaderBasket', e)
    }
  }
}
</script>
<style lang="sass">
  .asc_pariette-header
    position: relative
    margin-top: 20px
    .asc_pariette-header-logo
      position: relative
      width: 70px
      & img
        width: 100%
    .asc_pariette-header-hamburger
      width: 30px
      height: 30px
      display: block
      position: relative
      float: right
      & span
        position: absolute
        top: 7px
        right: 0
        width: 20px
        height: 1px
        background: #000
        &::before
          position: absolute
          right: 0
          top: 12px
          width: 30px
          height: 1px
          background: #000
          content: ''
</style>
