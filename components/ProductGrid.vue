<template>
  <div>
    <!-- <div v-if="filters" class="mb-5">
      <b-badge
        v-for="(qu, i) in filters"
        :key="'filters' + i"
        pill
        variant="light"
        class="mr-2"
      >
        {{ qu.optionItemLabel }}
      </b-badge>
    </div> -->
    <b-row>
      <b-col
        v-for="(item, x) in productList"
        :key="'item' + x"
        :xl="rows"
        lg="6"
        md="6"
        sm="12"
        class="mb-5"
      >
        <div class="asc_pariette-product-grid">
          <nuxt-link
            :title="item.title"
            :to="localePath({ name: item.router_name, params: { collection: item.cat_slug, product: item.item_slug } })"
          >
            <div class="asc_pariette-product-grid-img">
              <img :src="item.image" :alt="item.title" width="" height="">
            </div>
            <h1>
              {{ item.base_title }}<br>{{ item.title }}
            </h1>
            <h2 class="float-left text-left">
              {{ item.cat_title }}
            </h2>
            <h2 class="float-right text-right">
              {{ setPrice(item.price, item.currency, item.unit_type, item.unit_width) }}
            </h2>
          </nuxt-link>
        </div>
      </b-col>
    </b-row>
  </div>
</template>
<script>
export default {
  props: {
    collection: {
      type: Object,
      required: false,
      default () {
        return {}
      }
    },
    list: {
      type: Array,
      required: false,
      default () {
        return []
      }
    },
    filters: {
      type: Array,
      required: false,
      default () {
        return []
      }
    },
    store: {
      type: Object,
      required: false,
      default () {
        return {}
      }
    },
    rows: {
      type: Number,
      default: 3
    }
  },
  computed: {
    productList () {
      const rows = []
      if (this.collection !== null) {
        const coll = this.collection
        const prods = coll.products
        for (let l = 0; l < prods.length; l++) {
          const item = prods[l]
          const row = []
          row.title = item.title
          row.base_title = item.base_title
          row.image = this.store.cdn_url + item.image_web
          row.item_slug = item.slug
          row.unit_type = item.unit_type
          row.unit_width = item.unit_width
          row.price = item.sale_price
          row.currency = item.currency
          row.cat_title = coll.title
          row.cat_slug = coll.slug
          row.router_name = 'products-collection-product'
          rows.push(row)
        }
      }
      if (this.list !== null) {
        for (let l = 0; l < this.list.length; l++) {
          const item = this.list[l]
          const row = []
          row.title = item.title
          row.base_title = item.base_title
          row.image = this.store.cdn_url + item.image_web
          row.item_slug = item.slug
          row.unit_type = item.unit_type
          row.unit_width = item.unit_width
          row.price = item.sale_price
          row.currency = item.currency
          if ((item.categories) && (item.categories.length >= 1)) {
            row.cat_title = item.categories[0].title
            row.cat_slug = item.categories[0].slug
            row.router_name = 'products-collection-product'
          } else {
            row.cat_title = null
            row.cat_slug = null
            row.router_name = 'product-product'
          }
          rows.push(row)
        }
      }
      return rows
    }
  },
  methods: {
    setPrice (p, c, ut, ui) {
      let currencyCode
      switch (c) {
        case 'USD':
          currencyCode = `$${p}`
          break
        default:
          currencyCode = `${p}₺`
          break
      }
      const title = currencyCode + ' / ' + ui + ut
      return title
    }
  }
}
</script>
<style lang="sass">
  .asc_pariette-product-grid
    width: 100%
    position: relative
    height: 360px
    transition: .3s
    overflow: hidden
    background: #fff
    display: block
    border-radius: 5px
    & a
      text-decoration: none
    & h1
      padding: 10px 10px 0px 10px
      width: 100%
      color: #000
      transition: .3s
      margin: 0
      font-size: 14px
      line-height: 150%
      font-weight: 600
      letter-spacing: -0.02rem
      max-height: 52px
      overflow: hidden
    & h2
      padding: 10px 10px 10px 10px
      color: #6d6d6d
      font-weight: 400
      margin: 0
      font-size: 14px
      letter-spacing: -0.02rem
      display: inline-block
    .asc_pariette-product-grid-img
      filter: blur(0px)
      height: 260px
      overflow: hidden
      width: 100%
      text-align: center
      .asc_pariette-product-grid-noimg
        width: 100%
        height: 100%
        background: linear-gradient(180deg, #ffffff, #dddddd)
      & img
        margin: auto
        width: 100%
        max-height: 100%
        transition: .1s
    &:hover
      box-shadow: 0 10px 15px #36241e4d
      transition: .3s
      & a
        text-decoration: none
</style>
