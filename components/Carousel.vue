<template>
  <b-overlay :show="carousels ? false : true" rounded="sm">
    <div class="asc_pariette-carousel">
      <b-carousel v-if="myStore.cdn_url" id="carousel-fade" :class="sliderClass" fade img-height="80">
        <b-carousel-slide
          v-for="(item, i) in carousels"
          :key="'slider' + i"
          :img-alt="item.text ? item.text : ''"
          @sliding-start="onSlideStart"
          @sliding-end="onSlideEnd"
        >
          <div class="asc_pariette-carousel-object" :style="{backgroundImage: 'url('+myStore.cdn_url + item.image+')'}">
            <b-container fluid class="asc_pariette-carousel-object-text">
              <b-row>
                <b-col lg="8" md="12" offset-lg="1" offset-md="0">
                  <h1>
                    {{ item.text }}
                  </h1>
                </b-col>
              </b-row>
            </b-container>
          </div>
          <div class="asc_pariette-carousel-background" :style="{backgroundImage: 'url('+myStore.cdn_url + item.image+')'}" />
        </b-carousel-slide>
      </b-carousel>
      <b-container fluid class="asc_pariette-carousel-info">
        <b-row>
          <b-col
            xl="6"
            lg="9"
            md="10"
            sm="12"
            cols="12"
            offset-lg="1"
            offset="0"
            class="asc_pariette-carousel-info-bg"
          >
            <p v-html="$t('general.carouselText')" />
            <img class="asc_pariette-carousel-info-down" src="~/assets/icon-down.svg" alt="Scroll down for explore" width="24" height="24">
          </b-col>
        </b-row>
      </b-container>
    </div>
  </b-overlay>
</template>
<script>
export default {
  props: {
    carousels: {
      type: Array,
      required: false,
      default () {
        return [{ text: 'Quality flooring and home renovation materials', image: 'homeSlider2.jpg' }]
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
    sliderClass: 'asc_pariette-carousel-slier'
  }),
  methods: {
    onSlideStart () {
      this.sliderClass = 'asc_pariette-carousel-slier asc_pariette-carousel-slier-animated'
    },
    onSlideEnd () {
      this.sliderClass = 'asc_pariette-carousel-slier'
    }
  }
}
</script>
<style lang="sass">
  $asp-brown: #36241E
  $asp-green: #1D4732
  $asp-gray: #575757
  .asc_pariette-carousel
    position: relative
    background: #f2f2f2
    overflow: hidden
    height: 690px
    @keyframes slideDown
      0%
        background-position-y: 0px
      100%
        background-position-y: 70%
    .asc_pariette-carousel-slier-animated
      .carousel-item
        & img
          animation: slideDown 1.5s ease-in-out
    .asc_pariette-carousel-slier
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
            .asc_pariette-carousel-background
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
            .asc_pariette-carousel-object
              background-size: cover
              background-position-x: center
              background-position-y: 70%
              background-repeat: no-repeat
              animation: slideDown 1.5s ease-in-out
              position: relative
              width: 100%
              height: 100%
              .asc_pariette-carousel-object-text
                height: 90vh
                padding-top: 40vh
                & h1
                  font-weight: 700 !important
                  color: #f2f2f2 !important
                  text-shadow: -5px 7px 8px #868686
                  font-size: 70px
                  padding: 0px
                  margin: 0px
                @media (max-width: 425px)
                  padding-top: 35vh
                  & h1
                    font-size: 30px
                @media (min-width: 768px) and (max-width: 1440px)
                  padding-top: 40vh
                  & h1
                    font-size: 50px
                @media (min-width: 1440px) and (max-width: 1590)
                  padding-top: 40vh
                  & h1
                    font-size: 60px
                @media (min-width: 1590px)
                  & h1
                    font-size: 70px
    .asc_pariette-carousel-info
      position: absolute
      bottom: 0px
      z-index: 8
      .asc_pariette-carousel-info-bg
        width: fit-content
        background: #ffffff
        padding: 16px 10px
        font-size: 16px
        font-weight: 700
        color: $asp-brown
        & p
          padding: 0px
          margin: 0px
          display: inline-block
        & span
          font-weight: 200
          color: $asp-green
        .asc_pariette-carousel-info-down
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
