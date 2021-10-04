<template>
  <b-container fluid class="asc_pariette-page py-5">
    <b-row>
      <b-col lg="10" md="12" offset-lg="1" offset-md="0">
        <div class="asc_pariette-page-header">
          <h1 v-html="$t('general.searchTitle', { val: info.optionItemLabel })" />
        </div>
        <b-row class="mt-3">
          <b-col xl="3" lg="4">
            <SidebarFilter />
          </b-col>
          <b-col xl="9" lg="8" sm="12">
            <NotFound v-if="productsIsError" />
            <Ghost v-if="productsLoading" :rows="4" />
            <ProductGrid
              v-else
              :list="products"
              :filters="productFilterlist"
              :collection="null"
              :store="myStore"
              :rows="4"
            />
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
export default {
  data: () => ({
    urlquery: {},
    info: {},
    products: [],
    productFilterlist: [],
    myStore: {},
    productsIsError: false,
    productsLoading: true
  }),
  watchQuery (newQuery, oldQuery) {
    this.$fetch()
  },
  activated () {
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      this.$fetch()
    }
  },
  async fetch () {
    this.productsIsError = false
    this.productsLoading = true
    this.products = []
    const params = this.$route.query
    const search = Object.keys(params).map(key => key + '=' + params[key]).join('&')
    const row = await this.$axios.$get(`p/search/product?${search}`).then(res => res)
    if (row.status) {
      if (process.browser) {
        window.scrollTo(0, 0)
      }
      this.products = row.data
      this.myStore = row.store
      this.productsIsError = false
      this.productsLoading = false
      if ((row.info) && (row.info.length >= 1)) {
        this.info = row.info[0]
        this.productFilterlist = row.info
        if (process.browser) {
          // for (let filterID = 0; filterID < this.productFilterlist.length; filterID++) {
          //   const selectedFilterID = this.productFilterlist[filterID].itemID
          //   const item = document.getElementById('filter' + selectedFilterID)
          //   item.classList.add('asc_pariette-page-filters-listselected')
          // }
        }
      } else {
        this.info = {}
        this.productFilterlist = []
      }
    } else {
      this.productsIsError = true
      this.productsLoading = false
    }
  },
  methods: {
    setLoading (e) {
      this.$store.commit('setLoader', e)
    },
    productFilter (n, v) {
      const url = this.$route.query
      url[n] = v
      this.urlquery = url
    },
    searchThis () {
      if (process.browser) {
        const search = Object.keys(this.urlquery).map(key => key + '=' + this.urlquery[key]).join('&')
        const searchq = this.$route.path + '?' + search
        location.href = searchq
      }
    }
  },
  head () {
    return {
      title: this.info.optionItemLabel ? this.info.optionItemLabel : this.$t('general.allProducts'),
      titleTemplate: `%s | ${this.myStore.meta_title}`,
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        { rel: 'canonical', href: `${this.myStore.url}${this.$route.fullPath}` },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  }
}
</script>
<style lang="sass">
  .asc_pariette-page-filters-listselected
    background: #e3e6e3 !important
  .asc_pariette-page-filters
    & h1
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.2) -100%, rgba(0, 0, 0, 0) 100%), #374639
      box-shadow: 0px 1px 0px #7C7C7C
      display: flex
      flex-direction: row
      justify-content: space-between
      align-items: center
      font-size: 14px
      padding: 15px 10px
      color: #fff
    & ul
      list-style: none
      font-size: 14px
      padding: 0
      max-height: 30vh
      overflow-x: auto
      & li
        cursor: pointer
        display: flex
        flex-direction: row
        align-items: center
        background: #FFFFFF
        box-shadow: 0px 1px 0px #D8D8D8
        margin-bottom: 1px
        & a
          color: #2f2f2f
          text-decoration: none
          padding: 10px 20px 10px 10px
          display: block
          width: 100%
        & span
          width: 100%
          padding: 10px 20px 10px 10px
        &:focus
          background: #36241e08
        &:active
          background: #36241e08
        &:hover
          background: #36241e08
  .asc_pariette-page-filters-icon
    font-size: 10px
    margin-right: 10px
</style>
