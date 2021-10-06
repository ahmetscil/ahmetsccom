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
          <div :class="hamburgerClass" @click="hamburger()">
            <span />
          </div>
        </b-col>
      </b-row>
    </b-container>
    <div :class="hamburgerMenuClass">
      <b-row class="asc_pariette-hamburgerMenu-ground">
        <b-col cols="12">
          <p><img src="https://pariette-cdn.s3.amazonaws.com/canvasteknolojicom/canvas-logo-white.svg"></p>
          <ul>
            <li v-for="(r, i) in navigationList" :key="'nav' + i">
              <nuxt-link :to="localePath({ name: 'url', params: { url: r.route }})">
                {{ r.title }}
              </nuxt-link>
            </li>
          </ul>
        </b-col>
      </b-row>
      <div class="asc_pariette-hamburgerMenu-bg" />
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data: () => ({
    headerNav: [],
    navigationButtonClass: 'asc_pariette-header-navbar-button-lines',
    mobileMenu: 'asc_pariette-header-mobile-navbar',
    hamburgerClass: 'asc_pariette-header-hamburger',
    hamburgerMenuClass: 'asc_pariette-hamburgerMenu',
    toggleHamburger: false,
    navigationList: [
      { title: 'ABOUT US', route: 'about-us' },
      { title: 'SOLUTIONS', route: 'solutions' },
      { title: 'SERVICES', route: 'services' },
      { title: 'CONTACT', route: 'contact' }
    ]
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
    hamburger () {
      this.toggleHamburger = !this.toggleHamburger
      this.hamburgerMenuClass = this.toggleHamburger ? 'asc_pariette-hamburgerMenu asc_pariette-hamburgerMenu-open' : 'asc_pariette-hamburgerMenu'
      this.hamburgerClass = this.toggleHamburger ? 'asc_pariette-header-hamburger asc_pariette-header-hamburger-open' : 'asc_pariette-header-hamburger'
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
    padding-top: 20px
    .asc_pariette-hamburgerMenu
      position: fixed
      left: 0
      top: -100vh
      opacity: 0
      width: 100vw
      height: 100vh
      z-index: 996
      transition: .1s
      .asc_pariette-hamburgerMenu-bg
        position: absolute
        width: 100%
        height: 100%
        z-index: 997
        top: 0
        left: 0
        background: conic-gradient(from 180deg at 50% 50%, #FFC51A 0deg, #D5FC0D 40.17deg, #45A1F7 90deg, #1F8C7E 143.12deg, #BDFFB3 180deg, #D20CF2 222.51deg, #FF3AE0 268.13deg, #EA5B62 311.21deg, #FFC51A 360deg)
        filter: blur(120px)
      .asc_pariette-hamburgerMenu-ground
        position: absolute
        width: 100%
        height: 100%
        z-index: 998
        top: 0
        left: 0
        padding: 10vh 10vw
        overflow: auto
        text-align: center
        & ul
          list-style: none
          width: 100%
          padding: 0
          & li
            font-family: 'Nunito', sans-serif
            white-space: nowrap
            letter-spacing: 5px
            color: transparent
            font-size: 50px
            line-height: 1
            transition: .3s
            padding: 20px 0
            display: block
            cursor: pointer
            position: relative
            -webkit-text-fill-color: transparent
            text-fill-color: transparent
            color: transparent
            -webkit-text-stroke: 1px #fff
            -webkit-text-stroke: 1.5px #fff
            text-stroke: 1.5px #fff
            transition: opacity 0.4s
            &:hover
              -webkit-text-fill-color: #fff
              text-fill-color: #fff
              color: #fff
              text-decoration: none
            & a
              color: #fff
    .asc_pariette-hamburgerMenu-open
      opacity: 1
      top: 0
      transition: .3s
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
      z-index: 999
      cursor: pointer
      & span
        position: absolute
        top: 7px
        right: 0
        width: 20px
        transition: .3s
        height: 1px
        background: #000
        &::before
          position: absolute
          right: 0
          top: 12px
          width: 30px
          transition: .3s
          height: 1px
          background: #000
          content: ''
    .asc_pariette-header-hamburger-open
      & span
        width: 40px
        background: #fff
        transition: .3s
        transform: rotate(-45deg)
        &::before
          transition: .3s
          background: #fff
          top: 0
          width: 40px
          transform: rotate(90deg)
</style>
