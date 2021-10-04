<template>
  <div class="asc_pariette-page-filters accordion" role="tablist">
    <h1 v-b-toggle="'filters-collection'">
      {{ $t('nav.collections') }}
    </h1>
    <b-collapse :id="'filters-collection'" accordion="my-accordion" role="tabpanel">
      <ul>
        <li v-for="(col, i) in collectionType" :key="'collectionType' + i" @click="setLoading(true)">
          <nuxt-link :to="localePath({name: 'collection-url', params: {url: col.slug}})">
            <i class="far fa-circle asc_pariette-page-filters-icon" /> {{ col.title }}
          </nuxt-link>
        </li>
      </ul>
    </b-collapse>
    <h1 v-b-toggle="'filters-category'">
      {{ $t('nav.categories') }}
    </h1>
    <b-collapse :id="'filters-category'" accordion="my-accordion" role="tabpanel">
      <ul>
        <li v-for="(col, i) in categoryType" :key="'categoryType' + i" @click="setLoading(true)">
          <nuxt-link :to="localePath({name: 'products-collection', params: {collection: col.slug}})">
            <i class="far fa-circle asc_pariette-page-filters-icon" /> {{ col.title }}
          </nuxt-link>
        </li>
      </ul>
    </b-collapse>
    <div v-for="(flt, i) in filterList" :key="'flt' + i">
      <h1 v-b-toggle="'filters-' + i">
        {{ flt.title }}
      </h1>
      <b-collapse :id="'filters-' + i" visible accordion="my-accordion" role="tabpanel">
        <ul>
          <li v-for="(itm, x) in flt.item" :key="'itm' + x" :ref="'itm' + x">
            <!-- :to="localePath({name: 'products-search-param-value', params: {param: itm.name, value: itm.value}})" -->
            <!-- :to="localePath({name: 'search', query: { format: col.value }})" -->
            <nuxt-link
              :to="localePath({name: 'search', query: {[itm.name]: itm.value}})"
            >
              <i class="far fa-circle asc_pariette-page-filters-icon" /> {{ itm.label }}
            </nuxt-link>
          </li>
        </ul>
      </b-collapse>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      filterList: [],
      categoryType: [],
      collectionType: []
    }
  },
  activated () {
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      this.$fetch()
    }
  },
  async fetch () {
    if (process.static && process.client) {
      if (localStorage.getItem('sidebarFilters')) {
        this.filterList = JSON.parse(localStorage.getItem('sidebarFilters'))
      } else {
        const sf = await this.$axios.$get('p/option?type=formElement&show=1').then(res => res)
        localStorage.setItem('sidebarFilters', JSON.stringify(sf.data))
        this.filterList = JSON.parse(localStorage.getItem('sidebarFilters'))
      }
      if (localStorage.getItem('sidebarCollections')) {
        this.categoryType = JSON.parse(localStorage.getItem('sidebarCategories'))
        this.collectionType = JSON.parse(localStorage.getItem('sidebarCollections'))
      } else {
        const ct = await this.$axios.$get('p/collection?type=productCategory&status=1')
        localStorage.setItem('sidebarCollections', JSON.stringify(ct.data))
        this.categoryType = JSON.parse(localStorage.getItem('sidebarCategories'))
        this.collectionType = JSON.parse(localStorage.getItem('sidebarCollections'))
      }
    } else {
      const sidebarFilters = await this.$axios.$get('p/option?type=formElement&show=1').then(res => res)
      this.filterList = sidebarFilters.data
      const ct = await this.$axios.$get('p/collection?type=productCategory&status=1')
      this.categoryType = ct.data
      const cot = await this.$axios.$get('p/collection?type=productCollection&status=1')
      this.collectionType = cot.data
    }
  },
  methods: {
    setLoading (e) {
      this.$store.commit('setLoader', e)
    }
  }
}
</script>
<style lang="sass">
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
      &:hover
        background: #36241e08
.asc_pariette-page-filters-icon
  font-size: 10px
  margin-right: 10px
</style>
