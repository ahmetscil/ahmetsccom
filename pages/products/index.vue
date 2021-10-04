<template>
  <b-container fluid class="asc_pariette-page py-5">
    <b-row>
      <b-col lg="10" md="12" offset-lg="1" offset-md="0">
        <div class="asc_pariette-page-header">
          <h1 v-if="$route.query.search">{{ $t('general.searchTitle', { val: $route.query.search }) }}</h1>
          <h1 v-else>{{ $t('general.allProducts') }}</h1>
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
    products: [],
    productFilterlist: [],
    myStore: {},
    productsIsError: false,
    productsLoading: true
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
    const row = await this.$axios.$get('p/product?offset=0&limit=2500').then(res => res)
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
  head () {
    return {
      title: this.$t('general.allProducts'),
      titleTemplate: `%s | ${this.myStore.meta_title ? this.myStore.meta_title : this.myStore.title}`,
      link: [
        { rel: 'canonical', href: this.myStore.url + '/product/' }
      ]
    }
  }
}
</script>
