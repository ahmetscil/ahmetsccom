<template>
  <b-container fluid class="asc_pariette-page py-5">
    <b-row>
      <b-col lg="10" md="12" offset-lg="1" offset-md="0">
        <div class="asc_pariette-page-header">
          <h1>{{ products.title }}</h1>
        </div>
        <b-row class="mt-3">
          <b-col xl="3" lg="4">
            <SidebarFilter />
          </b-col>
          <b-col xl="9" lg="8" sm="12">
            <div :class="collapseClass" @click="toggleCollapse(isCollapse)">
              <div v-html="products.description" />
              <div class="asc_pariette-page-descriptioncollapse-gradient" />
            </div>
            <NotFound v-if="productsIsError" />
            <Ghost v-if="productsLoading" :rows="4" />
            <ProductGrid
              v-else
              :list="null"
              :collection="products"
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
    products: [],
    productFilterlist: [],
    myStore: {},
    productsIsError: false,
    productsLoading: true,
    isCollapse: true,
    collapseClass: 'asc_pariette-page-descriptioncollapse mb-5'
  }),
  activated () {
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      this.$fetch()
    }
  },
  async fetch () {
    this.productsIsError = false
    this.productsLoading = true
    this.products = []
    const row = await this.$axios.$get(`p/collection/${this.$route.params.collection}`).then(res => res)
    if (row.status) {
      if (process.browser) {
        window.scrollTo(0, 0)
      }
      this.products = row.data
      this.myStore = row.store
      if (row.info) {
        this.productFilterlist = row.info
      }
      this.productsIsError = false
      this.productsLoading = false
    } else {
      this.productsIsError = true
      this.productsLoading = false
    }
  },
  methods: {
    toggleCollapse (e) {
      if (e) {
        this.collapseClass = 'asc_pariette-page-descriptioncollapse mb-5'
      } else {
        this.collapseClass = 'asc_pariette-page-descriptioncollapse asc_pariette-page-descriptioncollapse-notCollapse mb-5'
      }
      this.isCollapse = !e
    }
  },
  head () {
    return {
      title: this.products.meta_title ? this.products.meta_title : this.$t('general.allProducts'),
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: this.products.meta_description }
      ],
      link: [
        { rel: 'canonical', href: `${this.myStore.url}/products` },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  }
}
</script>
<style lang="sass">
  .asc_pariette-page-descriptioncollapse
    height: 120px
    overflow: hidden
    display: block
    transition: .3s
    font-size: 12px
    position: relative
    cursor: pointer
  .asc_pariette-page-descriptioncollapse-notCollapse
    height: inherit !important
    padding-bottom: 30px
  .asc_pariette-page-descriptioncollapse-gradient
    position: absolute
    width: 100%
    height: 60px
    background: linear-gradient(180deg, #f9f9f900, #f9f9f9)
    bottom: 0
    left: 0
    z-index: 9
</style>
