<template>
  <main class="asc_pariette-product">
    <!-- <Breadcrumb :where="product" /> -->
    <b-container fluid>
      <ProductGhost v-if="productLoading" />
      <b-row v-else>
        <b-col lg="10" md="12" offset-lg="1" offset-md="0">
          <b-row class="my-4">
            <b-col cols="12">
              <h1 :itemprop="product.title">{{ product.base_title }}</h1>
              <h3><b>{{ $t('product.sku') }}:</b> {{ product.sku }}</h3>
              <h3><b>{{ $t('product.brand') }}:</b> {{ product.brandTitle }}</h3>
              <h3 v-if="product.categories[0]"><b>{{ $t('product.category') }}:</b> {{ product.categories[0].title }}</h3>
              <h3 v-if="product.available === 1"><b>{{ $t('product.piece') }}</b> {{ formatCurrency(product.currency) + product.sale_price }}</h3>
            </b-col>
          </b-row>
          <b-row class="asc_pariette-product-detail-box shadow">
            <b-col md="12" lg="4">
              <ProductImages :images="productImg" />
            </b-col>
            <b-col md="12" lg="8" class="asc_pariette-product-detail-box-content">
              <section>
                <h2>{{ $t('product.description') }}</h2>
                <article v-html="product.description" />
              </section>
              <section v-if="product.attribute">
                <h2>{{ $t('product.specs') }}</h2>
                <b-row v-if="product.attribute">
                  <b-col
                    v-for="(item, y) in product.attribute"
                    :key="'productAttribute' + y"
                    cols="6"
                    sm="4"
                    md="3"
                    lg="3"
                  >
                    <div v-if="item" class="asc_pariette-product-detail-box-content-specs shadow rounded">
                      <img v-if="myStore.cdn_url" :src="myStore.cdn_url + item.value" :alt="item.label" width='' height=''>
                      <span>{{ item.label }}</span>
                    </div>
                  </b-col>
                </b-row>
              </section>
              <ProductCard :detail="product" />
            </b-col>
          </b-row>
          <b-row v-if="product.info" class="asc_pariette-product-detail-info shadow mt-5">
            <b-col class="m-0 p-0 asc_pariette-product-detail-info-content">
              <b-tabs content-class="asc_pariette-product-detail-info-content-inner">
                <b-tab v-for="(detail, i) in product.info" :key="'productDetail' + i" :title="detail.title">
                  <article v-html="detail.description" />
                </b-tab>
              </b-tabs>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </main>
