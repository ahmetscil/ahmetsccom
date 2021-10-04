<template>
  <div>
    <b-row>
      <b-col cols="1" class="p-0">
        <b-row class="asc_pariette-product-detail-box-gallery">
          <b-col
            v-for="(thumb, thumbIndex) in images"
            :key="thumbIndex"
            @click="galind = thumbIndex"
            xl="12"
          >
            <b-img
              fluid
              :src="thumb.src"
              :alt="thumb.title"
              :title="thumb.title"
              width=""
              height=""
            />
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="11">
        <div class="asc_pariette-product-carousel">
          <b-carousel id="carousel-fade" :class="sliderClass" fade img-height="80">
            <b-carousel-slide
              v-for="(item, i) in images"
              :key="'slider' + i"
              :img-alt="item.text ? item.text : ''"
              @sliding-start="onSlideStart"
              @sliding-end="onSlideEnd"
            >
              <div class="asc_pariette-product-carousel-object" :style="{backgroundImage: 'url('+item.src+')'}">
                <b-container fluid class="asc_pariette-product-carousel-object-text">
                  <b-row>
                    <b-col lg="8" md="12" offset-lg="1" offset-md="0">
                      <h1>{{ item.text }}</h1>
                    </b-col>
                  </b-row>
                </b-container>
              </div>
              <div class="asc_pariette-product-carousel-background" :style="{backgroundImage: 'url('+item.src+')'}" />
            </b-carousel-slide>
          </b-carousel>
        </div>
      </b-col>
    </b-row>
    <CoolLightBox :items="images" :index="galind" @close="galind = null" />
  </div>
</template>
<script>
export default {
  props: {
    images: {
      type: Array,
      required: false,
      default () {
        return []
      }
    }
  },
  data: () => ({
    galind: null,
    sliderClass: 'asc_pariette-product-carousel-slier'
  }),
  methods: {
    onSlideStart () {
      this.sliderClass = 'asc_pariette-product-carousel-slier asc_pariette-product-carousel-slier-animated'
    },
    onSlideEnd () {
      this.sliderClass = 'asc_pariette-product-carousel-slier'
    }
  }
}
</script>
<style lang="sass">
  .asc_pariette-product-detail-box-gallery
    & img
      width: 100%
      cursor: pointer
  .asc_pariette-product-carousel
    position: relative
    background: #fff
    overflow: hidden
    @keyframes slideDown
      0%
        background-position-y: 0px
      100%
        background-position-y: 70%
    .asc_pariette-product-carousel-slier-animated
      .carousel-item
        & img
          animation: slideDown 1.5s ease-in-out
    .asc_pariette-product-carousel-slier
      height: 60vh
      position: relative
      .carousel-inner
        .carousel-item
          .carousel-caption
            position: relative
            padding: 0
            right: 0
            bottom: 0
            left: 0
            top: 0
            text-align: left
            .asc_pariette-product-carousel-background
              background-size: cover
              background-position: center
              background-repeat: no-repeat
              background-attachment: fixed
              filter: blur(8px)
              position: absolute
              z-index: -1
              width: 100%
              height: 100%
              top: 0
              left: 0
            .asc_pariette-product-carousel-object
              background-size: cover
              background-position-x: center
              background-position-y: 70%
              background-repeat: no-repeat
              animation: slideDown 1.5s ease-in-out
              position: relative
              width: 100%
              height: 100%
              .asc_pariette-product-carousel-object-text
                height: 60vh
                padding-top: 60vh
                & h1
                  font-weight: 700 !important
                  color: #fff !important
                  font-size: 70px
                  padding: 0px
                  margin: 0px
                @media (max-width: 425px)
                  padding-top: 35vh
                  & h1
                    font-size: 30px
                @media (min-width: 768px) and (max-width: 1440px)
                  padding-top: 60vh
                  & h1
                    font-size: 50px
                @media (min-width: 1440px) and (max-width: 1590)
                  padding-top: 60vh
                  & h1
                    font-size: 60px
                @media (min-width: 1590px)
                  & h1
                    font-size: 70px
    .asc_pariette-product-carousel-info
      position: absolute
      bottom: 0px
      z-index: 8
      .asc_pariette-product-carousel-info-bg
        width: fit-content
        background: #f7f7f7
        padding: 16px 10px
        font-size: 16px
        font-weight: 700
        color: #36241E
        & p
          padding: 0px
          margin: 0px
          display: inline-block
        & span
          font-weight: 200
          color: #1D4732
        .asc_pariette-product-carousel-info-down
          float: right
          animation: slideDownLoop 1.5s ease-in-out infinite
</style>
<style>
@keyframes slideDownLoop {
  0%,
  100% {
    transform: translate(0, 0);
  }

  50% {
    transform: translate(0, 10%);
  }
}
</style>
