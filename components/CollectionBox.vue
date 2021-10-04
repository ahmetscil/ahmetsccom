<template>
  <b-container fluid class="asc_pariette-collection">
    <b-row>
      <b-col lg="10" md="12" offset-lg="1" offset-md="0">
        <b-row v-if="list">
          <b-col
            v-for="(box, y) in list"
            :key="'box' + y"
            md="12"
            :lg="orders[y]"
            class="mb-5"
          >
            <div class="asc_pariette-collection-box">
              <nuxt-link :to="localePath({ name: 'collection-url', params: { url: box.slug } })" :title="box.title">
                <h1>{{ box.title }}</h1>
                <div class="asc_pariette-collection-box-hover">
                  <span>{{ box.title }}</span>
                </div>
                <div class="asc_pariette-collection-box-img">
                  <img :src="myStore.cdn_url + box.image_web" :alt="box.title" width="" height="">
                </div>
              </nuxt-link>
            </div>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      required: false,
      default () {
        return []
      }
    },
    myStore: {
      type: Object,
      required: false,
      default () {
        return {}
      }
    }
  },
  data: () => ({
    orders: [6, 6, 5, 3, 4, 3, 3, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6]
  })
}
</script>
<style lang="sass">
  .asc_pariette-collection
    position: relative
    min-height: 400px
    .asc_pariette-collection-box
      position: relative
      width: 100%
      background-size: cover
      background-repeat: no-repeat
      background-position: center
      display: block
      background: #fff
      & a
        position: relative
        display: block
        width: 100%
        height: 300px
        overflow: hidden
        background: #fff
      & h1
        position: absolute
        font-size: 20px
        font-weight: 600
        text-shadow: -1px -1px 8px rgb(0 0 0)
        padding: 50px 10px 10px 20px
        background: linear-gradient(0deg, rgba(0,0,0,.4), rgba(0,0,0,0))
        left: 0
        bottom: 0
        display: block
        width: 100%
        color: #fff
        z-index: 2
        opacity: 1
        transition: .3s
        margin: 0
      .asc_pariette-collection-box-hover
        opacity: 0
        position: absolute
        z-index: 2
        width: 100%
        height: 100%
        justify-content: center
        line-height: 100%
        left: 0
        top: 0
        font-size: 40px
        letter-spacing: -0.04em
        font-weight: 400
        padding: 20px
        text-align: center
        background: linear-gradient(0deg, rgba(58, 43, 38, 0.4), rgba(58, 43, 38, 0.4)), linear-gradient(1.29deg, rgba(0, 0, 0, 0.3) -9.6%, rgba(0, 0, 0, 0) 35.7%)
        color: #ffffff
        align-items: center
        display: flex !important
      .asc_pariette-collection-box-img
        position: absolute
        bottom: 0
        left: 0
        height: 300px
        overflow: hidden
        width: 100%
        & img
          min-height: 100%
          min-width: 100%
          margin-left: 0
          margin-top: 0
          transition: .1s
      &:hover
        & h1
          opacity: 0
          transition: .3s
        .asc_pariette-collection-box-hover
          opacity: 1
          transition: .3s
</style>