</template>
<script>
let metaData = []
export default {
  data: () => ({
    product: [],
    myStore: {},
    productImg: [],
    productLoading: true
  }),
  activated () {
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      this.$fetch()
    }
  },
  async fetch () {
    this.productLoading = true
    const productData = await this.$axios.$get(`p/product/${this.$route.params.product}`).then(res => res)
    if (productData.status) {
      this.product = productData.data
      this.myStore = productData.store
      this.productLoading = false

      metaData = [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: productData.data.meta_description ? productData.data.meta_description : productData.data.description },
        { itemprop: 'name', content: productData.data.meta_title },
        { itemprop: 'brand', itemscope: 'itemscope', itemtype: 'http://schema.org/Organization' },
        { hid: 'twitter:title', name: 'twitter:title', content: productData.data.meta_title },
        { hid: 'twitter:image', name: 'twitter:image', content: productData.data.image_web },
        { hid: 'twitter:image:alt', name: 'twitter:image:alt', content: productData.data.meta_title },
        { hid: 'og:title', property: 'og:title', content: productData.data.meta_title },
        { hid: 'og:image', property: 'og:image', content: productData.data.image_web },
        { hid: 'og:image:secure_url', property: 'og:image:secure_url', content: productData.data.image_web },
        { hid: 'og:image:alt', property: 'og:image:alt', content: productData.data.meta_title }
      ]
    }
    const lightbox = []
    if (this.product.gallery) {
      const gal = JSON.parse(this.product.gallery)
      for (let p = 0; p < gal.length; p++) {
        const img = {
          title: gal[p].text ? gal[p].text : this.product.title,
          src: this.myStore.cdn_url + gal[p].image
        }
        lightbox.push(img)
      }
      this.productImg = lightbox
    } else {
      this.productImg = []
    }
  },
  methods: {
    formatCurrency (e) {
      let ret = '$'
      switch (e) {
        case 'USD':
          ret = '$'
          break
        case 'EUR':
          ret = '€'
          break
        case 'TRY':
          ret = '₺'
          break
        default:
          ret = '$'
          break
      }
      return ret
    }
  },
  head () {
    return {
      title: this.product.meta_title ? this.product.meta_title : this.product.title,
      titleTemplate: `%s | ${this.myStore.meta_title ? this.myStore.meta_title : this.myStore.title}`,
      meta: metaData,
      link: [
        { rel: 'canonical', href: this.product.canonical ? this.myStore.url + '/product/' + this.product.canonical : this.myStore.url + '/product/' + this.product.slug },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  }
}
</script>
<style lang="sass">
  // .asc_pariette-product
  //   width: 100%
  //   padding-bottom: 100px
  //   background: linear-gradient(45deg, #f3f3f3, #ffffff)
  //   & h1
  //     letter-spacing: -0.02rem
  //     font-size: 26px
  //     font-weight: 700
  //     color: #3D6E47
  //   & h2
  //     font-size: 22px
  //     font-weight: 600
  //     letter-spacing: -0.04rem
  //     color: #5e6f61
  //   & h3
  //     font-size: 16px
  //     font-weight: 400
  //     letter-spacing: -0.02rem
  //     color: #999
  //     display: inline-block
  //     margin-right: 1rem
  //   & h4
  //     font-size: 18px
  //     color: #3D6E47
  //     font-weight: 400
  //   & p
  //     color: #575757
  //     font-size: 14px
  //     line-height: 26px
  //   & label
  //     font-size: 14px
  //     line-height: 26px
  //   .asc_pariette-product-detail-info
  //     border-radius: 20px
  //     padding: 0
  //     position: relative
  //     z-index: 9
  //     background: inherit
  //     background-size: contain
  //     background-repeat: no-repeat
  //     background-color: rgba(255,255,255,.8)
  //     backdrop-filter: blur(5px)
  //     .asc_pariette-product-detail-info-content
  //       overflow: hidden
  //       .nav-tabs
  //         border-bottom: 0px
  //         border-top-left-radius: 20px
  //         border-top-right-radius: 20px
  //         overflow: hidden
  //       .nav-link
  //         font-size: 14px
  //         border-top-left-radius: 0px
  //         border-top-right-radius: 0px
  //         border: 0px
  //         background: #f2f2f2
  //         color: #3d6e47
  //       .nav-link.active
  //         font-size: 14px
  //         border-top-left-radius: 0px
  //         border-top-right-radius: 0px
  //         border: 0px
  //         background: #3d6e47
  //         color: #fff
  //       .asc_pariette-product-detail-info-content-inner
  //         padding: 1rem 15px
  //   .asc_pariette-product-detail-box
  //     border-radius: 20px
  //     padding: 30px 40px
  //     position: relative
  //     // z-index: 9
  //     background: inherit
  //     background-size: contain
  //     background-repeat: no-repeat
  //     background-color: rgba(255,255,255,.8)
  //     // backdrop-filter: blur(5px)
  //     @media (max-width: 996px)
  //       padding: 30px 15px
  //     & article
  //       font-weight: 400
  //       font-size: 16px
  //       letter-spacing: -0.03em
  //       color: #5f5f5f
  //   .asc_pariette-product-detail-box-content
  //     font-size: 14px
  //     padding-left: 100px
  //     margin-top: 0
  //     @media (max-width: 991px)
  //       padding-left: 0px
  //       margin-top: 3rem
  //     & section
  //       margin-bottom: 3rem
  //   .asc_pariette-product-detail-box-content-specs
  //     background: #fff
  //     font-size: 12px
  //     text-align: center
  //     width: 100%
  //     padding: 10px
  //     margin-bottom: 25px
  //     font-weight: 600
  //     color: #3d6e47
  //     & img
  //       width: 50px
  //       margin: 15px auto
  //       display: block
</style>
