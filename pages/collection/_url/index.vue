<template>
  <b-container fluid class="asc_pariette-collection py-5 my-3">
    <b-row>
      <b-col lg="10" md="12" offset-lg="1" offset-md="0">
        <h1>{{ collection.title }}</h1>
        <b-row>
          <NotFound v-if="productsIsError" />
          <Ghost v-if="productsLoading" :rows="3" />
          <ProductList v-else v-for="(prd, p) in collection.products" :key="'products' + p" :list="prd" :rows="3" />
        </b-row>
        <p v-html="collection.description" class="mt-5" />
      </b-col>
    </b-row>
    <b-row class="asc_pariette-collection-footer">
      <b-col lg="10" md="12" offset-lg="1" offset-md="0">
        <SectionBox v-if="footer" :html="footer.content" />
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { mapState } from 'vuex'
import ProductList from '~/components/ProductList.vue'
import SectionBox from '~/components/SectionBox.vue'
export default {
  components: {
    ProductList,
    SectionBox
  },
  async asyncData ({ $axios, params }) {
    const row = await $axios.$get('p/canvas/collection-footer-1614104643')
    return {
      footer: row.status ? row.data : []
    }
  },
  data: () => ({
    footer: [],
    collection: [],
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
    this.collection = []
    const row = await this.$axios.$get(`p/collection/${this.$route.params.url}`).then(res => res)
    if (row.status) {
      if (process.browser) {
        window.scrollTo(0, 0)
      }
      this.collection = row.data
      this.myStore = row.store
      this.productsIsError = false
      this.productsLoading = false
    } else {
      this.productsIsError = true
      this.productsLoading = false
    }
  },
  computed: mapState(['locale', 'navigation', 'canvas']),
  head () {
    return {
      title: this.collection.title,
      titleTemplate: `%s | ${this.myStore.meta_title}`,
      meta: [
        { name: 'description', content: this.collection.meta_description ? this.collection.meta_description : this.collection.meta_title }
      ]
    }
  }
}
</script>
<style lang="sass">
  .asc_pariette-collection
    & h1
      color: #36241E
      font-weight: 700
      font-size: 48px
      line-height: 56px
      letter-spacing: -0.02em
    & p
      width: 60%
      font-weight: 300
      font-size: 18px
      line-height: 130%
      letter-spacing: -0.02em
      color: #575757
    .asc_pariette-collection-footer
      margin-top: 50px
      & h2
        font-size: 32px
        font-weight: 600
        letter-spacing: -0.02em
        width: 90%
      & h4
        font-size: 20px
        letter-spacing: -0.02em
      & p
        font-size: 14px
        color: #575757
        font-weight: 300
        letter-spacing: -0.02em
      & img
        width: 36px
        height: 36px
</style>
