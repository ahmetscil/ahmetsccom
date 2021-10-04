<template>
  <div :class="showSearch ? 'asc_pariette-header-searchbar asc_pariette-header-searchbar-show' : 'asc_pariette-header-searchbar'">
    <div class="asc_pariette-header-searchbar-form">
      <label for="headerSearchBox">
        Search
        <b-form-input id="headerSearchBox" v-model="searchText" autofocus class="asc_pariette-header-searchbar-form-search" @keyup.enter="searchForm()" />
      </label>
      <b-button type="button" class="asc_pariette-header-searchbar-form-button" @click="searchForm()">
        {{ $t('general.search') }}
      </b-button>
    </div>
    <div class="asc_pariette-header-searchbar-close" @click="collapsesearch()" />
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
  data: () => ({
    sliderClass: 'asc_pariette-carousel-slier',
    searchText: ''
  }),
  computed: mapState(['myStore', 'showSearch']),
  methods: {
    collapsesearch () {
      this.$store.commit('setSearch', !this.showSearch)
    },
    searchForm () {
      if (this.searchText.length >= 3) {
        this.$router.push(this.localePath({ name: 'search', query: { search: this.searchText } }))
        this.searchText = ''
        this.collapsesearch()
      }
    }
  }
}
</script>
<style lang="sass">
  .asc_pariette-header-searchbar-show
    transform: translateY(0vh) !important
  .asc_pariette-header-searchbar-close
    position: fixed
    z-index: 90
    height: 100vh
    width: 100%
    top: 0
    left: 0
  .asc_pariette-header-searchbar
    position: fixed
    z-index: 94
    background: rgba(0,0,0, .6)
    transform: translateY(-100vh)
    height: 100vh
    width: 100%
    display: flex
    flex-direction: row
    .asc_pariette-header-searchbar-form
      z-index: 91
      background: #fff
      width: 50%
      margin: auto
      padding: 20px 15px
      text-align: center
      & label
        display: none
      .asc_pariette-header-searchbar-form-search
        width: 100%
        border: none
        border-bottom: 1px #000 solid
        line-height: 40px
        font-size: 24px
        border-radius: 0px
      .asc_pariette-header-searchbar-form-button
        background: radial-gradient(42.84% 335.36% at 48.24% 56%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 100%), #1D4732
        background-blend-mode: overlay, normal
        color: #fff
        font-weight: 600
        width: 50%
        margin: 30px auto
        line-height: 40px
        font-size: 24px
        letter-spacing: -0.02em
</style>
