<template>
  <div :class="showMegamenu ? 'asc_pariette-header-megamenu asc_pariette-header-megamenu-show' : 'asc_pariette-header-megamenu'">
    <div class="asc_pariette-header-megamenu-bg">
      <b-container fluid>
        <b-row class="asc_pariette-header-megamenu-rows">
          <b-col cols="12" lg="6" offset-lg="2" offset="0">
            <b-row>
              <b-col v-if="collectionType" cols="12" lg="3">
                <!-- dikkat! -->
                <!-- burda koleksiyon adıyla kategori gösteriyoruz. ikisi karışmamalı!-->
                <h5>{{ $t('nav.collections') }}</h5>
                <ul>
                  <li v-for="(col, i) in collectionType" :key="'collectionType' + i" @click="collapseMegamenu()">
                    <nuxt-link
                      :to="localePath({name: 'collection-url', params: {url: col.slug}})"
                    >
                      {{ col.title }}
                    </nuxt-link>
                  </li>
                </ul>
              </b-col>
              <b-col v-if="categoryType" cols="12" lg="3">
                <h5>{{ $t('nav.categories') }}</h5>
                <ul>
                  <li v-for="(col, i) in categoryType" :key="'categoryType' + i" @click="collapseMegamenu()">
                    <nuxt-link
                      :to="localePath({name: 'products-collection', params: {collection: col.slug}})"
                    >
                      {{ col.title }}
                    </nuxt-link>
                  </li>
                </ul>
              </b-col>
              <b-col v-if="option.formats" cols="12" lg="3">
                <h5>{{ $t('nav.formats') }}</h5>
                <ul>
                  <li v-for="(col, i) in option.formats.items" :key="'formats' + i" @click="collapseMegamenu()">
                    <nuxt-link
                      :to="localePath({name: 'search', query: { format: col.value }})"
                    >
                      {{ col.label }}
                    </nuxt-link>
                  </li>
                </ul>
              </b-col>
              <b-col v-if="option.sizes" cols="12" lg="3">
                <h5>{{ $t('nav.dimensions') }}</h5>
                <ul>
                  <li v-for="(col, i) in option.sizes.items" :key="'sizes' + i" @click="collapseMegamenu()">
                    <nuxt-link
                      :to="localePath({name: 'search', query: { size: col.value }})"
                    >
                      {{ col.label }}
                    </nuxt-link>
                  </li>
                </ul>
              </b-col>
            </b-row>
          </b-col>
          <b-col v-if="option.colors" cols="12" lg="4">
            <h5>{{ $t('nav.colors') }}</h5>
            <div @click="collapseMegamenu()">
              <nuxt-link
                v-for="(col, i) in option.colors.items"
                :key="'colors' + i"
                class="asc_pariette-header-megamenu-colors"
                :to="localePath({name: 'search', query: { color: col.value }})"
              >
                <span :style="{backgroundColor: col.html}" /> {{ col.label }}
              </nuxt-link>
            </div>
            <h5 class="mt-5">
              <div @click="collapseMegamenu()">
                <nuxt-link
                  :to="localePath({ name: 'products' })"
                >
                  {{ $t('nav.allProds') }} <img class="asc_pariette-arrow-right" src="~/assets/icon-right.svg" :alt="$t('nav.allProds')" width="" height="">
                </nuxt-link>
              </div>
            </h5>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <div class="asc_pariette-header-megamenu-close" @click="collapseMegamenu()" />
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
  watchQuery (newQuery, oldQuery) {
    console.log(newQuery)
  },
  data: () => ({
    categoryType: [],
    collectionType: [],
    option: {}
  }),
  computed: mapState(['myStore', 'showMegamenu']),
  mounted () {
    this.getCollections()
  },
  methods: {
    async getCollections () {
      const categoryType = await this.$axios.$get('p/collection?type=productCategory&status=1')
      const collectionType = await this.$axios.$get('p/collection?type=productCollection&status=1')
      const formats = await this.$axios.$get('p/option/formats-1614065079?show=1')
      const sizes = await this.$axios.$get('p/option/size-1614065368?show=1')
      const colors = await this.$axios.$get('p/option/color-1614065328?show=1')
      this.categoryType = categoryType.data ? categoryType.data : []
      this.collectionType = collectionType.data ? collectionType.data : []
      this.option.formats = formats.data ? formats.data : []
      this.option.sizes = sizes.data ? sizes.data : []
      this.option.colors = colors.data ? colors.data : []
    },
    collapseMegamenu () {
      this.$store.commit('setMegamenu')
    }
  }
}
</script>
<style lang="sass">
  .asc_pariette-header-megamenu
    position: fixed
    z-index: 94
    animation: slideMenuFalse .2s ease-in-out
    transform: translate(0, -100vh)
    height: 100vh
    width: 100%
    @media (max-width: 991px)
      display: none
    .asc_pariette-header-megamenu-close
      position: absolute
      width: 100%
      height: 100%
      top: 0
      left: 0
    .asc_pariette-header-megamenu-bg
      position: relative
      z-index: 91
      width: 100%
      min-height: 220px
      overflow: hidden
      color: #fff
      background: inherit
      background-image: url('~/assets/ls-logo-megamenu.png')
      background-size: contain
      background-repeat: no-repeat
      background-color: rgba(18,7,3,.8)
      backdrop-filter: blur(5px)
    .asc_pariette-header-megamenu-rows
      padding-top: 1rem
      padding-bottom: 1rem
      &:hover
        & a
          text-decoration: none
          color: #f2f2f2
    .asc_pariette-header-megamenu-colors
      background: rgba(0,0,0,.3)
      border: 1px rgba(255,255,255,.2) solid
      border-radius: 2px
      padding: 3px 10px 0px 10px
      margin: 0 .5rem .5rem 0
      font-size: 12px
      display: inline-block
      color: #fff
      & span
        width: 12px
        height: 12px
        display: inline-block
    & h5
      font-weight: 400
      font-size: 18px
      & a
        color: #fff
        .asc_pariette-arrow-right
          transform: translate(0, 0)
          transition: all 300ms
      &:hover
        & a
          .asc_pariette-arrow-right
            transform: translate(10px, 0)
            transition: all 300ms
    & ul
      font-size: 14px
      padding: 0px
      list-style: none
      & li
        font-weight: 300
        line-height: 26px
        & a
          color: #fff
  .asc_pariette-header-megamenu-show
    animation: slideMenu .5s ease-in-out
    transform: translate(0, 90px)
</style>
<style>
@keyframes slideMenu {
  0% {
    transform: translate(0, -100vh);
  }
  100% {
    transform: translate(0, 90px);
  }
}
@keyframes slideMenuFalse {
  0% {
    transform: translate(0, 90px);
    }
  100% {
    transform: translate(0, -100vh);
  }
}
@keyframes slideRight {
  0%,
  100% {
    transform: translate(0, 0);
  }

  50% {
    transform: translate(10px, 0);
  }
}
</style>
