<template>
  <b-col
    :xl="rows ? rows : 3"
    lg="6"
    md="6"
    sm="12"
    class="mb-5"
  >
    <div v-if="list.title" class="asc_pariette-product-list">
      <!-- <nuxt-link :to="localePath({ name: 'product-product', params: { url: list.slug } })"> -->
      <nuxt-link :to="localePath({ name: 'products-collection-product', params: { collection: routeName, product: list.slug } })">
        <h5>
          {{ list.base_title }}<br>{{ list.title }}
        </h5>
        <div class="asc_pariette-product-list-hover">
          <span>{{ list.meta_title }}</span>
        </div>
        <div class="asc_pariette-product-list-img">
          <img v-if="myStore.cdn_url" :src="myStore.cdn_url + list.image_web" :alt="list.title" width="" height="">
          <div v-else class="asc_pariette-product-list-noimg" />
        </div>
      </nuxt-link>
    </div>
  </b-col>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: {
    list: {
      type: Object,
      required: false,
      default () {
        return null
      }
    },
    rows: {
      type: Number,
      default: 3
    }
  },
  computed: {
    ...mapState(['myStore']),
    routeName () {
      return this.$route.params.url
    }
  }
}
</script>
<style lang="sass">
  .asc_pariette-product-list
    width: 100%
    position: relative
    height: 340px
    overflow: hidden
    background: #fff
    display: block
    & h5
      position: absolute
      bottom: 0
      font-weight: 600
      text-shadow: -1px -1px 8px rgb(0 0 0)
      padding: 50px 10px 10px 10px
      background: linear-gradient(0deg, rgba(0,0,0,.4), rgba(0,0,0,0))
      left: 0
      width: 100%
      color: #fff
      z-index: 2
      opacity: 1
      transition: .3s
      margin: 0
    .asc_pariette-product-list-hover
      opacity: 0
      position: absolute
      z-index: 2
      width: 100%
      height: 100%
      justify-content: center
      text-shadow: -1px -1px 8px rgba(0, 0, 0, .7)
      line-height: 100%
      left: 0
      top: 0
      font-size: 30px
      letter-spacing: -0.04em
      font-weight: 600
      padding: 20px
      text-align: center
      background: linear-gradient(0deg, rgba(58, 43, 38, 0.4), rgba(58, 43, 38, 0.4)), linear-gradient(1.29deg, rgba(0, 0, 0, 0.3) -9.6%, rgba(0, 0, 0, 0) 35.7%)
      color: #ffffff
      align-items: center
      display: flex !important
    .asc_pariette-product-list-img
      position: absolute
      bottom: 0
      left: 0
      filter: blur(0px)
      height: 340px
      overflow: hidden
      width: 100%
      text-align: center
      .asc_pariette-product-list-noimg
        width: 100%
        height: 100%
        background: linear-gradient(180deg, #ffffff, #dddddd)
      & img
        height: 100%
        transition: .1s
    &:hover
      & h5
        opacity: 0
        transition: .3s
      .asc_pariette-product-list-hover
        opacity: 1
        transition: .3s
      .asc_pariette-product-list-img
        filter: blur(1px)
</style>
